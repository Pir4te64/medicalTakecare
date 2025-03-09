import { API } from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const deleteContact = async (contactId: string) => {
  try {
    const authToken = await AsyncStorage.getItem("authToken");
    if (!authToken) {
      console.error("No se encontró el authToken.");
      return false;
    }

    const response = await fetch(
      `${API.PACIENTE_CONTACTO_DELETE}/${contactId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error al eliminar contacto: ${response.statusText}`);
    }

    console.log(`Contacto con ID ${contactId} eliminado correctamente.`);
    return true;
  } catch (error) {
    console.error("Error en la solicitud de eliminación:", error);
    return false;
  }
};
