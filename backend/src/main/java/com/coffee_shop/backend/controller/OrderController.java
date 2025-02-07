package com.coffee_shop.backend.controller;

import com.coffee_shop.backend.entity.Cart;
import com.coffee_shop.backend.entity.CartItem;
import com.coffee_shop.backend.entity.Customer;
import com.coffee_shop.backend.entity.Order;
import com.coffee_shop.backend.enums.OrderStatus;
import com.coffee_shop.backend.repository.ICustomerRepository;
import com.coffee_shop.backend.service.cart.ICartService;
import com.coffee_shop.backend.service.order.IOrderService;
import com.coffee_shop.backend.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private IOrderService orderService;
    @Autowired
    private ICartService cartService;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private ICustomerRepository customerRepository;

    @PostMapping
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<?> create() {
        Customer customer = customerRepository.findById(jwtUtil.getLoggedInUser().getId()).get();
        if(customer.getAddress().isEmpty() || customer.getCity().isEmpty() || customer.getCountry().isEmpty() || customer.getPhoneNumber().isEmpty() || customer.getZipCode().isEmpty())
            return ResponseEntity.status(400).body("Delivery info not provided.");

        Cart cart = cartService.findByCustomer();
        if(cart.getItems().isEmpty())
            return ResponseEntity.status(400).body("Cart is empty.");

        for(CartItem cartItem : cart.getItems()) {
            if(cartItem.getQuantity() > cartItem.getProduct().getStockQuantity())
                return ResponseEntity.status(400).body("Chosen quantity is greater than stock quantity.");
        }

        Order order = orderService.create();
        if(order == null)
            return ResponseEntity.status(500).body("Order not created.");
        return ResponseEntity.status(201).body(order);
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> findAll(Pageable pageable) {
        return ResponseEntity.status(200).body(orderService.findAll(pageable));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        Optional<Order> order = orderService.findById(id);
        if(order.isEmpty())
            return ResponseEntity.status(404).body("Order not found.");

        return ResponseEntity.status(200).body(order);
    }

    @GetMapping("/customer")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<?> findByCustomerId(Pageable pageable) {
        return ResponseEntity.status(200).body(orderService.findByCustomerId(pageable));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestParam OrderStatus orderStatus) {
        Optional<Order> order = orderService.findById(id);
        if(order.isEmpty())
            return ResponseEntity.status(404).body("Order not found.");

        if(order.get().getStatus().equals(OrderStatus.PROCESSING) && !orderStatus.equals(OrderStatus.ACCEPTED))
            return ResponseEntity.status(400).body("Status not acceptable.");
        if(order.get().getStatus().equals(OrderStatus.ACCEPTED) && !orderStatus.equals(OrderStatus.DELIVERING))
            return ResponseEntity.status(400).body("Status not acceptable.");
        if(order.get().getStatus().equals(OrderStatus.DELIVERING) && !orderStatus.equals(OrderStatus.DELIVERED))
            return ResponseEntity.status(400).body("Status not acceptable.");

        return ResponseEntity.status(200).body(orderService.updateStatus(id, orderStatus));
    }

    @PutMapping("/customer/cancel/{id}")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<?> cancelOrder(@PathVariable Long id) {
        Optional<Order> order = orderService.findById(id);
        if(order.isEmpty())
            return ResponseEntity.status(404).body("Order not found.");

        if(!order.get().getCustomer().getId().equals(jwtUtil.getLoggedInUser().getId()))
            return ResponseEntity.status(400).body("Not acceptable.");

        if(order.get().getStatus().equals(OrderStatus.PROCESSING) || order.get().getStatus().equals(OrderStatus.ACCEPTED))
            return ResponseEntity.status(200).body(orderService.updateStatus(id, OrderStatus.CANCELED));

        return ResponseEntity.status(400).body("Status not acceptable.");
    }
}
