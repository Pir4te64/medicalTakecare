// app/home/profile/_layout.tsx
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LectorLAyout = () => {
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
  }, [window.location.href]);
  return (
    <Stack>
      {/* Perfil Screen */}
      <Stack.Screen
        name="index" // Perfil principal
        options={{
          title: "Envio de Archivo",
          headerStyle: { backgroundColor: "blue" },
          headerTintColor: "#fff", // Asegura buen contraste en el header
        }}
      />
      <Stack.Screen
        name="detalles" // Perfil principal
        options={{
          title: "Detalles",
          headerStyle: { backgroundColor: selectedColor },
          headerTintColor: "#000", // Asegura buen co
        }}
      />
    </Stack>
  );
};

export default LectorLAyout;
