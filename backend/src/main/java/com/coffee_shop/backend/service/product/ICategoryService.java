package com.coffee_shop.backend.service.product;

import com.coffee_shop.backend.dto.product.CreateCategoryDto;
import com.coffee_shop.backend.entity.Category;

import java.util.List;
import java.util.Optional;

public interface ICategoryService {
    Category create(CreateCategoryDto createCategoryDto);
    List<Category> findAll();
    Optional<Category> findById(Long id);
}
