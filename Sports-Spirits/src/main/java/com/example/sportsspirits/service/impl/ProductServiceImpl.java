package com.example.sportsspirits.service.impl;

import com.example.sportsspirits.models.Manufacturer;
import com.example.sportsspirits.models.Product;
import com.example.sportsspirits.models.exceptions.ProductNotFoundException;
import com.example.sportsspirits.repository.ProductRepository;
import com.example.sportsspirits.service.ManufacturerService;
import com.example.sportsspirits.service.ProductService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ManufacturerService manufacturerService;

    public ProductServiceImpl(ProductRepository productRepository, ManufacturerService manufacturerService) {
        this.productRepository = productRepository;
        this.manufacturerService = manufacturerService;
    }

    @Override
    public List<Product> findAll() {
        return this.productRepository.findAll();
    }


    @Override
    public Product findById(Long id) {
        return this.productRepository.findById(id)
                .orElseThrow(()->new ProductNotFoundException(id));
    }

    @Override
    public Product saveProduct(Product product,MultipartFile image) throws IOException {
        Manufacturer manufacturer = this.manufacturerService.findById(product.getManufacturer().getId());
        product.setManufacturer(manufacturer);
        if(image!=null && !image.getName().isEmpty()){
            byte[] bytes = image.getBytes();
            String imageInBase64 = String.format("data:%s;base64,%s",image.getContentType(),
                    Base64.getEncoder().encodeToString(bytes));

            product.setProductImage(imageInBase64);
        }
        return this.productRepository.save(product);
    }

    @Override
    public Optional<Product> updateProduct(Long id, Product product, MultipartFile image) throws IOException {
        Product p = this.findById(id);
        Manufacturer manufacturer = this.manufacturerService.findById(product.getManufacturer().getId());
        p.setManufacturer(manufacturer);;
        p.setName(product.getName());
        p.setCost(product.getCost());
        p.setQuantity(product.getQuantity());
        p.setDescription(product.getDescription());
        if(image!=null && !image.isEmpty()){
            byte[] bytes = image.getBytes();
            String imageInBase64 = String.format("data:%s;base64,%s",image.getContentType(),
                    Base64.getEncoder().encodeToString(bytes));
            p.setProductImage(imageInBase64);
        }
        return Optional.of(this.productRepository.save(p));
    }

    @Override
    public void deleteById(Long id) {
        this.productRepository.deleteById(id);
    }
}
