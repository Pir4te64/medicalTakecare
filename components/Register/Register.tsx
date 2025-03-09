import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Input, Button } from "react-native-elements";
import { useFormik } from "formik";
import { validationSchema, initialValues } from "./Register.data";
import { useRouter } from "expo-router";
import { API } from "@/utils/api";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CustomAlert from "@/components/Modal/Modal"; // Asegúrate de importar el CustomAlert

const RegisterForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState({ title: "", message: "" });

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);

      const formData = {
        document: values.document,
        pseudonym: values.document,
        name: values.name,
        password: values.password,
      };

      try {
        const response = await fetch(`${API.REGISTER}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Error en el registro");
        }

        setAlertMessage({
          title: "Éxito",
          message: "Registro exitoso. Ahora puedes iniciar sesión.",
        });
        setAlertVisible(true);
      } catch (error) {
        setAlertMessage({
          title: "Error",
          message: (error as Error).message || "No se pudo registrar",
        });
        setAlertVisible(true);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <ScrollView
      style={{ width: "100%" }}
      contentContainerStyle={{
        paddingTop: 20,
        paddingBottom: 30,
        alignItems: "center",
      }}
    >
      {/* Modal de alerta */}
      <CustomAlert
        visible={alertVisible}
        onClose={() => {
          setAlertVisible(false);
          if (alertMessage.title === "Éxito") {
            router.replace("/login");
          }
        }}
        title={alertMessage.title}
        message={alertMessage.message}
      />

      {/* Campo Documento */}
      <Text style={{ width: "80%", marginBottom: 5 }}>Documento</Text>
      <Input
        placeholder="Documento"
        value={values.document}
        onChangeText={(text) => {
          handleChange("document")(text);
          setFieldValue("pseudonym", text);
        }}
        onBlur={handleBlur("document")}
        errorMessage={
          touched.document && errors.document ? errors.document : ""
        }
        containerStyle={{ width: "80%", marginBottom: 5 }}
        inputStyle={{ paddingHorizontal: 10 }}
        leftIcon={
          <MaterialIcons
            name="assignment-ind"
            size={24}
            color="#0066cc"
            style={{ marginRight: 5 }}
          />
        }
      />

      {/* Campo Nombre */}
      <Text style={{ width: "80%", marginBottom: 5 }}>Nombre</Text>
      <Input
        placeholder="Nombre"
        value={values.name}
        onChangeText={handleChange("name")}
        onBlur={handleBlur("name")}
        errorMessage={touched.name && errors.name ? errors.name : ""}
        containerStyle={{ width: "80%", marginBottom: 5 }}
        inputStyle={{ paddingHorizontal: 10 }}
        leftIcon={
          <MaterialIcons
            name="person"
            size={24}
            color="#0066cc"
            style={{ marginRight: 5 }}
          />
        }
      />

      {/* Campo Contraseña */}
      <Text style={{ width: "80%", marginBottom: 5 }}>Contraseña</Text>
      <Input
        placeholder="Contraseña"
        value={values.password}
        onChangeText={handleChange("password")}
        onBlur={handleBlur("password")}
        secureTextEntry={!showPassword}
        errorMessage={
          touched.password && errors.password ? errors.password : ""
        }
        containerStyle={{ width: "80%", marginBottom: 5 }}
        inputStyle={{ paddingHorizontal: 10 }}
        leftIcon={
          <MaterialIcons
            name="lock"
            size={24}
            color="#0066cc"
            style={{ marginRight: 5 }}
          />
        }
        rightIcon={
          <MaterialCommunityIcons
            name={showPassword ? "eye" : "eye-off"}
            size={24}
            color="#0066cc"
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />

      {/* Botón Registrarse */}
      <View style={{ width: "80%", alignItems: "center" }}>
        <Button
          title={loading ? "Registrando..." : "Registrarse"}
          onPress={() => handleSubmit()}
          disabled={loading}
          buttonStyle={{
            backgroundColor: "#0066cc",
            width: "100%",
            borderRadius: 5,
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

      {/* Link para ir a login */}
      <View style={{ width: "80%", marginTop: 20, alignItems: "center" }}>
        <TouchableOpacity onPress={() => router.replace("/login")}>
          <Text
            style={{
              fontSize: 16,
              color: "blue",
              textDecorationLine: "underline",
            }}
          >
            ¿Ya tienes una cuenta? Inicia sesión aquí
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RegisterForm;
