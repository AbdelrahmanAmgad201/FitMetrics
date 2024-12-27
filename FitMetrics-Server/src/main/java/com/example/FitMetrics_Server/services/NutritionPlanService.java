package com.example.FitMetrics_Server.services;

import com.example.FitMetrics_Server.entities.NutritionPlans;
import com.example.FitMetrics_Server.entities.User;
import com.example.FitMetrics_Server.repositories.NutritionPlanRepository;
import com.example.FitMetrics_Server.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class NutritionPlanService {

    private final NutritionPlanRepository nutritionPlanRepository;
    private final UserRepository userRepository;

    @Autowired
    public NutritionPlanService(NutritionPlanRepository nutritionPlanRepository,
                                UserRepository userRepository) {
        this.nutritionPlanRepository = nutritionPlanRepository;
        this.userRepository = userRepository;
    }

    public List<NutritionPlans> getPlansByUserId(Long userId) {
        return nutritionPlanRepository.findPlansByUserId(userId);
    }

    @Transactional
    public NutritionPlans duplicatePlan(Long planId, Long newUserId) {
        NutritionPlans originalPlan = nutritionPlanRepository.findById(planId)
                .orElseThrow(() -> new RuntimeException("Plan not found"));

        User newUser = userRepository.findById(newUserId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        nutritionPlanRepository.deletePlansByUserId(newUserId);

        NutritionPlans newPlan = new NutritionPlans();
        newPlan.setPlanName(originalPlan.getPlanName());
        newPlan.setDescription(originalPlan.getDescription());
        newPlan.setCreatedBy(newUser);
        newPlan.setCalories(originalPlan.getCalories());
        newPlan.setProtein(originalPlan.getProtein());
        newPlan.setCarbohydrates(originalPlan.getCarbohydrates());

        return nutritionPlanRepository.save(newPlan);
    }

    public NutritionPlans customizePlan(Long planId, Double protein, Double carbohydrates, Double calories) {
        NutritionPlans plan = nutritionPlanRepository.findById(planId)
                .orElseThrow(() -> new RuntimeException("Plan not found"));

        if (protein != null) {
            plan.setProtein(protein);
        }
        if (carbohydrates != null) {
            plan.setCarbohydrates(carbohydrates);
        }
        if (calories != null) {
            plan.setCalories(calories);
        }

        return nutritionPlanRepository.save(plan);
    }
}


