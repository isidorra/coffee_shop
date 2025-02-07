package com.coffee_shop.backend.controller;

import com.coffee_shop.backend.dto.auth.AuthResponse;
import com.coffee_shop.backend.dto.auth.LoginRequest;
import com.coffee_shop.backend.dto.auth.RegisterRequest;
import com.coffee_shop.backend.dto.user.UserDto;
import com.coffee_shop.backend.entity.User;
import com.coffee_shop.backend.repository.IUserRepository;
import com.coffee_shop.backend.service.auth.IAuthService;
import com.coffee_shop.backend.service.user.IUserService;
import com.coffee_shop.backend.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private IAuthService authService;
    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private IUserService userService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        if(registerRequest.getEmail().isEmpty() || registerRequest.getFirstName().isEmpty() || registerRequest.getLastName().isEmpty() || registerRequest.getPassword().isEmpty() || registerRequest.getConfirmPassword().isEmpty())
            return ResponseEntity.status(400).body("All fields are required.");

        if(!authService.isEmailFormatValid(registerRequest.getEmail()))
            return ResponseEntity.status(400).body("Invalid email format.");

        if(authService.isEmailTaken(registerRequest.getEmail()))
            return ResponseEntity.status(400).body("Email is taken.");

        if(registerRequest.getPassword().length() < 7)
            return ResponseEntity.status(400).body("Password must be at least 7 characters long.");

        if(!registerRequest.getPassword().equals(registerRequest.getConfirmPassword()))
            return ResponseEntity.status(400).body("Passwords must match.");

        UserDto created = authService.register(registerRequest);
        if(created == null)
            return ResponseEntity.status(500).body("Error creating user.");

        final UserDetails userDetails = userService.userDetailsService().loadUserByUsername(created.getEmail());
        Optional<User> optionalUser = userRepository.findByEmail(created.getEmail());
        final String jwtToken = jwtUtil.generateToken(userDetails);

        AuthResponse authResponse = new AuthResponse();
        if(optionalUser.isPresent()) {
            authResponse.setJwt(jwtToken);
            authResponse.setId(optionalUser.get().getId());
            authResponse.setRole(optionalUser.get().getRole());
            authResponse.setFirstName(optionalUser.get().getFirstName());
        }

        return ResponseEntity.status(201).body(authResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        } catch (BadCredentialsException badCredentialsException) {
            return ResponseEntity.status(400).body("Incorrect email or password");
        }

        final UserDetails userDetails = userService.userDetailsService().loadUserByUsername(loginRequest.getEmail());
        Optional<User> optionalUser = userRepository.findByEmail(loginRequest.getEmail());
        final String jwtToken = jwtUtil.generateToken(userDetails);

        AuthResponse authResponse = new AuthResponse();
        if(optionalUser.isPresent()) {
            authResponse.setJwt(jwtToken);
            authResponse.setId(optionalUser.get().getId());
            authResponse.setRole(optionalUser.get().getRole());
            authResponse.setFirstName(optionalUser.get().getFirstName());
        }

        return ResponseEntity.status(200).body(authResponse);

    }
}
