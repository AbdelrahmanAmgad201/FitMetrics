package com.example.FitMetrics_Server.entities;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "user_nutrition_history")
public class UserNutritionHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // Assuming you have a User entity

    private Date date;

    @ManyToOne
    @JoinColumn(name = "food_id", nullable = false)
    private FoodData foodData;

    public UserNutritionHistory() {
    }

    public long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public Date getDate() {
        return date;
    }

    public FoodData getFoodData() {
        return foodData;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public void setFoodData(FoodData foodData) {
        this.foodData = foodData;
    }
}
