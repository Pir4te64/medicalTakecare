import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Yup from "yup";
import { styles } from "./Allergic.styles";

interface AllergyInputProps {
  title: string;
  placeholder: string;
  allergies: { allergy: string }[];
  availableAllergies?: string[]; // Lista opcional de alergias predefinidas
  onAddAllergy: (allergy: string) => void;
  onDeleteAllergy: (allergy: string) => void; // Prop para manejar la eliminación
}

const AllergyInput: React.FC<AllergyInputProps> = ({
  title,
  placeholder,
  allergies,
  availableAllergies = [],
  onAddAllergy,
  onDeleteAllergy, // Recibe la función de eliminación
}) => {
  const [allergy, setAllergy] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [isCollapsed, setIsCollapsed] = useState(true); // Estado para controlar el colapso

  // Esquema de validación con Yup
  const validationSchema = Yup.string()
    .max(100, "El nombre de la alergia debe tener menos de 100 caracteres")
    .matches(/^[a-zA-Z\s]*$/, "Solo se permiten letras y espacios en blanco");

  const validateInput = (value: string) => {
    return validationSchema
      .validate(value, { abortEarly: false })
      .then(() => {
        setErrors({});
        return true;
      })
      .catch((err) => {
        const errorObj: any = {};
        err.inner.forEach((e: any) => {
          errorObj[e.path] = e.message;
        });
        setErrors(errorObj);
        return false;
      });
  };

  const handleAdd = async (value: string) => {
    // Evitar duplicados: verifica si ya está en la lista
    if (
      allergies.find(
        (item) => item.allergy.toLowerCase() === value.toLowerCase()
      )
    ) {
      return; // O muestra algún mensaje si lo prefieres
    }

    const isValid = await validateInput(value);
    if (isValid) {
      onAddAllergy(value);
      setAllergy("");
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginVertical: 8,
          padding: 8,
          borderRadius: 8,
          backgroundColor: "#007bff",
        }}
        onPress={() => setIsCollapsed(!isCollapsed)}
      >
        <Text style={styles.subtitle}>{title}</Text>
        <Ionicons
          name={isCollapsed ? "chevron-down" : "chevron-up"}
          size={24}
          color="#fff"
        />
      </TouchableOpacity>

      {!isCollapsed && (
        <>
          {/* Input manual */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={placeholder}
              value={allergy}
              onChangeText={setAllergy}
              onSubmitEditing={() => {
                if (allergy.trim() !== "") {
                  handleAdd(allergy.trim());
                }
              }}
              onBlur={() => validateInput(allergy)}
            />

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                if (allergy.trim() !== "") {
                  handleAdd(allergy.trim());
                }
              }}
            >
              <Ionicons name="add" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {errors.allergy && (
            <Text style={styles.errorText}>{errors.allergy}</Text>
          )}

          {/* Lista de alergias agregadas */}
          <View style={styles.allergiesList}>
            {allergies.map((item, index) => (
              <View key={index} style={styles.allergyItem}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <Text style={styles.allergyText}>• {item.allergy}</Text>
                  <TouchableOpacity
                    onPress={() => onDeleteAllergy(item.allergy)} // Llama a la función de eliminar
                  >
                    <Ionicons name="remove" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          {/* Lista de botones con alergias predefinidas */}
          {availableAllergies.length > 0 && (
            <FlatList
              data={availableAllergies}
              keyExtractor={(item) => item}
              horizontal
              contentContainerStyle={{ marginVertical: 8 }}
              renderItem={({ item }) => {
                // Deshabilitar el botón si la alergia ya fue agregada
                const isAdded = allergies.some(
                  (a) => a.allergy.toLowerCase() === item.toLowerCase()
                );
                return (
                  <TouchableOpacity
                    style={[
                      styles.predefinedButton,
                      isAdded && styles.disabledButton, // Estilo adicional para elementos ya agregados
                    ]}
                    onPress={() => {
                      if (!isAdded) {
                        handleAdd(item);
                      }
                    }}
                    disabled={isAdded}
                  >
                    <Text
                      style={[
                        styles.predefinedButtonText,
                        isAdded && styles.disabledButtonText,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </>
      )}
    </View>
  );
};

export default AllergyInput;
