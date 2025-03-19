import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  Pressable,
  Animated,
  ActivityIndicator,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "@/utils/api";
import CustomAlert from "@/components/Modal/Modal";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { styles } from "./Home.styles";
import getProfileHome from "./Home.GET";

const HomeComponent = () => {
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"success" | "error">("success");

  const router = useRouter();
  const imageScale = useRef(new Animated.Value(0.8)).current;

  // Lógica para obtener el perfil desde la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await getProfileHome();
        setProfile(profileData);
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
    fetchData();
  }, []);

  // Guardar tipoCuenta en AsyncStorage si existe
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

  // Animación de escala (solo para plataformas nativas)
  useEffect(() => {
    if (Platform.OS !== "web") {
      Animated.spring(imageScale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }).start();
    }
  }, []);

  // Función para guardar el color seleccionado
  const handleColorPress = async (
    color: string,
    callback: () => void = () => { }
  ) => {
    try {
      await AsyncStorage.setItem("selectedColor", color);
      // Podés verificar que se guardó correctamente o realizar otras acciones
      console.log("Color guardado:", color);
    } catch (error) {
      console.error("Error al guardar el color:", error);
    } finally {
      // Llamar al callback para proceder con la navegación u otra acción
      callback();
    }
  };

  // Funciones para navegar
  const navigateToContactos = useCallback(() => {
    router.replace(
      `/home/profile/contactos?afiliado=${encodeURIComponent(
        JSON.stringify(profile)
      )}`
    );
  }, [router, profile]);

  const navigateToInformation = useCallback(() => {
    router.replace(
      `/home/profile/informacion?afiliado=${encodeURIComponent(
        JSON.stringify(profile)
      )}`
    );
  }, [router, profile]);

  const navigateToVisual = useCallback(() => {
    router.replace(
      `/home/profile/visual?afiliado=${encodeURIComponent(
        JSON.stringify(profile)
      )}`
    );
  }, [router, profile]);

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
        <View style={styles.headerContent}>
          <View style={styles.buttonsContainer}>
            {/* 1. Menú de Administración */}
            <Pressable
              style={({ hovered }) => [
                styles.button,
                { backgroundColor: "black" },
              ]}
              onPress={() =>
                handleColorPress("black", () =>
                  router.replace("/home/profile")
                )
              }
            >
              <Text style={styles.buttonText}>Menú de Administración</Text>
            </Pressable>

            {/* 2. Perfil de Identificación Médica */}
            <Pressable
              style={({ hovered }) => [
                styles.button,
                { backgroundColor: "orange" },
              ]}
              onPress={() =>
                handleColorPress("orange", navigateToInformation)
              }
            >
              <Text style={styles.buttonText}>
                Perfil <br /> de Identificación Médica
              </Text>
            </Pressable>

            {/* 3. Exámenes de Laboratorio */}
            <Pressable
              style={({ hovered }) => [
                styles.button,
                { backgroundColor: "blue" },
              ]}
              onPress={() =>
                handleColorPress("blue", () =>
                  router.replace("/home/lector")
                )
              }
            >
              <Text style={styles.buttonText}>Exámenes de Laboratorio</Text>
            </Pressable>

            {/* 4. Examen de Imagen */}
            <Pressable
              style={({ hovered }) => [
                styles.button,
                { backgroundColor: "#ffd000" },
              ]}
              onPress={() =>
                handleColorPress("yellow", () =>
                  router.replace("/home/lector/detalles")
                )
              }
            >
              <Text style={{ color: "black" }}>Examen de Imagen</Text>
            </Pressable>

            {/* 5. Recetas */}
            <Pressable
              style={({ hovered }) => [
                styles.button,
                { backgroundColor: "green" },
              ]}
              onPress={() =>
                handleColorPress("green", () =>
                  router.replace("/home/lector/detalles")
                )
              }
            >
              <Text style={styles.buttonText}>Recetas</Text>
            </Pressable>

            {/* 6. Historial de Consultas Médicas */}
            <Pressable
              style={({ hovered }) => [
                styles.button,
                { backgroundColor: "#9B26B6" },
              ]}
              onPress={() =>
                handleColorPress("#9B26B6", navigateToVisual)
              }
            >
              <Text style={styles.buttonText}>
                Historial de Consultas Médicas
              </Text>
            </Pressable>

            {/* 7. Próximo control (deshabilitado en web) */}
            <Pressable
              disabled={true}
              style={({ hovered }) => [
                styles.button,
                { backgroundColor: "gray", opacity: hovered ? 0.5 : 1 },
              ]}
            >
              <Text style={styles.buttonText}>Próximo Control</Text>
              <Text style={styles.buttonTextSmall}>
                (Actualmente no disponible)
              </Text>
            </Pressable>

            {/* 8. Datos de Emergencia */}
            <Pressable
              style={({ hovered }) => [
                styles.button,
                { backgroundColor: "red" },
              ]}
              onPress={() =>
                handleColorPress("red", navigateToContactos)
              }
            >
              <Text style={styles.buttonText}>Datos de Emergencia</Text>
            </Pressable>
          </View>
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

export default HomeComponent;
