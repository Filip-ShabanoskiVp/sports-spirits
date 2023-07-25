package com.example.sportsspirits.models.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class CartProductNotFoundException extends RuntimeException{
    public CartProductNotFoundException(Long cartId) {
        super(String.format("Cart with id %d is not found",cartId));
    }
}
