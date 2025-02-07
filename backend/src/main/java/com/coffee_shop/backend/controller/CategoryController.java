package com.coffee_shop.backend.controller;

import com.coffee_shop.backend.dto.product.CreateCategoryDto;
import com.coffee_shop.backend.entity.Category;
import com.coffee_shop.backend.service.product.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    @Autowired
    private ICategoryService categoryService;

    @GetMapping
    public ResponseEntity<?> findAll() {
        return ResponseEntity.status(200).body(categoryService.findAll());
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> create(@RequestBody CreateCategoryDto createCategoryDto) {
        if(createCategoryDto.getName().isEmpty())
            return ResponseEntity.status(400).body("All fields are required.");

        Category category = categoryService.create(createCategoryDto);
        if(category == null)
            return ResponseEntity.status(500).body("Category not created.");

        return ResponseEntity.status(201).body(category);
    }
}
