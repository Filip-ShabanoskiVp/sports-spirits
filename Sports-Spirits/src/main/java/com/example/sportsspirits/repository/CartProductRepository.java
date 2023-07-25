package com.example.sportsspirits.repository;

import com.example.sportsspirits.models.CartProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartProductRepository extends JpaRepository<CartProduct,Long> {

    @Query("select cp from CartProduct as cp where cp.shoppingCartId = :shoppingCartId and cp.productId = :productId")
    CartProduct findByShoppingCartIdAndProductId(@Param("shoppingCartId")  Long shoppingCartId,
                                                 @Param("productId") Long productId);
}
