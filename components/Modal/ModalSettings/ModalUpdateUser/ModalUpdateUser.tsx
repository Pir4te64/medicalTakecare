import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "@/utils/api";

interface ModalUpdateUserProps {
  visible: boolean;
  onClose: () => void;
  user?: {
    name: string;
    document: string;
  };
  reloadProfile: () => void;
}

const ModalUpdateUser: React.FC<ModalUpdateUserProps> = ({
  visible,
  onClose,
  user,
  reloadProfile,
}) => {
  const [updateResult, setUpdateResult] = useState<{
    status: "success" | "error";
    message: string;
  } | null>(null);

  // Reiniciamos el feedback cada vez que se muestra el modal
  useEffect(() => {
    if (!visible) {
      setUpdateResult(null);
    }
  }, [visible]);

  const handleSubmit = async (values: { name: string }) => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      if (!authToken) {
        throw new Error(
          "⚠️ No se encontró el token de autenticación.\n\nPor favor, inicia sesión nuevamente."
        );
      }

      const response = await fetch(API.UPDATE_USER, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          name: values.name,
          document: user?.document,
          pseudonym: user?.document,
        }),
      });

      if (!response.ok) {
        throw new Error(
          "⚠️ Error al actualizar los datos del usuario.\n\nVerifica tu conexión e inténtalo de nuevo."
        );
      }

      setUpdateResult({
        status: "success",
        message: "📝 La información del usuario se actualizó correctamente.",
      });
    } catch (error: any) {
      setUpdateResult({
        status: "error",
        message:
          error.message ||
          "⚠️ Ocurrió un error al actualizar el usuario.\n\nInténtalo nuevamente más tarde.",
      });
    }
  };

  const handleFeedbackClose = () => {
    onClose();
    if (updateResult?.status === "success") {
      reloadProfile();
    }
  };

  return (
    <Modal
      animationType='fade'
      transparent
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {updateResult ? (
            // Mostrar el mensaje de feedback (éxito o error)
            <>
              <Text style={styles.modalTitle}>
                {updateResult.status === "success"
                  ? "✅ ¡Datos actualizados!"
                  : "❌ Error"}
              </Text>
              <Text style={styles.feedbackMessage}>{updateResult.message}</Text>
              <TouchableOpacity
                style={styles.feedbackButton}
                onPress={handleFeedbackClose}>
                <Text style={styles.buttonText}>Aceptar</Text>
              </TouchableOpacity>
            </>
          ) : (
            // Mostrar el formulario para actualizar datos del usuario
            <>
              <Text style={styles.modalTitle}>
                Actualizar Datos del Usuario
              </Text>
              <Formik
                initialValues={{ name: user?.name || "" }}
                validationSchema={Yup.object({
                  name: Yup.string().required("El nombre es requerido"),
                })}
                onSubmit={handleSubmit}>
                {({
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  errors,
                  touched,
                }) => (
                  <>
                    <TextInput
                      style={styles.input}
                      placeholder='Nombre'
                      value={values.name}
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("name")}
                    />
                    {touched.name && errors.name && (
                      <Text style={styles.errorText}>{errors.name}</Text>
                    )}
                    <View style={styles.buttonsContainer}>
                      <TouchableOpacity
                        style={[styles.button, styles.cancelButton]}
                        onPress={onClose}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.button, styles.updateButton]}
                        onPress={() => handleSubmit()}>
                        <Text style={styles.buttonText}>Actualizar</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </Formik>
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
    backgroundColor: "rgba(0,0,0,0.5)",
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
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
  },
  updateButton: {
    backgroundColor: "green",
  },
  cancelButton: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  feedbackMessage: {
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
});

export default ModalUpdateUser;
