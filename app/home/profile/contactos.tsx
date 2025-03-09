import React from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from "react-native";
import { useLocalSearchParams } from "expo-router";
import ContactosComponent from "@/components/Contactos/ContactosComponent";
import { Afiliado } from "@/utils/types";

const Contactos = () => {
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.scrollContainer}
      contentContainerStyle={styles.contentContainer}
    >
      <ContactosComponent afiliadoData={afiliadoData} />
    </KeyboardAvoidingView>
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

export default Contactos;
