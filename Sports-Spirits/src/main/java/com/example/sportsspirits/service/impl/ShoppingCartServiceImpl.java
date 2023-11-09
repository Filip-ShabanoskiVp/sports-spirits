package com.example.sportsspirits.service.impl;

import com.example.sportsspirits.models.CartItem;
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

    private final CartProductService cartProductService;


    public ShoppingCartServiceImpl(ProductService productService,
                                   ShoppingCartRepository shoppingCartRepository,
                                   UserService userService, PaymentService paymentService, CartProductService cartProductService) {
        this.productService = productService;
        this.shoppingCartRepository = shoppingCartRepository;
        this.userService = userService;
        this.paymentService = paymentService;
        this.cartProductService = cartProductService;
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
        List<Product> cartItemProducts = this.cartProductService.findAll()
                .stream().filter(c->c.getShoppingCartId()==shoppingCart)
                .map(c->c.getProductId()).collect(Collectors.toList());
        CartItem item = null;
        boolean find = false;
        for (Product p : cartItemProducts){
            if(p.getId().equals(product.getId())){
                find = true;

                this.cartProductService.findAll().stream().filter(c->c.getProductId()==product)
                        .forEach(c-> {
                            c.setQuantity(c.getQuantity()+quantity);
                        });

                p.setQuantity(p.getQuantity()-quantity);
            }
        }
        if(find==false) {
            item = new CartItem();
            item.setProductId(product);
            item.setShoppingCartId(shoppingCart);
            item.setQuantity(quantity);
            this.cartProductService.save(item);
            product.setQuantity(product.getQuantity() - quantity);
        }
        return this.shoppingCartRepository.save(shoppingCart);
    }

    @Override
    @Transactional
    public ShoppingCart removeProductFromShoppingCart(String userId, Long productId,int quantity) {
        ShoppingCart shoppingCart = this.getActiveShoppingCart(userId);

        Product p = this.productService.findById(productId);

        this.cartProductService.findAll().stream().filter(c->c.getProductId()==p
                && c.getShoppingCartId() ==shoppingCart).forEach(c->{
            c.setQuantity(c.getQuantity()-quantity);
        });
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
        List<CartItem> products = this.cartProductService.findAll()
                .stream().filter(c->c.getShoppingCartId()==shoppingCart)
                .collect(Collectors.toList());
        if(products.size()>0){
            for (CartItem item : products){
                product = this.productService.findById(item.getProductId().getId());
                if(item.getProductId()==product){
                    product.setQuantity(product.getQuantity()+item.getQuantity());
                }
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


        List<CartItem> products = this.cartProductService.findAll()
                .stream().filter(c->c.getShoppingCartId()==shoppingCart)
                .collect(Collectors.toList());

        float price = 0;

        for (CartItem item : products) {

            price += item.getProductId().getCost()*item.getQuantity();
        }
        Charge charge = null;
        try {
            charge = this.paymentService.charge(chargeRequest);
        } catch (CardException | APIException | AuthenticationException | APIConnectionException
                 | InvalidRequestException e) {
            throw new TransactionalFailedException(username, e.getMessage());
        }

        shoppingCart.setStatus(CartStatus.Finished);
        return this.shoppingCartRepository.save(shoppingCart);
    }

    @Override
    public List<ShoppingCart> findAll() {
        return this.shoppingCartRepository.findAll();
    }
}
