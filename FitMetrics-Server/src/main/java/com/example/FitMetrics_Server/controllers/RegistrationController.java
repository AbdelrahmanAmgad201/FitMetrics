package com.example.FitMetrics_Server.controllers;


import com.example.FitMetrics_Server.services.AuthService;
import com.example.FitMetrics_Server.services.RegistrationService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/user")
public class RegistrationController {

    @Autowired
    private AuthService authService;


    @PostMapping("/register")
    public Map<String, Object> registerUser(@RequestBody Map<String, Object> userdata) {
        String username = (String) userdata.get("username");
        System.out.println(username);

        // creating jwt
        Long id = 1L; // replace with actual user id from database
        String jwt = authService.generateJWT(id, username);
        Claims claims = authService.parseToken(jwt);
        System.out.println("Successfully registered"
                + "\nID: " + claims.getId()
                + "\nSubject: " + claims.getSubject()
                + "\nExpiration: " + claims.getExpiration()
                + "\nIssued At: " + claims.getIssuedAt()
        );
        return Map.of("jwt", jwt);
    }

    @PostMapping("/login")
    public Map<String, Object> loginUser(@RequestBody Map<String, Object> userdata) {
        System.out.println("Successfully logged in");
        return null;
    }

    @PostMapping("/post-data")
    public String postData(@RequestBody Map<String, Object> userdata) {
        System.out.println("Data posted successfully");
        return null;
    }
}

