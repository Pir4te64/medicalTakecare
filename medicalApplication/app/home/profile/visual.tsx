import { Afiliado } from "@/utils/types";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const Visual = () => {
  const { afiliado } = useLocalSearchParams();
  let afiliadoData: Afiliado | null = null;
  try {
    afiliadoData = afiliado ? JSON.parse(afiliado as string) : null;
  } catch (error) {
    console.error("Error al parsear afiliado:", error);
  }
  console.log(afiliado);

  if (!afiliadoData) {
    return (
      <View>
        <Text>No se encontró información del afiliado.</Text>
      </View>
    );
  }
  return (
    <View>
      <Text>Visual</Text>
    </View>
  );
};

export default Visual;
