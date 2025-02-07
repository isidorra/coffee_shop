package com.coffee_shop.backend.service.product;

import com.coffee_shop.backend.dto.product.CreateProductDto;
import com.coffee_shop.backend.entity.Category;
import com.coffee_shop.backend.entity.Product;
import com.coffee_shop.backend.repository.ICategoryRepository;
import com.coffee_shop.backend.repository.IProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.*;

import org.springframework.beans.factory.annotation.Value;
import java.nio.file.Files;
import java.io.IOException;
import java.io.File;
import java.util.stream.Collectors;

@Service
public class ProductService implements IProductService{
    @Autowired
    private IProductRepository productRepository;
    @Autowired
    private ICategoryRepository categoryRepository;
    @Value("${file.upload-dir}")
    private String uploadDir;

    @Override
    public Product create(CreateProductDto createProductDto, String image) {
        Product product = new Product();
        Category category = categoryRepository.findById(createProductDto.getCategoryId()).get();

        product.setName(createProductDto.getName());
        product.setDescription(createProductDto.getDescription());
        product.setFeatured(false);
        product.setPrice(createProductDto.getPrice());
        product.setStockQuantity(createProductDto.getStockQuantity());
        product.setImage(image);
        product.setCategory(category);
        product.setCreatedAt(LocalDate.now());

        return productRepository.save(product);
    }

    @Override
    public List<Product> findAll() {
        return productRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    @Override
    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }

    @Override
    public List<Product> findByCategoryId(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

    @Override
    public String saveFile(MultipartFile file) {
        String fileName = System.currentTimeMillis() + "-" + file.getOriginalFilename();
        Path targetLocation = Paths.get(uploadDir + File.separator + fileName);
        try {
            Files.copy(file.getInputStream(), targetLocation);
        } catch (IOException ex) {
            throw new RuntimeException("Could not save file " + fileName + ". Please try again.", ex);
        }
        return fileName;
    }

    @Override
    public Product setProductAsFeatured(Long id) {
        for(Product p : productRepository.findAll()) {
            if(p.isFeatured())
                p.setFeatured(false);
        }

        Optional<Product> product = productRepository.findById(id);
        product.get().setFeatured(true);
        return productRepository.save(product.get());
    }

    @Override
    public Product findFeaturedProduct() {
        for(Product product : productRepository.findAll()) {
            if(product.isFeatured())
                return product;
        }

        return null;
    }

    @Override
    public List<Product> search(String query) {
        return productRepository.search(query);
    }

    @Override
    public List<Product> findRandomProducts(Long id) {
        List<Product> randomProducts = new ArrayList<>();
        List<Category> categories = categoryRepository.findAll();

        for(Category category : categories) {
            List<Product> products = productRepository.findByCategoryId(category.getId())
                    .stream()
                    .filter(product -> !product.getId().equals(id))
                    .toList();

            if(!products.isEmpty()) {
                Product randomProduct = products.get(new Random().nextInt(products.size()));
                randomProducts.add(randomProduct);
            }
        }

        return randomProducts;
    }

    @Override
    public Product refillStockQuantity(Long productId, int refillQuantity) {
        Optional<Product> product = productRepository.findById(productId);
        product.get().setStockQuantity(product.get().getStockQuantity() + refillQuantity);
        return productRepository.save(product.get());
    }


}
