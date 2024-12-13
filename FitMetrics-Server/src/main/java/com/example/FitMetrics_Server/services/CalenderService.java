package com.example.FitMetrics_Server.services;

import com.example.FitMetrics_Server.entities.Exercise;
import com.example.FitMetrics_Server.entities.FoodData;
import com.example.FitMetrics_Server.repositories.ExerciseHistoryRepository;
import com.example.FitMetrics_Server.repositories.NutritionHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@Service
public class CalenderService {

    @Autowired
    ExerciseHistoryRepository exerciseHistoryRepository;
    @Autowired
    NutritionHistoryRepository nutritionHistoryRepository;

    public List<Date> getWorkDays(Long userId, int year, int month) {
        return exerciseHistoryRepository.findAllDatesByUserAndYearMonth(userId, year, month);
    }


    public List<List<Object>> getAllDayData(Long userId, Date date) {
        List<Exercise> exerciseList = exerciseHistoryRepository.findAllByUserAndDate(userId, date);
        List<FoodData> foodDataList = nutritionHistoryRepository.findAllByUserAndDate(userId, (java.sql.Date) date);

        List<List<Object>> allDayData = new ArrayList<>();
        allDayData.add(Collections.singletonList(exerciseList));
        allDayData.add(Collections.singletonList(foodDataList));

        return allDayData;

    }
}
