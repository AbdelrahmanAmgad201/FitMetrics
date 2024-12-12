package com.example.FitMetrics_Server.repositories;

import jakarta.persistence.*;

@Entity
public class workout_plans {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long planId;  // Auto-generated planId for each workout plan

    private String planName;      // Name of the workout plan
    private String description;   // Description of the workout plan

    @ManyToOne
    @JoinColumn(name = "created_by", referencedColumnName = "userId")
    private User created_by;

}
