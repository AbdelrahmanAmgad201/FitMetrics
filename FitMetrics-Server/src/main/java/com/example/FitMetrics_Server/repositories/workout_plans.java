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

    // Getters and Setters
    public long getPlanId() {
        return planId;
    }

    public void setPlanId(long planId) {
        this.planId = planId;
    }

    public String getPlanName() {
        return planName;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }
}
