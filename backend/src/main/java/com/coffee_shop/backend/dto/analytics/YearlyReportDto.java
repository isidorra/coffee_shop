package com.coffee_shop.backend.dto.analytics;

import java.util.List;

public class YearlyReportDto {
    List<MonthlyReportDto> monthlyReports;

    public List<MonthlyReportDto> getMonthlyReports() {
        return monthlyReports;
    }

    public void setMonthlyReports(List<MonthlyReportDto> monthlyReports) {
        this.monthlyReports = monthlyReports;
    }
}
