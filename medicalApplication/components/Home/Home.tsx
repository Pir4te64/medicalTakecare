import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Animated,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "@/utils/api";
import CustomAlert from "@/components/Modal/Modal";
import { LinearGradient } from "expo-linear-gradient";

const HomeComponent = () => {
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"success" | "error">("success");

  const imageScale = useRef(new Animated.Value(0.8)).current;

  // Lógica para obtener el perfil desde la API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) {
          throw new Error("No se encontró el token de autenticación");
        }

        const response = await fetch(`${API.PROFILE}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener el perfil");
        }

        const data = await response.json();

        if (data.success) {
          setProfile(data.body);
        } else {
          throw new Error(data.message || "Error desconocido");
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error desconocido");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);
  useEffect(() => {
    const saveTipoCuenta = async () => {
      if (profile?.tipoCuenta) {
        try {
          await AsyncStorage.setItem("tipoCuenta", profile.tipoCuenta);
        } catch (error) {
          console.error("Error al guardar tipoCuenta en AsyncStorage:", error);
        }
      }
    };

    saveTipoCuenta();
  }, [profile]);

  useEffect(() => {
    // Animación sutil en la imagen al montar el componente
    Animated.spring(imageScale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0066cc" />;
  }

  return (
    <View style={styles.container}>
      {/* Cabecera con gradiente */}
      <LinearGradient
        colors={["#2470ec", "#005bb5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        {/* Contenedor para centrar el contenido dinámicamente */}
        <View style={styles.headerContent}>
          <Animated.View style={{ transform: [{ scale: imageScale }] }}>
            <LottieView
              source={require("../../assets/animations/hello.json")}
              autoPlay
              loop
              style={styles.animation}
            />
          </Animated.View>
          <Text style={styles.welcomeText}>
            ¡Hola, {profile?.nombre || "Usuario"}!
          </Text>
        </View>
      </LinearGradient>

      {/* Custom Alert */}
      <CustomAlert
        visible={modalVisible}
        title="Salir"
        message={modalMessage}
        type={modalType}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  // Usamos flex para que el header ocupe el 40% de la pantalla
  header: {
    flex: 1,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden", // Asegura que los bordes redondeados se apliquen correctamente
  },
  // Contenedor que centra el contenido del header
  headerContent: {
    flex: 1,
    justifyContent: "center", // Centrado vertical
    alignItems: "center", // Centrado horizontal
    paddingHorizontal: 20,
  },
  animation: {
    width: 50,
    height: 50,
    marginBottom: 10, // Espacio entre la animación y el texto
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
    // Puedes usar un marginTop si requieres un espacio adicional,
    // o ajustar el padding en headerContent para mayor dinamismo.
  },
});

export default HomeComponent;
