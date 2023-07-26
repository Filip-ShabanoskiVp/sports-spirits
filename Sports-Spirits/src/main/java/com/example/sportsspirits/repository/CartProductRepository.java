package com.example.sportsspirits.repository;

import com.example.sportsspirits.models.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartProductRepository extends JpaRepository<CartItem,Long> {

    @Query("select cp from CartItem as cp where cp.shoppingCartId = :shoppingCartId and cp.productId = :productId")
    CartItem findByShoppingCartIdAndProductId(@Param("shoppingCartId")  Long shoppingCartId,
                                                 @Param("productId") Long productId);
}
