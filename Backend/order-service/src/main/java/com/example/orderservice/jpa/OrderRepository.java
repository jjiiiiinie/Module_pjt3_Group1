package com.example.orderservice.jpa;

import com.example.orderservice.entity.OrderEntity;
import org.springframework.data.repository.CrudRepository;

public interface OrderRepository extends CrudRepository<OrderEntity, Long> {
    OrderEntity findByOrderId(Long orderId);
    Iterable<OrderEntity> findByUserId(Long userId);
}
