package com.example.FitMetrics_Server.entities;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class UserWeightHeight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // Composite primary key

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private double weight;
    private double height;

    private LocalDate date;
        public UserWeightHeight(User user, double weight, double height, LocalDate date) {
        this.user = user;
        this.weight = weight;
        this.height = height;
        this.date = date;
    }

}
