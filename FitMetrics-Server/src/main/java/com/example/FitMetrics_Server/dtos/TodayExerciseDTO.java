package com.example.FitMetrics_Server.dtos;

public class TodayExerciseDTO {
    private Long id;
    private String exerciseName;
    private String exerciseId;
    private int plannedSets;
    private int plannedReps;
    private boolean completed;
    private int completedSets;
    private int completedReps;

    public TodayExerciseDTO(Long id, String exerciseName, String exerciseId,
                            int plannedSets, int plannedReps, boolean completed,
                            int completedSets, int completedReps) {
        this.id = id;
        this.exerciseName = exerciseName;
        this.exerciseId = exerciseId;
        this.plannedSets = plannedSets;
        this.plannedReps = plannedReps;
        this.completed = completed;
        this.completedSets = completedSets;
        this.completedReps = completedReps;
    }

    // Getters
    public Long getId() { return id; }
    public String getExerciseName() { return exerciseName; }
    public String getExerciseId() { return exerciseId; }
    public int getPlannedSets() { return plannedSets; }
    public int getPlannedReps() { return plannedReps; }
    public boolean isCompleted() { return completed; }
    public int getCompletedSets() { return completedSets; }
    public int getCompletedReps() { return completedReps; }
}