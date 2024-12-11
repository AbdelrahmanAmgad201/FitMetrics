package com.example.FitMetrics_Server.controllers;


import com.example.FitMetrics_Server.services.AuthService;
import com.example.FitMetrics_Server.services.RegistrationService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class RegistrationController {

    @Autowired
    private AuthService authService;

    @Autowired
    private RegistrationService registrationService;


    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, Object> userdata) {
        try {
            String username = (String) userdata.get("username");
            String password = (String) userdata.get("password");
            // Registering user
            Long id = registrationService.registerUser(username, password);




            String jwt = authService.generateJWT(id, username);
            Claims claims = authService.parseToken(jwt);
            System.out.println("Successfully registered"
                    + "\nID: " + claims.getId()
                    + "\nSubject: " + claims.getSubject()
                    + "\nExpiration: " + claims.getExpiration()
                    + "\nIssued At: " + claims.getIssuedAt()
            );
            return ResponseEntity.ok(Map.of("jwt", jwt));
        } catch(Exception e) {
            System.out.println("Error registering user: " + e.getMessage());
            return ResponseEntity.badRequest().body("Error registering user");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, Object> userdata) {
        try {
            String username = (String) userdata.get("username");
            String password = (String) userdata.get("password");
            // Login user
            // TODO: login user
            // creating jwt
            Long id = registrationService.login(username, password);
            String jwt = authService.generateJWT(id, username);
            System.out.println("Successfully logged in user with id: " + id + " and username: " + username);
            return ResponseEntity.ok(Map.of("jwt", jwt));
        } catch(Exception e) {
            System.out.println("Error logging in user: " + e.getMessage());
            return ResponseEntity.badRequest().body("Error logging in user");
        }
    }

    @PostMapping("/post-data")
    public ResponseEntity<?> postData( @RequestHeader("Authorization") String token, @RequestBody Map<String, Object> userdata) {
        try {
            token = token.replace("Bearer ", "");
            Claims claims = authService.parseToken(token);
            Long id = Long.parseLong(claims.getId());
            // parse data from request
            String firstName = (String) userdata.get("firstName");
            String lastName = (String) userdata.get("lastName");
            boolean isKg = (boolean) userdata.get("isKg");
            Double weight = (Double) userdata.get("weight");
            Double height = (Double) userdata.get("height");
            LocalDate dateOfBirth = LocalDate.parse((String) userdata.get("dateOfBirth"));
            // save data to database
            registrationService.postData(id, firstName, lastName, isKg, weight, height, dateOfBirth);

            System.out.println("Successfully saved data for user with id: " + id + " and username: " + claims.getSubject() + " with weight: " + weight  + " in " + (isKg ? "Kg" : "Lbs") +
                    " and height: " + height + " first name: " + firstName + " last name: " + lastName + " date of birth: " + dateOfBirth);
            return ResponseEntity.ok("Data saved successfully");
        } catch(Exception e) {
            System.out.println("Error saving data: " + e.getMessage());
            return ResponseEntity.badRequest().body("Error saving data");
        }
    }
}

