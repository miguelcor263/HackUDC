package com.d2i.repository;

import com.d2i.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Métodos de consulta personalizados si es necesario
    List<Product> findByIdBetween(Long startId, Long endId);
}
