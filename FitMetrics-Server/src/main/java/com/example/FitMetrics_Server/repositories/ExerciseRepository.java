package com.example.FitMetrics_Server.repositories;

import com.example.FitMetrics_Server.entities.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
}