package com.example.orderservice.service;

import com.example.orderservice.dto.OrderDto;
import com.example.orderservice.entity.OrderEntity;
import org.hibernate.criterion.Order;

public interface OrdersService {
    OrderDto createOrder(OrderDto eachOrder);
    OrderDto getOrderByOrderId(Long orderId);
    Iterable<OrderEntity> getOrdersByUserId(Long userId);
}
