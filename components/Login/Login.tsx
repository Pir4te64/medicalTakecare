import React, { useState } from "react";
import { Text, View, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Input, Button } from "react-native-elements";
import { useFormik } from "formik";
import { schemaValidation } from "./Login.data";
import { API } from "@/utils/api";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CustomAlert from "../Modal/Modal";

export default function LoginComponent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  interface LoginValues {
    username: string;
    password: string;
  }

  interface ApiResponse {
    success: boolean;
    message?: string;
    body?: {
      token: string;
      refreshToken: string;
    };
  }
  const handleLogin = async (values: LoginValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(API.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username.trim(),
          password: values.password.trim(),
        }),
      });

      const data: ApiResponse = await response.json();

      if (response.ok && data.success) {
        const { token, refreshToken } = data.body!;
        if (token && refreshToken) {
          await AsyncStorage.setItem("authToken", token);
          await AsyncStorage.setItem("refreshToken", refreshToken);

          setAlertMessage("Inicio de sesión exitoso.");
          setAlertVisible(true);
          setTimeout(() => {
            setAlertVisible(false);
            router.push("/home/homeScreen");
          }, 1000);
        } else {
          setAlertMessage("No se pudo obtener el token de acceso.");
          setAlertVisible(true);
        }
      } else {
        // Validamos el mensaje de error para mostrar el mensaje en español
        const errorMsg =
          data.message === "Bad credentials"
            ? "Usuario y/o contraseña incorrecto"
            : data.message || "Credenciales incorrectas";
        setAlertMessage(errorMsg);
        setAlertVisible(true);
      }
    } catch (error) {
      console.log("Error en la conexión: ", error);

      setAlertMessage("Hubo un problema con la conexión.");
      setAlertVisible(true);
    }
    setIsSubmitting(false);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: schemaValidation,
    onSubmit: handleLogin,
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
      <CustomAlert
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
        title="Mensaje"
        message={alertMessage}
      />

      <View style={{ width: "80%" }}>
        <Text style={{ marginTop: 5 }}>Usuario "RUT"</Text>
        <Input
          placeholder="Ingrese su RUT"
          onChangeText={formik.handleChange("username")}
          onBlur={formik.handleBlur("username")}
          value={formik.values.username}
          containerStyle={{ marginBottom: 5 }}
          errorMessage={
            formik.touched.username && formik.errors.username
              ? formik.errors.username
              : ""
          }
          leftIcon={
            <MaterialIcons
              name="person"
              size={24}
              color="#0066cc"
              style={{ marginRight: 5 }}
            />
          }
        />

        <Text style={{ marginTop: 5 }}>Contraseña:</Text>
        <Input
          placeholder="Contraseña"
          secureTextEntry={!showPassword}
          onChangeText={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
          value={formik.values.password}
          containerStyle={{ marginBottom: 5 }}
          errorMessage={
            formik.touched.password && formik.errors.password
              ? formik.errors.password
              : ""
          }
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

        <Button
          title={isSubmitting ? "Cargando..." : "Ingresar"}
          onPress={() => formik.handleSubmit()}
          disabled={isSubmitting}
          buttonStyle={{
            backgroundColor: "#0066cc",
            width: "100%",
            borderRadius: 10,
            marginVertical: 10,
          }}
          titleStyle={{
            fontSize: 18,
            textAlign: "center",
          }}
        />

        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text
            style={{
              color: "blue",
              textDecorationLine: "underline",
              textAlign: "center",
              marginTop: 15,
              fontSize: 16,
            }}
          >
            ¿No tienes una cuenta? Regístrate aquí
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
