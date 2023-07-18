package com.example.sportsspirits.presentation;

import com.example.sportsspirits.models.Manufacturer;
import com.example.sportsspirits.service.ManufacturerService;
import jakarta.validation.Valid;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@Secured("ROLE_ADMIN")
@RequestMapping("/add-manufacturer")
public class ManufacturerController {
    private final ManufacturerService manufacturerService;

    public ManufacturerController(ManufacturerService manufacturerService) {
        this.manufacturerService = manufacturerService;
    }

    @GetMapping
    public String addManufacturer(Model model){
        model.addAttribute("manufacturer",new Manufacturer());
        return "add-manufacturer";
    }

    @PostMapping
    public String saveManufacturer(@Valid Manufacturer manufacturer){
        this.manufacturerService.save(manufacturer);
        return "redirect:/products/add-new";
    }
}
