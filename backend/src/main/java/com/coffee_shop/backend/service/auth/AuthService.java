package com.coffee_shop.backend.service.auth;

import com.coffee_shop.backend.dto.auth.RegisterRequest;
import com.coffee_shop.backend.dto.user.UserDto;
import com.coffee_shop.backend.entity.Admin;
import com.coffee_shop.backend.entity.Cart;
import com.coffee_shop.backend.entity.Customer;
import com.coffee_shop.backend.entity.User;
import com.coffee_shop.backend.enums.UserRole;
import com.coffee_shop.backend.repository.ICartRepository;
import com.coffee_shop.backend.repository.IUserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class AuthService implements IAuthService{
    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private ICartRepository cartRepository;

    @Value("${admin.email}")
    private String adminEmail;
    @Value("${admin.password}")
    private String adminPassword;

    @Override
    public UserDto register(RegisterRequest registerRequest) {
        Customer customer = new Customer();
        Cart cart = new Cart();
        customer.setFirstName(registerRequest.getFirstName());
        customer.setLastName(registerRequest.getLastName());
        customer.setEmail(registerRequest.getEmail());
        customer.setPassword(new BCryptPasswordEncoder().encode(registerRequest.getPassword()));
        customer.setRole(UserRole.CUSTOMER);
        customer.setAddress("");

        Customer user = userRepository.save(customer);
        cart.setCustomer(user);
        cartRepository.save(cart);
        user.setCart(cart);
        return userRepository.save(user).getUserDto();
    }

    @Override
    public boolean isEmailTaken(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    @Override
    public boolean isEmailFormatValid(String email) {
        String emailRegex = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";
        Pattern pattern = Pattern.compile(emailRegex);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }

    @PostConstruct
    public void createAdmin() {
        Optional<User> optionalUser = userRepository.findByRole(UserRole.ADMIN);
        if(optionalUser.isEmpty()) {
            Admin admin = new Admin();
            admin.setFirstName("Admin");
            admin.setLastName("Admin");
            admin.setEmail(adminEmail);
            admin.setPassword(new BCryptPasswordEncoder().encode(adminPassword));
            admin.setRole(UserRole.ADMIN);
            userRepository.save(admin);
            System.out.println("Admin created.");
        } else {
            System.out.println("Admin already exists.");
        }
    }
}
