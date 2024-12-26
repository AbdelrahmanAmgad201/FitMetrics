package com.example.FitMetrics_Server.controllers;

import com.example.FitMetrics_Server.dtos.ExerciseCreateRequest;
import com.example.FitMetrics_Server.dtos.ExerciseDTO;
import com.example.FitMetrics_Server.dtos.ExerciseSetsRepsUpdateRequest;
import com.example.FitMetrics_Server.dtos.WorkoutPlanDTO;
import com.example.FitMetrics_Server.entities.Exercise;
import com.example.FitMetrics_Server.services.WorkoutPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workout-plans")
public class WorkoutPlanController {

    @Autowired
    private WorkoutPlanService workoutPlanService;

    public WorkoutPlanController(WorkoutPlanService workoutPlanService) {
        this.workoutPlanService = workoutPlanService;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<WorkoutPlanDTO>> getUserWorkoutPlans(@PathVariable Long userId) {
        List<WorkoutPlanDTO> plans = workoutPlanService.getUserWorkoutPlansWithExercises(userId);
        return ResponseEntity.ok(plans);
    }

    @PostMapping("/{planId}/copy")
    public ResponseEntity<WorkoutPlanDTO> copyWorkoutPlan(
            @PathVariable Long planId,
            @RequestParam Long targetUserId) {
        WorkoutPlanDTO copiedPlan = workoutPlanService.copyWorkoutPlan(planId, targetUserId);
        return ResponseEntity.ok(copiedPlan);
    }

    @DeleteMapping("/exercises/{exerciseId}")
    public ResponseEntity<Void> deleteExercise(
            @PathVariable Long exerciseId,
            @RequestParam Long userId) {
        workoutPlanService.deleteExerciseFromPlan(exerciseId, userId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{planId}/exercises")
    public ResponseEntity<ExerciseDTO> addExercise(
            @PathVariable Long planId,
            @RequestParam Long userId,
            @RequestBody Exercise exercise) {
        ExerciseDTO newExercise = workoutPlanService.addExerciseToPlan(planId, userId, exercise);
        return ResponseEntity.ok(newExercise);
    }

    @PutMapping("/exercises/{exerciseId}")
    public ResponseEntity<ExerciseDTO> updateExerciseSetsAndReps(
            @PathVariable Long exerciseId,
            @RequestParam Long userId,
            @RequestBody ExerciseSetsRepsUpdateRequest request) {
        ExerciseDTO updatedExercise = workoutPlanService.updateExerciseSetsAndReps(
                exerciseId,
                userId,
                request.getSets(),
                request.getReps()
        );
        return ResponseEntity.ok(updatedExercise);
    }
}