package com.d2i.service;

import com.d2i.model.User;
import com.d2i.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Método para recuperar el usuario por correo electrónico
    public Optional<User> getUserByEmail(String email) {
        // Llama al repositorio para buscar un usuario por su correo electrónico
        return userRepository.findByEmail(email);
    }

    // Método para crear un nuevo usuario
    public User createUser(User user) {
        return userRepository.save(user);
    }

    // Método para obtener todos los usuarios
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }
}
