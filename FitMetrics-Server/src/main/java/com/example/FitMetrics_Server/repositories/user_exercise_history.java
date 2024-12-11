package com.example.FitMetrics_Server.repositories;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class user_exercise_history{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private long userId;
    private Date date;

    private String exerciseName;
    private String exerciseId;
    private int sets;
    private int reps;

    @Temporal(TemporalType.TIMESTAMP)
    private Date timestamp;

    // Getters and Setters
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
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

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }
}
