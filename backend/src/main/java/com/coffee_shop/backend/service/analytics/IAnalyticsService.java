package com.coffee_shop.backend.service.analytics;

import com.coffee_shop.backend.dto.analytics.SoldItemsDto;
import com.coffee_shop.backend.dto.analytics.YearlyReportDto;

import java.util.HashMap;
import java.util.List;

public interface IAnalyticsService {
    long countProducts();
    long countCategories();
    long countCustomers();
    long countDeliveredOrders();
    long countTodayOrders();
    long countMonthOrders();
    double findTodayRevenue();
    double findMonthRevenue();
    List<SoldItemsDto> calculateSoldItems();
    List<SoldItemsDto> calculateMonthSoldItems();
    YearlyReportDto calculateYearlyRevenueAndDeliveredOrdersReport(int year);
}
