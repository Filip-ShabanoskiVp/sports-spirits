package com.example.sportsspirits.service;


import com.example.sportsspirits.models.Ratings;

import java.util.List;

public interface RatingService {

    Ratings rateUs(Ratings ratings);

    List<Ratings> findAll();

    boolean ExistByUser(String username);
}
