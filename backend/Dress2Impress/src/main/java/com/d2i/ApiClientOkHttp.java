package com.d2i;

import okhttp3.*;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

public class ApiClientOkHttp {

    private static final String token = "eyJ0eXAiOiJKV1QiLCJraWQiOiJZMjZSVjltUFc3dkc0bWF4NU80bDBBd2NpSVE9IiwiYWxnIjoiUlMyNTYifQ..."; // Reemplaza con tu token real

    public static String getApiResponse(String imageUrl, int page, int perPage) {
        OkHttpClient client = new OkHttpClient();

        String url = "https://api.inditex.com/pubvsearch/products?"
                + "image=" + encodeParam(imageUrl)
                + "&page=" + page
                + "&perPage=" + perPage;

        Request request = new Request.Builder()
                .url(url)
                .addHeader("Authorization", "Bearer " + token)
                .addHeader("Content-Type", "application/json")
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (response.isSuccessful() && response.body() != null) {
                // Guardar la respuesta en una variable antes de imprimirla
                String jsonResponse = response.body().string();
                System.out.println("Respuesta de la API: " + jsonResponse);

                // Normalizar la respuesta: si es un objeto {}, convertirlo en un array []
                if (jsonResponse.trim().startsWith("{")) {
                    return "[" + jsonResponse + "]"; // Lo envolvemos en un array
                } else if (jsonResponse.trim().startsWith("[")) {
                    return jsonResponse; // Ya es un array, lo devolvemos tal cual
                } else {
                    return "{\"error\": \"Formato inesperado en la respuesta\"}";
                }
            } else {
                return "{\"error\": \"Error en la petición: " + response.code() + "\"}";
            }
        } catch (IOException e) {
            e.printStackTrace();
            return "{\"error\": \"Error en la petición: " + e.getMessage() + "\"}";
        }
    }

    private static String encodeParam(String param) {
        try {
            return URLEncoder.encode(param, StandardCharsets.UTF_8.toString());
        } catch (Exception e) {
            e.printStackTrace();
            return param;
        }
    }
}
