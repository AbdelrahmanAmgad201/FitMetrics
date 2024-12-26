package com.example.FitMetrics_Server.repositories;

import com.example.FitMetrics_Server.entities.UserExerciseHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface ExerciseHistoryRepository extends JpaRepository<UserExerciseHistory, Long> {


    @Query("SELECT u.date " +
            "FROM UserExerciseHistory u " +
            "WHERE u.user.user_id = :userId " +
            "AND FUNCTION('YEAR', u.date) = :year " +
            "AND FUNCTION('MONTH', u.date) = :month")
    List<Date> findAllDatesByUserAndYearMonth(@Param("userId") Long userId,
                                              @Param("year") int year,
                                              @Param("month") int month);

    @Query("SELECT u " +
            "FROM UserExerciseHistory u " +
            "WHERE u.user.user_id = :userId " +
            "AND u.date = :date")
    List<UserExerciseHistory> findAllByUserAndDate(Long userId, Date date);


    @Query("SELECT ueh FROM UserExerciseHistory ueh " +
            "WHERE ueh.user.user_id = :userId " +
            "AND ueh.exerciseName = :exerciseName " +
            "AND ueh.date BETWEEN :startDate AND :endDate " +
            "ORDER BY ueh.date ASC")
    List<UserExerciseHistory> findUserExerciseHistoryBetweenDates(
            @Param("userId") Long userId,
            @Param("exerciseName") String exerciseName,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate
    );

    List<UserExerciseHistory> findByUserIdAndDate(Long userId, Date date);

}
