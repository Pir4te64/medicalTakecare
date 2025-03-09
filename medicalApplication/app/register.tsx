import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RegisterForm from "@/components/Register/Register";
import { LinearGradient } from "expo-linear-gradient";

export default function RegisterScreen() {
  const imageScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.spring(imageScale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <LinearGradient colors={["#f9f9f9", "#e0e0e0"]} style={styles.container}>
      {/* Wrapper para centrar y limitar el ancho en la web */}
      <View style={styles.contentWrapper}>
        <KeyboardAwareScrollView
          style={styles.bottomContainer}
          contentContainerStyle={styles.scrollContentContainer}
          enableOnAndroid
          extraScrollHeight={20}
        >
          <View style={styles.topContainer}>
            <Animated.Image
              source={require("../assets/images/register.png")}
              style={[styles.image, { transform: [{ scale: imageScale }] }]}
            />
            <Text style={styles.title}>Registrarse</Text>
          </View>
          <RegisterForm />
        </KeyboardAwareScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  // Contenedor principal que ocupa toda la pantalla y centra el contenido
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  // Wrapper que limita el ancho del contenido (útil en la web)
  contentWrapper: {
    width: "100%",
    maxWidth: 500, // ancho máximo, ajústalo según necesites
    height: "100%",
  },
  // Sección superior con imagen y título (centrado)
  topContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  // Contenedor del scroll para el formulario
  bottomContainer: {
    flex: 1,
  },
  // Centrado del contenido dentro del scroll
  scrollContentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginVertical: 30,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
});
