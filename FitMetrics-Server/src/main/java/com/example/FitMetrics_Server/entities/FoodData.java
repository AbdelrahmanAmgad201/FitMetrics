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

    private double calories;
    private double protein;
    private double fats;

    public FoodData() {
    }

}