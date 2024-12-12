package com.example.FitMetrics_Server.Entities;

import com.example.FitMetrics_Server.entities.User;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class user_weight_height {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private double weight;
    private double height;

    private LocalDate date;

}
