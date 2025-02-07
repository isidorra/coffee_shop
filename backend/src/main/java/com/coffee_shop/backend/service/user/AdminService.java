package com.coffee_shop.backend.service.user;

import com.coffee_shop.backend.dto.user.UserDto;
import com.coffee_shop.backend.repository.IAdminRepository;
import com.coffee_shop.backend.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService implements IAdminService{
    @Autowired
    private IAdminRepository adminRepository;
    @Autowired
    private JwtUtil jwtUtil;


    @Override
    public UserDto adminInfo() {
        return adminRepository.findById(jwtUtil.getLoggedInUser().getId()).get().getUserDto();
    }
}
