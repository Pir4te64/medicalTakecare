import React, { useState } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import { Button } from "react-native-elements";
import { useFormik } from "formik";
import { validationSchema, initialValues } from "./RegistrarDep.data";
import { useRouter } from "expo-router";
import { API } from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomAlert from "@/components/Modal/Modal";
import CustomInput from "@/components/Registrardependientes/CustomInput";

const RegisterDependientes = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"success" | "error">("success");

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
    validateField,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("authToken");

        const response = await fetch(`${API.DEPENDIENTE}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify({
            document: values.document,
            pseudonym: values.document,
            name: values.name,
            password: values.password,
          }),
        });

        const data = await response.json();
        if (!response.ok)
          throw new Error(data.message || "Error en el registro");

        setModalType("success");
        setModalMessage("Dependiente registrado correctamente.");
        setModalVisible(true);
      } catch (error) {
        setModalType("error");
        setModalMessage((error as Error).message || "No se pudo registrar.");
        setModalVisible(true);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <ScrollView
      style={{ width: "100%" }}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
      }}
    >
      <CustomInput
        label="Documento"
        placeholder="Documento"
        value={values.document}
        onChangeText={(text) => {
          handleChange("document")(text);
          setFieldValue("pseudonym", text);
        }}
        onBlur={() => handleBlur("document")}
        errorMessage={
          touched.document && errors.document ? errors.document : ""
        }
        icon="document"
        onValidateField={() => validateField("document")} // Validación en tiempo real
      />

      <CustomInput
        label="Nombre"
        placeholder="Nombre"
        value={values.name}
        onChangeText={handleChange("name")}
        onBlur={() => handleBlur("name")}
        errorMessage={touched.name && errors.name ? errors.name : ""}
        icon="person"
        onValidateField={() => validateField("name")} // Validación en tiempo real
      />

      <CustomInput
        label="Contraseña"
        placeholder="Contraseña"
        value={values.password}
        onChangeText={handleChange("password")}
        onBlur={() => handleBlur("password")}
        secureTextEntry
        errorMessage={
          touched.password && errors.password ? errors.password : ""
        }
        icon="lock-closed"
        onValidateField={() => validateField("password")} // Validación en tiempo real
      />

      <View style={{ width: "100%", alignItems: "center" }}>
        <Button
          title={loading ? "Registrando..." : "Registrar Dependiente"}
          onPress={() => handleSubmit()}
          disabled={loading}
          buttonStyle={{
            backgroundColor: "#0066cc",
            width: "100%",
            borderRadius: 10,
          }}
          containerStyle={{ marginTop: 10, width: "100%" }}
          titleStyle={{ fontSize: 18, textAlign: "center" }}
        />
        {loading && (
          <ActivityIndicator
            size="large"
            color="#0066cc"
            style={{ marginTop: 10 }}
          />
        )}
      </View>

      <CustomAlert
        visible={modalVisible}
        title={modalType === "success" ? "¡Éxito!" : "Error"}
        message={modalMessage}
        type={modalType}
        onClose={() => {
          setModalVisible(false);
          if (modalType === "success") router.replace("/home/profile");
          resetForm();
        }}
      />
    </ScrollView>
  );
};

export default RegisterDependientes;
