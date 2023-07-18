package com.example.sportsspirits.presentation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/Hockey")
public class HockeyController {

    @GetMapping
    public String hockeyHomePage(){
        return "hockeyHomePage";
    }
}
