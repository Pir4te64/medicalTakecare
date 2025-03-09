import React, { useState, useEffect } from "react";
import { View, Text, Modal, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { stylesModal } from "./ModalUpdateAPoderado.styles";
import { API } from "@/utils/api";

interface Afiliado {
  nombre: string;
  documento: string;
  tipoUsuario: string;
  tipoCuenta: string;
  seudonimo: string;
}

interface ModalUpdateAPoderadoProps {
  visible: boolean;
  afiliado: Afiliado | null;
  tipoSeleccionado: string | null;
  onClose: () => void;
  reloadProfile: () => void;
}

const ModalUpdateAPoderado: React.FC<ModalUpdateAPoderadoProps> = ({
  visible,
  afiliado,
  tipoSeleccionado,
  onClose,
  reloadProfile,
}) => {
  const [tipoUsuario, setTipoUsuario] = useState<string | null>(null);

  useEffect(() => {
    const obtenerTipoSeleccionado = async () => {
      const tipo = await AsyncStorage.getItem("tipoSeleccionado");
      setTipoUsuario(tipo);
    };

    if (visible) {
      obtenerTipoSeleccionado();
    }
  }, [visible]);

  // Función de envío de datos
  const handleUpdate = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        console.log("Token no encontrado");
        return;
      }

      // Definir el valor de "role" basado en tipoSeleccionado
      const role =
        tipoSeleccionado === "dependiente"
          ? "D"
          : tipoSeleccionado === "apoderado"
          ? "A"
          : "";

      const url = `${API.UPDATE_DEPENDIENTE}?role=${role}&seudonimo=${afiliado?.seudonimo}`;

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("Respuesta de la API:", data); // Verifica la respuesta de la API

      if (response.ok) {
        Alert.alert(
          "✅ ¡Éxito!",
          "Datos actualizados correctamente.",
          [
            {
              text: "OK",
              onPress: () => {
                onClose();
                setTimeout(() => {
                  reloadProfile();
                }, 2000);
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert(
          "❌ Error",
          data.message || "Error al actualizar.",
          [{ text: "OK", onPress: () => onClose() }],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      Alert.alert("Error", "Ocurrió un error al procesar la solicitud.");
    }
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={stylesModal.modalContainer}>
        <View style={stylesModal.modalContent}>
          <Text style={stylesModal.modalTitle}>Seguro que deseas cambiar?</Text>
          <Text style={stylesModal.modalText}>
            Has escogido: {tipoUsuario || tipoSeleccionado || "No seleccionado"}
          </Text>
          <Text style={stylesModal.modalText}>
            Pseudónimo: {afiliado?.seudonimo || "No asignado"}
          </Text>

          <View style={stylesModal.buttonsContainer}>
            <TouchableOpacity style={stylesModal.closeButton} onPress={onClose}>
              <Text style={stylesModal.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={stylesModal.updateButton}
              onPress={handleUpdate}
            >
              <Text style={stylesModal.updateButtonText}>Actualizar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalUpdateAPoderado;
