package com.example.FitMetrics_Server.entities;

import jakarta.persistence.*;

@Entity
public class food_data {

    @Id
    private long foodId;

    private String foodName;

    private double calories;
    private double protein;
    private double fats;

}