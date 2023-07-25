package com.example.sportsspirits.models.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class CartProcuctNotExistsException extends RuntimeException {
    public CartProcuctNotExistsException(Long cartProductId) {
        super(String.format("Cart product id %d not exists!!",cartProductId));
    }
}
