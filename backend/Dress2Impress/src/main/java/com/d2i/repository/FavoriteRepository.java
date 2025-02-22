package com.d2i.repository;

import com.d2i.model.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    // Método para encontrar todos los favoritos de un usuario por su ID
    List<Favorite> findByUserId(Long userId);
}
