package com.example.sportsspirits.presentation;

import com.example.sportsspirits.models.Grade;
import com.example.sportsspirits.models.Ratings;
import com.example.sportsspirits.models.User;
import com.example.sportsspirits.service.AuthService;
import com.example.sportsspirits.service.GradeService;
import com.example.sportsspirits.service.RatingService;
import com.example.sportsspirits.service.UserService;
import jakarta.validation.Valid;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;


@Controller
@RequestMapping("/aboutUs")
public class AboutUsController {

    private final RatingService ratingService;
    private final AuthService authService;

    private final UserService userService;

    private final GradeService gradeService;

    public AboutUsController(RatingService ratingService, AuthService authService, UserService userService, GradeService gradeService) {
        this.ratingService = ratingService;
        this.authService = authService;
        this.userService = userService;
        this.gradeService = gradeService;
    }

    @GetMapping
    public String AboutUsPage(Model model){


        Authentication authentication =  SecurityContextHolder.getContext().getAuthentication();
        if(authentication.getPrincipal()!="anonymousUser"){
            model.addAttribute("check",this.ratingService
                    .ExistByUser(this.authService.getCurrentUserId()));
        }
        if(this.ratingService.findAll().size()==0){
            model.addAttribute("rating","There is no any ratings");
        }else {
            List<Long> ids = new ArrayList<>();
            for (Ratings r : this.ratingService.findAll()){
                ids.add(r.getGrade().getId());
            }

            int count=0;
            float sum = 0;
            for (Long id : ids){
                for(Grade g: gradeService.findAll()){
                    if(id.equals(g.getId())){
                        count++;
                        sum += g.getGrade();
                    }
                }
            }
            float average = sum/(float) count;

            double scale = Math.pow(10, 2);
            average = (float) (Math.round(average * scale) / scale);

            model.addAttribute("rating", average);
        }
        return "aboutUs";
    }

    @GetMapping("/rateUs")
    @Secured("ROLE_USER")
    public String RateUsPage(Model model){
        model.addAttribute("grades",this.gradeService.findAll());
        model.addAttribute("username",this.authService.getCurrentUser());
        model.addAttribute("rating", new Ratings());
        return "rateUs";
    }

    @PostMapping("/rateUs")
    @Secured("ROLE_USER")
    public String RateUs(@Valid Ratings ratings, @RequestParam String username, Model model){
        Grade grade = this.gradeService.findById(ratings.getGrade().getId());
        ratings.setGrade(grade);
        User user = this.userService.findById(username);
        ratings.setUser(user);
        this.ratingService.rateUs(ratings);
        return "redirect:/aboutUs";
    }
}
