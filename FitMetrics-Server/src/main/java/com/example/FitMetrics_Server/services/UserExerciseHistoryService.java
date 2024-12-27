package com.example.FitMetrics_Server.services;

import com.example.FitMetrics_Server.dtos.ExerciseHistoryDTO;
import com.example.FitMetrics_Server.entities.User;
import com.example.FitMetrics_Server.entities.UserExerciseHistory;
import com.example.FitMetrics_Server.repositories.ExerciseHistoryRepository;
import com.example.FitMetrics_Server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserExerciseHistoryService {

    private final ExerciseHistoryRepository historyRepository;
    private final UserRepository userRepository;

    @Autowired
    public UserExerciseHistoryService(ExerciseHistoryRepository historyRepository,
                                      UserRepository userRepository) {
        this.historyRepository = historyRepository;
        this.userRepository = userRepository;
    }


    public List<ExerciseHistoryDTO> getExerciseHistoryBetweenDates(
            Long userId,
            String exerciseName,
            Date startDate,
            Date endDate) {

        List<UserExerciseHistory> history = historyRepository
                .findUserExerciseHistoryBetweenDates(
                        userId,
                        exerciseName,
                        startDate,
                        endDate);

        return history.stream()
                .map(h -> new ExerciseHistoryDTO(h.getDate(), h.getSets(), h.getReps()))
                .collect(Collectors.toList());
    }
    public ExerciseHistoryDTO saveExerciseHistory(Long userId, String exerciseName, int sets, int reps) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserExerciseHistory newHistory = new UserExerciseHistory(
                user,
                new Date(), // Today's date
                sets,
                reps,
                exerciseName
        );

        UserExerciseHistory savedHistory = historyRepository.save(newHistory);
        return new ExerciseHistoryDTO(savedHistory.getDate(), savedHistory.getSets(), savedHistory.getReps());
    }
}

