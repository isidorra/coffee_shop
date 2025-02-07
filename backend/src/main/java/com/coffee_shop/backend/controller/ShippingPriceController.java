package com.coffee_shop.backend.controller;

import com.coffee_shop.backend.dto.order.ShippingPriceDto;
import com.coffee_shop.backend.service.order.IShippingPriceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/shipping-price")
public class ShippingPriceController {
    @Autowired
    private IShippingPriceService shippingPriceService;

    @GetMapping
    public ResponseEntity<?> find() {
        return ResponseEntity.status(200).body(shippingPriceService.find());
    }

    @PutMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> update(@RequestBody ShippingPriceDto shippingPriceDto) {
        if(shippingPriceDto.getPrice() < 0)
            return ResponseEntity.status(404).body("Invalid shipping price.");

        return ResponseEntity.status(200).body(shippingPriceService.update(shippingPriceDto.getPrice()));
    }
}
