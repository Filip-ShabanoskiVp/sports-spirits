package com.example.sportsspirits.models.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class FirstNameWrongFormat extends RuntimeException {

    public FirstNameWrongFormat(){
        super("Format of First Name is wrong!");
    }
}
