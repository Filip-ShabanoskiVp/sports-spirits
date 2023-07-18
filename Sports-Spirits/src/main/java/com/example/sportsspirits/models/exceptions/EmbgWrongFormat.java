package com.example.sportsspirits.models.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class EmbgWrongFormat extends RuntimeException {

    public EmbgWrongFormat(){
        super("Format for Embg is wrong!!");
    }
}
