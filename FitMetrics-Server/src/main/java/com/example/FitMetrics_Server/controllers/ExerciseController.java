package com.example.FitMetrics_Server.controllers;

import com.example.FitMetrics_Server.services.ExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ExerciseController {

    @Autowired
    private ExerciseService exerciseService;

    @GetMapping("/exercise/all")
    public String getExercises() {
        return exerciseService.getExercises();
    }

    @GetMapping("/exercise/{id}")
    public String getExerciseById(@PathVariable String id) {
        return exerciseService.getExerciseById(id);
    }

    @GetMapping("/exercises/filter")
    public String getFilteredExercises(
            @RequestParam(required = false) String mechanic,
            @RequestParam(required = false) String muscle,
            @RequestParam(required = false) String equipment,
            @RequestParam(required = false) String level,
            @RequestParam(required = false) String force) {

        // Collect filters into a map
        Map<String, String> filters = new HashMap<>();
        if (mechanic != null) filters.put("mechanic", mechanic);
        if (muscle != null) filters.put("muscle", muscle);
        if (equipment != null) filters.put("equipment", equipment);
        if (level != null) filters.put("level", level);
        if (force != null) filters.put("force", force);

        return exerciseService.getFilteredExercises(filters);
    }
}
