package com.example.sportsspirits.service;

import com.example.sportsspirits.models.User;
import com.example.sportsspirits.models.exceptions.UserNotFoundException;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;
import java.util.Optional;

public interface UserService extends UserDetailsService {
    User findById(String userId);
    User registerUser(User user);

    List<User> findAll();

    void deleteById(String username);

   boolean existsByEmail(String email);
}
