package com.example.FitMetrics_Server.services;

import com.example.FitMetrics_Server.repositories.ExerciseHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;
import java.util.List;

public class CalenderService {

    @Autowired
    ExerciseHistoryRepository exerciseHistoryRepository;

    public List<Date> getWorkDays() {
        return null;
    }
}
