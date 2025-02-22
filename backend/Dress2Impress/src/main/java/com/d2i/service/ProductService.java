package com.d2i.service;

import com.d2i.ApiClientOkHttp;
import com.d2i.dto.ProductDto;
import com.d2i.model.Product;
import com.d2i.repository.ProductRepository;
import org.springframework.stereotype.Service;
import com.google.gson.Gson;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final Gson gson = new Gson();

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> saveProductsFromAPI(String imageUrl) {
        try {
            System.out.println("Calling API with URL: " + imageUrl);
            String jsonResponse = ApiClientOkHttp.getApiResponse(imageUrl, 1, 5);
            System.out.println("API Response received: " + jsonResponse);
            
            ProductDto[] productsDto = gson.fromJson(jsonResponse, ProductDto[].class);
            List<Product> products = new ArrayList<>();

            for (ProductDto dto : productsDto) {
                Double currentPrice = dto.getPrice().getValue().getCurrent();
                Product product = new Product();
                product.setName(dto.getName());
                product.setPrice(currentPrice);
                product.setUrl(dto.getLink());
                product.setBrand(dto.getBrand());
                products.add(product);
            }

            System.out.println("Saving " + products.size() + " products to database");
            return productRepository.saveAll(products);
            
        } catch (Exception e) {
            System.err.println("Error processing API response: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Error al procesar la respuesta de la API: " + e.getMessage());
        }
    }

    // Recuperar todos los productos
    public List<Product> getAllProducts() {
      return productRepository.findAll();
    }
    // Recuperar productos dentro de un rango de IDs
    public List<Product> getProductsInRange(Long startId, Long endId) {
      return productRepository.findByIdBetween(startId, endId);
    }

    // Recuperar un único producto por ID
    public Product getProductById(Long id) {
        Optional<Product> product = productRepository.findById(id);
        return product.orElse(null); // Si no existe el producto, retorna null
    }

    public void deleteAllProducts() {
        productRepository.deleteAll();
    }
}
