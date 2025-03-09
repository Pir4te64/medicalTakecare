import { API } from "@/utils/api"; // Suponiendo que tienes esta constante con la URL de la API.
import AsyncStorage from "@react-native-async-storage/async-storage";

const getAuthToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    return token;
  } catch (error) {
    console.error("Error al obtener el token de autenticación:", error);
    return null;
  }
};

// Ahora la función recibe el id del afiliado como parámetro
export const getAllContactos = async (id: number): Promise<any[]> => {
  const authToken = await getAuthToken();

  if (!authToken) {
    throw new Error("No se encontró el token de autenticación.");
  }

  try {
    // Se pasa el id como parte de la URL o como un parámetro en el body si es necesario.
    const response = await fetch(`${API.PACIENTE_CONTACTO_GET_ALL}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`, // Agregar el token en los headers
      },
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};
