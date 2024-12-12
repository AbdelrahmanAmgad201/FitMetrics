package com.example.FitMetrics_Server.repositories;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class user_nutrition_history {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;  // Unique identifier for the user nutrition record

    private long userId;  // User ID (foreign key)
    private Date date;     // Date of food consumption

    private String foodId;  // foodId (foreign key from FoodData)

    @ManyToOne
    @JoinColumn(name = "foodId", referencedColumnName = "foodId", insertable = false, updatable = false)
    private food_data foodData;  // Mapping to FoodData entity (many-to-one relationship)

    private double quantity;  // Quantity of food consumed (optional, you can add more fields if needed
}
