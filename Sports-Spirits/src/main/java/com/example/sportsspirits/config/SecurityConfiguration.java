package com.example.sportsspirits.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth->auth
                .requestMatchers("/Football/**","/Hockey/**","/Handball/**","/Tennis/**","/Basketball/**",
                        "/products/**", "/home", "/assets/**", "/logup/**","/aboutUs").permitAll()
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()).formLogin(form->form
                .loginPage("/login").permitAll()
                        .failureUrl("/login?error=BadCredentials")
                        .defaultSuccessUrl("/user-profile", true))
                .logout(logout->logout
                .logoutUrl("/logout").permitAll().clearAuthentication(true)
                        .invalidateHttpSession(true).deleteCookies("JSESSIONID")
                        .logoutSuccessUrl("/login"))
                .exceptionHandling(exception->exception
                        .accessDeniedPage("/products?error=You are not authorized!"));
        return http.build();
    }
}
