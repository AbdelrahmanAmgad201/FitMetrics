package com.example.FitMetrics_Server.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "food_data")
public class FoodData {

    @Id
    @Column(name = "food_id")
    private long foodId;

    @Column(name = "food_name")
    private String foodName;

    private double carbohydrates;
    private double protein;
    private double energy;

    public FoodData() {
    }

    public long getFoodId() {
        return foodId;
    }

    public String getFoodName() {
        return foodName;
    }

    public double getCarbohydrates() {
        return carbohydrates;
    }

    public double getProtein() {
        return protein;
    }

    public double getEnergy() {
        return energy;
    }

    public void setFoodId(long foodId) {
        this.foodId = foodId;
    }

    public void setFoodName(String foodName) {
        this.foodName = foodName;
    }

    public void setCarbohydrates(double carbohydrates) {
        this.carbohydrates = carbohydrates;
    }

    public void setProtein(double protein) {
        this.protein = protein;
    }

    public void setEnergy(double energy) {
        this.energy = energy;
    }
}