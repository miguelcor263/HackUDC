package com.d2i.repository;

import com.d2i.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Puedes agregar métodos de consulta personalizados aquí, por ejemplo:
    // Optional<User> findByUsername(String username);
}
