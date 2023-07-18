package com.example.sportsspirits.service;

import com.example.sportsspirits.models.Product;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface ProductService {
    List<Product> findAll();
    Product findById(Long id);
    Product saveProduct(Product product, MultipartFile image) throws IOException;
    Optional<Product> updateProduct(Long id, Product product, MultipartFile image) throws IOException;
    void deleteById(Long id);
}
