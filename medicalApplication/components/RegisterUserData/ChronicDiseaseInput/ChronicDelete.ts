import { API } from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const deleteChronicDisease = async (idUser: string): Promise<boolean> => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (!token) {
      console.error("Error: No se encontró el token de autenticación");
      return false;
    }

    const response = await fetch(`${API.DATA_REGISTER_DELETE}${idUser}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Error al eliminar la enfermedad crónica:", await response.text());
      return false;
    }

    console.log("Enfermedad crónica eliminada correctamente");
    return true;
  } catch (error) {
    console.error("Error en la solicitud DELETE:", error);
    return false;
  }
};
