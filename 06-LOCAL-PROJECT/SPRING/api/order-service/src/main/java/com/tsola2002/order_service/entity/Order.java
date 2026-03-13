package com.tsola2002.order_service.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "orders")
@Getter
@Setter
@Data
public class Order {
    @Id
    private Long id;

    @Column(name = "customer_id")
    private Long customerId;

    private String item;
}
