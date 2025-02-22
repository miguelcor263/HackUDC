package com.d2i.controller;

import com.d2i.model.Favorite;
import com.d2i.model.Product;
import com.d2i.repository.FavoriteRepository;
import com.d2i.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/favorites")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    @PostMapping("/{userId}/products/{productId}")
    public void addFavorite(@PathVariable Long userId, @PathVariable Long productId) {
        favoriteService.addFavorite(userId, productId);
    }

    @GetMapping("/{userId}/products")
    public List<Product> getFavoritesByUserId(@PathVariable Long userId) {
        return favoriteService.getFavoritesByUserId(userId);
    }

  }
