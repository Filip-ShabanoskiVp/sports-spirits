package com.example.sportsspirits.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "grade")
public class Grade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private float grade;

}
