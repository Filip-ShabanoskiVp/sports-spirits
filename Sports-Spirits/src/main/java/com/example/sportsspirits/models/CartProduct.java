package com.example.sportsspirits.models;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;


@Data
@Entity
@Table(name = "cart_products")
public class CartProduct {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private ShoppingCart shoppingCartId;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Product productId;

    private int quantity;
}
