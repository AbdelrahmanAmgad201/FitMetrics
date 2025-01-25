package com.example.FitMetrics_Server.controllers;

import com.example.FitMetrics_Server.dtos.ExerciseHistoryDTO;
import com.example.FitMetrics_Server.entities.User;
import com.example.FitMetrics_Server.repositories.UserRepository;
import com.example.FitMetrics_Server.services.AuthService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;
    @Autowired
    private AuthService authService;
    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("")
    public User getUserDetails(@RequestHeader("Authorization") String token) {
        Long userId = extractUserIdFromToken(token);
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
    }

    private Long extractUserIdFromToken(String token) {
        token = token.replace("Bearer ", "");
        Claims claims = authService.parseToken(token);
        return Long.parseLong(claims.getId());
    }
}
