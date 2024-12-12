package com.example.FitMetrics_Server.Entities;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class user_exercise_history{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "user_id")
    private long userId;

    private Date date;

    @Column(name = "exercise_name")
    private String exerciseName;
    private String exerciseId;
    private int sets;
    private int reps;

    @Temporal(TemporalType.TIMESTAMP)
    private Date timestamp;

}
