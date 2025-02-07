package com.coffee_shop.backend.service.order;

import com.coffee_shop.backend.entity.Order;
import com.coffee_shop.backend.enums.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;


public interface IOrderService {
    Order create();
    Page<Order> findAll(Pageable pageable);
    Page<Order> findByCustomerId(Pageable pageable);
    Order updateStatus(Long id, OrderStatus status);
    Optional<Order> findById(Long id);
}
