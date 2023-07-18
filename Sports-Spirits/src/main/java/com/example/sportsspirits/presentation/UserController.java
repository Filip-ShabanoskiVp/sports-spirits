package com.example.sportsspirits.presentation;

import com.example.sportsspirits.models.User;
import com.example.sportsspirits.service.AuthService;
import com.example.sportsspirits.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/user-profile")
public class UserController {

    private final AuthService authService;

    private final UserService userService;

    public UserController(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @GetMapping
    public String profilePage(Model model){
        User user = this.userService.findById(this.authService.getCurrentUserId());
        model.addAttribute("user",user);
        return "user-profile";
    }
}
