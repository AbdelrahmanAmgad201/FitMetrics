package com.example.FitMetrics_Server.repositories;

import com.example.FitMetrics_Server.entities.UserNutritionHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NutritionHistoryRepository extends JpaRepository<UserNutritionHistory, Long> {
}
