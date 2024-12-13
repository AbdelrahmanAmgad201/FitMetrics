package com.example.FitMetrics_Server.controllers;

import com.example.FitMetrics_Server.services.FoodSimpleDto;
import com.example.FitMetrics_Server.services.USDAService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class USDAController {

    private final USDAService usdaService;

    public USDAController(USDAService usdaService) {
        this.usdaService = usdaService;
    }

    // Updated endpoint for searching foods
    @GetMapping("/search")
    public List<FoodSimpleDto> searchFoods(@RequestParam String query) {
        return usdaService.searchFoods(query);
    }
    // For testing GET http://localhost:8080/food/171119?format=abridged&nutrients=203
    // Endpoint for fetching food details by FDC ID
    @GetMapping("/food/{fdcId}")
    public String getFoodDetails(
            @PathVariable Long fdcId,
            @RequestParam(required = false, defaultValue = "abridged") String format){
        return usdaService.getFoodDetailsByFdcId(fdcId, format);
    }
}
