package com.d2i.service;

import com.d2i.model.Product;
import com.d2i.model.User;
import com.d2i.repository.ProductRepository;
import com.d2i.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FavoriteService {
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public FavoriteService(UserRepository userRepository, ProductRepository productRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    @Transactional
    public void addFavorite(Long userId, Long productId) {
        Optional<User> userOptional = userRepository.findById(userId);
        Optional<Product> productOptional = productRepository.findById(productId);

        if (userOptional.isPresent() && productOptional.isPresent()) {
            User user = userOptional.get();
            Product product = productOptional.get();
            user.getFavorites().add(product);
            userRepository.save(user);
        } else {
            throw new RuntimeException("User or Product not found");
        }
    }

    @Transactional
    public void removeFavorite(Long userId, Long productId) {
        Optional<User> userOptional = userRepository.findById(userId);
        Optional<Product> productOptional = productRepository.findById(productId);

        if (userOptional.isPresent() && productOptional.isPresent()) {
            User user = userOptional.get();
            Product product = productOptional.get();
            user.getFavorites().remove(product);
            userRepository.save(user);
        } else {
            throw new RuntimeException("User or Product not found");
        }
    }

    public List<Product> getUserFavorites(Long userId) {
        return userRepository.findById(userId).map(User::getFavorites).orElseThrow(() -> new RuntimeException("User not found"));
    }
}
