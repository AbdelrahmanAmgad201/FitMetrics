package com.example.FitMetrics_Server.services;

public class FoodSimpleDto {
    private int fdcId;
    private String foodName;
    private NutrientInfo protein;
    private NutrientInfo carbohydrates;
    private NutrientInfo energy;

    // Constructor
    public FoodSimpleDto(int fdcId, String foodName, NutrientInfo protein,
                         NutrientInfo carbohydrates, NutrientInfo energy) {
        this.fdcId = fdcId;
        this.foodName = foodName;
        this.protein = protein;
        this.carbohydrates = carbohydrates;
        this.energy = energy;
    }

    // Getters and setters (omitted for brevity)

    // Nested class for nutrient information
    public static class NutrientInfo {
        private double value;
        private String unitName;

        public NutrientInfo(double value, String unitName) {
            this.value = value;
            this.unitName = unitName;
        }


    }
}