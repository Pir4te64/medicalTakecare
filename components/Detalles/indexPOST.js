import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import postRequest from "@/components/Lector/FilePickerPOST";

const handleSubmitIA = async (
  pdfFile,
  pdfFileName,
  selectedOption,
  setLoading,
  navigation
) => {
  if (!pdfFile) {
    Alert.alert("Error", "No has seleccionado un archivo.");
    return;
  }

  if (!selectedOption) {
    Alert.alert("Error", "Por favor selecciona una opción.");
    return;
  }

  setLoading(true); // Inicia el loader

  try {
    const token = await AsyncStorage.getItem("authToken");

    if (!token) {
      Alert.alert("Error", "No se encontró el token de autenticación.");
      return;
    }

    const formData = new FormData();
    formData.append("file", {
      uri: pdfFile,
      type: "application/pdf",
      name: pdfFileName,
    });

    const queryParams = `tipoAnalisis=${selectedOption}`;
    const response = await postRequest(formData, queryParams);

    Alert.alert("Éxito", "El archivo fue enviado correctamente.", [
      {
        text: "OK",
        onPress: () => navigation.goBack(),
      },
    ]);

    return response;
  } catch (error) {
    console.error("Error al enviar la solicitud:", error);
    Alert.alert("Error", "Hubo un problema al enviar el archivo.");
  } finally {
    setLoading(false); // Finaliza el loader
  }
};

export default handleSubmitIA;
