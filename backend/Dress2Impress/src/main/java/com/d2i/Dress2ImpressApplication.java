package com.d2i;

import com.d2i.model.Product;
import com.d2i.controller.FavoriteController;
import com.d2i.controller.ProductController;
import com.d2i.controller.UserController;
import com.d2i.model.User;
import com.d2i.repository.FavoriteRepository;
import com.d2i.repository.UserRepository;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Dress2ImpressApplication {
	public static void main(String[] args) {
		SpringApplication.run(Dress2ImpressApplication.class, args);
	}
/*
	@Bean
	public CommandLineRunner demoData(
			UserRepository userRepository,
			FavoriteRepository favoriteRepository,
      UserController userController,
			ProductController productController, // Inyectamos el controlador
      FavoriteController favoriteController
	) {
		return args -> {
			// Crear usuario y guardarlo primero
			User user = new User();
			user.setUsername("pablo");
			user.setPassword("1234");
			user.setEmail("pablo@example.com");
			user.setRole("admin");
			userController.createUser(user);  // Guardar usuario

			 // Crear objeto ImageUrlRequest
            ProductController.ImageUrlRequest request = new ProductController.ImageUrlRequest();
            request.setImageUrl("https://static.zara.net/assets/public/7264/1cb1/3be84524adca/326063186123/08491054800-p/08491054800-p.jpg");
            productController.saveProducts(request);

      //List<Product> productOne = productController.getProductsInRange(1L, null);
      //System.out.println(productOne);
      //List<Product> productAll = productController.getAllProducts();
      //productAll.forEach(product -> System.out.println(product));
      //List<Product> productRange = productController.getProductsInRange(2L, 4L);
      //productRange.forEach(product -> System.out.println(product));

	    favoriteController.addFavorite(1L, 2L); 
      //favoriteController.addFavorite(1L, 3L);
      
      List<Product> favoriteList = favoriteController.getFavoritesByUserId(1L);
      favoriteList.forEach(product -> System.out.println(product));
		};
	}
    */
}