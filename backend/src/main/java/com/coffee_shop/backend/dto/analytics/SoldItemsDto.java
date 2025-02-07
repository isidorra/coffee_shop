package com.coffee_shop.backend.dto.analytics;

import com.coffee_shop.backend.dto.product.ProductDto;

public class SoldItemsDto {
    private ProductDto productDto;
    private int soldQuantity;

    public ProductDto getProductDto() {
        return productDto;
    }

    public void setProductDto(ProductDto productDto) {
        this.productDto = productDto;
    }

    public int getSoldQuantity() {
        return soldQuantity;
    }

    public void setSoldQuantity(int soldQuantity) {
        this.soldQuantity = soldQuantity;
    }
}
