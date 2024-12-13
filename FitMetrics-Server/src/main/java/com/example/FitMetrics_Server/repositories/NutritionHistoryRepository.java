package com.example.FitMetrics_Server.repositories;

import com.example.FitMetrics_Server.entities.FoodData;
import com.example.FitMetrics_Server.entities.UserNutritionHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Date;
import java.util.List;

public interface NutritionHistoryRepository extends JpaRepository<UserNutritionHistory, Long> {

    @Query("SELECT u " +
            "FROM UserNutritionHistory u " +
            "WHERE u.user.id = :userId " +
            "AND u.date = :date")
    List<FoodData> findAllByUserAndDate(Long userId, Date date);
}