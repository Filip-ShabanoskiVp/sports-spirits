package com.example.sportsspirits.service;


import com.example.sportsspirits.models.CartItem;
import com.example.sportsspirits.models.ShoppingCart;

import java.util.List;
import java.util.Optional;

public interface CartProductService {

    CartItem findAllByShoppingCartIdAndProductId(Long shoppingCartId, Long productId);
    CartItem save(CartItem cartProduct);

    List<CartItem> findAll();

    CartItem findById(Long cartId);

    void delete(Long cartId);
}
