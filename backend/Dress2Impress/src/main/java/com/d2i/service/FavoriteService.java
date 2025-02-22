package com.d2i.service;

import com.d2i.model.Favorite;
import com.d2i.model.User;
import com.d2i.model.Product;
import com.d2i.repository.FavoriteRepository;
import com.d2i.repository.UserRepository;
import com.d2i.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FavoriteService {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    public void addFavorite(Long userId, Long productId) {
        // Recupera el usuario y el producto desde sus respectivos repositorios
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Crea un nuevo objeto Favorite
        Favorite favorite = new Favorite();
        favorite.setUser(user);
        favorite.setProduct(product);

        // Guarda el objeto Favorite en la base de datos
        favoriteRepository.save(favorite);
    }

    // Método para obtener los productos favoritos de un usuario
    public List<Product> getFavoritesByUserId(Long userId) {
        // Obtiene la lista de productos favoritos de un usuario
        List<Favorite> favorites = favoriteRepository.findByUserId(userId);

        // Extrae los productos de la lista de favoritos y los devuelve
        return favorites.stream()
                .map(Favorite::getProduct)  // Obtiene el producto de cada favorito
                .collect(Collectors.toList()); // Devuelve una lista de productos
    }
}
