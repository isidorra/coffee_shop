package com.coffee_shop.backend.controller;

import com.coffee_shop.backend.dto.user.DeliveryInfoDto;
import com.coffee_shop.backend.entity.Customer;
import com.coffee_shop.backend.service.user.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {
    @Autowired
    private ICustomerService customerService;

    @GetMapping
    public ResponseEntity<?> customerInfo() {
        return ResponseEntity.status(200).body(customerService.customerInfo());
    }

    @PutMapping
    public ResponseEntity<?> updateDeliveryInfo(@RequestBody DeliveryInfoDto deliveryInfoDto) {
        if(deliveryInfoDto.getAddress().isEmpty() || deliveryInfoDto.getCity().isEmpty() || deliveryInfoDto.getCountry().isEmpty() || deliveryInfoDto.getZipCode().isEmpty() || deliveryInfoDto.getPhoneNumber().isEmpty())
            return ResponseEntity.status(400).body("All fields are required.");

        Customer customer = customerService.updateDeliveryInfo(deliveryInfoDto);
        if(customer == null)
            return ResponseEntity.status(500).body("Delivery info not updated.");

        Map<String, Object> response = Map.of(
                "user", customer.getUserDto(),
                "deliveryInfo", customer.getDeliveryInfo()
        );
        return ResponseEntity.status(200).body(response);
    }
}
