package com.d2i;

import okhttp3.*;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
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
              // Convertir explícitamente el cuerpo de la respuesta a String
              return response.body().string();
          } else {
              return "{\"error\": \"Error en la petición: " + response.code() + "\"}";
          }
      } catch (IOException e) {
          e.printStackTrace();
          return "{\"error\": \"Error en la petición: " + e.getMessage() + "\"}";
      }
  }

  // Método para codificar los parámetros URL de forma segura
  private static String encodeParam(String param) {
      try {
          return URLEncoder.encode(param, StandardCharsets.UTF_8.toString());
      } catch (UnsupportedEncodingException e) {
          e.printStackTrace();
          return param; // Si ocurre un error, devolver el parámetro original
      }
  }
}
