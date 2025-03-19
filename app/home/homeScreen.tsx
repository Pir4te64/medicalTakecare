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
import { useFocusEffect } from "@react-navigation/native";
import HomeComponent from "@/components/Home/Home";

export default function HomeScreen() {
  const router = useRouter();
  const [tipoCuenta, setTipoCuenta] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchTipoCuenta();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#005bb5' />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <HomeComponent />
      </View>

      {/* <View style={styles.buttonsContainer}>
        <View style={styles.miniContainer}>
          {tipoCuenta !== "D" && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/home/RegistrarDependientes")}>
              <Ionicons name='person-add' size={30} color='#005bb5' />
              <Text style={styles.buttonText}>Registro</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/home/profile")}>
            <Ionicons name='person' size={30} color='#005bb5' />
            <Text style={styles.buttonText}>Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/home/SettingScreen")}>
            <Ionicons name='settings' size={30} color='#005bb5' />
            <Text style={styles.buttonText}>Ajustes</Text>
          </TouchableOpacity>
        </View>
      </View> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: 375,
    width: "100%",
    alignSelf: "center",
    backgroundColor: "#f9f9f9",
    height: "100vh",
  },
  content: {
    flex: 0.8,
  },
  buttonsContainer: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 5,
  },
  miniContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    width: "100%",
  },
  button: {
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: "center",
    width: 80,
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
