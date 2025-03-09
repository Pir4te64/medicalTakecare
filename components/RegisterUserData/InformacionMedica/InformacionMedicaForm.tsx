import React, { useEffect, useState } from "react";
import { Text, ScrollView, View, Alert, TouchableOpacity } from "react-native";
import { styles } from "./InformacionStyles.styles";
import AllergyInput from "../AllergicInput/AllergicInput";
import DatePickerInput from "../DatePicker/DatePicker";
import ChronicDiseaseInput from "../ChronicDiseaseInput/ChronicDiseaseInput";
import { handleSubmit } from "../Register.data";
import { getUpdatedInfo } from "../Register.Update";
import { GuardarInfoActualizada } from "../GuardarInfoActualizada";
import InputsPrincipales from "../InputsPrincipales/InputsPrincipales";
import { useRegisterStore } from "../ChronicDiseaseInput/useRegisterStore";
import { useUserData } from "./InformacionMedica";
import { useFocusEffect } from "expo-router";

interface Afiliado {
  id: number;
}

interface RegisterDataFormProps {
  afiliado: Afiliado;
}

const RegisterDataForm: React.FC<RegisterDataFormProps> = ({ afiliado }) => {
  // Estado para controlar si los datos están cargados
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Llamamos al hook personalizado, pasando el setIsDataLoaded
  useUserData(afiliado.id, setIsDataLoaded);

  const {
    birthDate,
    weight,
    height,
    bloodType,
    medicationAllergies,
    otherAllergies,
    chronicDiseases,
    newDisease,
    doctorEmail,
    medicalCenter,
    medication,
    dosage,
    setField,
  } = useRegisterStore();
  const resetForm = useRegisterStore((state) => state.resetForm);

  useFocusEffect(
    React.useCallback(() => {
      resetForm();
    }, [])
  );
  const onUpdateChronicDisease = (
    index: number,
    field: string,
    value: string
  ) => {
    useRegisterStore.setState((state) => {
      const updatedChronicDiseases = [...state.chronicDiseases];

      // Actualiza el campo correspondiente
      if (field === "disease") {
        updatedChronicDiseases[index].disease = value;
      } else if (field === "doctorEmail") {
        updatedChronicDiseases[index].doctorEmail = value;
      } else if (field === "medicalCenter") {
        updatedChronicDiseases[index].medicalCenter = value;
      } else if (field === "medication") {
        updatedChronicDiseases[index].medicalTreatmentUser[0].medication =
          value;
      } else if (field === "dosage") {
        updatedChronicDiseases[index].medicalTreatmentUser[0].dosage = value;
      }

      return { chronicDiseases: updatedChronicDiseases };
    });
  };

  const handleUpdateInfo = async () => {
    const currentState = useRegisterStore.getState();
    const updatedInfo = getUpdatedInfo(afiliado, currentState);
    console.log("updatedInfo", JSON.stringify(updatedInfo, null, 2));

    try {
      await GuardarInfoActualizada(updatedInfo);

      Alert.alert("✅ Éxito", "Los datos se actualizaron correctamente.", [
        { text: "OK" },
      ]);
    } catch (error) {
      console.error("Error al actualizar la información:", error);
      Alert.alert("Error", "Hubo un problema al actualizar los datos.");
    }
  };

  const isFormComplete = () => {
    return (
      birthDate && weight && height && bloodType
      // bloodType &&
      // medicationAllergies.length > 0 &&
      // otherAllergies.length > 0 &&
      // chronicDiseases.length > 0
    );
  };
  const handleDeleteAllergy = (
    allergy: string,
    type: "medication" | "other"
  ) => {
    if (type === "medication") {
      const updatedAllergies = medicationAllergies.filter(
        (item) => item.allergy.toLowerCase() !== allergy.toLowerCase()
      );
      setField("medicationAllergies", updatedAllergies);
    } else {
      const updatedAllergies = otherAllergies.filter(
        (item) => item.allergy.toLowerCase() !== allergy.toLowerCase()
      );
      setField("otherAllergies", updatedAllergies);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.Alergiascontainer}>
        <DatePickerInput
          date={birthDate}
          onChange={(date) => setField("birthDate", date)}
        />

        <InputsPrincipales
          formData={useRegisterStore.getState()}
          handleChange={setField}
        />
      </View>

      <View style={styles.Alergiascontainer}>
        <AllergyInput
          title="Agregar Alergia a Medicamentos"
          onDeleteAllergy={(allergy) =>
            handleDeleteAllergy(allergy, "medication")
          } // Pasar función de eliminación
          placeholder="Ej 'Penicilina'"
          allergies={medicationAllergies}
          availableAllergies={["Penicilina", "Ibuprofeno", "Sulfa"]}
          onAddAllergy={(allergy) =>
            setField("medicationAllergies", [
              ...medicationAllergies,
              { allergy },
            ])
          }
        />

        <AllergyInput
          onDeleteAllergy={(allergy) => handleDeleteAllergy(allergy, "other")} // Pasar función de eliminación
          title="Agregar Otras Alergias"
          placeholder="Otras alergias"
          allergies={otherAllergies}
          availableAllergies={["Polen", "Acaros", "Latex"]}
          onAddAllergy={(allergy) =>
            setField("otherAllergies", [...otherAllergies, { allergy }])
          }
        />
      </View>

      <View style={styles.Alergiascontainer}>
        <ChronicDiseaseInput
          afiliadoId={afiliado.id}
          newDisease={newDisease}
          doctorEmail={doctorEmail}
          medicalCenter={medicalCenter}
          medication={medication}
          dosage={dosage}
          chronicDiseases={chronicDiseases}
          onChangeDisease={(value) => setField("newDisease", value)}
          onChangeDoctorEmail={(value) => setField("doctorEmail", value)}
          onChangeMedicalCenter={(value) => setField("medicalCenter", value)}
          onChangeMedication={(value) => setField("medication", value)}
          onChangeDosage={(value) => setField("dosage", value)}
          onAddChronicDisease={() => {
            if (
              newDisease &&
              doctorEmail &&
              medicalCenter &&
              medication &&
              dosage
            ) {
              setField("chronicDiseases", [
                ...chronicDiseases,
                {
                  disease: newDisease,
                  doctorEmail,
                  medicalCenter,
                  medicalTreatmentUser: [{ medication, dosage }],
                },
              ]);
              setField("newDisease", "");
              setField("doctorEmail", "");
              setField("medicalCenter", "");
              setField("medication", "");
              setField("dosage", "");
            } else {
              Alert.alert(
                "⚠️ Campos incompletos",
                "Por favor, completa todos los campos necesarios antes de continuar.",
                [{ text: "Aceptar" }]
              );
            }
          }}
          onUpdateChronicDisease={onUpdateChronicDisease}
        />
      </View>

      {isDataLoaded ? (
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleUpdateInfo}
        >
          <Text style={styles.submitButtonText}>Actualizar</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            if (isFormComplete()) {
              handleSubmit(
                afiliado,
                birthDate,
                weight,
                height,
                bloodType,
                medicationAllergies,
                otherAllergies,
                chronicDiseases
              );
            }
          }}
          disabled={!isFormComplete()}
        >
          <Text
            style={[
              styles.submitButtonText,
              !isFormComplete() && { opacity: 0.5 },
            ]}
          >
            Registrar
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default RegisterDataForm;
