package com.lakshya.moviewrap.controller;

import com.lakshya.moviewrap.model.RegisterRequest;
import com.lakshya.moviewrap.model.User;
import com.lakshya.moviewrap.service.AuthService;
import com.lakshya.moviewrap.model.AuthResponse;
import com.lakshya.moviewrap.model.LoginRequest;
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

        AuthResponse response = new AuthResponse(
                user.getId(),
                user.getUsername()
        );

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request) {

        String token = authService.login(request);

        if (token == null) {
            return ResponseEntity
                    .status(401)
                    .body("Invalid username or password");
        }

        return ResponseEntity.ok(token);
    }
}