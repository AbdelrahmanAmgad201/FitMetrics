package com.example.FitMetrics_Server.Entities;

import jakarta.persistence.*;

@Entity
public class food_data {

    @Id
    @Column(name = "food_id")
    private long foodId;

    @Column(name = "food_name")
    private String foodName;

    private double calories;
    private double protein;
    private double fats;

}