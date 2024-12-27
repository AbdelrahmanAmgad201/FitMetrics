package com.example.FitMetrics_Server.controllers;

import com.example.FitMetrics_Server.dtos.CustomizePlanRequest;
import com.example.FitMetrics_Server.entities.NutritionPlans;
import com.example.FitMetrics_Server.services.AuthService;
import com.example.FitMetrics_Server.services.NutritionPlanService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/nutrition-plans")
public class NutritionPlanController {

    private final NutritionPlanService nutritionPlanService;

    @Autowired
    private  AuthService authService;

    @Autowired
    public NutritionPlanController(
            NutritionPlanService nutritionPlanService) {
        this.nutritionPlanService = nutritionPlanService;
    }

    @GetMapping("/all")
    public List<NutritionPlans> getBuiltInPlans() {
        // Keep this as is since it returns built-in plans (userId: 1)
        return nutritionPlanService.getPlansByUserId(1L);
    }

    @GetMapping("/user")
    public List<NutritionPlans> getUserPlans(
            @RequestHeader("Authorization") String token) {
        Long userId = extractUserIdFromToken(token);
        return nutritionPlanService.getPlansByUserId(userId);
    }

    @PostMapping("/duplicate")
    public NutritionPlans duplicatePlan(
            @RequestHeader("Authorization") String token,
            @RequestParam Long planId) {
        Long userId = extractUserIdFromToken(token);
        return nutritionPlanService.duplicatePlan(planId, userId);
    }

    @PutMapping("/{planId}/customize")
    public NutritionPlans customizePlan(
            @RequestHeader("Authorization") String token,
            @PathVariable Long planId,
            @RequestBody CustomizePlanRequest request) {
        // Note: We add the token here to ensure the user has permission to modify this plan
        Long userId = extractUserIdFromToken(token);
        return nutritionPlanService.customizePlan(
                planId,
                request.getProtein(),
                request.getCarbohydrates(),
                request.getCalories()
        );
    }

    private Long extractUserIdFromToken(String token) {
        token = token.replace("Bearer ", "");
        Claims claims = authService.parseToken(token);
        return Long.parseLong(claims.getId());
    }
}