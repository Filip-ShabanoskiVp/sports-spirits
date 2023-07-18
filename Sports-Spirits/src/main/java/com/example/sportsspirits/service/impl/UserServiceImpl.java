package com.example.sportsspirits.service.impl;

import com.example.sportsspirits.models.ShoppingCart;
import com.example.sportsspirits.models.User;
import com.example.sportsspirits.models.enumerations.CartStatus;
import com.example.sportsspirits.models.exceptions.ShoppingCartIsNotActiveException;
import com.example.sportsspirits.models.exceptions.UserAlreadyExistsException;
import com.example.sportsspirits.models.exceptions.UserNotFoundException;
import com.example.sportsspirits.repository.ShoppingCartRepository;
import com.example.sportsspirits.repository.UserRepository;
import com.example.sportsspirits.service.UserService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final ShoppingCartRepository shoppingCartRepository;

    public UserServiceImpl(UserRepository userRepository, ShoppingCartRepository shoppingCartRepository) {
        this.userRepository = userRepository;
        this.shoppingCartRepository = shoppingCartRepository;
    }
    public User findById(String userId){
        return this.userRepository.findById(userId)
                .orElseThrow(()-> new UserNotFoundException(userId));
    }

    @Override
    public User registerUser(User user) {
        if(this.userRepository.existsById(user.getUsername())){
            throw new UserAlreadyExistsException(user.getUsername());
        }
        return this.userRepository.save(user);
    }

    @Override
    public List<User> findAll() {
        return this.userRepository.findAll();
    }

    @Override
    public void deleteById(String username) {
        User user = this.findById(username);
        if(this.shoppingCartRepository.existsByUserUsernameAndStatus(username,CartStatus.Created)){
            ShoppingCart shoppingCart = this.shoppingCartRepository
                    .findByUserUsernameAndStatus(username, CartStatus.Created)
                    .orElseThrow(()->new ShoppingCartIsNotActiveException(username));
            shoppingCart.setStatus(CartStatus.Canceled);
            this.shoppingCartRepository.save(shoppingCart);
        }
        user.setRoles(null);
        this.userRepository.deleteById(username);
    }

    @Override
    public boolean existsByEmail(String email) {
        return this.userRepository.existsByEmail(email);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return this.userRepository.findById(username)
                .orElseThrow(()->new UsernameNotFoundException(username));
    }
}
