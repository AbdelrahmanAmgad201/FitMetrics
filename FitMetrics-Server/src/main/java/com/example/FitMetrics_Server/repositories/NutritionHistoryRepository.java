package com.example.FitMetrics_Server.repositories;

import com.example.FitMetrics_Server.entities.FoodData;
import com.example.FitMetrics_Server.entities.UserNutritionHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.util.List;

public interface NutritionHistoryRepository extends JpaRepository<UserNutritionHistory, Long> {

    @Query("SELECT f FROM UserNutritionHistory nh " +
            "JOIN nh.foodData f " +
            "WHERE nh.user.id = :userId " +
            "AND FUNCTION('DATE', nh.date) = :date")
    List<FoodData> findAllByUserAndDate(
            @Param("userId") Long userId,
            @Param("date") java.sql.Date date
    );


    @Query("SELECT unh FROM UserNutritionHistory unh " +
            "WHERE unh.user.id = :userId " +
            "AND unh.foodData.foodId = :foodId " +
            "AND unh.date >= :startOfDay " +
            "AND unh.date < :endOfDay")
    List<UserNutritionHistory> findTodaysEntriesByUserAndFood(
            @Param("userId") Long userId,
            @Param("foodId") Long foodId,
            @Param("startOfDay") Date startOfDay,
            @Param("endOfDay") Date endOfDay
    );


}
