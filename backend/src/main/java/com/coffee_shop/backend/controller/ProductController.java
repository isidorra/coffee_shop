package com.coffee_shop.backend.controller;

import com.coffee_shop.backend.dto.product.CreateProductDto;
import com.coffee_shop.backend.entity.Category;
import com.coffee_shop.backend.entity.Product;
import com.coffee_shop.backend.service.product.ICategoryService;
import com.coffee_shop.backend.service.product.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private IProductService productService;
    @Autowired
    private ICategoryService categoryService;

    @GetMapping
    public ResponseEntity<?> findAll() {
        return ResponseEntity.status(200).body(productService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        Optional<Product> optionalProduct = productService.findById(id);
        if(optionalProduct.isEmpty())
            return ResponseEntity.status(404).body("Product not found.");
        return ResponseEntity.status(200).body(optionalProduct.get());
    }

    @GetMapping("/filter-by-category/{categoryId}")
    public ResponseEntity<?> findByCategory(@PathVariable Long categoryId) {
        if(categoryService.findById(categoryId).isEmpty())
            return ResponseEntity.status(404).body("Category not found.");
        return ResponseEntity.status(200).body(productService.findByCategoryId(categoryId));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> create(@RequestPart("file") MultipartFile file, @RequestPart("createProductDto") CreateProductDto createProductDto) {
        if(createProductDto.getName().isEmpty() || createProductDto.getDescription().isEmpty() || createProductDto.getPrice() <= 0 || createProductDto.getStockQuantity() <= 0 || createProductDto.getCategoryId() == 0)
            return ResponseEntity.status(400).body("Invalid inputs.");

        if (file.isEmpty()) {
            return ResponseEntity.status(400).body("No file uploaded");
        }

        Optional<Category> optionalCategory = categoryService.findById(createProductDto.getCategoryId());
        if(optionalCategory.isEmpty())
            return ResponseEntity.status(404).body("Category not found.");

        String image = productService.saveFile(file);
        Product product = productService.create(createProductDto, image);
        if(product == null)
            return ResponseEntity.status(500).body("Product not created.");
        return ResponseEntity.status(201).body(product);
    }

    @GetMapping("/featured")
    public ResponseEntity<?> findFeaturedProduct() {
        Product product = productService.findFeaturedProduct();
        if(product == null)
            return ResponseEntity.status(404).body("Featured product not found.");
        return ResponseEntity.status(200).body(product);
    }

    @PutMapping("/featured/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> setProductAsFeatured(@PathVariable Long id) {
        if(productService.findById(id).isEmpty())
            return ResponseEntity.status(404).body("Product not found.");

        Product product = productService.setProductAsFeatured(id);
        if(product == null)
            return ResponseEntity.status(500).body("Product not updated.");

        return ResponseEntity.status(200).body(product);
    }

    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam String query) {
        return ResponseEntity.status(200).body(productService.search(query));
    }

    @GetMapping("/random")
    public ResponseEntity<?> findRandomProducts(@RequestParam Long productId) {
        return ResponseEntity.status(200).body(productService.findRandomProducts(productId));
    }

    @PutMapping("/refill/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> refillStockQuantity(@PathVariable Long id, @RequestParam int refillQuantity) {
        Optional<Product> product = productService.findById(id);
        if(product.isEmpty())
            return ResponseEntity.status(404).body("Product not found");
        if(refillQuantity <= 0)
            return ResponseEntity.status(400).body("Invalid input.");

        Product updatedProduct = productService.refillStockQuantity(id, refillQuantity);
        if(updatedProduct == null)
            return ResponseEntity.status(500).body("Action failed.");

        return ResponseEntity.status(200).body(product);
    }

}
