import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet, Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LoginComponent from "@/components/Login/Login";
import { LinearGradient } from "expo-linear-gradient";

export default function LoginScreen() {
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
      {/* Wrapper para centrar y limitar el ancho del contenido */}
      <View style={styles.contentWrapper}>
        <KeyboardAwareScrollView
          style={styles.bottomContainer}
          contentContainerStyle={styles.scrollContentContainer}
          enableOnAndroid
          extraScrollHeight={20}
        >
          <View style={styles.topContainer}>
            <Animated.Image
              source={require("../assets/images/login2.png")}
              style={[styles.image, { transform: [{ scale: imageScale }] }]}
            />
            <Text style={styles.title}>Iniciar Sesión</Text>
          </View>
          <LoginComponent />
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
  // Wrapper para limitar el ancho en la web
  contentWrapper: {
    width: "100%",
    maxWidth: 500,
    height: "100%",
  },
  // El scroll ocupa el 100% del wrapper
  bottomContainer: {
    flex: 1,
  },
  // Centra el contenido interno del scroll
  scrollContentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  // Sección superior con imagen y título
  topContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 30,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});
