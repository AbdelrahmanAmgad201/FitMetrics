package com.example.FitMetrics_Server.entities;

import jakarta.persistence.*;

import java.util.Set;

@Entity
public class WorkoutPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "plan_id")
    private long planId;

    @Column(name = "plan_name", nullable = false)
    private String planName;

    private String description;

    @ManyToOne
    @JoinColumn(name = "created_by", referencedColumnName = "user_id", nullable = false)
    private User createdBy;

    @OneToMany(mappedBy = "workoutPlan", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Exercise> exercises;

    // Getters and Setters
}
