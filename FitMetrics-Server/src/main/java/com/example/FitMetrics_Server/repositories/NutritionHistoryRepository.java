package com.example.FitMetrics_Server.repositories;

import com.example.FitMetrics_Server.entities.FoodData;
import com.example.FitMetrics_Server.entities.UserNutritionHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.util.List;

public interface NutritionHistoryRepository extends JpaRepository<UserNutritionHistory, Long> {

    @Query("SELECT nh FROM UserNutritionHistory nh " +
            "JOIN FETCH nh.foodData f " +
            "WHERE nh.user.id = :userId " +
            "AND FUNCTION('DATE', nh.date) = :date")
    List<UserNutritionHistory> findAllByUserAndDate(
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


    @Query("SELECT FUNCTION('DATE', nh.date) as date, SUM(fd.protein) as totalProtein " +
            "FROM UserNutritionHistory nh " +
            "JOIN nh.foodData fd " +
            "WHERE nh.user.id = :userId " +
            "AND nh.date >= :startDate " +
            "AND nh.date < :endDate " +
            "GROUP BY FUNCTION('DATE', nh.date) " +
            "ORDER BY date")
    List<Object[]> findDailyProteinTotalsByDateRange(
            @Param("userId") Long userId,
            @Param("startDate") java.sql.Date startDate,
            @Param("endDate") java.sql.Date endDate
    );


    @Query("SELECT FUNCTION('DATE', nh.date) as date, SUM(fd.carbohydrates) as totalCarbs " +
            "FROM UserNutritionHistory nh " +
            "JOIN nh.foodData fd " +
            "WHERE nh.user.id = :userId " +
            "AND nh.date >= :startDate " +
            "AND nh.date < :endDate " +
            "GROUP BY FUNCTION('DATE', nh.date) " +
            "ORDER BY date")
    List<Object[]> findDailyCarbsTotalsByDateRange(
            @Param("userId") Long userId,
            @Param("startDate") java.sql.Date startDate,
            @Param("endDate") java.sql.Date endDate
    );

    @Query("SELECT FUNCTION('DATE', nh.date) as date, SUM(fd.energy) as totalEnergy " +
            "FROM UserNutritionHistory nh " +
            "JOIN nh.foodData fd " +
            "WHERE nh.user.id = :userId " +
            "AND nh.date >= :startDate " +
            "AND nh.date < :endDate " +
            "GROUP BY FUNCTION('DATE', nh.date) " +
            "ORDER BY date")
    List<Object[]> findDailyEnergyTotalsByDateRange(
            @Param("userId") Long userId,
            @Param("startDate") java.sql.Date startDate,
            @Param("endDate") java.sql.Date endDate
    );
}
