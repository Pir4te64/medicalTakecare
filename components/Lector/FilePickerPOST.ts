import AsyncStorage from "@react-native-async-storage/async-storage";

const postRequest = async (formData, queryParams) => {
  try {
    // Obtener el token desde AsyncStorage
    const token = await AsyncStorage.getItem("authToken");

    if (!token) {
      throw new Error("No se encontró el token de autenticación.");
    }

    // Construir la URL final
    const url = `http://69.164.214.201:8080/recetary/api/openai/analyze?${queryParams}`;

    // Realizar la solicitud POST con FormData
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      body: formData, // Enviar el FormData correctamente
    });

    // Verificar si la respuesta fue exitosa
    if (!response.ok) {
      console.log("Error en la respuesta:", response);
    }

    // Obtener la respuesta en JSON
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error en postRequest:", error);
    throw error;
  }
};

export default postRequest;
