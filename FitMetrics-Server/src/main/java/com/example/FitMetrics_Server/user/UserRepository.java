package com.example.FitMetrics_Server.user;

import com.example.FitMetrics_Server.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    // Custom query methods (e.g., findByEmail) can go here
    Optional<User> findByEmail(String email);
    public boolean save();
    public boolean deleteById();
    public boolean findById();

}