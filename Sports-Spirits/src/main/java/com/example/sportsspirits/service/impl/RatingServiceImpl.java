package com.example.sportsspirits.service.impl;

import com.example.sportsspirits.models.Ratings;
import com.example.sportsspirits.models.User;
import com.example.sportsspirits.repository.RatingRepository;
import com.example.sportsspirits.service.AuthService;
import com.example.sportsspirits.service.RatingService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingServiceImpl implements RatingService {

    private final RatingRepository ratingRepository;

    private final AuthService authService;

    public RatingServiceImpl(RatingRepository ratingRepository, AuthService authService) {
        this.ratingRepository = ratingRepository;
        this.authService = authService;
    }

    @Override
    public Ratings rateUs(Ratings ratings) {
        return this.ratingRepository.save(ratings);
    }

    @Override
    public List<Ratings> findAll() {
        return this.ratingRepository.findAll();
    }

    @Override
    public boolean ExistByUser(String username) {
        User user = this.authService.getCurrentUser();
        return this.ratingRepository.existsByUser(user);
    }
}
