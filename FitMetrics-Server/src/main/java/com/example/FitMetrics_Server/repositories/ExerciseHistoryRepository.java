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
            "WHERE u.user.id = :userId " +
            "AND FUNCTION('YEAR', u.date) = :year " +
            "AND FUNCTION('MONTH', u.date) = :month")
    List<Date> findAllDatesByUserAndYearMonth(@Param("userId") Long userId,
                                              @Param("year") int year,
                                              @Param("month") int month);

    @Query("SELECT u " +
            "FROM UserExerciseHistory u " +
            "WHERE u.user.id = :userId " +
            "AND u.date = :date")
    List<UserExerciseHistory> findAllByUserAndDate(Long userId, Date date);
}
