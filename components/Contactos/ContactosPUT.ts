import { API } from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const updateContact = async (
  contactId: string,
  updatedContact: {
    name: string;
    phone: string;
    email: string;
    observation: string;
  }
) => {
  try {
    const authToken = await AsyncStorage.getItem("authToken");

    if (!authToken) {
      throw new Error("No se encontró el token de autenticación.");
    }

    // Objeto que se enviará a la API
    const contactData = {
      id: contactId,
      ...updatedContact,
    };

    const response = await fetch(`${API.PACIENTE_CONTACTO_PUT}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.message || "Error al actualizar el contacto.");
    }

    const data = await response.json();

    return data; // Devuelve los datos actualizados
  } catch (error) {
    console.error("Error en updateContact:", error);
    throw error;
  }
};
