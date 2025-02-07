package com.coffee_shop.backend.repository;

import com.coffee_shop.backend.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICartRepository extends JpaRepository<Cart, Long> {
    Cart findByCustomerId(Long id);
}
