package com.example.sportsspirits.service.impl;

import com.example.sportsspirits.models.Role;
import com.example.sportsspirits.models.User;
import com.example.sportsspirits.models.exceptions.*;
import com.example.sportsspirits.repository.RoleRepository;
import com.example.sportsspirits.repository.UserRepository;
import com.example.sportsspirits.service.AuthService;
import com.example.sportsspirits.service.UserService;
import jakarta.annotation.PostConstruct;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final UserService userService;

    private final PasswordEncoder passwordEncoder;

    private final RoleRepository roleRepository;

    public AuthServiceImpl(UserRepository userRepository, UserService userService,
                           PasswordEncoder passwordEncoder, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
    }

    @Override
    public User getCurrentUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    @Override
    public String getCurrentUserId() {
        return this.getCurrentUser().getUsername();
    }


    @Override
    public User signUpUser(String username, String password, String repeatedPassword,
                           String first_name, String last_name, String email) {
        if(!password.equals(repeatedPassword)){
            throw new PasswordDoesntMatchException();
        }
        User user = new User();
        user.setUsername(username);
        if(!email.matches("^([\\w]+)@([\\w]+)((\\.(\\w){2,})+)$")){
            throw new EmailWrongFormatException();
        }
        if(this.userService.existsByEmail(email)){
            throw new EmailAlreadyExistsException(email);
        }
        user.setEmail(email);
        if(!first_name.matches("^[A-Z][a-z]+")){
            throw new FirstNameWrongFormat();
        }
        user.setFirstName(first_name);
        if(!last_name.matches("^[A-Z][a-z]+")){
            throw new LastNameWrongFormat();
        }
        user.setLastName(last_name);
        if(this.roleRepository.findByName("ROLE_USER")==null){
            Role role = new Role();
            role.setName("ROLE_USER");
            this.roleRepository.save(role);
        }
        user.setPassword(passwordEncoder.encode(password));
        Role userRole = this.roleRepository.findByName("ROLE_USER");
        user.setRoles(Collections.singletonList(userRole));
        return this.userService.registerUser(user);
    }

    @PostConstruct
    public void init(){
        if(!this.userRepository.existsById("admin")){
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin"));
            admin.setFirstName("Admin");
            admin.setLastName("Admin");
            admin.setEmail("admin@gmial.com");
            Role role = new Role();
            role.setName("ROLE_ADMIN");
            this.roleRepository.save(role);
            Role adminRole = this.roleRepository.findByName("ROLE_ADMIN");
            admin.setRoles(Collections.singletonList(adminRole));
            this.userRepository.save(admin);
        }
    }

}
