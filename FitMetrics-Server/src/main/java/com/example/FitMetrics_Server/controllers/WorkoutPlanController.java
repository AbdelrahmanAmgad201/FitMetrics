package com.example.FitMetrics_Server.controllers;

import com.example.FitMetrics_Server.dtos.*;
import com.example.FitMetrics_Server.entities.Exercise;
import com.example.FitMetrics_Server.services.AuthService;
import com.example.FitMetrics_Server.services.WorkoutPlanService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/workout-plans")
public class WorkoutPlanController {

    @Autowired
    private WorkoutPlanService workoutPlanService;

    @Autowired
    private AuthService authService;

    public WorkoutPlanController(WorkoutPlanService workoutPlanService) {
        this.workoutPlanService = workoutPlanService;
    }
    @GetMapping("/builtIn")
    public ResponseEntity<List<WorkoutPlanDTO>> getBuiltInPlans() {
        List<WorkoutPlanDTO> plans = workoutPlanService.getUserWorkoutPlansWithExercises(1L);
        return ResponseEntity.ok(plans);
    }
    @GetMapping("/user")
    public ResponseEntity<List<WorkoutPlanDTO>> getUserWorkoutPlans(
            @RequestHeader("Authorization") String token) {
        Long userId = extractUserIdFromToken(token);
        List<WorkoutPlanDTO> plans = workoutPlanService.getUserWorkoutPlansWithExercises(userId);
        return ResponseEntity.ok(plans);
    }

    @PostMapping("/{planId}/copy")
    public ResponseEntity<WorkoutPlanDTO> copyWorkoutPlan(
            @RequestHeader("Authorization") String token,
            @PathVariable Long planId) {
        Long userId = extractUserIdFromToken(token);
        WorkoutPlanDTO copiedPlan = workoutPlanService.copyWorkoutPlan(planId, userId);
        return ResponseEntity.ok(copiedPlan);
    }

    @DeleteMapping("/exercises/{exerciseId}")
    public ResponseEntity<Void> deleteExercise(
            @RequestHeader("Authorization") String token,
            @PathVariable Long exerciseId) {
        Long userId = extractUserIdFromToken(token);
        workoutPlanService.deleteExerciseFromPlan(exerciseId, userId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{planId}/exercises")
    public ResponseEntity<ExerciseDTO> addExercise(
            @RequestHeader("Authorization") String token,
            @PathVariable Long planId,
            @RequestBody Exercise exercise) {
        Long userId = extractUserIdFromToken(token);
        ExerciseDTO newExercise = workoutPlanService.addExerciseToPlan(planId, userId, exercise);
        return ResponseEntity.ok(newExercise);
    }

    @PutMapping("/exercises/{exerciseId}")
    public ResponseEntity<ExerciseDTO> updateExerciseSetsAndReps(
            @RequestHeader("Authorization") String token,
            @PathVariable Long exerciseId,
            @RequestBody ExerciseSetsRepsUpdateRequest request) {
        Long userId = extractUserIdFromToken(token);
        ExerciseDTO updatedExercise = workoutPlanService.updateExerciseSetsAndReps(
                exerciseId,
                userId,
                request.getSets(),
                request.getReps()
        );
        return ResponseEntity.ok(updatedExercise);
    }

    @GetMapping("/today")
    public ResponseEntity<List<TodayExerciseDTO>> getTodayWorkouts(
            @RequestHeader("Authorization") String token,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
        Long userId = extractUserIdFromToken(token);
        Date targetDate = date != null ? date : new Date();
        List<TodayExerciseDTO> todayWorkouts = workoutPlanService.getTodayWorkouts(userId, targetDate);
        return ResponseEntity.ok(todayWorkouts);
    }

    private Long extractUserIdFromToken(String token) {
        token = token.replace("Bearer ", "");
        Claims claims = authService.parseToken(token);
        return Long.parseLong(claims.getId());
    }
}