package com.example.FitMetrics_Server.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class USDAService {

    @Value("${usda.api.key}")
    private String apiKey;

    @Value("${usda.api.search.url}")
    private String searchApiUrl;

    @Value("${usda.api.food.url}")
    private String foodApiUrl;

    private final RestTemplate restTemplate;

    public USDAService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    // Method to search foods
    public List<FoodSimpleDto> searchFoods(String query) {
        String url = UriComponentsBuilder.fromHttpUrl(searchApiUrl)
                .queryParam("query", query)
                .queryParam("api_key", apiKey)
                .queryParam("pageSize", 5)
                .queryParam("pageNumber", 1)
                .toUriString();

        String response = restTemplate.getForObject(url, String.class);

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode rootNode = objectMapper.readTree(response);
            JsonNode foodsNode = rootNode.path("foods");

            List<FoodSimpleDto> simpleFoods = new ArrayList<>();
            for (JsonNode foodNode : foodsNode) {
                // Extract nutrients
                FoodSimpleDto.NutrientInfo protein = null;
                FoodSimpleDto.NutrientInfo carbohydrates = null;
                FoodSimpleDto.NutrientInfo energy = null;

                JsonNode nutrientsNode = foodNode.path("foodNutrients");
                for (JsonNode nutrientNode : nutrientsNode) {
                    int nutrientId = nutrientNode.path("nutrientId").asInt();
                    double value = nutrientNode.path("value").asDouble();
                    String unitName = nutrientNode.path("unitName").asText();

                    switch (nutrientId) {
                        case 1003: // Protein
                            protein = new FoodSimpleDto.NutrientInfo(value, unitName);
                            break;
                        case 1005: // Carbohydrates
                            carbohydrates = new FoodSimpleDto.NutrientInfo(value, unitName);
                            break;
                        case 1008: // Energy
                            energy = new FoodSimpleDto.NutrientInfo(value, unitName);
                            break;
                    }
                }

                FoodSimpleDto simpleFood = new FoodSimpleDto(
                        foodNode.path("fdcId").asInt(),
                        foodNode.path("description").asText(),
                        protein,
                        carbohydrates,
                        energy
                );
                simpleFoods.add(simpleFood);
            }

            return simpleFoods;
        } catch (IOException e) {
            throw new RuntimeException("Error parsing food search response", e);
        }
    }

    // Method to fetch food details by FDC ID
    public String getFoodDetailsByFdcId(Long fdcId, String format) {
        String url = UriComponentsBuilder.fromHttpUrl(foodApiUrl + "/" + fdcId)
                .queryParam("format", format)
                .queryParam("api_key", apiKey)
                .toUriString();

        return restTemplate.getForObject(url, String.class);
    }
}