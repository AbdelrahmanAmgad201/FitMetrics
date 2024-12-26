package com.example.FitMetrics_Server.dtos;


public class CustomizePlanRequest {
    private Double protein;
    private Double carbohydrates;
    private Double calories;

    public CustomizePlanRequest(Double protein, Double carbohydrates, Double calories) {
        this.protein = protein;
        this.carbohydrates = carbohydrates;
        this.calories = calories;
    }

    public Double getProtein() {
        return protein;
    }

    public void setProtein(Double protein) {
        this.protein = protein;
    }

    public Double getCarbohydrates() {
        return carbohydrates;
    }

    public void setCarbohydrates(Double carbohydrates) {
        this.carbohydrates = carbohydrates;
    }

    public Double getCalories() {
        return calories;
    }

    public void setCalories(Double calories) {
        this.calories = calories;
    }
}
