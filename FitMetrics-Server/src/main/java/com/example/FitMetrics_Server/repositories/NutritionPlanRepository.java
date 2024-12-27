package com.example.FitMetrics_Server.repositories;

import com.example.FitMetrics_Server.entities.NutritionPlans;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NutritionPlanRepository extends JpaRepository<NutritionPlans, Long> {

    @Query("SELECT p FROM NutritionPlans p WHERE p.createdBy.user_id = :userId")
    List<NutritionPlans> findPlansByUserId(@Param("userId") Long userId);

    @Modifying
    @Query("DELETE FROM NutritionPlans p WHERE p.createdBy.user_id = :userId")
    void deletePlansByUserId(@Param("userId") Long userId);
}

