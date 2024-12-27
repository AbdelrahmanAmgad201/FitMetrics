package com.example.FitMetrics_Server.controllers;

import com.example.FitMetrics_Server.dtos.ExerciseHistoryDTO;
import com.example.FitMetrics_Server.services.UserExerciseHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/exercise-history")
public class UserExerciseHistoryController {

    private final UserExerciseHistoryService historyService;

    @Autowired
    public UserExerciseHistoryController(UserExerciseHistoryService historyService) {
        this.historyService = historyService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<ExerciseHistoryDTO>> getExerciseHistory(
            @PathVariable Long userId,
            @RequestParam String exerciseName,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {

        List<ExerciseHistoryDTO> history = historyService
                .getExerciseHistoryBetweenDates(userId, exerciseName, startDate, endDate);

        return ResponseEntity.ok(history);
    }

    @PostMapping("/{userId}/save")
    public ResponseEntity<ExerciseHistoryDTO> saveExerciseHistory(
            @PathVariable Long userId,
            @RequestParam String exerciseName,
            @RequestParam int sets,
            @RequestParam int reps) {

        ExerciseHistoryDTO savedHistory = historyService
                .saveExerciseHistory(userId, exerciseName, sets, reps);

        return ResponseEntity.ok(savedHistory);
    }
}