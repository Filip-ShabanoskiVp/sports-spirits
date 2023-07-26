package com.example.sportsspirits.presentation;

import com.example.sportsspirits.models.Manufacturer;
import com.example.sportsspirits.models.Product;
import com.example.sportsspirits.models.ShoppingCart;
import com.example.sportsspirits.service.ManufacturerService;
import com.example.sportsspirits.service.ProductService;
import com.example.sportsspirits.service.ShoppingCartService;
import jakarta.validation.Valid;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;
    private final ManufacturerService manufacturerService;



    public ProductController(ProductService productService, ManufacturerService manufacturerService) {
        this.productService = productService;
        this.manufacturerService = manufacturerService;
    }

    @GetMapping
    public String ProductHomePage(Model model){
        List<Product> products = this.productService.findAll();
        model.addAttribute("products", products);
        return "product";
    }

    @GetMapping("/add-new")
    @Secured("ROLE_ADMIN")
    public String addProduct(Model model){
        List<Manufacturer> manufacturers = this.manufacturerService.findAll();
        model.addAttribute("manufacturers",manufacturers);
        model.addAttribute("product", new Product());
        return "add-product";
    }

    @Secured("ROLE_ADMIN")
    @PostMapping
    public String saveProduct(
            @RequestParam(required = false) Long id,
            @Valid Product product,
            BindingResult bindingResult,
            @RequestParam MultipartFile image,
            Model model) {

        if (bindingResult.hasErrors()) {
            List<Manufacturer> manufacturers = this.manufacturerService.findAll();
            model.addAttribute("manufacturers", manufacturers);
            return "add-product";
        }
        try {
            if(id!=null){
                this.productService.updateProduct(id,product,image);
            }else {
                this.productService.saveProduct(product, image);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "redirect:/products";
    }


    @PostMapping("/{id}/delete")
    @Secured("ROLE_ADMIN")
    public String deleteProduct(@PathVariable Long id){
        this.productService.deleteById(id);
        return "redirect:/products";
    }

    @GetMapping("/{id}/edit")
    @Secured("ROLE_ADMIN")
    public String editProductPage(Model model,@PathVariable Long id){
        try {

            Product product = this.productService.findById(id);
            List<Manufacturer>manufacturers = this.manufacturerService.findAll();
            model.addAttribute("manufacturers",manufacturers);
            model.addAttribute("product",product);
            return "edit-product";
        }catch (RuntimeException ex){
            return "redirect:/products?error="+ex.getLocalizedMessage();
        }
    }
}
