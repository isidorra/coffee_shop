package com.coffee_shop.backend.repository;

import com.coffee_shop.backend.entity.User;
import com.coffee_shop.backend.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByRole(UserRole role);
}
