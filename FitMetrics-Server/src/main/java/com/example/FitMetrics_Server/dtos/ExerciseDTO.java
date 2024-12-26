package com.example.FitMetrics_Server.dtos;

public class ExerciseDTO {
    private Long id;
    private String exerciseName;
    private String exerciseId;
    private int day;
    private int sets;
    private int reps;

    public ExerciseDTO(Long id, String exerciseName, String exerciseId, int day, int sets, int reps) {
        this.id = id;
        this.exerciseName = exerciseName;
        this.exerciseId = exerciseId;
        this.day = day;
        this.sets = sets;
        this.reps = reps;
    }

    public int getSets() {
        return sets;
    }

    public void setSets(int sets) {
        this.sets = sets;
    }

    public int getReps() {
        return reps;
    }

    public void setReps(int reps) {
        this.reps = reps;
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