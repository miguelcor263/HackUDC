package com.d2i;

import okhttp3.*;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

public class ApiClientOkHttp {

    private static final String token = "eyJ0eXAiOiJKV1QiLCJraWQiOiJZMjZSVjltUFc3dkc0bWF4NU80bDBBd2NpSVE9IiwiYWxnIjoiUlMyNTYifQ.eyJhdF9oYXNoIjoib01JYUVUWTFYUFRIM1BCTjdIUU1MUSIsInN1YiI6Im9hdXRoLW1rcGxhY2Utb2F1dGh2c2N5bWFwc2x4Y2p3cGttcmJwcm9wcm8iLCJhdWRpdFRyYWNraW5nSWQiOiJhOTEwMzY2ZC01ZWM5LTQ5ZWMtYTU5Mi1mZDc1Y2M4N2M2NDYtMTI0MTE1NzkyIiwiY3VzdG9tIjp7ImNvbnN1bWVyT3JnSWQiOiJqYXZpcnIuMjAwM19nbWFpbC5jb20iLCJtYXJrZXRwbGFjZUNvZGUiOiJvcGVuLWRldmVsb3Blci1wb3J0YWwiLCJtYXJrZXRwbGFjZUFwcElkIjoiMTlkYjAzNmMtN2JhOS00ODA5LTljYTctZDc4NjE2M2ZlZWJhIn0sImlzcyI6Imh0dHBzOi8vYXV0aC5pbmRpdGV4LmNvbTo0NDMvb3BlbmFtL29hdXRoMi9pdHhpZC9pdHhpZG1wIiwidG9rZW5OYW1lIjoiaWRfdG9rZW4iLCJ1c2VySWQiOiJvYXV0aC1ta3BsYWNlLW9hdXRodnNjeW1hcHNseGNqd3BrbXJicHJvcHJvIiwiYXVkIjoib2F1dGgtbWtwbGFjZS1vYXV0aHZzY3ltYXBzbHhjandwa21yYnByb3BybyIsImlkZW50aXR5VHlwZSI6InNlcnZpY2UiLCJhenAiOiJvYXV0aC1ta3BsYWNlLW9hdXRodnNjeW1hcHNseGNqd3BrbXJicHJvcHJvIiwiYXV0aF90aW1lIjoxNzQwMjM4MjU3LCJzY29wZSI6Im1hcmtldCB0ZWNobm9sb2d5LmNhdGFsb2cucmVhZCBvcGVuaWQiLCJyZWFsbSI6Ii9pdHhpZC9pdHhpZG1wIiwidXNlclR5cGUiOiJleHRlcm5hbCIsImV4cCI6MTc0MDI0MTg1NywidG9rZW5UeXBlIjoiSldUVG9rZW4iLCJpYXQiOjE3NDAyMzgyNTcsImF1dGhMZXZlbCI6IjEifQ.XTTkJrMdyYY7jlN9KkbapdL9IHKwNPRbylY3O-O1bt4-_qmSIa9smc7SWzJlO7PNh1iVmSDUMHPygwqaBa3WDaY0-q1u268mGafXVm1AEnh6xaeY334sbUoLzgr1E8rYZEAHbbCZ5gbVC2MjW7uHylCf--gKrR3Hptxa_GY03ziwft6u0sMdk_bTqFovMYXx0VIjzjWUg5h9346k7-pesKym41187Iadm9MUnFVX4mOP6AHJ0QygXxCR4DxjFvVVDpbs5fMP6mhSutEqjnfHmnt-P4krk3Pf_KFpvpsEZobPSaMm2FD90gx9tLGDFa1VmsPiTD0alz1nBpJMxeHtSw"; // Reemplaza con tu token real

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
                System.out.println("Error en la petición: " + response.code());
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
