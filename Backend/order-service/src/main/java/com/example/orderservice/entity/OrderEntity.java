package com.example.orderservice.entity;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "orders")
public class OrderEntity implements Serializable {

    @Id
    @GeneratedValue
    private Long orderId;

    @Column(nullable = false)
    private String orderUuid;

    @Column(nullable = false)
    private Long userId;
    @Column(nullable = false)
    private Long productId;
    @Column(nullable = false)
    private Integer qty;
    @Column(nullable = false)
    private Integer unitPrice;
    @Column(nullable = false)
    private Integer totalPrice;

    @Column(nullable = false)
    private String recipientName;
    @Column(nullable = false)
    private String recipientAddress;
    @Column(nullable = false)
    private String recipientPhone;

    @Column(nullable = false)
    private String senderName;
    @Column(nullable = false)
    private String senderPhone;
    @Column
    private String senderPassword;

    @Column(nullable = false)
    private String paymentPlan;

    @Column(updatable = false, insertable = false)
    @ColumnDefault(value = "CURRENT_TIMESTAMP")
    private Date createdAt;
}
