package com.example.FitMetrics_Server.entities;

import jakarta.persistence.*;

@Entity
public class workout_plans {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "plan_id")
    private long planId;  // Auto-generated planId for each workout plan

    @Column(name = "plan_name")
    private String planName;
    private String description;

    @ManyToOne
    @JoinColumn(name = "created_by", referencedColumnName = "user_id")
    @Column(name = "created_by")
    private User createdBy;

}
