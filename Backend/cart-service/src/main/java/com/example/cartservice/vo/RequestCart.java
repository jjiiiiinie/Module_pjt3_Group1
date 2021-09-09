package com.example.cartservice.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RequestCart {
    private Long productId;
    private Integer qty;
    private Integer unitPrice;
    private Integer totalPrice;
    private String userId;
}
