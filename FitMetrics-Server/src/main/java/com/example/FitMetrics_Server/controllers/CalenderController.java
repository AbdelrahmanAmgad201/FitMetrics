package com.example.FitMetrics_Server.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/calender")
public class CalenderController {

    @GetMapping("/work-days")
    public ResponseEntity<?> getWorkDays() {
        return ResponseEntity.ok("Monday, Tuesday, Wednesday, Thursday, Friday");
    }

    @GetMapping("/all-day-data")
    public ResponseEntity<?> getAllDayData() {
        return ResponseEntity.ok("All day data");
    }

}
