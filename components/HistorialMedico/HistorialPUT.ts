import { API } from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const HistorialPUT = async (updatedHistorial) => {
  try {
    const authToken = await AsyncStorage.getItem("authToken");
    if (!authToken) {
      throw new Error("No se encontró el token de autenticación");
    }

    const response = await fetch(`${API.HISTORAL_CLINICO_PUT}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(updatedHistorial),
    });

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error al actualizar el historial:", error);
    throw error;
  }
};
