package com.example.FitMetrics_Server.services;

import com.example.FitMetrics_Server.entities.*;
import com.example.FitMetrics_Server.repositories.ExerciseHistoryRepository;
import com.example.FitMetrics_Server.repositories.NutritionHistoryRepository;
import com.example.FitMetrics_Server.repositories.UserRepository;
import com.example.FitMetrics_Server.repositories.UserWeightHeightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CalenderService {

    @Autowired
    ExerciseHistoryRepository exerciseHistoryRepository;
    @Autowired
    NutritionHistoryRepository nutritionHistoryRepository;
    @Autowired
    UserWeightHeightRepository userWeightHeightRepository;

    @Autowired
    UserRepository userRepository;

    public List<Date> getWorkDays(Long userId, int year, int month) {
        return exerciseHistoryRepository.findAllDatesByUserAndYearMonth(userId, year, month);
    }

    public List<List<Map<String,Object>>> getAllDayData(Long userId, Date date) {
        List<UserExerciseHistory> exerciseList = exerciseHistoryRepository.findAllByUserAndDate(userId, date);
        List<UserNutritionHistory> nutritionHistoryList = nutritionHistoryRepository.findAllByUserAndDate(userId, (java.sql.Date) date);

        List<Map<String, Object>> exerciseListRes = exerciseList.stream()
                .map(exerciseHistory -> {
                    Map<String, Object> exerciseMap = new HashMap<>();
                    exerciseMap.put("exerciseName", exerciseHistory.getExerciseName());
                    exerciseMap.put("sets", exerciseHistory.getSets());
                    exerciseMap.put("reps", exerciseHistory.getReps());
                    return exerciseMap;
                })
                .collect(Collectors.toList());

        List<Map<String, Object>> foodListRes = nutritionHistoryList.stream()
                .map(nutritionHistory -> {
                    FoodData foodData = nutritionHistory.getFoodData();
                    Map<String, Object> foodMap = new HashMap<>();
                    foodMap.put("fdcId", foodData.getFoodId());
                    foodMap.put("foodName", foodData.getFoodName());
                    foodMap.put("carbohydrates", foodData.getCarbohydrates());
                    foodMap.put("protein", foodData.getProtein());
                    foodMap.put("energy", foodData.getEnergy());
                    return foodMap;
                })
                .collect(Collectors.toList());

        List<List<Map<String,Object>>> allDayData = new ArrayList<>();
        allDayData.add(exerciseListRes);
        allDayData.add(foodListRes);
        return allDayData;
    }

    public boolean isTodayRecorded(Long userId) {
        LocalDate today = LocalDate.now();
        return userWeightHeightRepository.existsByUserAndDate(userId, today);
    }

    public boolean recordTodayWeightHeight(Long userId, double weight, double height) {
        LocalDate today = LocalDate.now();
        if (userWeightHeightRepository.existsByUserAndDate(userId, today)) {
            return false;
        }

        if (userRepository.findById(userId).isEmpty()) {
            return false;
        }

        User user = userRepository.findById(userId).get();
        UserWeightHeight userWeightHeight = new UserWeightHeight(user, weight, height, today);
        userWeightHeightRepository.save(userWeightHeight);
        return true;
    }

    public List<Map<LocalDate, Double>> getDailyTotalProtein(Long userId, LocalDate startDate, LocalDate endDate) {
        java.sql.Date start = java.sql.Date.valueOf(startDate);
        java.sql.Date end = java.sql.Date.valueOf(endDate);

        List<Object[]> dailyTotalProtein = nutritionHistoryRepository.findDailyProteinTotalsByDateRange(userId, start, end);

        return dailyTotalProtein.stream()
                .map(row -> {
                    Map<LocalDate, Double> dailyProtein = new HashMap<>();
                    dailyProtein.put(((java.sql.Date) row[0]).toLocalDate(), (Double) row[1]);
                    return dailyProtein;
                })
                .collect(Collectors.toList());
    }
}