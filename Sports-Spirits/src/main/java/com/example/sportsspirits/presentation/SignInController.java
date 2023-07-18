package com.example.sportsspirits.presentation;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/login")
public class SignInController {

    @GetMapping
    public String SignIn(@RequestParam(required = false)String info, Model model){
        model.addAttribute("info",info);
        return "signIn";
    }

}
