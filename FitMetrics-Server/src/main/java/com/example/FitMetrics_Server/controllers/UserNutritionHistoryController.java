package com.example.FitMetrics_Server.controllers;

import com.example.FitMetrics_Server.entities.FoodData;
import com.example.FitMetrics_Server.entities.UserNutritionHistory;
import com.example.FitMetrics_Server.services.UserNutritionHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/nutrition")
public class UserNutritionHistoryController {
    @Autowired
    private UserNutritionHistoryService userNutritionHistoryService;

    @PostMapping("/add-food/{userId}")
    public ResponseEntity<?> addFoodToHistory(
            @PathVariable long userId,
            @RequestBody Map<String, Object> foodJson
    ) {
        try {
            // Convert JSON to FoodData
            FoodData foodData = userNutritionHistoryService.convertJsonToFoodData(foodJson);

            // Add to nutrition history
            UserNutritionHistory savedHistory = userNutritionHistoryService.addFoodToHistory(userId, foodData);

            return ResponseEntity.ok(savedHistory);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error adding food to history: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete-food/{userId}")
    public ResponseEntity<?> deleteFoodEntryForToday(
            @PathVariable Long userId,
            @RequestParam Long foodId
    ) {
        try {
            userNutritionHistoryService.deleteOneFoodEntryForToday(userId, foodId);
            return ResponseEntity.ok("Food entry deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}