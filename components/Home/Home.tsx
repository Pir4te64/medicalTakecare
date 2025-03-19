import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
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

  // Función para navegar a "Datos de Emergencia"
  const navigateToContactos = useCallback(() => {
    router.replace(
      `/home/profile/contactos?afiliado=${encodeURIComponent(
        JSON.stringify(profile)
      )}`
    );
  }, [router, profile]);

  // Función para navegar a "Perfil de Identificación Médica"
  const navigateToInformation = useCallback(() => {
    router.replace(
      `/home/profile/informacion?afiliado=${encodeURIComponent(
        JSON.stringify(profile)
      )}`
    );
  }, [router, profile]);

  // Función para navegar a "Historial de Consultas Médicas"
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
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#FF8A80" }]}
              onPress={() => router.replace("/home/profile")}
            >
              <Text style={styles.buttonText}>Menú de Administración</Text>
            </TouchableOpacity>

            {/* 2. Perfil de Identificación Médica */}
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#FFD180" }]}
              onPress={navigateToInformation}
            >
              <Text style={styles.buttonText}>
                Perfil de Identificación Médica
              </Text>
            </TouchableOpacity>

            {/* 3. Exámenes de Laboratorio */}
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#FFF59D" }]}
              onPress={() => router.replace("/home/lector")}
            >
              <Text style={styles.buttonText}>Exámenes de Laboratorio</Text>
            </TouchableOpacity>

            {/* 4. Examen de Imagen */}
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#C5E1A5" }]}
              onPress={() => router.replace("/home/lector/detalles")}
            >
              <Text style={styles.buttonText}>Examen de Imagen</Text>
            </TouchableOpacity>

            {/* 5. Recetas */}
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#80CBC4" }]}
              onPress={() => router.replace("/home/lector/detalles")}
            >
              <Text style={styles.buttonText}>Recetas</Text>
            </TouchableOpacity>

            {/* 6. Historial de Consultas Médicas */}
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#81D4FA" }]}
              onPress={navigateToVisual}
            >
              <Text style={styles.buttonText}>
                Historial de Consultas Médicas
              </Text>
            </TouchableOpacity>

            {/* 7. Próximo control (deshabilitado en web) */}
            <Pressable
              disabled={true}
              style={({ hovered }) => [
                styles.button,
                { backgroundColor: "#82B1FF", opacity: hovered ? 0.5 : 1 },
              ]}
            >
              <Text style={styles.buttonText}>Próximo Control</Text>
              <Text style={styles.buttonTextSmall}>(Actualmente no disponible)</Text>
            </Pressable>

            {/* 8. Datos de Emergencia */}
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#B388FF" }]}
              onPress={navigateToContactos}
            >
              <Text style={styles.buttonText}>Datos de Emergencia</Text>
            </TouchableOpacity>
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
