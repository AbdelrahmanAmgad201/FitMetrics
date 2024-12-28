package com.example.FitMetrics_Server.controllers;

import com.example.FitMetrics_Server.dtos.ExerciseHistoryDTO;
import com.example.FitMetrics_Server.services.AuthService;
import com.example.FitMetrics_Server.services.UserExerciseHistoryService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/exercise-history")
@CrossOrigin(origins = "http://localhost:5173")
public class UserExerciseHistoryController {

    private final UserExerciseHistoryService historyService;

    @Autowired
    public UserExerciseHistoryController(UserExerciseHistoryService historyService) {
        this.historyService = historyService;
    }

    @Autowired
    private AuthService authService;

    @GetMapping
    public ResponseEntity<List<ExerciseHistoryDTO>> getExerciseHistory(
            @RequestHeader("Authorization") String token,
            @RequestParam String exerciseName,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {
        Long userId = extractUserIdFromToken(token);
        List<ExerciseHistoryDTO> history = historyService
                .getExerciseHistoryBetweenDates(userId, exerciseName, startDate, endDate);
        return ResponseEntity.ok(history);
    }

    @PostMapping("/save")
    public ResponseEntity<ExerciseHistoryDTO> saveExerciseHistory(
            @RequestHeader("Authorization") String token,
            @RequestParam String exerciseName,
            @RequestParam int sets,
            @RequestParam int reps) {
        Long userId = extractUserIdFromToken(token);
        ExerciseHistoryDTO savedHistory = historyService
                .saveExerciseHistory(userId, exerciseName, sets, reps);
        return ResponseEntity.ok(savedHistory);
    }

    private Long extractUserIdFromToken(String token) {
        token = token.replace("Bearer ", "");
        Claims claims = authService.parseToken(token);
        return Long.parseLong(claims.getId());
    }
}