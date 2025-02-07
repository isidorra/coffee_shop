package com.coffee_shop.backend.repository;

import com.coffee_shop.backend.entity.Product;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryId(Long categoryId);
    List<Product> findAll(Sort sort);

    @Query("""
    SELECT p 
    FROM Product p, Category c 
    WHERE p.category.id = c.id 
      AND (LOWER(p.name) LIKE LOWER(CONCAT('%', :query, '%')) 
        OR LOWER(p.description) LIKE LOWER(CONCAT('%', :query, '%')) 
        OR LOWER(c.name) LIKE LOWER(CONCAT('%', :query, '%')))
    """)
    List<Product> search(@Param("query") String query);


}
