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

}
