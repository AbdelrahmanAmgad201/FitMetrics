package com.example.FitMetrics_Server.repositories;

import com.example.FitMetrics_Server.entities.UserExerciseHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExerciseHistoryRepository extends JpaRepository<UserExerciseHistory, Long> {
}
