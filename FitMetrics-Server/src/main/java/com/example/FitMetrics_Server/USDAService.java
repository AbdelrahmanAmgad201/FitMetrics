package com.example.FitMetrics_Server;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

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
    public String searchFoods(String query) {
        String url = UriComponentsBuilder.fromHttpUrl(searchApiUrl)
                .queryParam("query", query)
                .queryParam("api_key", apiKey)
                .toUriString();

        return restTemplate.getForObject(url, String.class);
    }

    // Method to fetch food details by FDC ID
    public String getFoodDetailsByFdcId(Long fdcId, String format, Integer nutrients) {
        String url = UriComponentsBuilder.fromHttpUrl(foodApiUrl + "/" + fdcId)
                .queryParam("format", format)
                .queryParam("nutrients", nutrients)
                .queryParam("api_key", apiKey)
                .toUriString();

        return restTemplate.getForObject(url, String.class);
    }
}
