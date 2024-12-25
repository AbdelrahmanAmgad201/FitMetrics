package com.example.FitMetrics_Server.dtos;

public class ExerciseCreateRequest {
    private String exerciseName;
    private String exerciseId;
    private int day;

    // Constructor
    public ExerciseCreateRequest() {}

    // Getters and setters
    public String getExerciseName() {
        return exerciseName;
    }

    public void setExerciseName(String exerciseName) {
        this.exerciseName = exerciseName;
    }

    public String getExerciseId() {
        return exerciseId;
    }

    public void setExerciseId(String exerciseId) {
        this.exerciseId = exerciseId;
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }
}