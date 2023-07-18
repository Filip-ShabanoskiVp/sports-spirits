package com.example.sportsspirits.presentation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/Handball")
public class HandballController {

    @GetMapping
    public String handballHomePage(){
        return "handballHomePage";
    }
}
