package com.example.sportsspirits.presentation;

import com.example.sportsspirits.models.User;
import com.example.sportsspirits.service.UserService;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@Secured("ROLE_ADMIN")
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public String getAdminPage(Model model){
        List<User> users= this.userService.findAll();
        model.addAttribute("users",users);
        return "admin";
    }

    @PostMapping("/{username}/delete")
    public String deleteUser(@PathVariable String username){
        this.userService.deleteById(username);
        return "redirect:/admin";
    }
}
