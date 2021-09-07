package com.example.cartservice.controller;

import com.example.cartservice.client.CatalogServiceClient;
import com.example.cartservice.dto.CartDto;
import com.example.cartservice.entity.CartEntity;
import com.example.cartservice.mq.KafkaProducer;
import com.example.cartservice.service.CartService;
import com.example.cartservice.vo.RequestCart;
import com.example.cartservice.vo.ResponseCatalog;
import com.example.cartservice.vo.ResponseCart;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
@Slf4j
public class CartController {

    private final CartService cartService;
    private final KafkaProducer kafkaProducer;
    private final CatalogServiceClient catalogServiceClient;
//    private final OrderProducer orderProducer;
    private final Environment env;

    @GetMapping(value = "/carts/user/{userId}")
    public ResponseEntity<List<ResponseCart>> getCarts( @PathVariable("userId") Long userId){
        List<CartDto> cartDtoList = cartService.getCartByUserId(userId);
        List<ResponseCart> result = new ArrayList<>();
        //log.info("After retrieve catalgos data");
        cartDtoList.forEach(v -> {
            result.add(new ModelMapper().map(v, ResponseCart.class));
        });

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @GetMapping(value = "/carts/{cartId}")
    public ResponseEntity<ResponseCart> getCart( @PathVariable("cartId") Long cartId){
        CartDto cartDto = cartService.getCartByCartId(cartId);
        ResponseCart responseCart = new ModelMapper().map(cartDto, ResponseCart.class);

        return ResponseEntity.status(HttpStatus.OK).body(responseCart);
    }

    @PostMapping(value="/carts")
    public ResponseEntity<ResponseCart> createCart(@RequestBody RequestCart requestCart){

        log.info("Before add orders data");

        //check how much stock is left
        // order-service -> catalog-service
        // restTemplate or openfeign(o)
        boolean isAvailabe = true;
        ResponseCatalog responseCatalog = catalogServiceClient.getCatalog(requestCart.getProductId());

        if(responseCatalog != null && (responseCatalog.getStock() <= 0 || responseCatalog.getStock() - requestCart.getQty() < 0)){
            isAvailabe = false;
        }

        if(isAvailabe){
            ModelMapper modelMapper = new ModelMapper();
            modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

            CartDto cartDto = modelMapper.map(requestCart, CartDto.class);

/*            for multi order service, save data in database, use kafka for data sync  카프카 커넥트 사용시 주석*/
            CartDto createDto = cartService.createCart(cartDto);
//            ResponseOrder returnValue = modelMapper.map(createDto, ResponseOrder.class);

            //todo cart producer 등록할떄마다 재고를 줄일것인지? 주문시 재고를 줄일것인지? 후자가 나은데, 전자를 어떻게 처리?
            /* send kafka, bottom code is orderService.createOrder job*/
//            orderDto.setOrderId(UUID.randomUUID().toString());
//            orderDto.setTotalPrice(orderDto.getQty() * orderDto.getUnitPrice());
            // 아래시 항상 random 포트가 나옴. 실제 그 포트인지 알 수 없음
//            orderDto.setInstanceId(String.format("%s : %s",env.getProperty("spring.cloud.client.hostname"), env.getProperty("local.server.port")));
//            kafkaProducer.send("example-catalog-topic", orderDto);
            ResponseCart responseCart = modelMapper.map(cartDto, ResponseCart.class);

//            orderProducer.send("orders", orderDto);

            log.info("After added orders data");
            //return ResponseEntity.status(HttpStatus.CREATED).body(returnValue);
            return ResponseEntity.status(HttpStatus.CREATED).body(responseCart);
        }else{
            log.info("After added orders data");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }

    @DeleteMapping(value= "/carts/{cartId}")
    public ResponseEntity deleteCart(@PathVariable("cartId") Long cartId) {
        //TODO 예외 처리
        cartService.deleteByCartId(cartId);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    //주문하기 버튼 >> 카트 내용 수정, 내용 수정 된 값 카프카로 오더에게 보내기
    @PutMapping(value = "/carts")
    public ResponseEntity updateAndPayCart(@RequestBody List<RequestCart> requestCartList){
        List<ResponseCart> responseCartList = new ArrayList<>();

        for(RequestCart cart: requestCartList){
            boolean isAvailabe = true;
            ResponseCatalog responseCatalog = catalogServiceClient.getCatalog(cart.getProductId());

            if(responseCatalog != null && (responseCatalog.getStock() <= 0 || responseCatalog.getStock() - cart.getQty() < 0)){
                isAvailabe = false;
            }

            if(isAvailabe){
                ModelMapper modelMapper = new ModelMapper();
                modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

                CartDto cartDto = modelMapper.map(cart, CartDto.class);

                /*            for multi order service, save data in database, use kafka for data sync  카프카 커넥트 사용시 주석*/
                CartDto createDto = cartService.createCart(cartDto);

                ResponseCart responseCart = modelMapper.map(createDto, ResponseCart.class);
                responseCartList.add(responseCart);

                kafkaProducer.send("cart2orderByPay", createDto);

            }else{
                log.info("재고 부족");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
        }

        return ResponseEntity.status(HttpStatus.OK).body(responseCartList);
    }

    //오더 코드
//    @GetMapping(value= "/{userId}/orders")
//    public ResponseEntity<List<ResponseCart>> getOrder(@PathVariable("userId") String userId) throws Exception{
//        log.info("Before retrieve orders data");
//        Iterable<CartEntity> orderList = cartService.getCartByUserId(userId);
//        List<ResponseCart> result = new ArrayList<>();
//        orderList.forEach(v -> {
//            result.add(new ModelMapper().map(v, ResponseCart.class));
//        });

        //강제로 에러 추가
//        Random rnd = new Random(System.currentTimeMillis());
//        int time = rnd.nextInt(3);
//        if(time % 2 == 0){
//            try{
//                Thread.sleep(10000);
//                throw new Exception("에러 발생!");
//            }catch (Exception ex){
//                log.warn(ex.getMessage());
//            }
//        }
//
//        log.info("After retrieve orders data");
//
//        return ResponseEntity.status(HttpStatus.OK).body(result);
//        throw new Exception("Server not working!");
//    }
    
    
}
