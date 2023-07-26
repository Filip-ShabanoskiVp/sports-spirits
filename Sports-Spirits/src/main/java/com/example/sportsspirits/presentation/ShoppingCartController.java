package com.example.sportsspirits.presentation;

import com.example.sportsspirits.models.CartItem;
import com.example.sportsspirits.models.Product;
import com.example.sportsspirits.models.ShoppingCart;
import com.example.sportsspirits.models.dto.ChargeRequest;
import com.example.sportsspirits.service.AuthService;
import com.example.sportsspirits.service.CartProductService;
import com.example.sportsspirits.service.ProductService;
import com.example.sportsspirits.service.ShoppingCartService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;


@Controller
@Secured("ROLE_USER")
@RequestMapping("/shopping-carts")
public class ShoppingCartController {

    @Value("${STRIPE_P_KEY}")
    private String publicKey;

    private final ShoppingCartService shoppingCartService;

    private final AuthService authService;

    private final ProductService productService;

    private final CartProductService cartProductService;


    public ShoppingCartController(ShoppingCartService shoppingCartService, AuthService authService,
                                  ProductService productService, CartProductService cartProductService) {
        this.shoppingCartService = shoppingCartService;

        this.authService = authService;
        this.productService = productService;
        this.cartProductService = cartProductService;
    }

    @GetMapping
    public String ShoppingCartPage(Model model){
        try {
            ShoppingCart shoppingCart = this.shoppingCartService
                    .findActiveShoppingCartByUsername(this.authService.getCurrentUserId());


            List<CartItem> products = this.cartProductService.findAll()
                    .stream().filter(c->c.getShoppingCartId()==shoppingCart)
                    .collect(Collectors.toList());


            float suma=0;
            for (CartItem p : products){
                suma +=  (p.getProductId().getCost()* p.getQuantity())*100;
            }
            int sum = Math.round(suma);

            model.addAttribute("shoppingCart",products);
            model.addAttribute("currency", "usd");
            model.addAttribute("amount",sum);
            model.addAttribute("publicKey",this.publicKey);
            return "shopping-cart";
        }catch (RuntimeException ex){
            return "redirect:/products?error="+ex.getLocalizedMessage();
        }
    }

    @PostMapping("/{productId}/add-product")
    public String addProductToShoppingCart(@PathVariable Long productId, @RequestParam int quantity){
        try {

            this.shoppingCartService.addProductToShoppingCart(authService.getCurrentUserId(),
                    productId,quantity);
        }catch (RuntimeException ex){
            return "redirect:/products?error="+ex.getLocalizedMessage();
        }
        Product product = this.productService.findById(productId);
        return "redirect:/products?message=Product with name:"+product.getName()+" is added to cart";
    }

    @PostMapping("/{productId}/remove-product")
    public String removeProductFromShoppingCart(@PathVariable Long productId, @RequestParam int quantity){
        this.shoppingCartService.removeProductFromShoppingCart(authService.getCurrentUserId(),
                productId, quantity);
        Product product = this.productService.findById(productId);
        return "redirect:/shopping-carts?message=Product with name:"+product.getName()+" is removed from cart";
    }

    @PostMapping("/cancel")
    public String cancelShoppingCart(){
        this.shoppingCartService.cancelActiveShoppingCart(authService.getCurrentUserId());
        return "redirect:/products?message=Shopping cart is canceled!";
    }

    @PostMapping
    public String checkout(ChargeRequest chargeRequest){
        try {
            ShoppingCart shoppingCart = this.shoppingCartService.checkoutShoppingCart(this.authService.getCurrentUserId(),
                    chargeRequest);
            return "redirect:/products?message=Successful Payment";
        }catch (RuntimeException ex){
            return "redirect:/shopping-cart?error=" + ex.getLocalizedMessage();
        }
    }
}