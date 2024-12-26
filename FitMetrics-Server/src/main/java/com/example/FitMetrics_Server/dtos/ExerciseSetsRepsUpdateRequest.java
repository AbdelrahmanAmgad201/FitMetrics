package com.example.FitMetrics_Server.dtos;

public class ExerciseSetsRepsUpdateRequest {
    private int sets;
    private int reps;

    // Constructor
    public ExerciseSetsRepsUpdateRequest() {}

    // Getters and setters
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
}
