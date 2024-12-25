package com.example.FitMetrics_Server.repositories;

import com.example.FitMetrics_Server.entities.Exercise;
import com.example.FitMetrics_Server.entities.WorkoutPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    List<Exercise> findByWorkoutPlanIn(List<WorkoutPlan> workoutPlans);
    List<Exercise> findByWorkoutPlan(WorkoutPlan workoutPlan);
    void deleteByWorkoutPlan(WorkoutPlan workoutPlan);
}