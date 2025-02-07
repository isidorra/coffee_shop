package com.coffee_shop.backend.service.cart;

import com.coffee_shop.backend.dto.cart.CartItemDto;
import com.coffee_shop.backend.entity.Cart;
import com.coffee_shop.backend.entity.CartItem;
import com.coffee_shop.backend.entity.Customer;
import com.coffee_shop.backend.entity.Product;
import com.coffee_shop.backend.repository.ICartItemRepository;
import com.coffee_shop.backend.repository.ICartRepository;
import com.coffee_shop.backend.repository.IProductRepository;
import com.coffee_shop.backend.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartService implements ICartService{
    @Autowired
    private ICartRepository cartRepository;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private IProductRepository productRepository;
    @Autowired
    private ICartItemRepository cartItemRepository;


    @Override
    public Cart findByCustomer() {
        return cartRepository.findByCustomerId(jwtUtil.getLoggedInUser().getId());
    }

    @Override
    public CartItem addToCart(CartItemDto cartItemDto) {
        Product product = productRepository.findById(cartItemDto.getProductId()).get();
        Cart cart = findByCustomer();

        for(CartItem cartItem : cart.getItems()) {
            if(cartItem.getProduct().getId().equals(product.getId())) {
                cartItem.setQuantity(cartItem.getQuantity() + cartItemDto.getQuantity());
                return cartItemRepository.save(cartItem);
            }
        }

        CartItem cartItem = new CartItem();
        cartItem.setProduct(product);
        cartItem.setQuantity(cartItemDto.getQuantity());
        cartItem.setCart(cart);
        return cartItemRepository.save(cartItem);
    }

    @Override
    public void updateCart(CartItemDto cartItemDto) {
        if(cartItemDto.getQuantity() == 0) {
            cartItemRepository.delete(cartItemRepository.findByProductId(cartItemDto.getProductId()));
        } else {
            CartItem cartItem = cartItemRepository.findByProductId(cartItemDto.getProductId());
            cartItem.setQuantity(cartItemDto.getQuantity());
            cartItemRepository.save(cartItem);
        }
    }

    @Override
    public void emptyCart() {
        Cart cart = cartRepository.findByCustomerId(jwtUtil.getLoggedInUser().getId());
        for(CartItem cartItem : cart.getItems()) {
            cartItemRepository.deleteById(cartItem.getId());
        }
    }
}
