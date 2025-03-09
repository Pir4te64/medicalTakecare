import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Íconos para los checkboxes
import { styles } from "./ModalSelector.styles";

interface ModalSelectorProps {
  visible: boolean;
  onClose: () => void;
  onAccept: (selectedValue: string) => void;
}

const ModalSelector: React.FC<ModalSelectorProps> = ({ visible, onClose, onAccept }) => {
  const [selectedValue, setSelectedValue] = useState<string>("apoderado");

  const handleSelect = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Cambiar a:</Text>

          {/* Opción: Apoderado */}
          <TouchableOpacity style={styles.option} onPress={() => handleSelect("apoderado")}>
            <Ionicons
              name={selectedValue === "apoderado" ? "checkbox-outline" : "square-outline"}
              size={24}
              color="#007AFF"
            />
            <Text style={styles.optionText}>Apoderado</Text>
          </TouchableOpacity>

          {/* Opción: Dependiente */}
          <TouchableOpacity style={styles.option} onPress={() => handleSelect("dependiente")}>
            <Ionicons
              name={selectedValue === "dependiente" ? "checkbox-outline" : "square-outline"}
              size={24}
              color="#007AFF"
            />
            <Text style={styles.optionText}>Dependiente</Text>
          </TouchableOpacity>

          {/* Botones de acción */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={[styles.button, styles.cancelButton]}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onAccept(selectedValue)} style={[styles.button, styles.acceptButton]}>
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalSelector;
