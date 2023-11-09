package com.example.sportsspirits.models;


import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;


import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    private LocalDateTime localDateTime = LocalDateTime.now();

    private String description;

    @Column(name = "image",columnDefinition = "LONGTEXT")
    private String productImage;

    @NotNull
    private int quantity;


    @NotNull
    @Min(value = 1,message = "Price must not be less then 1")
    private float cost;

    @NotNull(message = "Manufacturer must not be null")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @ManyToOne
    private Manufacturer manufacturer;

}
