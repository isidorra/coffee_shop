package com.coffee_shop.backend.controller;

import com.coffee_shop.backend.service.user.IAdminService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private IAdminService adminService;

    @GetMapping
    public ResponseEntity<?> adminInfo() {
        return ResponseEntity.status(200).body(adminService.adminInfo());
    }
}
