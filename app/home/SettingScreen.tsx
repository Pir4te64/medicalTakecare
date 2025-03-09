import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import SettingsComponent from "@/components/Configs/Config"; // Importamos el componente de configuración

export default function SettingScreen() {
  return (
    <View style={styles.container}>
      {/* Encabezado con gradiente */}
      <LinearGradient
        colors={["#2470ec", "#005bb5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        {/* Si en el futuro agregas contenido, se centrará automáticamente */}
      </LinearGradient>

      {/* Contenido de la configuración */}
      <View style={styles.content}>
        <SettingsComponent />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Contenedor principal que ocupa toda la pantalla
  container: {
    flex: 1,
  },
  // Encabezado que ocupa un 30% de la pantalla (ajustable)
  header: {
    flex: 0.7,
    justifyContent: "center", // Centrado vertical
    alignItems: "center", // Centrado horizontal (útil si agregas contenido)
    paddingHorizontal: 20,
    paddingTop: 40, // Para no solaparlo con el status bar
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden", // Para que los bordes redondeados se apliquen correctamente
  },
  // Contenedor para el resto del contenido
  content: {
    flex: 0.3,
  },
});
