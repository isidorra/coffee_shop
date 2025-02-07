package com.coffee_shop.backend.repository;

import com.coffee_shop.backend.entity.ShippingPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IShippingPriceRepository extends JpaRepository<ShippingPrice, Long> {
}
