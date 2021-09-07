package com.example.orderservice.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class OrderDto implements Serializable {
    private Long productId;
    private Integer qty;
    private Integer unitPrice;
    private Integer totalPrice;

    private Long orderId;
    private Long userId;
}
