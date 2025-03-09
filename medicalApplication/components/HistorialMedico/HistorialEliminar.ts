import { API } from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const deleteHistorial = async (id: string) => {
  try {
    const authToken = await AsyncStorage.getItem("authToken");
    const response = await fetch(`${API.HISTORAL_CLINICO_DELETE}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Error al eliminar historial, status: ${response.status}`
      );
    }

    // Si no hay contenido en la respuesta, retornamos un objeto vacío
    const responseText = await response.text();
    return responseText ? JSON.parse(responseText) : {};
  } catch (error) {
    console.error("Error en deleteHistorial:", error);
    throw error;
  }
};
