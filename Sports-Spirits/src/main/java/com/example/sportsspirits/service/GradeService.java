package com.example.sportsspirits.service;


import com.example.sportsspirits.models.Grade;

import java.util.List;

public interface GradeService {

    List<Grade> findAll();

    Grade findById(Long id);
}
