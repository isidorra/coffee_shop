package com.coffee_shop.backend.service.cart;

import com.coffee_shop.backend.dto.cart.CartItemDto;
import com.coffee_shop.backend.entity.Cart;
import com.coffee_shop.backend.entity.CartItem;

public interface ICartService {
    Cart findByCustomer();
    CartItem addToCart(CartItemDto cartItemDto);
    void updateCart(CartItemDto cartItemDto);
    void emptyCart();
}
