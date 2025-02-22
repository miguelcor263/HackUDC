package com.d2i;

import com.d2i.model.Product;
import com.d2i.model.User;
import com.d2i.model.Favorite;
import com.d2i.repository.FavoriteRepository;
import com.d2i.repository.ProductRepository;
import com.d2i.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class Dress2ImpressApplication {
	public static void main(String[] args) {
		SpringApplication.run(Dress2ImpressApplication.class, args);
	}

	@Bean
	public CommandLineRunner demoData(UserRepository userRepository, ProductRepository productRepository, FavoriteRepository favoriteRepository) {
		return args -> {
			// Crear usuario y guardarlo primero
			User user = new User();
			user.setUsername("pablo");
			user.setPassword("1234");
			user.setEmail("pablo@example.com");
			user.setRole("admin");
			user = userRepository.save(user);  // Guardar usuario

			// Crear producto y guardarlo
			Product product = new Product();
			product.setName("GEOMETRIC JACQUARD SHIRT");
			product.setPrice(29.95);
			product.setBrand("zara");
			product = productRepository.save(product);  // Guardar producto

      Favorite favorites = new Favorite();
      favorites.setUser(user);
      favorites.setProduct(product);
      favorites = favoriteRepository.save(favorites);  // Guardar favorito

			// Mostrar en consola los favoritos del usuario
      List<Favorite> favorites_list = user.getFavorites();  // Esto es correcto
			System.out.println("Favoritos de " + user.getUsername() + ": " + favorites_list);
		};
	}
}
