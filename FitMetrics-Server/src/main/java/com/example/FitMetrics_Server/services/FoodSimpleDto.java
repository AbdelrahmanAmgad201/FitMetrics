package com.example.FitMetrics_Server.services;

public class FoodSimpleDto {
    private int fdcId;
    private String foodName;

    // Make these public or provide public getters
    public NutrientInfo protein;
    public NutrientInfo carbohydrates;
    public NutrientInfo energy;

    // Constructor
    public FoodSimpleDto(int fdcId, String foodName, NutrientInfo protein,
                         NutrientInfo carbohydrates, NutrientInfo energy) {
        this.fdcId = fdcId;
        this.foodName = foodName;
        this.protein = protein;
        this.carbohydrates = carbohydrates;
        this.energy = energy;
    }

    // Ensure you have getters for all fields
    public int getFdcId() {
        return fdcId;
    }

    public String getFoodName() {
        return foodName;
    }

    // Nested class for nutrient information
    public static class NutrientInfo {
        public double value;
        public String unitName;

        public NutrientInfo(double value, String unitName) {
            this.value = value;
            this.unitName = unitName;
        }

        // Add getters to ensure Jackson can serialize
        public double getValue() {
            return value;
        }

        public String getUnitName() {
            return unitName;
        }
    }
}