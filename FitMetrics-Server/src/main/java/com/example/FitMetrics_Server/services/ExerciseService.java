package com.example.FitMetrics_Server.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class ExerciseService {

    @Value("${exercises.base-url}")
    private String baseApiUrl;

    @Value("${X-Rapidapi-Key}")
    private String apiKey;

    @Value("${X-Rapidapi-Host}")
    private String apiHost;

    private final RestTemplate restTemplate = new RestTemplate();

    public String getExercises() {
        // Set headers
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Rapidapi-Key", apiKey);
        headers.set("X-Rapidapi-Host", apiHost);

        // Create entity
        HttpEntity<String> entity = new HttpEntity<>(null, headers);

        // Make the GET request
        ResponseEntity<String> response = restTemplate.exchange(
                baseApiUrl + "/exercises",
                HttpMethod.GET,
                entity,
                String.class
        );

        return response.getBody();
    }
    public String getExerciseById(String exerciseID){
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Rapidapi-Key", apiKey);
        headers.set("X-Rapidapi-Host", apiHost);

        // Create entity
        HttpEntity<String> entity = new HttpEntity<>(null, headers);

        // Make the GET request
        ResponseEntity<String> response = restTemplate.exchange(
                baseApiUrl + "/exercise/" + exerciseID,
                HttpMethod.GET,
                entity,
                String.class
        );

        return response.getBody();
    }
    public String getFilteredExercises(Map<String, String> filters) {
        // Build query parameters dynamically
        StringBuilder url = new StringBuilder(baseApiUrl + "/exercises/filter?");
        filters.forEach((key, value) -> url.append(key).append("=").append(value).append("&"));

        // Remove the trailing "&" if it exists
        String finalUrl = url.substring(0, url.length() - 1);

        // Set headers
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Rapidapi-Key", apiKey);
        headers.set("X-Rapidapi-Host", apiHost);

        // Create entity
        HttpEntity<String> entity = new HttpEntity<>(null, headers);

        // Make the GET request
        ResponseEntity<String> response = restTemplate.exchange(
                finalUrl,
                HttpMethod.GET,
                entity,
                String.class
        );

        return response.getBody();
    }



}
