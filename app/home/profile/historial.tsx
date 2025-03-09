import React, { useEffect } from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Afiliado } from "@/utils/types";
import HistorialMedico from "@/components/HistorialMedico/HistorialMedico";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Historial = () => {
  const { afiliado } = useLocalSearchParams();

  let afiliadoData: Afiliado | null = null;
  try {
    afiliadoData = afiliado ? JSON.parse(afiliado as string) : null;
  } catch (error) {
    console.error("Error al parsear afiliado:", error);
  }

  if (!afiliadoData) {
    return (
      <View style={styles.container}>
        <Text>No se encontró información del afiliado.</Text>
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.contentContainer}
    >
      <HistorialMedico afiliado={afiliadoData} />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flexGrow: 1,
    padding: 20,
  },
});

export default Historial;
