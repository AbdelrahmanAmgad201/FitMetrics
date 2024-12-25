package com.example.FitMetrics_Server.services;

import com.example.FitMetrics_Server.dtos.ExerciseDTO;
import com.example.FitMetrics_Server.dtos.WorkoutPlanDTO;
import com.example.FitMetrics_Server.entities.Exercise;
import com.example.FitMetrics_Server.entities.User;
import com.example.FitMetrics_Server.entities.WorkoutPlan;
import com.example.FitMetrics_Server.repositories.UserRepository;
import com.example.FitMetrics_Server.repositories.WorkoutPlanRepository;
import com.example.FitMetrics_Server.repositories.ExerciseRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class WorkoutPlanService {

    private final WorkoutPlanRepository workoutPlanRepository;
    private final ExerciseRepository exerciseRepository;
    private final UserRepository userRepository;
    // Constructor injection
    public WorkoutPlanService(ExerciseRepository exerciseRepository, WorkoutPlanRepository workoutPlanRepository , UserRepository userRepository) {
        this.exerciseRepository = exerciseRepository;
        this.workoutPlanRepository = workoutPlanRepository;
        this.userRepository = userRepository;
    }

    public List<WorkoutPlanDTO> getUserWorkoutPlansWithExercises(Long userId) {
        // Updated method name to match repository
        List<WorkoutPlan> userPlans = workoutPlanRepository.findByCreatedByUser_Id(userId);

        // Rest of the implementation remains the same
        List<Exercise> allExercises = exerciseRepository.findByWorkoutPlanIn(userPlans);

        Map<Long, List<Exercise>> exercisesByPlan = allExercises.stream()
                .collect(Collectors.groupingBy(exercise ->
                        exercise.getWorkoutPlan().getPlanId()));

        return userPlans.stream()
                .map(plan -> convertToDTO(plan, exercisesByPlan.getOrDefault(plan.getPlanId(), List.of())))
                .collect(Collectors.toList());
    }

    private WorkoutPlanDTO convertToDTO(WorkoutPlan plan, List<Exercise> exercises) {
        return new WorkoutPlanDTO(
                plan.getPlanId(),
                plan.getPlanName(),
                plan.getDescription(),
                exercises.stream()
                        .map(this::convertToExerciseDTO)
                        .collect(Collectors.toList())
        );
    }

    private ExerciseDTO convertToExerciseDTO(Exercise exercise) {
        return new ExerciseDTO(
                exercise.getId(),
                exercise.getExerciseName(),
                exercise.getExerciseId(),
                exercise.getDay()
        );
    }

    @Transactional
    public WorkoutPlanDTO copyWorkoutPlan(Long planId, Long targetUserId) {
        // 1. Delete any existing copied plans for the target user
        List<WorkoutPlan> existingCopiedPlans = workoutPlanRepository.findByCreatedByUser_Id(targetUserId);
        for (WorkoutPlan existingPlan : existingCopiedPlans) {
            // Delete associated exercises first
            exerciseRepository.deleteByWorkoutPlan(existingPlan);
            // Then delete the plan
            workoutPlanRepository.delete(existingPlan);
        }

        // 2. Get the plan to copy and its exercises
        WorkoutPlan originalPlan = workoutPlanRepository.findById(planId)
                .orElseThrow(() -> new RuntimeException("Workout plan not found"));
        List<Exercise> originalExercises = exerciseRepository.findByWorkoutPlan(originalPlan);

        // 3. Create new plan
        WorkoutPlan newPlan = new WorkoutPlan();
        newPlan.setPlanName(originalPlan.getPlanName() + " (Copy)");
        newPlan.setDescription(originalPlan.getDescription());

        // Get the target user and set it as the creator
        User targetUser = userRepository.findById(targetUserId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        newPlan.setCreatedBy(targetUser);

        // Save the new plan
        WorkoutPlan savedPlan = workoutPlanRepository.save(newPlan);

        // 4. Copy exercises
        List<Exercise> newExercises = originalExercises.stream()
                .map(originalExercise -> {
                    Exercise newExercise = new Exercise();
                    newExercise.setExerciseName(originalExercise.getExerciseName());
                    newExercise.setExerciseId(originalExercise.getExerciseId());
                    newExercise.setDay(originalExercise.getDay());
                    newExercise.setWorkoutPlan(savedPlan);
                    return newExercise;
                })
                .collect(Collectors.toList());

        // Save all new exercises
        List<Exercise> savedExercises = exerciseRepository.saveAll(newExercises);

        // 5. Return the new plan as DTO
        return convertToDTO(savedPlan, savedExercises);
    }

    @Transactional
    public void deleteExerciseFromPlan(Long exerciseId, Long userId) {
        Exercise exercise = exerciseRepository.findById(exerciseId)
                .orElseThrow(() -> new RuntimeException("Exercise not found"));

        // Verify the exercise belongs to the user's plan
        WorkoutPlan plan = exercise.getWorkoutPlan();
        if (!plan.getCreatedBy().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized: This exercise doesn't belong to your plan");
        }

        exerciseRepository.delete(exercise);
    }

    @Transactional
    public ExerciseDTO addExerciseToPlan(Long planId, Long userId, Exercise newExercise) {
        // Validate day range
        if (newExercise.getDay() < 1 || newExercise.getDay() > 7) {
            throw new RuntimeException("Invalid day: must be between 1 and 7");
        }

        WorkoutPlan plan = workoutPlanRepository.findById(planId)
                .orElseThrow(() -> new RuntimeException("Workout plan not found"));

        // Verify the plan belongs to the user
        if (!plan.getCreatedBy().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized: This plan doesn't belong to you");
        }

        // Set the workout plan for the new exercise
        newExercise.setWorkoutPlan(plan);

        // Save the exercise
        Exercise savedExercise = exerciseRepository.save(newExercise);

        return convertToExerciseDTO(savedExercise);
    }
}