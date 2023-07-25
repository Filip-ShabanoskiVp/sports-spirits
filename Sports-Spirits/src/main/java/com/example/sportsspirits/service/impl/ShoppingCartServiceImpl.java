package com.example.sportsspirits.service.impl;

import com.example.sportsspirits.models.Product;
import com.example.sportsspirits.models.ShoppingCart;
import com.example.sportsspirits.models.User;
import com.example.sportsspirits.models.dto.ChargeRequest;
import com.example.sportsspirits.models.enumerations.CartStatus;
import com.example.sportsspirits.models.exceptions.*;
import com.example.sportsspirits.repository.ShoppingCartRepository;
import com.example.sportsspirits.service.*;
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


    public ShoppingCartServiceImpl(ProductService productService,
                                   ShoppingCartRepository shoppingCartRepository,
                                   UserService userService, PaymentService paymentService) {
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
    public ShoppingCart addProductToShoppingCart(String userId, Long productId,int quantity) {

        ShoppingCart shoppingCart = this.getActiveShoppingCart(userId);
        Product product = this.productService.findById(productId);

        for (Product p : shoppingCart.getProducts()){
            if(p.getId().equals(product.getId())){
                throw new ProductIsAlreadyInShoppingCart(p.getName());
            }
        }
        product.setQuantity(product.getQuantity()-quantity);

        shoppingCart.getProducts().add(product);
        return this.shoppingCartRepository.save(shoppingCart);
    }

    @Override
    @Transactional
    public ShoppingCart removeProductFromShoppingCart(String userId, Long productId,int quantity) {
        ShoppingCart shoppingCart = this.getActiveShoppingCart(userId);

        Product p = this.productService.findById(productId);

        shoppingCart.setProducts(shoppingCart.getProducts().stream()
                .filter(product -> !product.getId().equals(productId))
                .collect(Collectors.toList()));

        p.setQuantity(p.getQuantity()+quantity);

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

        Product product = null;

        if(shoppingCart.getProducts().size()>0){
            for (Product sc : shoppingCart.getProducts()){
                product = this.productService.findById(sc.getId());
                product.setQuantity(product.getQuantity()+1);
            }
        }
        shoppingCart.setStatus(CartStatus.Canceled);

        return this.shoppingCartRepository.save(shoppingCart);
    }

    @Override
    @Transactional
    public ShoppingCart checkoutShoppingCart(String username, ChargeRequest chargeRequest) {
        ShoppingCart shoppingCart = this.shoppingCartRepository
                .findByUserUsernameAndStatus(username, CartStatus.Created)
                .orElseThrow(() -> new ShoppingCartIsNotActiveException(username));

        List<Product> products = shoppingCart.getProducts();

        float price = 0;

        for (Product product : products) {

            price += product.getCost();
        }
        Charge charge = null;
        try {
            charge = this.paymentService.charge(chargeRequest);
        } catch (CardException | APIException | AuthenticationException | APIConnectionException | InvalidRequestException e) {
            throw new TransactionalFailedException(username, e.getMessage());
        }

        shoppingCart.setProducts(products);
        shoppingCart.setStatus(CartStatus.Finished);
        return this.shoppingCartRepository.save(shoppingCart);
    }

    @Override
    public List<ShoppingCart> findAll() {
        return this.shoppingCartRepository.findAll();
    }
}
