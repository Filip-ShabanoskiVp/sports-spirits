package com.example.sportsspirits.models;



import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;



@Data
@Entity
@Table(name = "roles")
public class Role implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Override
    public String getAuthority() {
        return this.name;
    }
}
