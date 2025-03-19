import { API } from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getProfileHome = async () => {
  const token = await AsyncStorage.getItem("authToken");
  if (!token) {
    throw new Error("No se encontró el token de autenticación");
  }
  const response = await fetch(`${API.PROFILE}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Error al obtener el perfil");
  }
  const data = await response.json();
  if (data.success) {
    return data.body;
  } else {
    throw new Error(data.message || "Error desconocido");
  }
};
export default getProfileHome;
