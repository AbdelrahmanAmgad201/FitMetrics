package com.example.FitMetrics_Server.dtos;

public class ExerciseDTO {
    private Long id;
    private String exerciseName;
    private String exerciseId;
    private int day;

    public ExerciseDTO(Long id, String exerciseName, String exerciseId, int day) {
        this.id = id;
        this.exerciseName = exerciseId;
        this.exerciseId = exerciseId;
        this.day = day;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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
    // Getters and setters
}