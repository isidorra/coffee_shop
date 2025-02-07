package com.coffee_shop.backend.dto.analytics;

import java.util.HashMap;
import java.util.List;

public class AnalyticsDto {
    private long numberOfProducts;
    private long numberOfCategories;
    private long numberOfCustomers;
    private long numberOfDeliveredOrders;
    private long numberOfTodayOrders;
    private long numberOfMonthOrders;
    private double todayRevenue;
    private double monthRevenue;
    private List<SoldItemsDto> soldItems;
    private List<SoldItemsDto> soldItemsThisMonth;

    public long getNumberOfProducts() {
        return numberOfProducts;
    }

    public void setNumberOfProducts(long numberOfProducts) {
        this.numberOfProducts = numberOfProducts;
    }

    public long getNumberOfCategories() {
        return numberOfCategories;
    }

    public void setNumberOfCategories(long numberOfCategories) {
        this.numberOfCategories = numberOfCategories;
    }

    public long getNumberOfCustomers() {
        return numberOfCustomers;
    }

    public void setNumberOfCustomers(long numberOfCustomers) {
        this.numberOfCustomers = numberOfCustomers;
    }

    public long getNumberOfTodayOrders() {
        return numberOfTodayOrders;
    }

    public void setNumberOfTodayOrders(long numberOfTodayOrders) {
        this.numberOfTodayOrders = numberOfTodayOrders;
    }

    public long getNumberOfMonthOrders() {
        return numberOfMonthOrders;
    }

    public void setNumberOfMonthOrders(long numberOfMonthOrders) {
        this.numberOfMonthOrders = numberOfMonthOrders;
    }

    public long getNumberOfDeliveredOrders() {
        return numberOfDeliveredOrders;
    }

    public void setNumberOfDeliveredOrders(long numberOfDeliveredOrders) {
        this.numberOfDeliveredOrders = numberOfDeliveredOrders;
    }

    public double getTodayRevenue() {
        return todayRevenue;
    }

    public void setTodayRevenue(double todayRevenue) {
        this.todayRevenue = todayRevenue;
    }

    public double getMonthRevenue() {
        return monthRevenue;
    }

    public void setMonthRevenue(double monthRevenue) {
        this.monthRevenue = monthRevenue;
    }

    public List<SoldItemsDto> getSoldItems() {
        return soldItems;
    }

    public void setSoldItems(List<SoldItemsDto> soldItems) {
        this.soldItems = soldItems;
    }

    public List<SoldItemsDto> getSoldItemsThisMonth() {
        return soldItemsThisMonth;
    }

    public void setSoldItemsThisMonth(List<SoldItemsDto> soldItemsThisMonth) {
        this.soldItemsThisMonth = soldItemsThisMonth;
    }
}
