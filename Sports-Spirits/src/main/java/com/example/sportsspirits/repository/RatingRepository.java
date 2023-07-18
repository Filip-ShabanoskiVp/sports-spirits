package com.example.sportsspirits.repository;

import com.example.sportsspirits.models.Ratings;
import com.example.sportsspirits.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RatingRepository extends JpaRepository<Ratings,Long> {
    boolean existsByUser(User user);
}
