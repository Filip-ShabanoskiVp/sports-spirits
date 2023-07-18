package com.example.sportsspirits.service.impl;

import com.example.sportsspirits.models.Manufacturer;
import com.example.sportsspirits.models.exceptions.ManufacturerNotFoundException;
import com.example.sportsspirits.repository.ManufacturerRepository;
import com.example.sportsspirits.service.ManufacturerService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ManufacturerServiceImpl implements ManufacturerService {

    private final ManufacturerRepository manufacturerRepository;

    public ManufacturerServiceImpl(ManufacturerRepository manufacturerRepository) {
        this.manufacturerRepository = manufacturerRepository;
    }

    @Override
    public List<Manufacturer> findAll() {
        return this.manufacturerRepository.findAll();
    }

    @Override
    public List<Manufacturer> findAllByName(String name) {
        return null;
    }

    @Override
    public Manufacturer findById(Long id) {
        return this.manufacturerRepository.findById(id)
                .orElseThrow(()->new ManufacturerNotFoundException(id));
    }

    @Override
    public Manufacturer save(Manufacturer manufacturer) {
        return this.manufacturerRepository.save(manufacturer);
    }

    @Override
    public Manufacturer update(Long id, Manufacturer manufacturer) {
        return null;
    }

    @Override
    public void deleteById(Long id) {
        Manufacturer manufacturer = this.findById(id);
        this.manufacturerRepository.delete(manufacturer);
    }
}
