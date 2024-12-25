package com.example.FitMetrics_Server.repositories;

import com.example.FitMetrics_Server.entities.WorkoutPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkoutPlanRepository extends JpaRepository<WorkoutPlan, Long> {
    // Using JPQL query to explicitly define the join and condition
    @Query("SELECT wp FROM WorkoutPlan wp WHERE wp.createdBy.user_id = :userId")
    List<WorkoutPlan> findByCreatedByUser_Id(@Param("userId") Long userId);
}
