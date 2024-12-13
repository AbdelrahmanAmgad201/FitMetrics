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

    @ManyToOne
    @JoinColumn(name = "exercise", nullable = false)
    private Exercise exercise;

    public UserExerciseHistory() {
    }
}
