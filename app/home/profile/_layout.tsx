// app/home/profile/_layout.tsx
import React, { useState, useEffect } from "react";
import { Stack } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileLayout = () => {
  // Estado para guardar el color seleccionado (valor por defecto)
  const [selectedColor, setSelectedColor] = useState("#0066cc");

  useEffect(() => {
    const fetchColor = async () => {
      try {
        const color = await AsyncStorage.getItem("selectedColor");
        if (color) {
          setSelectedColor(color);
        }
      } catch (error) {
        console.error("Error al obtener el color:", error);
      }
    };

    fetchColor();
  }, []);

  return (
    <Stack>
      {/* Perfil Screen */}
      <Stack.Screen
        name="index"
        options={{
          title: "Perfil",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "#fff", // Asegura buen contraste en el header
        }}
      />
      {/* Pantalla para registrar información con color dinámico en el header */}
      <Stack.Screen
        name="informacion"
        options={{
          title: "Registro Información",
          headerStyle: { backgroundColor: "orange" },
          headerTintColor: "#fff", // Asegura buen contraste en el header
        }}
      />
      <Stack.Screen
        name="detalle"
        options={{
          title: "Información Detalle",
        }}
      />
      <Stack.Screen
        name="contactos"
        options={{
          title: "Contactos",
          headerStyle: { backgroundColor: "red" },
          headerTintColor: "#fff", // Asegura buen contraste en el header
        }}
      />
      <Stack.Screen
        name="historial"
        options={{
          title: "Historial",
        }}
      />
      <Stack.Screen
        name="visual"
        options={{
          title: "Visual",
          headerStyle: { backgroundColor: "#9B26B6" },
          headerTintColor: "#fff", // Asegura buen contraste en el header
        }}
      />
    </Stack>
  );
};

export default ProfileLayout;
