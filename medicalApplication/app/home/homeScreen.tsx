import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native"; // 👈 Importar useFocusEffect
import HomeComponent from "@/components/Home/Home";

export default function HomeScreen() {
  const router = useRouter();
  const [tipoCuenta, setTipoCuenta] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Función para obtener el tipo de cuenta
  const fetchTipoCuenta = async () => {
    try {
      const storedTipo = await AsyncStorage.getItem("tipoCuenta");
      setTipoCuenta(storedTipo);
    } catch (error) {
      console.error("Error al obtener tipoCuenta:", error);
    } finally {
      setLoading(false);
    }
  };

  // Se ejecuta cada vez que la pantalla recibe enfoque
  useFocusEffect(
    useCallback(() => {
      setLoading(true); // Reiniciar el loading cada vez que se ejecuta
      fetchTipoCuenta();
    }, [])
  );

  // Mientras carga, mostrar un spinner
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#005bb5" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Sección principal */}
      <View style={styles.content}>
        <HomeComponent />
      </View>

      {/* Sección de botones */}
      <View style={styles.buttonsContainer}>
        <View style={styles.miniContainer}>
          {/* Botón Registro (solo si tipoCuenta !== "D") */}
          {tipoCuenta !== "D" && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/home/RegistrarDependientes")}
            >
              <Ionicons name="person-add" size={30} color="#005bb5" />
              <Text style={styles.buttonText}>Registro</Text>
            </TouchableOpacity>
          )}

          {/* Botón Perfil */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/home/profile")}
          >
            <Ionicons name="person" size={30} color="#005bb5" />
            <Text style={styles.buttonText}>Perfil</Text>
          </TouchableOpacity>

          {/* Botón Ajustes */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/home/SettingScreen")}
          >
            <Ionicons name="settings" size={30} color="#005bb5" />
            <Text style={styles.buttonText}>Ajustes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 0.8 },
  miniContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  buttonsContainer: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 5,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    width: 100,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 12,
    color: "#005bb5",
    marginTop: 5,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
