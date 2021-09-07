package com.example.catalogservice.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.LocalDate;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseCatalog {
    private Long id;

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
