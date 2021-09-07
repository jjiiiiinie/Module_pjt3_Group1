package com.example.orderservice.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import javax.persistence.Column;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RequestOrder {

    private Long userId;

    private Long productId;

    private Integer qty;

    private Integer unitPrice;

    private Integer totalPrice;

    private String recipient_name;

    private String recipient_address;

    private String recipient_phone;


    private String sender_name;

    private String sender_phone;

    private String sender_password;
}
