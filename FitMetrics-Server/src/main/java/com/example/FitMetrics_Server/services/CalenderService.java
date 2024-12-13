package com.example.FitMetrics_Server.services;

import com.example.FitMetrics_Server.entities.FoodData;
import com.example.FitMetrics_Server.entities.UserExerciseHistory;
import com.example.FitMetrics_Server.repositories.ExerciseHistoryRepository;
import com.example.FitMetrics_Server.repositories.NutritionHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CalenderService {

    @Autowired
    ExerciseHistoryRepository exerciseHistoryRepository;
    @Autowired
    NutritionHistoryRepository nutritionHistoryRepository;

    public List<Date> getWorkDays(Long userId, int year, int month) {
        return exerciseHistoryRepository.findAllDatesByUserAndYearMonth(userId, year, month);
    }


    public List<List<Map<String,Object>>> getAllDayData(Long userId, Date date) {
        List<UserExerciseHistory> exerciseList = exerciseHistoryRepository.findAllByUserAndDate(userId, date);
        List<FoodData> foodDataList = nutritionHistoryRepository.findAllByUserAndDate(userId, (java.sql.Date) date);

        List<Map<String, Object>> exerciseListRes = new ArrayList<>();
        for(UserExerciseHistory exerciseHistory: exerciseList) {
            Map<String, Object> exerciseMap = new HashMap<>();
            exerciseMap.put("exerciseName", exerciseHistory.getExerciseName());
            exerciseMap.put("sets", exerciseHistory.getSets());
            exerciseMap.put("reps", exerciseHistory.getReps());
            exerciseListRes.add(exerciseMap);
        }

        List<Map<String, Object>> foodListRes = new ArrayList<>();
        for(FoodData foodData: foodDataList) {
            Map<String, Object> foodMap = new HashMap<>();
            foodMap.put("foodName", foodData.getFoodName());
            foodMap.put("carbohydrates", foodData.getCarbohydrates());
            foodMap.put("protein", foodData.getProtein());
            foodMap.put("energy", foodData.getEnergy());
            foodListRes.add(foodMap);
        }

        List<List<Map<String,Object>>> allDayData = new ArrayList<>();
        allDayData.add(exerciseListRes);
        allDayData.add(foodListRes);
        return allDayData;

    }
}
