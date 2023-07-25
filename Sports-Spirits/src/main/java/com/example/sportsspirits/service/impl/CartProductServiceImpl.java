package com.example.sportsspirits.service.impl;

import com.example.sportsspirits.models.CartProduct;
import com.example.sportsspirits.models.ShoppingCart;
import com.example.sportsspirits.models.exceptions.CartProcuctNotExistsException;
import com.example.sportsspirits.models.exceptions.CartProductNotFoundException;
import com.example.sportsspirits.repository.CartProductRepository;
import com.example.sportsspirits.service.CartProductService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartProductServiceImpl implements CartProductService {

    private final CartProductRepository cartProductRepository;

    public CartProductServiceImpl(CartProductRepository cartProductRepository) {
        this.cartProductRepository = cartProductRepository;
    }

    @Override
    public CartProduct findAllByShoppingCartIdAndProductId(Long shoppingCartId, Long productId){
        CartProduct cartProduct = this.cartProductRepository
                .findByShoppingCartIdAndProductId(shoppingCartId,productId);
        return cartProduct;
    }

    @Override
    public CartProduct save(CartProduct cartProduct) {
        return this.cartProductRepository.save(cartProduct);
    }

    @Override
    public List<CartProduct> findAll() {
        return this.cartProductRepository.findAll();
    }

    @Override
    public CartProduct findById(Long cartId) {
        return this.cartProductRepository.findById(cartId)
                .orElseThrow(()-> new CartProductNotFoundException(cartId));
    }

    @Override
    public void delete(Long cartId) {
        CartProduct cartProduct = this.findById(cartId);
        this.cartProductRepository.delete(cartProduct);
    }
}
