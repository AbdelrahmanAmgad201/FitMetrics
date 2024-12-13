package com.example.FitMetrics_Server.repositories;

import com.example.FitMetrics_Server.entities.WorkoutPlan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkoutPlanRepository extends JpaRepository<WorkoutPlan, Long> {
}
