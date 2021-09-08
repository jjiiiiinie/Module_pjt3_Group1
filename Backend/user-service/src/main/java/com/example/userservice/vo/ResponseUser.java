package com.example.userservice.vo;

import lombok.Data;

import java.util.List;

@Data
public class ResponseUser {
    private String userId;
    private String email;
    private String tel;
    private String name;

    private List<ResponseOrder> orders;
}
