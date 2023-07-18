package com.example.sportsspirits.repository;

import com.example.sportsspirits.models.Manufacturer;
import org.springframework.context.annotation.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface ManufacturerRepository extends JpaRepository<Manufacturer, Long> {
}
