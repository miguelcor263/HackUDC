package com.d2i;

import com.d2i.controller.ProductController;
import com.d2i.model.User;
import com.d2i.repository.FavoriteRepository;
import com.d2i.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;


@SpringBootApplication
public class Dress2ImpressApplication {
	public static void main(String[] args) {
		SpringApplication.run(Dress2ImpressApplication.class, args);
	}

	@Bean
	public CommandLineRunner demoData(
			UserRepository userRepository,
			FavoriteRepository favoriteRepository,
			ProductController productController // Inyectamos el controlador
	) {
		return args -> {
			// Crear usuario y guardarlo primero
			User user = new User();
			user.setUsername("pablo");
			user.setPassword("1234");
			user.setEmail("pablo@example.com");
			user.setRole("admin");
			user = userRepository.save(user);  // Guardar usuario

			// Llamar al método del controlador para guardar productos desde la API
			String imageUrl = "https://static.zara.net/assets/public/7264/1cb1/3be84524adca/326063186123/08491054800-p/08491054800-p.jpg"; // URL de prueba
			productController.saveProducts(imageUrl);
		};
	}
}