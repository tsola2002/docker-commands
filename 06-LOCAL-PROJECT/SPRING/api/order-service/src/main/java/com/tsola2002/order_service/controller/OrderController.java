package com.tsola2002.order_service.controller;

import com.tsola2002.order_service.entity.Order;
import com.tsola2002.order_service.repository.OrderRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/order")
public class OrderController {

    private final OrderRepository orderRepository;

    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @GetMapping("/customer/{customerId}")
    public Map<String, Object> getOrders(@PathVariable Long customerId) {

        List<Order> orders = orderRepository.findByCustomerId(customerId);

        Map<String, Object> response = new HashMap<>();
        response.put("customerId", customerId);
        response.put("items", orders.stream().map(Order::getItem).toList());

        return response;
    }
}
