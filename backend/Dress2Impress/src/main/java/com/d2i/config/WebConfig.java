package com.d2i.config; // Ajusta el paquete según tu estructura

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Permite acceso desde el frontend (React) en localhost:3000
        registry.addMapping("/api/**") // Rutas que comienzan con /api/
                .allowedOrigins("http://localhost:3000") // Origen del frontend en desarrollo
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Métodos permitidos
                .allowedHeaders("*"); // Permite cualquier header
    }
}
