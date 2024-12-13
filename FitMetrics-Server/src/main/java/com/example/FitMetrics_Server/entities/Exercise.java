package com.example.FitMetrics_Server.entities;
import jakarta.persistence.*;


@Entity
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "plan_id", nullable = false)
    private WorkoutPlan workoutPlan;

    private int day;

    private String exerciseName;
    private String exerciseId; // This is from the external API

    public Exercise() {
    }


}