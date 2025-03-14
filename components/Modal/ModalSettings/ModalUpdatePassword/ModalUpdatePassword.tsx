import React, { useState, useEffect } from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import UpdatePasswordForm from "./Formulario"; // Ajusta la ruta según tu estructura
import { actualizarContrasena } from "./ModalUP.data";

interface ModalUpdatePasswordProps {
  visible: boolean;
  onClose: () => void;
  afiliado: { nombre: string; documento: string; seudonimo: string } | null;
  reloadProfile: () => void; // Agregar esta prop
}

const ModalUpdatePassword: React.FC<ModalUpdatePasswordProps> = ({
  visible,
  onClose,
  afiliado,
  reloadProfile,
}) => {
  const [updateResult, setUpdateResult] = useState<{
    status: "success" | "error";
    message: string;
  } | null>(null);

  const [isUpdating, setIsUpdating] = useState(false);

  const handleSubmit = async (values: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    // Validación de contraseñas
    if (values.newPassword !== values.confirmPassword) {
      console.log("Las contraseñas no coinciden");
      setUpdateResult({
        status: "error",
        message:
          "⚠️ Las contraseñas no coinciden.\n\nPor favor, verifica e intenta nuevamente.",
      });
      return;
    }

    if (!afiliado?.seudonimo) {
      setUpdateResult({
        status: "error",
        message: "El seudónimo del afiliado es requerido.",
      });
      return;
    }

    setIsUpdating(true);
    try {
      await actualizarContrasena(
        values.newPassword,
        values.confirmPassword,
        afiliado.seudonimo,
        true // Dado que ya validamos que coinciden
      );
      setUpdateResult({
        status: "success",
        message:
          "🔒 Tu contraseña se ha cambiado correctamente.\n\nSe recargará el perfil en breve.",
      });
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
      setUpdateResult({
        status: "error",
        message:
          "⚠️ Ocurrió un error al actualizar la contraseña.\n\nInténtalo nuevamente.",
      });
    }
    setIsUpdating(false);
  };

  const handleFeedbackClose = () => {
    onClose();
    if (updateResult?.status === "success") {
      setTimeout(() => {
        reloadProfile();
      }, 2000);
    }
  };

  // Reiniciamos el estado cuando se cierra el modal para que se vuelva a mostrar el formulario
  useEffect(() => {
    if (!visible) {
      setUpdateResult(null);
    }
  }, [visible]);

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {updateResult ? (
            // Mostramos el mensaje de feedback (éxito o error)
            <>
              <Text style={styles.modalTitle}>
                {updateResult.status === "success"
                  ? "✅ ¡Contraseña actualizada!"
                  : "❌ Error"}
              </Text>
              <Text style={styles.modalMessage}>{updateResult.message}</Text>
              <TouchableOpacity
                style={styles.feedbackButton}
                onPress={handleFeedbackClose}>
                <Text style={styles.feedbackButtonText}>OK</Text>
              </TouchableOpacity>
            </>
          ) : (
            // Mostramos el formulario para actualizar la contraseña
            <>
              <Text style={styles.modalTitle}>Actualizar Contraseña</Text>
              {afiliado ? (
                <Text style={styles.afiliadoInfo}>
                  {`Afiliado seleccionado: ${afiliado.nombre}`}
                </Text>
              ) : (
                <Text style={styles.afiliadoInfo}>
                  No se ha seleccionado un afiliado.
                </Text>
              )}
              <UpdatePasswordForm
                onSubmit={handleSubmit}
                onCancel={onClose}
                isUpdating={isUpdating} // Opcional: para deshabilitar botones durante la actualización
              />
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  afiliadoInfo: {
    fontSize: 14,
    marginBottom: 15,
    color: "#555",
  },
  modalMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  feedbackButton: {
    backgroundColor: "#007BFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  feedbackButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default ModalUpdatePassword;
