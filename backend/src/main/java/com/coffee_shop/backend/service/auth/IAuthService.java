package com.coffee_shop.backend.service.auth;

import com.coffee_shop.backend.dto.auth.RegisterRequest;
import com.coffee_shop.backend.dto.user.UserDto;

public interface IAuthService {
    UserDto register(RegisterRequest registerRequest);
    boolean isEmailTaken(String email);
    boolean isEmailFormatValid(String email);
}
