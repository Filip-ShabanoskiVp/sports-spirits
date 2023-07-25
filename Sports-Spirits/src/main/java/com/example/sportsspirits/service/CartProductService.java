package com.example.sportsspirits.service;


import com.example.sportsspirits.models.CartProduct;
import com.example.sportsspirits.models.ShoppingCart;

import java.util.List;
import java.util.Optional;

public interface CartProductService {

    CartProduct findAllByShoppingCartIdAndProductId(Long shoppingCartId, Long productId);
    CartProduct save(CartProduct cartProduct);

    List<CartProduct> findAll();

    CartProduct findById(Long cartId);

    void delete(Long cartId);
}
