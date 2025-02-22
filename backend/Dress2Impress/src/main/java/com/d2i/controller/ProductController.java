package com.d2i.controller;

import com.d2i.model.Product;
import com.d2i.service.ProductService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/saveProducts")
    public ResponseEntity<String> saveProducts(@RequestParam String imageUrl) {
        try {
          productService.saveProductsFromAPI(imageUrl);
        } catch (IOException e) {
          // TODO Auto-generated catch block
          e.printStackTrace();
        }
        return ResponseEntity.ok("Productos guardados en la base de datos.");
    }
    // Método GET para recuperar todos los productos
    @GetMapping
    public List<Product> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return products;
    }
    // Método GET para recuperar productos dentro de un rango de IDs
    @GetMapping("/productsRange")
    public List<Product> getProductsInRange(@RequestParam Long startId, @RequestParam(required = false) Long endId) {
        if (endId != null) {
            List<Product> products = productService.getProductsInRange(startId, endId);
            return products;
        } else {
            Product product = productService.getProductById(startId);
            return List.of(product);
        }
    }
}
