import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Input, Button } from "react-native-elements";
import { Icon } from "react-native-elements";
import ChronicDiseaseItem from "./ChronicDiseaseItem";
import { ChronicDiseaseInputProps } from "./ChornicDiseaseInterface";
import { deleteChronicDisease } from "./ChronicDelete";
import { styles } from "./ChronicDisease.styles";
const ChronicDiseaseInput: React.FC<ChronicDiseaseInputProps> = ({
  newDisease,
  doctorEmail,
  medicalCenter,
  medication,
  dosage,
  onChangeDisease,
  onChangeDoctorEmail,
  onChangeMedicalCenter,
  onChangeMedication,
  onChangeDosage,
  onAddChronicDisease,
  chronicDiseases,
  onUpdateChronicDisease,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <Text style={styles.title}>Agregar Enfermedad Crónica</Text>
        <Icon
          name={isExpanded ? "chevron-up" : "chevron-down"}
          type="feather"
          color="white"
        />
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.box}>
          <Input
            label="Enfermedad"
            placeholder="Ej: Diabetes"
            value={newDisease}
            onChangeText={onChangeDisease}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
          />
          <Input
            label="Correo del Doctor"
            placeholder="Ej: doctor@email.com"
            value={doctorEmail}
            onChangeText={onChangeDoctorEmail}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
          />
          <Input
            label="Centro Médico"
            placeholder="Ej: Hospital Central"
            value={medicalCenter}
            onChangeText={onChangeMedicalCenter}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
          />
          <Input
            label="Medicamento"
            placeholder="Ej: Insulina"
            value={medication}
            onChangeText={onChangeMedication}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
          />
          <Input
            label="Dosis"
            placeholder="Ej: 10mg"
            value={dosage}
            onChangeText={onChangeDosage}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            keyboardType="numeric"
          />

          <Button
            title="Agregar Enfermedad"
            onPress={onAddChronicDisease}
            buttonStyle={styles.button}
            icon={<Icon name="plus" type="feather" color="white" />}
            iconPosition="right"
          />
        </View>
      )}

      {/* Lista de enfermedades agregadas */}
      <View style={styles.diseasesList}>
        {chronicDiseases.map((diseaseData, index) => (
          <ChronicDiseaseItem
            key={index}
            index={index}
            diseaseData={diseaseData}
            onUpdate={onUpdateChronicDisease} // Aquí se pasa la función
            onDelete={() => deleteChronicDisease(diseaseData.id)}
          />
        ))}
      </View>
    </View>
  );
};

export default ChronicDiseaseInput;
