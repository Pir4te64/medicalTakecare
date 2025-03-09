// utils/Detalles.getInfo.ts
import { API } from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ApiResponse {
  success: boolean;
  data: any;
}

const getAuthToken = async (): Promise<string | null> => {
  try {
    // Obtener el token de autenticación desde AsyncStorage
    const token = await AsyncStorage.getItem("authToken");
    return token;
  } catch (error) {
    console.error("Error al obtener el authToken:", error);
    return null;
  }
};

const getInfo = async (id: string): Promise<ApiResponse | null> => {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error("Token de autenticación no encontrado");
    }

    // Construir la URL con el id
    const url = `${API.DATA_REGISTER_GET}${id}`;

    // Realizar la solicitud GET con el token de autenticación en los headers
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Agregar el token al header
      },
    });

    if (!response.ok) {
      throw new Error("Error al hacer la solicitud GET");
    }

    const data = await response.json();

    return {
      success: true,
      data,
    };
  } catch (error) {
    return null;
  }
};

export default getInfo;
