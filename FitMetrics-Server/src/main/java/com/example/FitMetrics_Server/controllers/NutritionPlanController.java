package com.example.FitMetrics_Server.controllers;

import com.example.FitMetrics_Server.dtos.CustomizePlanRequest;
import com.example.FitMetrics_Server.entities.NutritionPlans;
import com.example.FitMetrics_Server.services.NutritionPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/nutrition-plans")
public class NutritionPlanController {

    private final NutritionPlanService nutritionPlanService;

    @Autowired
    public NutritionPlanController(NutritionPlanService nutritionPlanService) {
        this.nutritionPlanService = nutritionPlanService;
    }

    @GetMapping("/user/{userId}")
    public List<NutritionPlans> getUserPlans(@PathVariable Long userId) {
        return nutritionPlanService.getPlansByUserId(userId);
    }

    @PostMapping("/duplicate")
    public NutritionPlans duplicatePlan(
            @RequestParam Long planId,
            @RequestParam Long newUserId) {
        return nutritionPlanService.duplicatePlan(planId, newUserId);
    }

    @PutMapping("/{planId}/customize")
    public NutritionPlans customizePlan(
            @PathVariable Long planId,
            @RequestBody CustomizePlanRequest request) {
        return nutritionPlanService.customizePlan(
                planId,
                request.getProtein(),
                request.getCarbohydrates(),
                request.getCalories()
        );
    }
}
