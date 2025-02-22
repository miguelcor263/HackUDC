package com.d2i.controller;

import com.d2i.model.Product;
import com.d2i.service.ProductService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/saveProducts")
    public ResponseEntity<?> saveProducts(@RequestBody ImageUrlRequest request) {
        try {
            System.out.println("Received request with URL: " + request.getImageUrl());
            List<Product> savedProducts = productService.saveProductsFromAPI(request.getImageUrl());
            System.out.println("Saved products: " + savedProducts.size());
            return ResponseEntity.ok(savedProducts);
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Error processing request: " + e.getMessage());
            return ResponseEntity.badRequest()
                .body("Error processing image: " + e.getMessage());
        }
    }

    // Add this class inside ProductController
    public static class ImageUrlRequest {
        private String imageUrl;
        
        public String getImageUrl() {
            return imageUrl;
        }
        
        public void setImageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
        }
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
        System.out.println("Fetching products in range: startId=" + startId + ", endId=" + endId);
        List<Product> products;
        if (endId == null) {
            products = productService.getProductsInRange(startId, Long.MAX_VALUE);
        } else {
            products = productService.getProductsInRange(startId, endId);
        }
        if (products == null) {
            System.out.println("No products found in the specified range.");
        } else {
            System.out.println("Found " + products.size() + " products.");
        }
        return products;
    }
}
