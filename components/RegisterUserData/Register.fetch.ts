import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "@/utils/api"; // Asegúrate de que la ruta sea la correcta
import { Alert } from "react-native";

export const getUserData = async (userId: number) => {
  try {
    const authToken = await AsyncStorage.getItem("authToken");

    if (!authToken) {
      throw new Error(
        "⚠️ No se encontró el token de autenticación.\n\nPor favor, inicia sesión nuevamente."
      );
    }

    const response = await fetch(`${API.DATA_REGISTER_GET}${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      Alert.alert(
        "⚠️ Información médica faltante",
        "📋 No se encontraron datos médicos del usuario.\n\nPor favor, complete el formulario.",
        [{ text: "Aceptar" }]
      );
      return null; // Retorna null si no hay datos
    }

    const data = await response.json();
    return data; // Devuelve los datos obtenidos
  } catch (error) {
    Alert.alert(
      "❌ Error al obtener datos",
      "⚠️ No se pudo recuperar la información médica.\n\nInténtalo nuevamente más tarde.",
      [{ text: "Aceptar" }]
    );
    throw error; // Re-lanza el error para manejarlo en el componente
  }
};
