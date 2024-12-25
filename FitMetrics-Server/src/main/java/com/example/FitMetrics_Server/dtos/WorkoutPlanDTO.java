package com.example.FitMetrics_Server.dtos;

import java.util.List;

public class WorkoutPlanDTO {
    private Long planId;
    private String planName;
    private String description;
    private List<ExerciseDTO> exercises;

    public WorkoutPlanDTO(Long planId, String planName, String description, List<ExerciseDTO> exercises) {
        this.planId = planId;
        this.planName = planName;
        this.description = description;
        this.exercises = exercises;
    }

    public Long getPlanId() {
        return planId;
    }

    public void setPlanId(Long planId) {
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

    public List<ExerciseDTO> getExercises() {
        return exercises;
    }

    public void setExercises(List<ExerciseDTO> exercises) {
        this.exercises = exercises;
    }
    // Getters and setters
}
