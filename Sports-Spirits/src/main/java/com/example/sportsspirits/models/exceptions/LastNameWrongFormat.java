package com.example.sportsspirits.models.exceptions;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class LastNameWrongFormat extends RuntimeException {

    public LastNameWrongFormat(){
        super("Format of Last Name is wrong!");
    }
}
