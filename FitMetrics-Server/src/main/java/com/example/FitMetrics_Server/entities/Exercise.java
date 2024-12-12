package com.example.FitMetrics_Server.entities;
import jakarta.persistence.*;


@Entity
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "plan_id", referencedColumnName = "planId")
    private workout_plans workoutPlan;

    private int day;
    private String exerciseName;
    private String exerciseId;

}