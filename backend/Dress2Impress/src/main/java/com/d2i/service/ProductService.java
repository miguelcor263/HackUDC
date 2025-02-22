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

    public void saveProductsFromAPI(String imageUrl) {
        // Llamar a la API y obtener la respuesta en formato JSON
        String jsonResponse = ApiClientOkHttp.getApiResponse(imageUrl, null, null);

        // Convertir el JSON a una lista de ProductDto
        ProductDto[] productsDto = gson.fromJson(jsonResponse, ProductDto[].class);
        List<Product> products = new ArrayList<>();

        for (ProductDto dto : productsDto) {
            // Obtener el precio actual (algunas entradas pueden no tener "original")
            Double currentPrice = dto.getPrice().getValue().getCurrent();

            // Mapear a la entidad Product
            Product product = new Product();
            product.setName(dto.getName());
            product.setPrice(currentPrice);
            product.setUrl(dto.getLink());
            product.setBrand(dto.getBrand());

            products.add(product);
        }

        // Guardar los productos en la base de datos
        productRepository.saveAll(products);
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
}
