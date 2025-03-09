// HistorialGET.ts
import { API } from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Interfaces para la respuesta

export interface MedicationAllergyUser {
  id: string;
  allergy: string;
}

export interface OtherAllergyUser {
  id: string;
  allergy: string;
}

export interface MedicalTreatmentUser {
  medication: string;
  dosage: string;
}

export interface ChronicDiseaseUser {
  id: string;
  disease: string;
  doctorEmail: string;
  medicalCenter: string;
  medicalTreatmentUser: MedicalTreatmentUser[];
}

export interface HistorialBody {
  userDataId: string;
  userId: number;
  birthDate: [number, number, number]; // [año, mes, día]
  weight: string;
  height: string;
  bloodType: string;
  medicationAllergyUsers: MedicationAllergyUser[];
  otherAllergiesUsers: OtherAllergyUser[];
  chronicDiseasesUsers: ChronicDiseaseUser[];
}

export interface HistorialGETResponse {
  code: string;
  body: HistorialBody;
  success: boolean;
  message: string;
}

export const getHistorialData = async (
  afiliadoId: string
): Promise<HistorialGETResponse | null> => {
  // Obtén el token del Async Storage
  const authToken = await AsyncStorage.getItem("authToken");

  if (!authToken) {
    console.error("No se encontró el token de autenticación.");
    return null;
  }

  try {
    const response = await fetch(`${API.DATA_REGISTER_GET}${afiliadoId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Error ${response.status}: ${response.statusText} - ${errorText}`
      );
    }

    const data: HistorialGETResponse = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};
