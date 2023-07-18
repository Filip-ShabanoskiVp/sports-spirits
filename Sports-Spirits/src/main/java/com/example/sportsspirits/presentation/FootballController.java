package com.example.sportsspirits.presentation;

import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
@Controller
@RequestMapping("/Football")
public class FootballController {

    @GetMapping
    public String footballPage(){
        return "footballHomePage";
    }

    @GetMapping("league/{id}/{type}")
    public String League(Model model, @PathVariable Long id, @PathVariable String type){
        model.addAttribute("id",id);
        model.addAttribute("type",type);
        return "league";
    }

    @GetMapping("team/{teamId}")
    public String Team(@PathVariable Long teamId, Model model){
        model.addAttribute("teamId",teamId);
        return "team";
    }

    @GetMapping("team/{teamId}/transfers")
    public String TeamTrensfers(@PathVariable Long teamId, Model model){
        model.addAttribute("teamId",teamId);
        return "teamTransfers";
    }

    @GetMapping("player/{playerId}")
    public String Player(@PathVariable Long playerId, Model model){
        model.addAttribute("playerId",playerId);
        return "player";
    }

    @GetMapping("coach/{coachId}")
    public String Coach(@PathVariable Long coachId, Model model){
        model.addAttribute("coachId",coachId);
        return "coach";
    }

    @GetMapping("team/{teamId}/results")
    public String TeamResult(@PathVariable Long teamId, Model model){
        model.addAttribute("teamId",teamId);
        model.addAttribute("matchPlay","results");
        return "matches";
    }

    @GetMapping("team/{teamId}/schedules")
    public String TeamSchedules(@PathVariable Long teamId, Model model){
        model.addAttribute("teamId",teamId);
        model.addAttribute("matchPlay","schedules");
        return "matches";
    }

    @GetMapping("fixture/{fixtureId}/details")
    public String FixtureDetails(@PathVariable Long fixtureId, Model model){
        model.addAttribute("fixtureId",fixtureId);
        return "matchDetails";
    }

    @GetMapping("/competitions")
    public String Competitions(){
        return "competitions";
    }

}
