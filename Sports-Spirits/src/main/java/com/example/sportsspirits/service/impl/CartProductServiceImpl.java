package com.example.sportsspirits.service.impl;

import com.example.sportsspirits.models.CartItem;
import com.example.sportsspirits.models.exceptions.CartProductNotFoundException;
import com.example.sportsspirits.repository.CartProductRepository;
import com.example.sportsspirits.service.CartProductService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartProductServiceImpl implements CartProductService {

    private final CartProductRepository cartProductRepository;

    public CartProductServiceImpl(CartProductRepository cartProductRepository) {
        this.cartProductRepository = cartProductRepository;
    }

    @Override
    public CartItem findAllByShoppingCartIdAndProductId(Long shoppingCartId, Long productId){
        CartItem cartProduct = this.cartProductRepository
                .findByShoppingCartIdAndProductId(shoppingCartId,productId);
        return cartProduct;
    }

    @Override
    public CartItem save(CartItem cartProduct) {
        return this.cartProductRepository.save(cartProduct);
    }

    @Override
    public List<CartItem> findAll() {
        return this.cartProductRepository.findAll();
    }

    @Override
    public CartItem findById(Long cartId) {
        return this.cartProductRepository.findById(cartId)
                .orElseThrow(()-> new CartProductNotFoundException(cartId));
    }

    @Override
    public void delete(Long cartId) {
        CartItem cartProduct = this.findById(cartId);
        this.cartProductRepository.delete(cartProduct);
    }
}
