import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Input } from "react-native-elements";
import * as Yup from "yup";

interface InputsPrincipalesProps {
  formData: {
    weight: string;
    height: string;
    bloodType: string;
  };
  handleChange: (field: string, value: string) => void;
}

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const InputsPrincipales: React.FC<InputsPrincipalesProps> = ({
  formData,
  handleChange,
}) => {
  const [errors, setErrors] = useState<any>({});
  const [expanded, setExpanded] = useState<boolean>(false);

  // Esquema de validación con Yup
  const validationSchema = Yup.object().shape({
    weight: Yup.number().required("El peso es obligatorio"),
    height: Yup.number().required("La altura es obligatoria"),
    bloodType: Yup.string()
      .oneOf(
        ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        "Tipo de sangre inválido"
      )
      .required("El tipo de sangre es obligatorio"),
  });

  const validateForm = () => {
    validationSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        setErrors({});
      })
      .catch((err) => {
        const errorObj: any = {};
        err.inner.forEach((e: any) => {
          errorObj[e.path] = e.message;
        });
        setErrors(errorObj);
      });
  };

  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleExpanded} style={styles.header}>
        <Text style={styles.headerText}>Datos</Text>
        <Ionicons
          name={expanded ? "chevron-up-outline" : "chevron-down-outline"}
          size={24}
          color="white"
        />
      </TouchableOpacity>
      {expanded && (
        <View style={styles.content}>
          <Input
            label="Peso"
            placeholder="Ingrese su peso en kg"
            value={formData.weight}
            onChangeText={(value) => handleChange("weight", value)}
            errorMessage={errors.weight}
            onBlur={validateForm}
            keyboardType="numeric"
          />
          <Input
            label="Altura"
            placeholder="Ingrese su altura en cm"
            value={formData.height}
            onChangeText={(value) => handleChange("height", value)}
            onBlur={validateForm}
            keyboardType="numeric"
          />
          <Input
            label="Tipo de Sangre"
            placeholder="A+, A-, B+, B-, AB+, AB-, O+, O-"
            value={formData.bloodType}
            onChangeText={(value) => handleChange("bloodType", value)}
            errorMessage={errors.bloodType}
            onBlur={validateForm}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    marginVertical: 10,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#007bff",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  content: {
    padding: 15,
  },
});

export default InputsPrincipales;
