package com.example.FitMetrics_Server.services;

import com.example.FitMetrics_Server.entities.FoodData;
import com.example.FitMetrics_Server.entities.User;
import com.example.FitMetrics_Server.entities.UserNutritionHistory;
import com.example.FitMetrics_Server.repositories.FoodDataRepository;
import com.example.FitMetrics_Server.repositories.NutritionHistoryRepository;
import com.example.FitMetrics_Server.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class UserNutritionHistoryService {
    @Autowired
    private NutritionHistoryRepository userNutritionHistoryRepository;

    @Autowired
    private FoodDataRepository foodDataRepository;

    @Autowired
    private UserRepository userRepository; // Assuming you have a UserRepository

    @Transactional
    public UserNutritionHistory addFoodToHistory(long userId, FoodData foodData) {
        // Find the user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Create or find the food data
        FoodData existingFoodData = foodDataRepository.findByFoodName(foodData.getFoodName());
        if (existingFoodData == null) {
            existingFoodData = foodDataRepository.save(foodData);
        }

        // Create nutrition history entry
        UserNutritionHistory nutritionHistory = new UserNutritionHistory();
        nutritionHistory.setUser(user);
        nutritionHistory.setFoodData(existingFoodData);
        nutritionHistory.setDate(new Date());

        return userNutritionHistoryRepository.save(nutritionHistory);
    }

    // Optional: Method to convert JSON to FoodData
    public FoodData convertJsonToFoodData(Map<String, Object> foodJson) {
        FoodData foodData = new FoodData();
        foodData.setFoodId(((Number) foodJson.get("fdcId")).longValue());
        foodData.setFoodName((String) foodJson.get("foodName"));

        Map<String, Object> proteinData = (Map<String, Object>) foodJson.get("protein");
        foodData.setProtein(((Number) proteinData.get("value")).doubleValue());

        Map<String, Object> carbData = (Map<String, Object>) foodJson.get("carbohydrates");
        foodData.setCarbohydrates(((Number) carbData.get("value")).doubleValue());

        Map<String, Object> energyData = (Map<String, Object>) foodJson.get("energy");
        foodData.setEnergy(((Number) energyData.get("value")).doubleValue());

        return foodData;
    }

    @Transactional
    public void deleteOneFoodEntryForToday(Long userId, Long foodId) {
        // Calculate start and end of today
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        Date startOfDay = calendar.getTime();

        calendar.add(Calendar.DAY_OF_MONTH, 1);
        Date endOfDay = calendar.getTime();

        // Find today's entries for this user and food
        List<UserNutritionHistory> todaysEntries = userNutritionHistoryRepository
                .findTodaysEntriesByUserAndFood(
                        userId,
                        foodId,
                        (java.sql.Date) new java.sql.Date(startOfDay.getTime()),
                        (java.sql.Date) new java.sql.Date(endOfDay.getTime())
                );

        // Delete one entry if found
        if (!todaysEntries.isEmpty()) {
            // Remove the first entry
            userNutritionHistoryRepository.delete(todaysEntries.get(0));
        } else {
            throw new RuntimeException("No matching food entry found for today");
        }
    }
}
