import React from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import AfiliadoInfo from "@/components/DetalleInformes/AfiliadoInfo";

const Detalle = () => {
  const { afiliado } = useLocalSearchParams();

  // Si 'afiliado' es un string, convertirlo en objeto
  const afiliadoData = afiliado ? JSON.parse(afiliado as string) : null;

  if (!afiliadoData) {
    return <Text>No se encontró información del afiliado.</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <AfiliadoInfo id={afiliadoData.id} /> {/* Pasamos solo el id */}
    </View>
  );
};

export default Detalle;
