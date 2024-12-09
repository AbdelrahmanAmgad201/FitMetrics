package com.example.FitMetrics_Server;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class USDAController {

    private final USDAService usdaService;

    public USDAController(USDAService usdaService) {
        this.usdaService = usdaService;
    }
    // For testing GET http://localhost:8080/search?query=MEAT
    // Endpoint for searching foods
    @GetMapping("/search")
    public String searchFoods(@RequestParam String query) {
        return usdaService.searchFoods(query);
    }
    // For testing GET http://localhost:8080/food/171119?format=abridged&nutrients=203
    // Endpoint for fetching food details by FDC ID
    @GetMapping("/food/{fdcId}")
    public String getFoodDetails(
            @PathVariable Long fdcId,
            @RequestParam(required = false, defaultValue = "abridged") String format,
            @RequestParam(required = false, defaultValue = "203") Integer nutrients) {
        return usdaService.getFoodDetailsByFdcId(fdcId, format, nutrients);
    }
}
