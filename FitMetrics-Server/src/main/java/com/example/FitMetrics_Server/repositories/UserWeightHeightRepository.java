package com.example.FitMetrics_Server.repositories;

import com.example.FitMetrics_Server.entities.UserWeightHeight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface UserWeightHeightRepository extends JpaRepository<UserWeightHeight, Long> {

    @Query("SELECT COUNT(u) > 0 FROM UserWeightHeight u WHERE u.user.id = :userId AND u.date = :date")
    boolean existsByUserAndDate(Long userId, LocalDate date);
}