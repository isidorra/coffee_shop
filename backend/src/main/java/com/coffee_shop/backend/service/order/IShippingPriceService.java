package com.coffee_shop.backend.service.order;

import com.coffee_shop.backend.entity.ShippingPrice;

public interface IShippingPriceService {
    ShippingPrice update(double price);
    ShippingPrice find();
}
