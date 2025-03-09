// HistorialGetByUser.ts

import { API } from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Definimos la interfaz para los datos que esperamos recibir
interface HistorialDataResponse {
  success: boolean;
  body: any; // Puedes definir la estructura de los datos según tu respuesta
  message?: string;
}

// Función para obtener los datos del historial médico de un usuario
export const getHistorialByUser = async (userDataId: string) => {
  if (!userDataId) {
    throw new Error("userDataId no está disponible.");
  }

  // Obtener el token de autenticación
  const authToken = await AsyncStorage.getItem("authToken");

  if (!authToken) {
    console.error("No se encontró el token de autenticación.");
    return null;
  }

  try {
    // Realizamos la solicitud a la API con el userDataId pasado como parámetro
    const response = await fetch(
      `${API.HISTORAL_CLINICO_GET_BY_USER}${userDataId}`, // Usamos el userDataId dinámicamente
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`, // Incluir el token en los encabezados
          "Content-Type": "application/json", // Asegurarse de que el servidor sepa que aceptamos JSON
        },
      }
    );

    if (response.ok) {
      const data: HistorialDataResponse = await response.json(); // Convertir la respuesta a JSON
      return data; // Retornar los datos recibidos
    } else {
      throw new Error("Error en la respuesta");
    }
  } catch (error) {
    return null; // Devolver null en caso de error
  }
};
