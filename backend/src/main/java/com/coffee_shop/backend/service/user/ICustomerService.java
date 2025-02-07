package com.coffee_shop.backend.service.user;

import com.coffee_shop.backend.dto.user.CustomerDto;
import com.coffee_shop.backend.dto.user.DeliveryInfoDto;
import com.coffee_shop.backend.entity.Customer;

public interface ICustomerService {
    Customer updateDeliveryInfo(DeliveryInfoDto deliveryInfoDto);
    CustomerDto customerInfo();
}
