import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Button, Text } from "react-native-elements";
import * as DocumentPicker from "expo-document-picker";
import RNPickerSelect from "react-native-picker-select";
import { router, useNavigation } from "expo-router"; // Importar el componente Link
import handleSubmitIA from "@/components/Detalles/indexPOST"; // Importar la función de envío
export default function Lector() {
  const [selectedOption, setSelectedOption] = useState("LABORATORY");
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileName, setPdfFileName] = useState("");
  const [loading, setLoading] = useState(false); // Nuevo estado para manejar el loader
  const navigation = useNavigation();
  const handleFilePick = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      console.log(result);

      if (result.canceled) return;

      const file = result.assets ? result.assets[0] : result;

      if (!file || file.mimeType !== "application/pdf") {
        Alert.alert("Error", "Por favor, selecciona un archivo PDF válido.");
        return;
      }

      setPdfFile(file.uri);
      setPdfFileName(file.name);
    } catch (error) {
      Alert.alert("Error", "Ocurrió un problema al seleccionar el archivo.");
    }
  };
  const handleSend = async () => {
    setLoading(true);
    try {
      // handleSubmitIA returns true on success.
      const success = await handleSubmitIA(
        pdfFile,
        pdfFileName,
        selectedOption,
        setLoading,
        navigation
      );
      if (success) {
        // Limpia los campos al enviar exitosamente
        setPdfFile(null);
        setPdfFileName("");
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al enviar los datos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        <Text h4 style={styles.headerText}>
          Envio de Datos:
        </Text>

        {Platform.OS === "web" ? (
          // WEB: <select> HTML nativo
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            style={{
              // aplica estilo al <select> (similar a input date)
              fontSize: 16,
              padding: 8,
              marginBottom: 20,
              borderWidth: 1,
              borderColor: "#ddd",
              borderRadius: 10,
              color: "#333",
              backgroundColor: "#fff",
              width: "100%",
              // mas estilos si quieres
            }}>
            {/* Placeholder */}
            <option value='' disabled>
              Selecciona una opción...
            </option>
            <option value='LABORATORY'>Examenes de laboratorios</option>
            <option value='RECIPE'>Recetas</option>
            <option value='IMAGENOLOGY'>Informes de imágenes</option>
          </select>
        ) : (
          // MÓVIL: RNPickerSelect
          <RNPickerSelect
            placeholder={{ label: "Selecciona una opción...", value: null }}
            onValueChange={setSelectedOption}
            items={[
              { label: "Examenes de laboratorios", value: "LABORATORY" },
              { label: "Recetas", value: "RECIPE" },
              { label: "Informes de imagenes", value: "IMAGENOLOGY" },
            ]}
            value={selectedOption}
            style={pickerSelectStyles}
          />
        )}

        <Text h4 style={styles.headerText}>
          Selecciona un archivo PDF:
        </Text>
        <Button
          title='Seleccionar PDF'
          onPress={handleFilePick}
          buttonStyle={styles.button}
        />

        {pdfFileName && (
          <Text style={styles.fileText}>
            Archivo seleccionado: {pdfFileName}
          </Text>
        )}

        {loading ? (
          <ActivityIndicator size='large' color='#28a745' />
        ) : (
          <Button
            title='Enviar'
            onPress={handleSend}
            buttonStyle={styles.submitButton}
            disabled={!pdfFile || loading}
          />
        )}

        {loading && (
          <Text style={styles.loadingText}>Petición en curso...</Text>
        )}

        <Button
          containerStyle={{ alignItems: "center", width: "100%" }}
          title='Información detallada'
          buttonStyle={styles.detailsButton}
          onPress={() => {
            router.push("/home/lector/detalles");
          }}
          icon={{
            name: "chevron-forward",
            type: "ionicon",
            size: 20,
            color: "#fff",
            style: { marginLeft: 10 },
          }}
          iconRight
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  innerContainer: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  headerText: {
    fontSize: 8,
    textAlign: "center",
    marginBottom: 15,
  },
  button: {
    marginVertical: 10,
    backgroundColor: "#007bff",
    borderRadius: 10,
  },
  submitButton: {
    marginVertical: 20,
    backgroundColor: "#28a745",
    borderRadius: 10,
  },
  detailsButton: {
    marginVertical: 20,

    backgroundColor: "#ff7f50", // Puedes ajustar el color
    borderRadius: 10,
    width: "100%",
  },
  fileText: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 16,
    color: "#333",
  },
  loadingText: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 16,
    color: "#333",
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    color: "#333",
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    color: "#333",
    backgroundColor: "#fff",
    marginBottom: 20,
  },
};
