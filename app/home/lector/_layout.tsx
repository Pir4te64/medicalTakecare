// app/home/profile/_layout.tsx
import React from "react";
import { Stack } from "expo-router";

const LectorLAyout = () => {
  return (
    <Stack>
      {/* Perfil Screen */}
      <Stack.Screen
        name="index" // Perfil principal
        options={{
          title: "Perfil",
        }}
      />
      <Stack.Screen
        name="detalles" // Perfil principal
        options={{
          title: "Detalles",
        }}
      />
    </Stack>
  );
};

export default LectorLAyout;
