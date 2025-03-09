import { API } from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const PACIENTE_CONTACTO_POST = async (contactData: {
  userId: number;
  name: string;
  phone: string;
  email: string;
  observation: string;
}) => {
  try {
    const authToken = await AsyncStorage.getItem("authToken");
    if (!authToken) {
      throw new Error("No se encontró el token de autenticación.");
    }

    const response = await fetch(API.PACIENTE_CONTACTO_POST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(contactData),
    });

    const data = await response.json(); // Intentamos parsear la respuesta

    if (!response.ok) {
      throw new Error(
        data?.message || `Error en la solicitud: ${response.status}`
      );
    }

    return data; // Retorna la respuesta de la API si es exitosa
  } catch (error) {
    console.error("Error al enviar contacto:", error);
    throw error;
  }
};
