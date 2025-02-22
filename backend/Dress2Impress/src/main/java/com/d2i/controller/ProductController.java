package com.d2i.controller;

import com.d2i.service.ProductService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/users")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/saveProducts")
    public ResponseEntity<String> saveProducts(@RequestParam String imageUrl) {
        productService.saveProductsFromAPI(imageUrl);
        return ResponseEntity.ok("Productos guardados en la base de datos.");
    }
}
