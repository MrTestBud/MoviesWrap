package com.lakshya.moviewrap.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.lakshya.moviewrap.model.LoginRequest;
import com.lakshya.moviewrap.model.RegisterRequest;
import com.lakshya.moviewrap.model.User;
import com.lakshya.moviewrap.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    // Constructor for AuthService
    public AuthService(UserRepository userRepository,
                    BCryptPasswordEncoder passwordEncoder,
                    JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    // Method to register a new user
    public User register(RegisterRequest request) {

        if (userRepository.existsByUsername(request.getUsername())) {
            return null;
        }

        User user = new User();

        user.setUsername(request.getUsername());

        String hashedPassword =
                passwordEncoder.encode(request.getPassword());

        user.setPassword(hashedPassword);

        return userRepository.save(user);
    }

    // Method to login a user and generate a JWT token
    public String login(LoginRequest request) {

        User user = userRepository.findByUsername(request.getUsername())
                .orElse(null);

        if (user == null) {
            return null;
        }

        boolean passwordMatches =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword()
                );

        if (!passwordMatches) {
            return null;
        }

        return jwtService.generateToken(user.getUsername());
    }
}

