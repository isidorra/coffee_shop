package com.coffee_shop.backend.service.product;

import com.coffee_shop.backend.dto.product.CreateProductDto;
import com.coffee_shop.backend.entity.Product;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface IProductService {
    Product create(CreateProductDto createProductDto, String image);
    List<Product> findAll();
    Optional<Product> findById(Long id);
    List<Product> findByCategoryId(Long categoryId);
    String saveFile(MultipartFile file);
    Product setProductAsFeatured(Long id);
    Product findFeaturedProduct();
    List<Product> search(String query);
    List<Product> findRandomProducts(Long id);
    Product refillStockQuantity(Long productId, int refillQuantity);
}
