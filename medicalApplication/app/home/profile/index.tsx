import React, { useEffect, useState, useContext } from "react";
import { View, ScrollView, BackHandler, StyleSheet, Alert } from "react-native";
import ProfileInfo from "@/components/Profile/Profile"; // Asegúrate de importar el componente correctamente
import { AuthContext } from "@/utils/AuthProvider";
import { router } from "expo-router";

export default function ProfileScreen() {
  const { logout } = useContext(AuthContext); // Accedemos a la función logout del contexto

  // Función para mostrar el alert cuando se presione el botón de atrás
  const showAlert = () => {
    Alert.alert(
      "Salir", // Título del alert
      "¿Quieres cerrar la app?", // Mensaje
      [
        {
          text: "Cancelar", // Botón Cancelar
          onPress: () => console.log("Cancelar presionado"), // Acción al presionar "Cancelar"
          style: "cancel", // Estilo de cancelación
        },
        {
          text: "Aceptar", // Botón Aceptar
          onPress: () => {
            logout(); // Ejecutar logout
            router.push("/"); // Redirigir a la pantalla de login
          },
        },
      ],
      { cancelable: false } // No permite cerrar el alert tocando fuera de él
    );
  };

  useEffect(() => {
    const backAction = () => {
      showAlert(); // Mostrar el alert cuando se presione el botón de atrás
      return true; // Impide que la app se cierre automáticamente sin preguntar
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        contentInsetAdjustmentBehavior="automatic" // Ajuste para iOS
        keyboardShouldPersistTaps="handled"
      >
        <ProfileInfo />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
});
