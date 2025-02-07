package com.coffee_shop.backend.repository;

import com.coffee_shop.backend.entity.Order;
import com.coffee_shop.backend.enums.OrderStatus;
import org.aspectj.weaver.ast.Or;
import org.springframework.cglib.core.Local;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface IOrderRepository extends JpaRepository<Order, Long> {
    Page<Order> findAllByOrderByCreatedAtDesc(Pageable pageable);
    Page<Order> findByCustomerIdOrderByCreatedAtDesc(Long customerId, Pageable pageable);
    List<Order> findByCreatedAt(LocalDate localDate);
    List<Order> findByCreatedAtBetween(LocalDate startTime, LocalDate endTime);
    List<Order> findByCreatedAtBetweenAndStatus(LocalDate startTime, LocalDate endTime, OrderStatus status);
    long countByStatus(OrderStatus status);
    List<Order> findByStatus(OrderStatus status);
}
