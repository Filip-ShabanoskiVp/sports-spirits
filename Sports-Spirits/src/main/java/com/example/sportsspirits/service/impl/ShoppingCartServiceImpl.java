package com.example.sportsspirits.service.impl;

import com.example.sportsspirits.models.Product;
import com.example.sportsspirits.models.ShoppingCart;
import com.example.sportsspirits.models.User;
import com.example.sportsspirits.models.dto.ChargeRequest;
import com.example.sportsspirits.models.enumerations.CartStatus;
import com.example.sportsspirits.models.exceptions.*;
import com.example.sportsspirits.repository.ShoppingCartRepository;
import com.example.sportsspirits.service.PaymentService;
import com.example.sportsspirits.service.ProductService;
import com.example.sportsspirits.service.ShoppingCartService;
import com.example.sportsspirits.service.UserService;
import com.stripe.exception.*;
import com.stripe.model.Charge;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ShoppingCartServiceImpl implements ShoppingCartService {

    private final ProductService productService;
    private final ShoppingCartRepository shoppingCartRepository;
    private final UserService userService;

    private final PaymentService paymentService;

    public ShoppingCartServiceImpl(ProductService productService, ShoppingCartRepository shoppingCartRepository, UserService userService, PaymentService paymentService) {
        this.productService = productService;
        this.shoppingCartRepository = shoppingCartRepository;
        this.userService = userService;
        this.paymentService = paymentService;
    }

    @Override
    public ShoppingCart findActiveShoppingCartByUsername(String userId) {
        return this.shoppingCartRepository.findByUserUsernameAndStatus(userId, CartStatus.Created)
                .orElseThrow(()->new ShoppingCartIsNotActiveException(userId));
    }

    @Override
    public ShoppingCart createNewShoppingCart(String userId) {
        User user = this.userService.findById(userId);
        if(this.shoppingCartRepository.existsByUserUsernameAndStatus(user.getUsername(),CartStatus.Created)){
            throw new ShoppingCartIsAlreadyCreated(userId);
        }
        ShoppingCart shoppingCart = new ShoppingCart();
        shoppingCart.setUser(user);
        return this.shoppingCartRepository.save(shoppingCart);
    }

    @Override
    @Transactional
    public ShoppingCart addProductToShoppingCart(String userId, Long productId) {
        ShoppingCart shoppingCart = this.getActiveShoppingCart(userId);
        Product product = this.productService.findById(productId);
        for (Product p : shoppingCart.getProducts()){
            if(p.getId().equals(product.getId())){
                throw new ProductIsAlreadyInShoppingCart(p.getName());
            }
        }
        shoppingCart.getProducts().add(product);
        return this.shoppingCartRepository.save(shoppingCart);
    }

    @Override
    public ShoppingCart removeProductFromShoppingCart(String userId, Long productId) {
        ShoppingCart shoppingCart = this.getActiveShoppingCart(userId);
        shoppingCart.setProducts(shoppingCart.getProducts().stream().filter(product -> !product.getId().equals(productId))
                .collect(Collectors.toList()));
        return this.shoppingCartRepository.save(shoppingCart);
    }

    @Override
    public ShoppingCart getActiveShoppingCart(String userId) {
        return this.shoppingCartRepository.findByUserUsernameAndStatus(userId,CartStatus.Created)
                .orElseGet(()->{
                    ShoppingCart shoppingCart = new ShoppingCart();
                    User user = this.userService.findById(userId);
                    shoppingCart.setUser(user);
                    return this.shoppingCartRepository.save(shoppingCart);
                });
    }

    @Override
    public ShoppingCart cancelActiveShoppingCart(String userId) {
        ShoppingCart shoppingCart = this.shoppingCartRepository
                .findByUserUsernameAndStatus(userId,CartStatus.Created)
                .orElseThrow(()->new ShoppingCartIsNotActiveException(userId));
        shoppingCart.setStatus(CartStatus.Canceled);
        return this.shoppingCartRepository.save(shoppingCart);
    }

    @Override
    public ShoppingCart checkoutShoppingCart(String username, ChargeRequest chargeRequest) {
        ShoppingCart shoppingCart = this.shoppingCartRepository
                .findByUserUsernameAndStatus(username,CartStatus.Created)
                .orElseThrow(()->new ShoppingCartIsNotActiveException(username));
        List<Product> products = shoppingCart.getProducts();

        float price = 0;

        for (Product p : products){
            if(p.getQuantity()<=0){
                throw new ProductOutOfStockException(p.getName());
            }
            p.setQuantity(p.getQuantity()-1);
            price += p.getCost();
        }
        Charge charge = null;
        try {
            charge =this.paymentService.charge(chargeRequest);
        } catch (APIConnectionException | APIException | AuthenticationException |
                 InvalidRequestException | CardException e) {
            throw new TransactionalFailedException(username,e.getMessage());
        }
        shoppingCart.setProducts(products);
        shoppingCart.setStatus(CartStatus.Finished);
        return this.shoppingCartRepository.save(shoppingCart);
    }
}
