package com.example.backend.controller;

import com.example.backend.model.Favorite;
import com.example.backend.model.Product;
import com.example.backend.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@CrossOrigin(origins = "http://localhost:3000")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    @PostMapping("/add")
    public ResponseEntity<?> addFavorite(@RequestBody Favorite favorite) {
        try {
            Favorite saved = favoriteService.saveFavorite(favorite);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getFavoritesByUserId(@PathVariable Long userId) {
        try {
            List<Product> favorites = favoriteService.getFavoriteProductsByUserId(userId);
            return ResponseEntity.ok(favorites);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
