package com.example.FitMetrics_Server.repositories;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class user_nutrition_history {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;  // Unique identifier for the user nutrition record

    @Column(name = "user_id")
    private long userId;
    private Date date;

    @Column(name = "food_id")
    private String foodId;

    @Column(name = "food_name")
    private String foodName;

    @ManyToOne
    @JoinColumn(name = "foodId", referencedColumnName = "foodId", insertable = false, updatable = false)
    private food_data foodData;

    private double quantity;
}
