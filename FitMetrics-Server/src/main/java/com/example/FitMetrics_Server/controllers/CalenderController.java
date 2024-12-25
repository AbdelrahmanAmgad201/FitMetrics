package com.example.FitMetrics_Server.controllers;

import com.example.FitMetrics_Server.services.AuthService;
import com.example.FitMetrics_Server.services.CalenderService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.Map;

@RestController
@RequestMapping("/calender")
@CrossOrigin(origins = "http://localhost:5173")
public class CalenderController {

    @Autowired
    private CalenderService calenderService;
    @Autowired
    private AuthService authService;

    // Changed to POST instead of GET to accept request body
    @PostMapping("/work-days")
    public ResponseEntity<?> getWorkDays(@RequestHeader("Authorization") String token, @RequestBody Map<String, Object> userdata) {
        try {
            token = token.replace("Bearer ", "");
            Claims claims = authService.parseToken(token);
            Long userId = Long.parseLong(claims.getId());
            int year = (int) userdata.get("year");
            int month = (int) userdata.get("month");
            return ResponseEntity.ok(calenderService.getWorkDays(userId, year, month));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error getting work days: " + e.getMessage());
        }
    }

    // Changed to POST instead of GET to accept request body
    @PostMapping("/all-day-data")
    public ResponseEntity<?> getAllDayData(@RequestHeader("Authorization") String token, @RequestBody Map<String, Object> userdata) {
        try {
            token = token.replace("Bearer ", "");
            Claims claims = authService.parseToken(token);
            Long userId = Long.parseLong(claims.getId());
            Date date = Date.valueOf((String) userdata.get("date"));
            return ResponseEntity.ok(calenderService.getAllDayData(userId, date));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error getting all day data: " + e.getMessage());
        }
    }

    @GetMapping("/is-today-recorded")
    public ResponseEntity<?> isTodayRecorded(@RequestHeader("Authorization") String token) {
        try {
            token = token.replace("Bearer ", "");
            Claims claims = authService.parseToken(token);
            Long userId = Long.parseLong(claims.getId());
            return ResponseEntity.ok(calenderService.isTodayRecorded(userId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error checking if today is recorded: " + e.getMessage());
        }
    }


    @PostMapping("/record-today")
    public ResponseEntity<?> recordToday(@RequestHeader("Authorization") String token, @RequestBody Map<String, Object> userdata) {
        try {
            token = token.replace("Bearer ", "");
            Claims claims = authService.parseToken(token);
            Long userId = Long.parseLong(claims.getId());

            double weight = (double) userdata.get("weight");
            double height = (double) userdata.get("height");
            return ResponseEntity.ok(calenderService.recordTodayWeightHeight(userId, weight, height));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error recording today: " + e.getMessage());
        }
    }

}
