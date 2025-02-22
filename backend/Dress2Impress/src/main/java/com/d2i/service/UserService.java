package com.d2i.service;

import com.d2i.model.User;
import com.d2i.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

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

    public User registerUser(String username, String password, String email) {
        // Verificar si el usuario ya existe
        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("El nombre de usuario ya está en uso");
        }
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("El email ya está registrado");
        }

        // Crear nuevo usuario
        User user = new User();
        user.setUsername(username);
        user.setPassword(password); // En una aplicación real, deberías encriptar la contraseña
        user.setEmail(email);

        return userRepository.save(user);
    }

    public User authenticateUser(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }
}
