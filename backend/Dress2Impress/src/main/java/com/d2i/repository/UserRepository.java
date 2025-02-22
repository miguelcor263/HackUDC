package com.d2i.repository;

import com.d2i.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Método para buscar un usuario por su correo electrónico
    Optional<User> findByEmail(String email);
}
