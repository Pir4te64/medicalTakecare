import { API } from "@/utils/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const actualizarContrasena = async (newPassword: string, confirmPassword: string, seudonimo: string, passwordMatching: boolean) => {
  try {
    // Verifica si las contraseñas coinciden
    if (newPassword !== confirmPassword) {
      throw new Error("Las contraseñas no coinciden");
    }

    // Obtén el authToken de AsyncStorage
    const authToken = await AsyncStorage.getItem('authToken');
    
    if (!authToken) {
      throw new Error("No se encontró el token de autenticación");
    }

    const response = await fetch(`${API.UPDATE_PASSWORD}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`, // Incluye el authToken en las cabeceras
      },
      body: JSON.stringify({
        seudonimo: seudonimo, // Se agrega el seudonimo
        password: newPassword,
        confirmPassword: confirmPassword,
        passwordMatching: passwordMatching, // Indicador de que las contraseñas coinciden
      }),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar la contraseña');
    }

    const data = await response.json();
    return data; // Suponiendo que la respuesta tiene un campo `data`
  } catch (error) {
    console.error("Error al actualizar la contraseña:", error);
    throw error;
  }
};
