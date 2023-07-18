package com.example.sportsspirits.service;

import com.example.sportsspirits.models.User;

public interface AuthService {

    User getCurrentUser();

    String getCurrentUserId();


    User signUpUser(String username, String password, String repeatedPassword,
                    String first_name,String last_name,
                    String email,String embg);
}
