package com.example.backend.service;

import com.example.backend.model.Favorite;
import com.example.backend.repository.FavoriteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.backend.model.Product;
import java.util.List;

@Service
public class FavoriteService {

    @Autowired
    private FavoriteRepository favoriteRepository;

    public Favorite saveFavorite(Favorite favorite) {
        return favoriteRepository.save(favorite);
    }

    public List<Product> getFavoriteProductsByUserId(Long userId) {
        return favoriteRepository.findProductsByUserId(userId);
    }
}
