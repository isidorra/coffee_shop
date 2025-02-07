package com.coffee_shop.backend.service.order;

import com.coffee_shop.backend.entity.*;
import com.coffee_shop.backend.enums.OrderStatus;
import com.coffee_shop.backend.repository.*;
import com.coffee_shop.backend.service.cart.ICartService;
import com.coffee_shop.backend.service.product.IProductService;
import com.coffee_shop.backend.utils.JwtUtil;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService implements IOrderService {
    @Autowired
    private IOrderRepository orderRepository;
    @Autowired
    private ICartRepository cartRepository;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private ICustomerRepository customerRepository;
    @Autowired
    private IOrderItemRepository orderItemRepository;
    @Autowired
    private ICartService cartService;
    @Autowired
    private IProductRepository productRepository;
    @Autowired
    private IShippingPriceRepository shippingPriceRepository;

    @Override
    public Order create() {
        Order order = new Order();
        Customer customer = customerRepository.findById(jwtUtil.getLoggedInUser().getId()).get();
        Cart cart = cartRepository.findByCustomerId(customer.getId());
        double total = 0;

        order.setCustomer(customer);
        order.setCreatedAt(LocalDate.now());
        order.setStatus(OrderStatus.PROCESSING);
        order.setShippingPrice(shippingPriceRepository.findAll().get(0).getPrice());

        for(CartItem cartItem : cart.getItems()) {
            OrderItem orderItem = new OrderItem();
            Product product = productRepository.findById(cartItem.getProduct().getId()).get();
            orderItem.setQuantity(cartItem.getQuantity());
            product.setStockQuantity(product.getStockQuantity() - cartItem.getQuantity());
            productRepository.save(product);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setOrder(order);
            order.getItems().add(orderItem);
            total += orderItem.getQuantity() * orderItem.getProduct().getPrice();

        }

        total += shippingPriceRepository.findAll().get(0).getPrice();
        order.setTotalAmount(total);
        orderRepository.save(order);

        cartService.emptyCart();

        return order;
    }

    @Override
    public Page<Order> findAll(Pageable pageable) {
        Page<Order> orders = orderRepository.findAllByOrderByCreatedAtDesc(pageable);

        orders.forEach(order -> {
            if (order.getCustomer() != null) {
                order.setCustomerDto(order.getCustomer().getCustomerDto());
            }

        });

        return orders;

    }

    @Override
    public Page<Order> findByCustomerId(Pageable pageable) {
        Page<Order> orders = orderRepository.findByCustomerIdOrderByCreatedAtDesc(jwtUtil.getLoggedInUser().getId(), pageable);
        orders.forEach(order -> {
            if (order.getCustomer() != null) {
                order.setCustomerDto(order.getCustomer().getCustomerDto());
            }

        });

        return orders;
    }

    @Override
    public Order updateStatus(Long id, OrderStatus status) {
        Order order = orderRepository.findById(id).get();
        order.setStatus(status);
        if(status.equals(OrderStatus.CANCELED)) {
            for(OrderItem orderItem : order.getItems()) {
                orderItem.getProduct().setStockQuantity(orderItem.getProduct().getStockQuantity() + orderItem.getQuantity()); //restock quantity
                orderItemRepository.save(orderItem);
            }
        }
        return orderRepository.save(order);
    }

    @Override
    public Optional<Order> findById(Long id) {
        Optional<Order> order = orderRepository.findById(id);
        order.get().setCustomerDto(order.get().getCustomer().getCustomerDto());
        return order;
    }


}
