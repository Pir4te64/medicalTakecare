import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

interface UpdatePasswordFormProps {
  onSubmit: (values: { newPassword: string; confirmPassword: string }) => void;
  onCancel: () => void;
}

const UpdatePasswordForm: React.FC<UpdatePasswordFormProps> = ({ onSubmit, onCancel }) => {
  return (
    <Formik
      initialValues={{ newPassword: "", confirmPassword: "" }}
      validationSchema={Yup.object({
        newPassword: Yup.string()
          .min(6, "La contraseña debe tener al menos 6 caracteres")
          .required("La contraseña es requerida"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("newPassword"), null], "Las contraseñas deben coincidir")
          .required("La confirmación de la contraseña es requerida"),
      })}
      onSubmit={onSubmit}
    >
      {({ values, handleChange, handleBlur, handleSubmit, touched, errors }) => (
        <>
          <TextInput
            style={[
              styles.input,
              touched.newPassword && errors.newPassword ? styles.inputError : {},
            ]}
            placeholder="Ingrese nueva contraseña"
            value={values.newPassword}
            onChangeText={handleChange("newPassword")}
            onBlur={handleBlur("newPassword")}
            secureTextEntry
          />
          {touched.newPassword && errors.newPassword && (
            <Text style={styles.errorText}>{errors.newPassword}</Text>
          )}
          <TextInput
            style={[
              styles.input,
              touched.confirmPassword && errors.confirmPassword ? styles.inputError : {},
            ]}
            placeholder="Confirmar nueva contraseña"
            value={values.confirmPassword}
            onChangeText={handleChange("confirmPassword")}
            onBlur={handleBlur("confirmPassword")}
            secureTextEntry
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}
          {/* Contenedor para los botones en fila */}
          <View style={styles.buttonsContainer}>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.updateButton]} onPress={() => handleSubmit()}>
              <Text style={styles.buttonText}>Actualizar</Text>
            </TouchableOpacity>
            
          </View>
        </>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  inputError: {
    borderColor: "red",
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
});

export default UpdatePasswordForm;
