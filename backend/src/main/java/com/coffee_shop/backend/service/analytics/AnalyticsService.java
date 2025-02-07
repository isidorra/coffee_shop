package com.coffee_shop.backend.service.analytics;

import com.coffee_shop.backend.dto.analytics.MonthlyReportDto;
import com.coffee_shop.backend.dto.analytics.SoldItemsDto;
import com.coffee_shop.backend.dto.analytics.YearlyReportDto;
import com.coffee_shop.backend.dto.product.ProductDto;
import com.coffee_shop.backend.entity.Order;
import com.coffee_shop.backend.entity.OrderItem;
import com.coffee_shop.backend.entity.Product;
import com.coffee_shop.backend.enums.OrderStatus;
import com.coffee_shop.backend.repository.ICategoryRepository;
import com.coffee_shop.backend.repository.ICustomerRepository;
import com.coffee_shop.backend.repository.IOrderRepository;
import com.coffee_shop.backend.repository.IProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Month;
import java.time.Year;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class AnalyticsService implements IAnalyticsService {
    @Autowired
    private IProductRepository productRepository;
    @Autowired
    private ICategoryRepository categoryRepository;
    @Autowired
    private ICustomerRepository customerRepository;
    @Autowired
    private IOrderRepository orderRepository;

    @Override
    public long countProducts() {
        return productRepository.count();
    }

    @Override
    public long countCategories() {
        return categoryRepository.count();
    }

    @Override
    public long countCustomers() {
        return customerRepository.count();
    }

    @Override
    public long countDeliveredOrders() {
        return orderRepository.countByStatus(OrderStatus.DELIVERED);
    }

    @Override
    public long countTodayOrders() {
        long sum = 0;
        List<Order> todayOrders = orderRepository.findByCreatedAt(LocalDate.now());
        for(Order order : todayOrders) {
            if(!order.getStatus().equals(OrderStatus.CANCELED))
                sum++;
        }

        return sum;
    }

    @Override
    public long countMonthOrders() {
        long sum = 0;
        LocalDate firstMonthDate = LocalDate.now().withDayOfMonth(1);
        LocalDate lastMonthDate = YearMonth.now().atEndOfMonth();
        List<Order> orders = orderRepository.findByCreatedAtBetween(firstMonthDate, lastMonthDate);
        for(Order order : orders) {
            if(!order.getStatus().equals(OrderStatus.CANCELED))
                sum++;
        }

        return sum;
    }

    @Override
    public double findTodayRevenue() {
        double sum = 0;
        List<Order> todayOrders = orderRepository.findByCreatedAt(LocalDate.now());
        for(Order order : todayOrders) {
            if(order.getStatus().equals(OrderStatus.DELIVERED))
                sum += (order.getTotalAmount() - order.getShippingPrice());
        }

        return sum;
    }

    @Override
    public double findMonthRevenue() {
        double sum = 0;
        LocalDate firstMonthDate = LocalDate.now().withDayOfMonth(1);
        LocalDate lastMonthDate = YearMonth.now().atEndOfMonth();
        List<Order> orders = orderRepository.findByCreatedAtBetween(firstMonthDate, lastMonthDate);
        for(Order order : orders) {
            if(order.getStatus().equals(OrderStatus.DELIVERED))
                sum += (order.getTotalAmount() - order.getShippingPrice());
        }

        return sum;
    }

    @Override
    public List<SoldItemsDto> calculateSoldItems() {
        List<SoldItemsDto> soldItemsDtos  = new ArrayList<>();
        List<Product> products = productRepository.findAll();
        List<Order> orders = orderRepository.findByStatus(OrderStatus.DELIVERED);

        for (Product product : products) {
            ProductDto productDto = new ProductDto(product.getId(), product.getName(), product.getImage());
            SoldItemsDto soldItemDto = new SoldItemsDto();
            soldItemDto.setProductDto(productDto);
            soldItemDto.setSoldQuantity(0);
            soldItemsDtos.add(soldItemDto);
        }

        for(Order order : orders) {
            for(OrderItem orderItem : order.getItems()) {
                for(SoldItemsDto soldItemsDto : soldItemsDtos) {
                    if(orderItem.getProduct().getId().equals(soldItemsDto.getProductDto().getId())) {
                        soldItemsDto.setSoldQuantity(soldItemsDto.getSoldQuantity() + orderItem.getQuantity());
                    }
                }
            }
        }

        return soldItemsDtos;
    }

    @Override
    public List<SoldItemsDto> calculateMonthSoldItems() {
        List<SoldItemsDto> soldItemsDtos  = new ArrayList<>();
        List<Product> products = productRepository.findAll();

        LocalDate firstMonthDate = LocalDate.now().withDayOfMonth(1);
        LocalDate lastMonthDate = YearMonth.now().atEndOfMonth();
        List<Order> orders = orderRepository.findByCreatedAtBetweenAndStatus(firstMonthDate, lastMonthDate, OrderStatus.DELIVERED);

        for (Product product : products) {
            ProductDto productDto = new ProductDto(product.getId(), product.getName(), product.getImage());
            SoldItemsDto soldItemDto = new SoldItemsDto();
            soldItemDto.setProductDto(productDto);
            soldItemDto.setSoldQuantity(0);
            soldItemsDtos.add(soldItemDto);
        }

        for(Order order : orders) {
            for(OrderItem orderItem : order.getItems()) {
                for(SoldItemsDto soldItemsDto : soldItemsDtos) {
                    if(orderItem.getProduct().getId().equals(soldItemsDto.getProductDto().getId())) {
                        soldItemsDto.setSoldQuantity(soldItemsDto.getSoldQuantity() + orderItem.getQuantity());
                    }
                }
            }
        }

        return soldItemsDtos;
    }

    @Override
    public YearlyReportDto calculateYearlyRevenueAndDeliveredOrdersReport(int year) {
        List<MonthlyReportDto> monthlyReportDtos = new ArrayList<>();
        YearlyReportDto yearlyReportDto = new YearlyReportDto();

        for(int i=1; i<=12; i++) {
            MonthlyReportDto monthlyReportDto = new MonthlyReportDto();
            LocalDate startOfMonth = Year.of(year).atMonth(i).atDay(1);
            LocalDate endOfMonth = Year.of(year).atMonth(i).atEndOfMonth();
            List<Order> monthlyOrders = orderRepository.findByCreatedAtBetweenAndStatus(startOfMonth, endOfMonth, OrderStatus.DELIVERED);

            double totalRevenue = 0;
            int numberOfOrders = monthlyOrders.size();

            for(Order order : monthlyOrders) {
                totalRevenue += (order.getTotalAmount() - order.getShippingPrice());
            }

            monthlyReportDto.setMonth(i);
            monthlyReportDto.setTotalRevenue(totalRevenue);
            monthlyReportDto.setNumberOfOrders(numberOfOrders);
            monthlyReportDtos.add(monthlyReportDto);
        }

        yearlyReportDto.setMonthlyReports(monthlyReportDtos);
        return yearlyReportDto;
    }


}


