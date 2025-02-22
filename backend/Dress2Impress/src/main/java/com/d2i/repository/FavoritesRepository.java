package com.d2i.repository;

import com.d2i.model.User;
import com.d2i.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoritesRepository extends JpaRepository<User, Long> {
}
