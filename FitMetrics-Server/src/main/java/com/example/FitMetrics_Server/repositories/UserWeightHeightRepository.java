package com.example.FitMetrics_Server.repositories;

import com.example.FitMetrics_Server.entities.user_weight_height;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserWeightHeightRepository extends JpaRepository<user_weight_height, Long> {

}