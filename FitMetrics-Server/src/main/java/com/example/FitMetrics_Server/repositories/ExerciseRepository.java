package com.example.FitMetrics_Server.repositories;

import com.example.FitMetrics_Server.entities.Exercise;
import com.example.FitMetrics_Server.entities.WorkoutPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    List<Exercise> findByWorkoutPlanIn(List<WorkoutPlan> workoutPlans);
    List<Exercise> findByWorkoutPlan(WorkoutPlan workoutPlan);
    void deleteByWorkoutPlan(WorkoutPlan workoutPlan);

    @Query("SELECT e FROM Exercise e WHERE e.workoutPlan.planId = :planId AND e.day = :day")
    List<Exercise> findExercisesByPlanIdAndDay(@Param("planId") Long planId, @Param("day") int day);
}
