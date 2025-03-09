import { API } from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const handleSubmit = async (
  afiliado,
  birthDate,
  weight,
  height,
  bloodType,
  medicationAllergies,
  otherAllergies,
  chronicDiseases
) => {
  try {
    const authToken = await AsyncStorage.getItem("authToken");
    if (!authToken) {
      throw new Error("No se encontró el token de autenticación");
    }

    if (!afiliado?.id) {
      throw new Error("El ID del afiliado es nulo o indefinido.");
    }

    const dateObj = birthDate instanceof Date ? birthDate : new Date(birthDate);
    const formattedDate = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${dateObj.getDate().toString().padStart(2, "0")}`;

    const formattedChronicDiseases = Array.isArray(chronicDiseases)
      ? chronicDiseases.map((disease) => ({
          ...disease,
          medicalTreatmentUser: disease.medicalTreatmentUser || [],
        }))
      : [];

    const formData = {
      userId: afiliado.id,
      userDataId: "", // Ahora estamos seguros de que no es null
      birthDate: formattedDate,
      weight,
      height,
      bloodType,
      medicationAllergyUsers: Array.isArray(medicationAllergies)
        ? medicationAllergies
        : [],
      otherAllergiesUsers: Array.isArray(otherAllergies) ? otherAllergies : [],
      chronicDiseasesUsers: formattedChronicDiseases,
    };

    console.log("📡 Enviando datos:", JSON.stringify(formData, null, 2));

    const response = await fetch(API.DATA_REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json(); // Obtener error en JSON
      throw new Error(
        `Error en la petición: ${response.status} - ${
          errorData.message || "Error desconocido"
        }`
      );
    }

    const responseData = await response.json();
    console.log("✅ Respuesta exitosa:", responseData);

    Alert.alert("✅ Éxito", "Los datos se enviaron correctamente.", [
      { text: "Aceptar" },
    ]);

    return responseData;
  } catch (error) {
    Alert.alert(
      "Error",
      error.message || "Ocurrió un error al enviar los datos."
    );
  }
};
