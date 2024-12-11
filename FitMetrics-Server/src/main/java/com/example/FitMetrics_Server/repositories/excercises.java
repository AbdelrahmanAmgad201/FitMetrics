package com.example.FitMetrics_Server.repositories;
import jakarta.persistence.*;
@Entity
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long recordId;  // Unique record ID for each exercise entry

    @ManyToOne
    @JoinColumn(name = "plan_id", referencedColumnName = "planId")
    private WorkoutPlan workoutPlan;  // The associated workout plan

    private int day;            // The day of the workout plan (e.g., Day 1, Day 2, etc.)
    private String exerciseName;   // Name of the exercise
    private String exerciseId;     // Exercise ID from the external API

    // Getters and Setters
    public long getRecordId() {
        return recordId;
    }

    public void setRecordId(long recordId) {
        this.recordId = recordId;
    }

    public WorkoutPlan getWorkoutPlan() {
        return workoutPlan;
    }

    public void setWorkoutPlan(WorkoutPlan workoutPlan) {
        this.workoutPlan = workoutPlan;
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
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
}