package com.coffee_shop.backend.controller;

import com.coffee_shop.backend.dto.analytics.AnalyticsDto;
import com.coffee_shop.backend.service.analytics.IAnalyticsService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {
    @Autowired
    private IAnalyticsService analyticsService;

    @GetMapping
    public ResponseEntity<?> findAnalytics() {
        AnalyticsDto analyticsDto = new AnalyticsDto();
        analyticsDto.setNumberOfProducts(analyticsService.countProducts());
        analyticsDto.setNumberOfCategories(analyticsService.countCategories());
        analyticsDto.setNumberOfCustomers(analyticsService.countCustomers());
        analyticsDto.setNumberOfDeliveredOrders(analyticsService.countDeliveredOrders());
        analyticsDto.setNumberOfTodayOrders(analyticsService.countTodayOrders());
        analyticsDto.setNumberOfMonthOrders(analyticsService.countMonthOrders());
        analyticsDto.setTodayRevenue(analyticsService.findTodayRevenue());
        analyticsDto.setMonthRevenue(analyticsService.findMonthRevenue());
        analyticsDto.setSoldItems(analyticsService.calculateSoldItems());
        analyticsDto.setSoldItemsThisMonth(analyticsService.calculateMonthSoldItems());
        return ResponseEntity.status(200).body(analyticsDto);
    }

    @GetMapping("/{year}")
    public ResponseEntity<?> calculateYearlyReport(@PathVariable int year) {
        return ResponseEntity.status(200).body(analyticsService.calculateYearlyRevenueAndDeliveredOrdersReport(year));
    }


}
