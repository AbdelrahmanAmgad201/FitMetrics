package com.example.FitMetrics_Server.entities;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "user_exercise_history")
public class UserExerciseHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Temporal(TemporalType.DATE)
    private Date date;

    private int sets;
    private int reps;
    @Column(name = "exercise_name")
    private String exerciseName;

    public UserExerciseHistory() {
    }

    public UserExerciseHistory(User user, Date date, int sets, int reps, String exerciseName) {
        this.user = user;
        this.date = date;
        this.sets = sets;
        this.reps = reps;
        this.exerciseName = exerciseName;
    }

    public long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public Date getDate() {
        return date;
    }

    public int getSets() {
        return sets;
    }

    public int getReps() {
        return reps;
    }

    public String getExerciseName() {
        return exerciseName;
    }
}
