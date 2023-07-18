package com.example.sportsspirits.presentation;

import com.example.sportsspirits.service.AuthService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@PreAuthorize("!hasAnyRole('ROLE_ADMIN','ROLE_USE')")
@RequestMapping("/logup")
public class SignUpController {

    private final AuthService authService;

    public SignUpController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping
    public String SignUp() {
        return "signUp";
    }

    @PostMapping
    public String SignUp(@RequestParam String username, @RequestParam String password,
                         @RequestParam String repeatedPassword,
                         @RequestParam String first_name, @RequestParam String last_name,
                         @RequestParam String email, @RequestParam String embg) {
        try {
            this.authService.signUpUser(username, password, repeatedPassword, first_name, last_name, email, embg);
            return "redirect:/login?info=SuccessfulRegistration!";
        } catch (RuntimeException ex) {
            return "redirect:/logup?error=" + ex.getLocalizedMessage();
        }
    }
}
