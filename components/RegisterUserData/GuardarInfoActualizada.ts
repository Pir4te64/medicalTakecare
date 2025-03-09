import { API } from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native"; // Asegúrate de importar Alert

interface UpdatedInfo {
  [key: string]: any;
}

export const GuardarInfoActualizada = async (
  updatedInfo: UpdatedInfo
): Promise<any> => {
  try {
    // Obtén el token del AsyncStorage
    const token = await AsyncStorage.getItem("authToken");
    if (!token) {
      throw new Error("No se encontró el token de autenticación.");
    }

    const response = await fetch(API.DATA_REGISTER_UPDATE, {
      // Reemplaza por tu URL
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedInfo),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en GuardarInfoActualizada:", error);

    // Mostrar alert cuando hay un error
    Alert.alert("Error", "Hubo un problema al actualizar la información.");
    throw error;
  }
};
