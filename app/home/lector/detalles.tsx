import { useProfileStore } from "@/components/Profile/profileStore";
import { getUserData } from "@/components/RegisterUserData/Register.fetch";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  View,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Button as RNButton,
  ScrollView, // O si prefieres, mantén el de 'react-native-elements'
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "react-native-elements"; // Si lo usas para estilo
import { BASE_URL } from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PatientResults from "@/components/Detalles/TestItem";
import Ionicons from "react-native-vector-icons/Ionicons";
import SingleChoiceCheckbox from "@/components/Detalles/SingleCheck";

const Detalles = () => {
  const { fetchProfile, profile } = useProfileStore();

  // Estados generales
  const [userData, setUserData] = useState<any>(null);
  const [selectedOption, setSelectedOption] = useState("LABORATORY");
  const [consultaResult, setConsultaResult] = useState<any>(null);
  const [isQueryCollapsed, setIsQueryCollapsed] = useState(false);

  // Estados para las fechas
  const [selectedStartDate, setSelectedStartDate] = useState<Date>(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState<Date>(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  // Custom alert para distinguir web vs. nativo
  const showAlert = (title: string, message: string) => {
    if (Platform.OS === "web") {
      window.alert(`${title}\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, [fetchProfile])
  );

  useEffect(() => {
    if (profile?.id) {
      const fetchAndSaveUserData = async () => {
        try {
          const data = await getUserData(profile.id);
          if (data) {
            setUserData(data.body);
          }
        } catch (error) {
          console.error("Error al obtener los datos del usuario:", error);
        }
      };
      fetchAndSaveUserData();
    }
  }, [profile]);

  // Formatea la fecha para mostrarla como DD/MM
  const formatDateDDMM = (dateInput: Date) => {
    if (!dateInput || isNaN(dateInput.getTime())) return "";
    const day = dateInput.getDate().toString().padStart(2, "0");
    const month = (dateInput.getMonth() + 1).toString().padStart(2, "0");
    return `${day}/${month}`;
  };

  // Opcional: formatear para <input type="date" /> (YYYY-MM-DD)
  const formatDateYYYYMMDD = (dateInput: Date) => {
    if (!dateInput || isNaN(dateInput.getTime())) return "";
    const year = dateInput.getFullYear();
    const month = (dateInput.getMonth() + 1).toString().padStart(2, "0");
    const day = dateInput.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleConsultas = async () => {
    if (!selectedOption) {
      showAlert("Consulta", "Por favor, selecciona una opción válida.");
      return;
    }

    let endpoint = "";
    switch (selectedOption) {
      case "LABORATORY":
        endpoint = "/api/openai/laboratory";
        break;
      case "IMAGENOLOGY":
        endpoint = "/api/openai/imageneology";
        break;
      case "RECIPE":
        endpoint = "/api/openai/recipe";
        break;
      default:
        showAlert("Consulta", "Opción no válida.");
        return;
    }

    const userDataId = userData?.userDataId;
    const params = new URLSearchParams({ userDataId });

    // Solo para "LABORATORY" agregamos rango de fechas
    if (
      selectedOption === "LABORATORY" &&
      selectedStartDate &&
      selectedEndDate
    ) {
      const formattedStartDate = selectedStartDate.toISOString().split("T")[0];
      const formattedEndDate = selectedEndDate.toISOString().split("T")[0];
      params.append("dateFrom", formattedStartDate);
      params.append("dateTo", formattedEndDate);
    }

    const url = `${BASE_URL}${endpoint}?${params.toString()}`;

    try {
      const authToken = await AsyncStorage.getItem("authToken");
      if (!authToken) {
        showAlert("Error", "No se encontró un token de autenticación.");
        return;
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = await response.json();

      if (data.body && Array.isArray(data.body) && data.body.length === 0) {
        showAlert(
          "Consulta exitosa",
          "No hay datos disponibles en esas fechas."
        );
        setConsultaResult(data);
      } else {
        setConsultaResult(data);
      }
    } catch (error) {
      showAlert("Error", "Hubo un problema con la consulta.");
    }
  };

  // Renderiza la sección de seleccionar fecha (para Laboratorio) dependiendo de la plataforma
  const renderDateSelectors = () => {
    if (Platform.OS === "web") {
      // WEB: usar <input type="date" />
      return (
        <View style={styles.dateInputContainer}>
          <View style={styles.dateInputRow}>
            <Text>Fecha Desde:</Text>
            <input
              type='date'
              style={styles.dateInputWeb}
              value={formatDateYYYYMMDD(selectedStartDate)}
              onChange={(e) => {
                const newDate = new Date(e.target.value);
                if (!isNaN(newDate.getTime())) {
                  setSelectedStartDate(newDate);
                }
              }}
            />
          </View>

          <View style={styles.dateInputRow}>
            <Text>Fecha Hasta:</Text>
            <input
              type='date'
              style={styles.dateInputWeb}
              value={formatDateYYYYMMDD(selectedEndDate)}
              onChange={(e) => {
                const newDate = new Date(e.target.value);
                if (!isNaN(newDate.getTime())) {
                  setSelectedEndDate(newDate);
                }
              }}
            />
          </View>
        </View>
      );
    } else {
      // Móvil: usar DateTimePicker
      return (
        <View style={styles.datePickerContainer}>
          <Button
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
            title={`Fecha Desde: ${formatDateDDMM(selectedStartDate)}`}
            onPress={() => setShowStartDatePicker(true)}
          />
          {showStartDatePicker && (
            <DateTimePicker
              value={selectedStartDate}
              mode='date'
              display='default'
              onChange={(event, date) => {
                setShowStartDatePicker(false);
                if (date) setSelectedStartDate(date);
              }}
            />
          )}

          <Button
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
            title={`Fecha Hasta: ${formatDateDDMM(selectedEndDate)}`}
            onPress={() => setShowEndDatePicker(true)}
          />
          {showEndDatePicker && (
            <DateTimePicker
              value={selectedEndDate}
              mode='date'
              display='default'
              onChange={(event, date) => {
                setShowEndDatePicker(false);
                if (date) setSelectedEndDate(date);
              }}
            />
          )}
        </View>
      );
    }
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.innerContent}>
        <TouchableOpacity
          onPress={() => setIsQueryCollapsed(!isQueryCollapsed)}
          style={styles.collapsibleHeader}>
          <Text style={styles.collapsibleHeaderText}>Consulta</Text>
          <Ionicons
            name={
              isQueryCollapsed ? "chevron-down-outline" : "chevron-up-outline"
            }
            size={24}
            color='white'
          />
        </TouchableOpacity>

        {!isQueryCollapsed && (
          <View style={styles.queryContainer}>
            <Text style={styles.headerText}>Selecciona una opción:</Text>
            <SingleChoiceCheckbox
              selectedOption={selectedOption}
              onSelect={setSelectedOption}
            />

            {selectedOption === "LABORATORY" && renderDateSelectors()}

            <Button
              title='Consultar'
              onPress={handleConsultas}
              containerStyle={styles.buttonContainer}
              buttonStyle={styles.button}
            />
          </View>
        )}

        {consultaResult?.body?.length > 0 && (
          <View style={styles.resultContainer}>
            <PatientResults data={consultaResult} />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Detalles;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
    padding: 16,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },

  // Contenedor interno que contiene la UI
  innerContent: {
    padding: 16,
  },
  collapsibleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
  },
  collapsibleHeaderText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  queryContainer: {
    marginTop: 16,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerText: {
    fontSize: 16,
    marginBottom: 12,
    color: "#333",
    fontWeight: "500",
  },
  datePickerContainer: {
    marginBottom: 16,
  },
  dateInputContainer: {
    marginBottom: 16,
  },
  dateInputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "space-between",
  },
  dateInputWeb: {
    fontSize: 16,
    padding: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginLeft: 10,
  },
  buttonContainer: {
    marginVertical: 6,
  },
  button: {
    borderRadius: 30,
    padding: 12,
    backgroundColor: "#007AFF",
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  resultContainer: {
    marginTop: 16,
  },
});
