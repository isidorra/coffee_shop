package com.coffee_shop.backend.service.order;

import com.coffee_shop.backend.entity.ShippingPrice;
import com.coffee_shop.backend.repository.IShippingPriceRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShippingPriceService implements IShippingPriceService{
    @Autowired
    private IShippingPriceRepository shippingPriceRepository;

    @PostConstruct
    public void createShippingPricing() {
        List<ShippingPrice> shippingPrices = shippingPriceRepository.findAll();
        if(shippingPrices.isEmpty()) {
            ShippingPrice shippingPrice = new ShippingPrice();
            shippingPrice.setPrice(0);
            shippingPriceRepository.save(shippingPrice);
            System.out.println("Shipping price created.");
        } else {
            System.out.println("Shipping price already exists.");
        }
    }

    @Override
    public ShippingPrice update(double price) {
        ShippingPrice shippingPrice = shippingPriceRepository.findAll().get(0);
        shippingPrice.setPrice(price);
        return shippingPriceRepository.save(shippingPrice);
    }

    @Override
    public ShippingPrice find() {
        List<ShippingPrice> shippingPrices = shippingPriceRepository.findAll();
        if (!shippingPrices.isEmpty()) {
            return shippingPrices.get(0);
        }
        return null;
    }
}
