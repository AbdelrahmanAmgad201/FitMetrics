package com.example.FitMetrics_Server.services;

import com.example.FitMetrics_Server.entities.User;
import com.example.FitMetrics_Server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RegistrationService {

    @Autowired
    private UserRepository userRepository;





    public Long registerUser(String userName, String password) throws Exception {
        if (userRepository.findByUserName(userName).isPresent()) {
            throw new Exception("User already exists");
        }

        User user = new User();
        user.setUserName(userName);
        user.setHashedPassword(password);
        return userRepository.save(user).getId();
    }




    public boolean postData(Long userId, String firstName, String lastName, Boolean UserPreference, Double weight, Double height) throws RuntimeException {

        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            user.get().setFirstName(firstName);
            user.get().setLastName(lastName);
            user.get().setUserPreference(UserPreference);
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
        if (user.isPresent() && user.get().getHashedPassword().equals(password)) {
            return user.get().getId();
        }
        throw new RuntimeException("Invalid username or password");
    }




}

