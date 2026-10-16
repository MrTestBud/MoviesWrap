package com.lakshya.moviewrap.controller;

import com.lakshya.moviewrap.model.RegisterRequest;
import com.lakshya.moviewrap.model.User;
import com.lakshya.moviewrap.service.AuthService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody RegisterRequest request) {

        User user = authService.register(request);

        if (user == null) {
            return ResponseEntity.badRequest()
                    .body("Username already exists");
        }

        return ResponseEntity.ok(user);
    }
}