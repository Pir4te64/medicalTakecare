import React, { useState, useEffect } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
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
  const [updateResult, setUpdateResult] = useState<{
    status: "success" | "error";
    message: string;
  } | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const obtenerTipoSeleccionado = async () => {
      const tipo = await AsyncStorage.getItem("tipoSeleccionado");
      setTipoUsuario(tipo);
    };

    if (visible) {
      obtenerTipoSeleccionado();
      // Reiniciamos el resultado cada vez que se muestra el modal
      setUpdateResult(null);
    }
  }, [visible]);

  // Función que realiza la actualización
  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        console.log("Token no encontrado");
        setUpdateResult({ status: "error", message: "Token no encontrado" });
        setIsUpdating(false);
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
      console.log("Respuesta de la API:", data);

      if (response.ok) {
        setUpdateResult({
          status: "success",
          message: "Datos actualizados correctamente.",
        });
      } else {
        setUpdateResult({
          status: "error",
          message: data.message || "Error al actualizar.",
        });
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setUpdateResult({
        status: "error",
        message: "Ocurrió un error al procesar la solicitud.",
      });
    }
    setIsUpdating(false);
  };

  // Función para cerrar el modal
  const handleClose = () => {
    onClose();
    // Si la actualización fue exitosa, recargamos el perfil
    if (updateResult?.status === "success") {
      setTimeout(() => {
        reloadProfile();
      }, 2000);
    }
  };

  return (
    <Modal transparent visible={visible} animationType='fade'>
      <View style={stylesModal.modalContainer}>
        <View style={stylesModal.modalContent}>
          {updateResult ? (
            // Mostrar mensaje de resultado
            <>
              <Text style={stylesModal.modalTitle}>
                {updateResult.status === "success" ? "✅ ¡Éxito!" : "❌ Error"}
              </Text>
              <Text style={stylesModal.modalText}>{updateResult.message}</Text>
              <TouchableOpacity
                style={stylesModal.closeButton}
                onPress={handleClose}>
                <Text style={stylesModal.closeButtonText}>OK</Text>
              </TouchableOpacity>
            </>
          ) : (
            // Mostrar contenido de confirmación
            <>
              <Text style={stylesModal.modalTitle}>
                ¿Seguro que deseas cambiar?
              </Text>
              <Text style={stylesModal.modalText}>
                Has escogido:{" "}
                {tipoUsuario || tipoSeleccionado || "No seleccionado"}
              </Text>
              <Text style={stylesModal.modalText}>
                Pseudónimo: {afiliado?.seudonimo || "No asignado"}
              </Text>

              <View style={stylesModal.buttonsContainer}>
                <TouchableOpacity
                  style={stylesModal.closeButton}
                  onPress={onClose}>
                  <Text style={stylesModal.closeButtonText}>Cerrar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={stylesModal.updateButton}
                  onPress={handleUpdate}
                  disabled={isUpdating}>
                  <Text style={stylesModal.updateButtonText}>
                    {isUpdating ? "Actualizando..." : "Actualizar"}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ModalUpdateAPoderado;
