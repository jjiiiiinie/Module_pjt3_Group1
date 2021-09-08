package com.example.orderservice.controller;

import com.example.orderservice.client.CartServiceClient;
import com.example.orderservice.client.CatalogServiceClient;
import com.example.orderservice.dto.CartDto;
import com.example.orderservice.dto.OrderDto;
import com.example.orderservice.entity.OrderEntity;
import com.example.orderservice.mq.KafkaProducer;
//import com.example.orderservice.mq.OrderProducer;
import com.example.orderservice.service.OrdersService;
import com.example.orderservice.vo.RequestOrder;
import com.example.orderservice.vo.ResponseCatalog;
import com.example.orderservice.vo.ResponseOrder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
@Slf4j
public class OrderController {

    private final OrdersService orderService;
    private final KafkaProducer kafkaProducer;
    private final CatalogServiceClient catalogServiceClient;
    private final CartServiceClient cartServiceClient;
//    private final OrderProducer orderProducer;
    private final Environment env;

    @PostMapping(value="/{userId}/orders")
    public ResponseEntity<List<ResponseOrder>> createOrder(@PathVariable("userId") Long userId, @RequestBody RequestOrder requestOrder, HttpServletRequest req){

        log.info("Before add orders data");

        List<ResponseOrder> responseOrderList = new ArrayList<>();

        boolean isAvailabe = true;

        //카트에 담긴 각각의 수량 파악
        for(CartDto cart: requestOrder.getCartList()){
            ResponseCatalog responseCatalog = catalogServiceClient.getCatalog(cart.getProductId());

            if(responseCatalog == null || responseCatalog.getStock() <= 0 || responseCatalog.getStock() - cart.getQty() < 0){
                isAvailabe = false;
            }
        }

        if(isAvailabe){
            ModelMapper modelMapper = new ModelMapper();
            modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

            OrderDto orderDto = modelMapper.map(requestOrder, OrderDto.class);
            orderDto.setUserId(userId);

            String uuid = UUID.randomUUID().toString();
            // 여러 카트(상품)목록을 꺼내어 생성해줌
            for(CartDto cart: requestOrder.getCartList()){
                OrderDto eachOrder = modelMapper.map(requestOrder, OrderDto.class);

                eachOrder.setUserId(userId);
                eachOrder.setOrderUuid(uuid);

                eachOrder.setProductId(cart.getProductId());
                eachOrder.setUnitPrice(cart.getUnitPrice());
                eachOrder.setQty(cart.getQty());
                eachOrder.setTotalPrice(cart.getQty() * cart.getUnitPrice());

                OrderDto createDto = orderService.createOrder(eachOrder);
                ResponseOrder responseOrder = modelMapper.map(createDto, ResponseOrder.class);

                responseOrderList.add(responseOrder);

                // feign client로 장바구니 삭제
                cartServiceClient.deleteCart(cart.getCartId());

                // 수량 줄이기, feign client써도되지만... //todo 트랜잭션..
                kafkaProducer.send("order-catalog-stock-topic", createDto);
            }


//            orderProducer.send("orders", orderDto);


            log.info("After added orders data");
            return ResponseEntity.status(HttpStatus.CREATED).body(responseOrderList);
        }else{
            log.info("수량 부족");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping(value= "/{userId}/orders")
    public ResponseEntity<List<ResponseOrder>> getOrder(@PathVariable("userId") Long userId) throws Exception{
        log.info("Before retrieve orders data");
        Iterable<OrderEntity> orderList = orderService.getOrdersByUserId(userId);
        List<ResponseOrder> result = new ArrayList<>();
        orderList.forEach(v -> {
            result.add(new ModelMapper().map(v, ResponseOrder.class));
        });

        log.info("After retrieve orders data");

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
