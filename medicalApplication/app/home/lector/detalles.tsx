import { useProfileStore } from "@/components/Profile/profileStore";
import { getUserData } from "@/components/RegisterUserData/Register.fetch";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Text, View, Alert, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "react-native-elements";
import { BASE_URL } from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PatientResults from "@/components/Detalles/TestItem";
import Ionicons from "react-native-vector-icons/Ionicons";
import SingleChoiceCheckbox from "@/components/Detalles/SingleCheck";

const Detalles = () => {
  const { fetchProfile, profile } = useProfileStore();
  const [userData, setUserData] = useState(null);
  const [selectedOption, setSelectedOption] = useState("LABORATORY");
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [consultaResult, setConsultaResult] = useState(null);
  const [isQueryCollapsed, setIsQueryCollapsed] = useState(false);

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

  // Función para formatear una fecha como "DD/MM"
  const formatDateDDMM = (dateInput) => {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return "";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${day}/${month}`;
  };

  const handleConsultas = async () => {
    if (!selectedOption) {
      Alert.alert("Consulta", "Por favor, selecciona una opción válida.");
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
        Alert.alert("Consulta", "Opción no válida.");
        return;
    }

    const userDataId = userData?.userDataId;
    const params = new URLSearchParams({ userDataId });

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
        Alert.alert("Error", "No se encontró un token de autenticación.");
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

      // Verifica si data.body existe, es un array y está vacío
      if (data.body && Array.isArray(data.body) && data.body.length === 0) {
        Alert.alert(
          "Consulta exitosa",
          "No hay datos disponibles en esas fechas."
        );
        setConsultaResult(data); // o setConsultaResult([]) si prefieres guardar un array vacío
      } else {
        setConsultaResult(data);
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema con la consulta.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setIsQueryCollapsed(!isQueryCollapsed)}
        style={styles.collapsibleHeader}
      >
        <Text style={styles.collapsibleHeaderText}>Consulta</Text>
        <Ionicons
          name={
            isQueryCollapsed ? "chevron-down-outline" : "chevron-up-outline"
          }
          size={24}
          color="white"
        />
      </TouchableOpacity>

      {!isQueryCollapsed && (
        <View style={styles.queryContainer}>
          <Text style={styles.headerText}>Selecciona una opción:</Text>
          <SingleChoiceCheckbox
            selectedOption={selectedOption}
            onSelect={setSelectedOption}
          />

          {selectedOption === "LABORATORY" && (
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
                  mode="date"
                  display="default"
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
                title={
                  selectedEndDate
                    ? `Fecha Hasta: ${formatDateDDMM(selectedEndDate)}`
                    : "Fecha Hasta"
                }
                onPress={() => setShowEndDatePicker(true)}
              />
              {showEndDatePicker && (
                <DateTimePicker
                  value={selectedEndDate}
                  mode="date"
                  display="default"
                  onChange={(event, date) => {
                    setShowEndDatePicker(false);
                    if (date) setSelectedEndDate(date);
                  }}
                />
              )}
            </View>
          )}

          <Button
            title="Consultar"
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
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

export default Detalles;
