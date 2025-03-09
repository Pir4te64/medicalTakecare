import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";
import { Input } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { showAlert, showConfirm } from "@/components/Modal/showMessage";

interface ChronicDiseaseItemProps {
  index: number;
  diseaseData: {
    id: number;
    disease: string;
    doctorEmail: string;
    medicalCenter: string;
    medicalTreatmentUser: { medication: string; dosage: string }[];
  };
  onUpdate: (
    index: number,
    field: string,
    value: string,
    treatmentIndex?: number
  ) => void;
  onDelete: (id: number) => Promise<boolean>;
}

const ChronicDiseaseItem: React.FC<ChronicDiseaseItemProps> = ({
  index,
  diseaseData,
  onUpdate,
  onDelete,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false); // Estado para deshabilitar botón

  const handleDelete = async () => {
    showConfirm(
      "Eliminar Enfermedad",
      "¿Estás seguro de que deseas eliminar esta enfermedad?",
      async () => {
        const success: boolean = await onDelete(diseaseData.id);

        if (success) {
          setIsDeleted(true); // Desactiva el botón de eliminar
          showAlert("✅ Éxito", "Enfermedad eliminada correctamente");
        } else {
          showAlert("❌ Error", "No se pudo eliminar la enfermedad");
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      {/* Botón para expandir/cerrar */}
      <TouchableOpacity
        style={styles.header}
        onPress={() => setIsExpanded(!isExpanded)}>
        <Text style={styles.title}>{diseaseData.disease}</Text>
        <Ionicons
          name={isExpanded ? "chevron-up" : "chevron-down"}
          size={20}
          color='#007BFF'
        />
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.box}>
          <Input
            label='Enfermedad'
            value={diseaseData.disease}
            onChangeText={(value) => onUpdate(index, "disease", value)}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
          />
          <Input
            label='Correo del Doctor'
            value={diseaseData.doctorEmail}
            onChangeText={(value) => onUpdate(index, "doctorEmail", value)}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
          />
          <Input
            label='Centro Médico'
            value={diseaseData.medicalCenter}
            onChangeText={(value) => onUpdate(index, "medicalCenter", value)}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
          />

          {/* Manejo del medicamento y la dosis */}
          {diseaseData.medicalTreatmentUser.map((treatment, i) => (
            <View key={i}>
              <Input
                label='Medicamento'
                value={treatment.medication}
                onChangeText={(value) =>
                  onUpdate(index, "medication", value, i)
                } // Pasar el índice del tratamiento
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
              />
              <Input
                label='Dosis'
                value={treatment.dosage}
                onChangeText={(value) => onUpdate(index, "dosage", value, i)} // Pasar el índice del tratamiento
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                keyboardType='numeric'
              />
            </View>
          ))}

          {/* Botón de eliminación */}
          <TouchableOpacity
            style={[styles.deleteButton, isDeleted && styles.disabledButton]}
            onPress={handleDelete}
            disabled={isDeleted}>
            <Ionicons name='trash-bin-outline' size={20} color='white' />
            <Text style={styles.deleteText}>
              {isDeleted ? "Eliminado" : "Eliminar"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 5,
    borderColor: "#007BFF",
    borderWidth: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007BFF",
  },
  box: {
    marginTop: 10,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    borderColor: "#ddd",
    borderWidth: 1,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    color: "#333",
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  deleteText: {
    color: "white",
    fontSize: 16,
    marginLeft: 5,
  },
});

export default ChronicDiseaseItem;
