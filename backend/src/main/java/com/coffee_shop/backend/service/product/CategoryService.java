package com.coffee_shop.backend.service.product;

import com.coffee_shop.backend.dto.product.CreateCategoryDto;
import com.coffee_shop.backend.entity.Category;
import com.coffee_shop.backend.repository.ICategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService implements ICategoryService {
    @Autowired
    private ICategoryRepository categoryRepository;

    @Override
    public Category create(CreateCategoryDto createCategoryDto) {
        Category category = new Category();
        category.setName(createCategoryDto.getName());
        return categoryRepository.save(category);
    }

    @Override
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Optional<Category> findById(Long id) {
        return categoryRepository.findById(id);
    }
}
