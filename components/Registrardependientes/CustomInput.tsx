import React from "react";
import { View, TextInput, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface CustomInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur: () => void;
  errorMessage?: string;
  secureTextEntry?: boolean;
  icon?: string;
  onValidateField: () => void; // Nueva prop para disparar la validación
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  onBlur,
  errorMessage,
  secureTextEntry,
  icon,
  onValidateField, // Recibimos la función para validar el campo
}) => {
  return (
    <View style={{ width: "100%", marginBottom: 15 }}>
      <Text style={{ fontSize: 16, marginBottom: 5 }}>{label}</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
          paddingHorizontal: 10,
        }}
      >
        {icon && (
          <Icon
            name={icon}
            size={20}
            color="#0066cc"
            style={{ marginRight: 10 }}
          />
        )}
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={(text) => {
            onChangeText(text); // Actualizamos el valor
            onValidateField(); // Ejecutamos la validación en cada cambio de texto
          }}
          onBlur={onBlur}
          secureTextEntry={secureTextEntry}
          style={{
            flex: 1,
            height: 40,
            fontSize: 16,
          }}
        />
      </View>
      {errorMessage && (
        <Text style={{ color: "red", marginTop: 5 }}>{errorMessage}</Text>
      )}
    </View>
  );
};

export default CustomInput;
