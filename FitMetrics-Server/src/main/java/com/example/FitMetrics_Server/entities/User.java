package com.example.FitMetrics_Server.entities;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;

    @Column(name = "user_name", nullable = false, unique = true)
    private String userName;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "hash_password", unique = true, nullable = false)
    private String hashedPassword;

    @Column(name = "user_preference")
    private Boolean userPreference;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<UserWeightHeight> userWeightHeightEntries;

    // Constructors
    public User() {
    }

    public User(String userName, String password, String firstName, String lastName, Boolean userPreference, LocalDate dateOfBirth) {
        this.userName = userName;
        this.hashedPassword = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userPreference = userPreference;
        this.dateOfBirth = dateOfBirth;
    }


    public User(String userName, String password) {
        this.userName = userName;
        this.hashedPassword = password;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
    public Long getId() {
        return user_id;
    }

    public void setId(Long id) {
        this.user_id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getHashedPassword() {
        return hashedPassword;
    }

    public void setHashedPassword(String hashedPassword) {
        this.hashedPassword = hashedPassword;
    }

    public Boolean getUserPreference() {
        return userPreference;
    }

    public void setUserPreference(Boolean userPreference) {
        this.userPreference = userPreference;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public List<UserWeightHeight> getUserWeightHeightEntries() {
        return userWeightHeightEntries;
    }

    public void setUserWeightHeightEntries(List<UserWeightHeight> userWeightHeightEntries) {
        this.userWeightHeightEntries = userWeightHeightEntries;
    }

//    public WorkoutPlan getActiveWorkoutPlan() {
//        return activeWorkoutPlan;
//    }
//
//    public void setActiveWorkoutPlan(WorkoutPlan activeWorkoutPlan) {
//        this.activeWorkoutPlan = activeWorkoutPlan;
//    }
//
//    public DietPlan getActiveDietPlan() {
//        return activeDietPlan;
//    }
//
//    public void setActiveDietPlan(DietPlan activeDietPlan) {
//        this.activeDietPlan = activeDietPlan;
//    }
}
