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

    private double quantity;  // Quantity of food consumed (optional, you can add more fields if needed)

    // Getters and Setters
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getFoodId() {
        return foodId;
    }

    public void setFoodId(String foodId) {
        this.foodId = foodId;
    }

    public food_data getFoodData() {
        return foodData;
    }

    public void setFoodData(food_data foodData) {
        this.foodData = foodData;
    }

    public double getQuantity() {
        return quantity;
    }

    public void setQuantity(double quantity) {
        this.quantity = quantity;
    }
}
