import { API } from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export interface HistorialData {
  userDataId: string;
  date: Date;
  specialty: string;
  treatingPhysician: string;
  originalSymptoms: string[];
  diagnoses: string[];
  treatments: {
    treatmentDate: Date;
    urlDocTreatment: string;
  }[];
  followUps: {
    followUpDate: Date;
    followUpNotes: string;
  }[];
  orders: {
    ordersDate: Date;
    urlDocOrders: string;
  }[];
}

export interface HistorialPOSTData {
  userDataId: string;
  date: string;
  specialty: string;
  treatingPhysician: string;
  originalSymptoms: string[];
  diagnoses: string[];
  treatments: {
    treatmentDate: string;
    urlDocTreatment: string;
  }[];
  followUps: {
    followUpDate: string;
    followUpNotes: string;
  }[];
  orders: {
    ordersDate: string;
    urlDocOrders: string;
  }[];
}

const formatDate = (date: Date) => date.toISOString().split("T")[0];

export const createHistorialPOSTData = (
  data: HistorialData
): HistorialPOSTData => {
  return {
    userDataId: data.userDataId,
    date: formatDate(data.date),
    specialty: data.specialty,
    treatingPhysician: data.treatingPhysician,
    originalSymptoms: data.originalSymptoms,
    diagnoses: data.diagnoses,
    treatments: data.treatments.map((t) => ({
      treatmentDate: formatDate(t.treatmentDate),
      urlDocTreatment: t.urlDocTreatment,
    })),
    followUps: data.followUps.map((f) => ({
      followUpDate: formatDate(f.followUpDate),
      followUpNotes: f.followUpNotes,
    })),
    orders: data.orders.map((o) => ({
      ordersDate: formatDate(o.ordersDate),
      urlDocOrders: o.urlDocOrders,
    })),
  };
};

export const postHistorialData = async (data: HistorialData): Promise<void> => {
  // Obtén el token del Async Storage
  const authToken = await AsyncStorage.getItem("authToken");

  if (!authToken) {
    console.error("No se encontró el token de autenticación.");
    return;
  }

  const postData = createHistorialPOSTData(data);

  try {
    const response = await fetch(API.HISTORAL_CLINICO_POST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Error ${response.status}: ${response.statusText} - ${errorText}`
      );
    }

    const responseData = await response.json();
    Alert.alert("Éxito", "Los datos se han enviado correctamente.");
  } catch (error) {
    Alert.alert("Error", "Hubo un error al enviar los datos.");
  }
};
