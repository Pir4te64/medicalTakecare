// app/home/profile/_layout.tsx
import React from "react";
import { Stack } from "expo-router";

const ProfileLayout = () => {
  return (
    <Stack>
      {/* Perfil Screen */}
      <Stack.Screen
        name="index" // Perfil principal
        options={{
          title: "Perfil",
          headerShown: false, // No mostrar header en esta pantalla
        }}
      />
      <Stack.Screen
        name="informacion" // Pantalla para registrar información
        options={{
          title: "Registro Información", // Título personalizado
        }}
      />
      <Stack.Screen
        name="detalle" // Pantalla de detalle de la información
        options={{
          title: "Información Detalle", // Título personalizado
        }}
      />
      <Stack.Screen
        name="contactos" // Pantalla de detalle de la información
        options={{
          title: "Contactos", // Título personalizado
        }}
      />
      <Stack.Screen
        name="historial" // Pantalla de detalle de la información
        options={{
          title: "Historial", // Título personalizado
        }}
      />
      <Stack.Screen
        name="visual" // Pantalla de detalle de la información
        options={{
          title: "Visual", // Título personalizado
        }}
      />
    </Stack>
  );
};

export default ProfileLayout;
