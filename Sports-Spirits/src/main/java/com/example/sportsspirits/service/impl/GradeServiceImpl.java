package com.example.sportsspirits.service.impl;

import com.example.sportsspirits.models.Grade;
import com.example.sportsspirits.models.exceptions.GradeNotFoundException;
import com.example.sportsspirits.repository.GradeRepository;
import com.example.sportsspirits.service.GradeService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GradeServiceImpl implements GradeService {

    private final GradeRepository gradeRepository;

    public GradeServiceImpl(GradeRepository gradeRepository) {
        this.gradeRepository = gradeRepository;
    }

    @Override
    public List<Grade> findAll() {
        return this.gradeRepository.findAll();
    }

    @Override
    public Grade findById(Long id) {
        return this.gradeRepository.findById(id)
                .orElseThrow(()->new GradeNotFoundException(id));
    }
}
