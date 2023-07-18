package com.example.sportsspirits.service;

import com.example.sportsspirits.models.Manufacturer;

import java.util.List;

public interface ManufacturerService {
    List<Manufacturer> findAll();
    List<Manufacturer> findAllByName(String name);
    Manufacturer findById(Long id);
    Manufacturer save(Manufacturer manufacturer);
    Manufacturer update(Long id, Manufacturer manufacturer);
    void deleteById(Long id);
}
