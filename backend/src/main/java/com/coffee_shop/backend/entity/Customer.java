package com.coffee_shop.backend.entity;

import com.coffee_shop.backend.dto.user.CustomerDto;
import com.coffee_shop.backend.dto.user.DeliveryInfoDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Customer extends User{
    private String address;
    private String city;
    private String country;
    private String phoneNumber;
    private String zipCode;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "cart_id")
    private Cart cart;

    @OneToMany(mappedBy = "customer")
    @JsonIgnore
    private List<Order> orders;

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

    public DeliveryInfoDto getDeliveryInfo() {
        DeliveryInfoDto deliveryInfoDto = new DeliveryInfoDto();
        deliveryInfoDto.setAddress(address);
        deliveryInfoDto.setCity(city);
        deliveryInfoDto.setCountry(country);
        deliveryInfoDto.setZipCode(zipCode);
        deliveryInfoDto.setPhoneNumber(phoneNumber);
        return deliveryInfoDto;
    }

    public CustomerDto getCustomerDto() {
        CustomerDto customerDto = new CustomerDto();
        customerDto.setId(super.getId());
        customerDto.setFirstName(super.getFirstName());
        customerDto.setLastName(super.getLastName());
        customerDto.setEmail(super.getEmail());
        customerDto.setAddress(address);
        customerDto.setCity(city);
        customerDto.setCountry(country);
        customerDto.setPhoneNumber(phoneNumber);
        customerDto.setZipCode(zipCode);
        return customerDto;
    }
}
