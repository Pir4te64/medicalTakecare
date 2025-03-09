import React from "react";
import { View, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RegisterDependientes from "@/components/Registrardependientes/RegistrarDep";
import LottieView from "lottie-react-native";
import { LinearGradient } from "expo-linear-gradient"; // Importamos LinearGradient

export default function RegistrarDependientesScreen() {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      enableOnAndroid={true}
      extraScrollHeight={20}
    >
      <LinearGradient
        colors={["#2470ec", "#005bb5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.innerContainer}
      >
        {/* Animación con Lottie */}
        <LottieView
          source={require("@/assets/animations/registro.json")}
          autoPlay
          loop
          style={styles.lottie}
          resizeMode="contain"
        />
      </LinearGradient>

      {/* Componente de Registro debajo de la animación */}
      <View style={styles.formContainer}>
        <RegisterDependientes />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20, // Separación de la animación con el siguiente contenido
  },
  lottie: {
    width: 150,
    height: 150,
    marginBottom: 10, // Espaciado entre la animación y el siguiente contenido
  },
  formContainer: {
    padding: 20, // Espaciado del contenido de registro
  },
});
