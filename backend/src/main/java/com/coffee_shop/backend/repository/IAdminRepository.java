package com.coffee_shop.backend.repository;

import com.coffee_shop.backend.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IAdminRepository extends JpaRepository<Admin, Long> {
}
