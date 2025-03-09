import React, { useState } from "react";
import { Modal, View, Text, StyleSheet, Alert } from "react-native";
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
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);

  const handleSubmit = async (values: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      if (values.newPassword !== values.confirmPassword) {
        console.log("Las contraseñas no coinciden");
        setPasswordsMatch(false);
        Alert.alert(
          "❌ Error",
          "⚠️ Las contraseñas no coinciden.\n\nPor favor, verifica e intenta nuevamente."
        );
        return;
      } else {
        setPasswordsMatch(true);
      }

      if (!afiliado?.seudonimo) {
        throw new Error("El seudónimo del afiliado es requerido");
      }

      const result = await actualizarContrasena(
        values.newPassword,
        values.confirmPassword,
        afiliado.seudonimo,
        passwordsMatch
      );

      // Mostrar alerta de éxito con icono y mensaje mejorado
      Alert.alert(
        "✅ ¡Contraseña actualizada!",
        "🔒 Tu contraseña se ha cambiado correctamente.\n\nSe recargará el perfil en breve.",
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
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
      Alert.alert(
        "❌ Error",
        "⚠️ Ocurrió un error al actualizar la contraseña.\n\nInténtalo nuevamente.",
        [{ text: "OK", onPress: onClose }]
      );
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
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
          <UpdatePasswordForm onSubmit={handleSubmit} onCancel={onClose} />
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
});

export default ModalUpdatePassword;
