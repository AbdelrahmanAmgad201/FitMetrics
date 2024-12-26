package com.example.FitMetrics_Server.dtos;

import java.util.Date;

public class ExerciseHistoryDTO {
    private Date date;
    private int sets;
    private int reps;

    public ExerciseHistoryDTO(Date date, int sets, int reps) {
        this.date = date;
        this.sets = sets;
        this.reps = reps;
    }

    // Getters
    public Date getDate() { return date; }
    public int getSets() { return sets; }
    public int getReps() { return reps; }
}