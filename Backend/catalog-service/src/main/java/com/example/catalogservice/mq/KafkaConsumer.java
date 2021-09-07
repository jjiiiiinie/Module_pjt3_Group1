//package com.example.catalogservice.mq;
//
//import com.example.catalogservice.entity.CatalogEntity;
//import com.example.catalogservice.jpa.CatalogRepository;
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.core.type.TypeReference;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.kafka.annotation.KafkaListener;
//import org.springframework.stereotype.Service;
//
//import java.util.HashMap;
//import java.util.Map;
//
//@Service
//@Slf4j
//@RequiredArgsConstructor
//public class KafkaConsumer {
//    private final CatalogRepository repository;
//
//    //todo 다바꾸기 카테고리 아이디가 카테고리 이자 아이디키 엿음
//    @KafkaListener(topics = "example-catalog-topic")
//    public void updateQty(String kafkaMessage){ // {"productId" : "CATALOG-001", "qty":40, ..}
//        log.info("kafka Message -> " + kafkaMessage);
//
//        Map<Object, Object> map = new HashMap<>();
//        ObjectMapper mapper = new ObjectMapper();
//        try {
//            map = mapper.readValue(kafkaMessage, new TypeReference<Map<Object, Object>>() {});
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//        }
//
//        // 수량 업데이트
//        CatalogEntity entity = repository.findByCategory((String)map.get("productId"));
//        if(entity != null){
//            entity.setStock(entity.getStock() - (Integer)map.get("qty"));
//            repository.save(entity);
//        }
//
//    }
//}
