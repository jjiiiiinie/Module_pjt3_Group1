package com.example.catalogservice.vo;

import lombok.Data;

import java.time.LocalDate;

@Data
public class RequestCatalog {

    private String category;

    private String productName;

    private String writer;

    private String translator;

    private String publishingCompany;

    private LocalDate publishDate;

    private String content;

    private Integer unitPrice;

    private Integer deliveryFee;

    private Integer stock;

    private Integer pages;

    private Integer weight;

    private String size;

    private String isbn10;

    private String isbn13;
}
