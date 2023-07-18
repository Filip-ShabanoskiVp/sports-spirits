package com.example.sportsspirits.service;

import com.example.sportsspirits.models.ShoppingCart;
import com.example.sportsspirits.models.dto.ChargeRequest;

import java.util.List;

public interface ShoppingCartService {

    ShoppingCart findActiveShoppingCartByUsername(String userId);

    ShoppingCart createNewShoppingCart(String userId);

    ShoppingCart addProductToShoppingCart(String userId,
                                          Long productId);

    ShoppingCart removeProductFromShoppingCart(String userId,
                                               Long productId);

    ShoppingCart getActiveShoppingCart(String userId);

    ShoppingCart cancelActiveShoppingCart(String userId);

    ShoppingCart checkoutShoppingCart(String username, ChargeRequest chargeRequest);


}
