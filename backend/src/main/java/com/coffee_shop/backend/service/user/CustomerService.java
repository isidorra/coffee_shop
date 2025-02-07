package com.coffee_shop.backend.service.user;

import com.coffee_shop.backend.dto.user.CustomerDto;
import com.coffee_shop.backend.dto.user.DeliveryInfoDto;
import com.coffee_shop.backend.entity.Customer;
import com.coffee_shop.backend.repository.ICustomerRepository;
import com.coffee_shop.backend.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService implements ICustomerService {
    @Autowired
    private ICustomerRepository customerRepository;
    @Autowired
    private JwtUtil jwtUtil;


    @Override
    public Customer updateDeliveryInfo(DeliveryInfoDto deliveryInfoDto) {
        Customer customer = customerRepository.findById(jwtUtil.getLoggedInUser().getId()).get();
        customer.setAddress(deliveryInfoDto.getAddress());
        customer.setCity(deliveryInfoDto.getCity());
        customer.setCountry(deliveryInfoDto.getCountry());
        customer.setZipCode(deliveryInfoDto.getZipCode());
        customer.setPhoneNumber(deliveryInfoDto.getPhoneNumber());
        return customerRepository.save(customer);
    }

    @Override
    public CustomerDto customerInfo() {
        return customerRepository.findById(jwtUtil.getLoggedInUser().getId()).get().getCustomerDto();
    }
}
