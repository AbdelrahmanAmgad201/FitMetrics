package com.example.FitMetrics_Server.repositories;

import com.example.FitMetrics_Server.entities.FoodData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodDataRepository extends JpaRepository<FoodData, Long> {
}
