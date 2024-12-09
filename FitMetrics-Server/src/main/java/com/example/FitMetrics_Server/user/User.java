package com.example.FitMetrics_Server.user;

import java.util.Date;

public class User {
    private int ID;
    private String first_name;
    private String last_name;
    private char gender; // 'M' or 'F'
    private String unit_preference;
    private Date date_of_birth;
    private String active_workout_plan;
    private String active_nutrition_plan;

    public User(int ID, String first_name, String last_name, char gender, String unit_preference, Date date_of_birth, String active_workout_plan, String active_nutrition_plan) {
        this.ID = ID;
        this.first_name = first_name;
        this.last_name = last_name;
        this.gender = gender;
        this.unit_preference = unit_preference;
        this.date_of_birth = date_of_birth;
        this.active_workout_plan = active_workout_plan;
        this.active_nutrition_plan = active_nutrition_plan;
    }

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public char getGender() {
        return gender;
    }

    public void setGender(char gender) {
        this.gender = gender;
    }

    public String getUnit_preference() {
        return unit_preference;
    }

    public void setUnit_preference(String unit_preference) {
        this.unit_preference = unit_preference;
    }

    public Date getDate_of_birth() {
        return date_of_birth;
    }

    public void setDate_of_birth(Date date_of_birth) {
        this.date_of_birth = date_of_birth;
    }

    public String getActive_workout_plan() {
        return active_workout_plan;
    }

    public void setActive_workout_plan(String active_workout_plan) {
        this.active_workout_plan = active_workout_plan;
    }

    public String getActive_nutrition_plan() {
        return active_nutrition_plan;
    }

    public void setActive_nutrition_plan(String active_nutrition_plan) {
        this.active_nutrition_plan = active_nutrition_plan;
    }
}
