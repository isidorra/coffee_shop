package com.coffee_shop.backend.controller;

import com.coffee_shop.backend.dto.cart.CartItemDto;
import com.coffee_shop.backend.entity.CartItem;
import com.coffee_shop.backend.entity.Product;
import com.coffee_shop.backend.service.cart.ICartService;
import com.coffee_shop.backend.service.product.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    private ICartService cartService;
    @Autowired
    private IProductService productService;

    @GetMapping
    public ResponseEntity<?> findByCustomer() {
        return ResponseEntity.status(200).body(cartService.findByCustomer().getItems());
    }

    @PostMapping
    public ResponseEntity<?> addToCart(@RequestBody CartItemDto cartItemDto) {
        Optional<Product> product = productService.findById(cartItemDto.getProductId());
        if(product.isEmpty())
            return ResponseEntity.status(404).body("Product not found.");

        if(cartItemDto.getQuantity() <= 0)
            return ResponseEntity.status(400).body("Quantity must be greater than 0.");

        if(cartItemDto.getQuantity() > product.get().getStockQuantity())
            return ResponseEntity.status(400).body("Chosen quantity is greater than stock quantity.");


        CartItem cartItem = cartService.addToCart(cartItemDto);
        if(cartItem == null)
            return ResponseEntity.status(500).body("Item not added to cart.");

        return ResponseEntity.status(201).body(cartItem);
    }

    @PutMapping
    public ResponseEntity<?> updateCart(@RequestBody CartItemDto cartItemDto) {
        Optional<Product> product = productService.findById(cartItemDto.getProductId());
        if(product.isEmpty())
            return ResponseEntity.status(404).body("Product not found.");

        if(cartItemDto.getQuantity() < 0)
            return ResponseEntity.status(400).body("Quantity must be greater than 0.");

        if(cartItemDto.getQuantity() > product.get().getStockQuantity())
            return ResponseEntity.status(400).body("Chosen quantity is greater than stock quantity.");

        cartService.updateCart(cartItemDto);
        return ResponseEntity.status(200).body("Cart is updated.");
    }
}
