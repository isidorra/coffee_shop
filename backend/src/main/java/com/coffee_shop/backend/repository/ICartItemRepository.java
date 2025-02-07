package com.coffee_shop.backend.repository;

import com.coffee_shop.backend.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICartItemRepository extends JpaRepository<CartItem, Long> {
    CartItem findByProductId(Long id);
}
