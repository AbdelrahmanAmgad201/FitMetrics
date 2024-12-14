package com.example.FitMetrics_Server.controllers;

import com.example.FitMetrics_Server.entities.FoodData;
import com.example.FitMetrics_Server.entities.UserNutritionHistory;
import com.example.FitMetrics_Server.services.AuthService;
import com.example.FitMetrics_Server.services.UserNutritionHistoryService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/nutrition")
public class UserNutritionHistoryController {
    @Autowired
    private UserNutritionHistoryService userNutritionHistoryService;

    @Autowired
    private AuthService authService;

    @PostMapping("/add-food")
    public ResponseEntity<?> addFoodToHistory(
            @RequestHeader("Authorization") String token,
            @RequestBody Map<String, Object> foodJson
    ) {
        try {
            // Extract user ID from JWT
            token = token.replace("Bearer ", "");
            Claims claims = authService.parseToken(token);
            Long userId = Long.parseLong(claims.getId());

            // Convert JSON to FoodData
            FoodData foodData = userNutritionHistoryService.convertJsonToFoodData(foodJson);

            // Add to nutrition history
            UserNutritionHistory savedHistory = userNutritionHistoryService.addFoodToHistory(userId, foodData);

            return ResponseEntity.ok(savedHistory);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error adding food to history: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete-food")
    public ResponseEntity<?> deleteFoodEntryForToday(
            @RequestHeader("Authorization") String token,
            @RequestParam Long foodId
    ) {
        try {
            // Extract user ID from JWT
            token = token.replace("Bearer ", "");
            Claims claims = authService.parseToken(token);
            Long userId = Long.parseLong(claims.getId());

            userNutritionHistoryService.deleteOneFoodEntryForToday(userId, foodId);
            return ResponseEntity.ok("Food entry deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}