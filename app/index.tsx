import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet, Platform } from "react-native";
import { Button, Icon } from "react-native-elements";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function Index() {
  const router = useRouter();
  const imageScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Animación sutil en la imagen al montar el componente
    Animated.spring(imageScale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <LinearGradient
          colors={["#2470ec", "#005bb5"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <Animated.Image
              source={require("../assets/images/medico.png")}
              style={[styles.image, { transform: [{ scale: imageScale }] }]}
            />
            <Text style={styles.welcomeText}>¡Bienvenido a TKareBox!</Text>
          </View>
        </LinearGradient>

        <View style={styles.buttonsRow}>
          <Button
            title="Iniciar Sesión"
            onPress={() => router.push("/login")}
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.buttonContainer}
            titleStyle={styles.buttonTitle}
            icon={
              <Icon
                name="login"
                type="material-community"
                color="white"
                size={24}
                containerStyle={{ marginRight: 8 }}
              />
            }
          />
          <Button
            title="Registrarse"
            onPress={() => router.push("/register")}
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.buttonContainer}
            titleStyle={styles.buttonTitle}
            icon={
              <Icon
                name="account-plus"
                type="material-community"
                color="white"
                size={24}
                containerStyle={{ marginRight: 8 }}
              />
            }
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Contenedor principal centrado
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
    alignItems: "center",
  },
  // Wrapper para limitar el ancho en la web
  contentWrapper: {
    width: "100%",
    maxWidth: 500,
    height: "100%",
  },
  // Header con gradiente y sombra condicional
  header: {
    width: "100%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
    ...Platform.select({
      web: {
        height: 500,
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      },
      ios: {
        height: 700,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        height: 700,
        elevation: 3,
      },
    }),
  },

  headerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 30,
    borderRadius: 10,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "600",
    color: "white",
  },
  // Contenedor de botones
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 30,
    width: "100%",
  },
  buttonStyle: {
    backgroundColor: "#0066cc",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: "45%",
    marginHorizontal: 5,
  },
  buttonTitle: {
    fontSize: 16,
    textAlign: "center",
  },
});
