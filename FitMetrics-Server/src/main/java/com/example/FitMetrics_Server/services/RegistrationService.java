package com.example.FitMetrics_Server.services;

import com.example.FitMetrics_Server.entities.User;
import com.example.FitMetrics_Server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class RegistrationService {

    @Autowired
    private UserRepository userRepository;

    // BCryptPasswordEncoder instance for hashing passwords
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Register User with password hashing
    public Long registerUser(String userName, String password) throws Exception {
        // Check if the user already exists
        if (userRepository.findByUserName(userName).isPresent()) {
            throw new Exception("User already exists");
        }

        User user = new User();
        user.setUserName(userName);
        user.setHashedPassword(passwordEncoder.encode(password)); // Hash the password before saving
        return userRepository.save(user).getId();
    }




    public boolean postData(Long userId, String firstName, String lastName, Boolean UserPreference, Double weight, Double height, LocalDate dateOfBirth) throws RuntimeException {

        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            user.get().setFirstName(firstName);
            user.get().setLastName(lastName);
            user.get().setUserPreference(UserPreference);
            user.get().setDateOfBirth(dateOfBirth);
//            user.get().setWeight(weight);
//            user.get().setHeight(height);
            System.out.println("PREFERENCE: " + user.get().getUserPreference());
            userRepository.save(user.get());
            return true;
        }
        throw new RuntimeException("User not found");
    }

    public Long login(String userName, String password) {
        Optional<User> user = userRepository.findByUserName(userName);

      if (user.isPresent() && passwordEncoder.matches(password, user.get().getHashedPassword())) {
            return user.get().getId();  // Return the user ID if password matches
        }

        // Throw exception if invalid login
        throw new RuntimeException("Invalid username or password");
    }
}
