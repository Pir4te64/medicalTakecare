import React from "react";
import { View, Text, Platform, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "../HistorialStyles"; // Asegúrate de importar los estilos

interface DateListFieldProps {
  label: string;
  items: any[];
  setItems: (index: number, key: string, value: any) => void;
  addItem: (newItem: any) => void;
  removeItem: (index: number) => void;
  showPicker: number | null;
  setShowPicker: (index: number | null) => void;
  dateKey: string;
  textKey: string;
  placeholder: string;
}

// Función para formatear la fecha como DD/MM/YYYY
const formatDate = (date: Date) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const DateListField: React.FC<DateListFieldProps> = ({
  label,
  items,
  setItems,
  addItem,
  removeItem,
  showPicker,
  setShowPicker,
  dateKey,
  textKey,
  placeholder,
}) => {
  return (
    <>
      <Text style={styles.label}>{label}:</Text>
      {items.map((item, index) => (
        <View key={`${label}-${index}`} style={styles.itemContainer}>
          {/* Fecha */}
          <Text style={styles.label}>Fecha:</Text>
          {Platform.OS === "android" ? (
            <>
              <TouchableOpacity
                onPress={() => setShowPicker(index)}
                style={{
                  padding: 10,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 4,
                  marginBottom: 10,
                }}
              >
                <Text>{formatDate(new Date(item[dateKey]))}</Text>
              </TouchableOpacity>
              {showPicker === index && (
                <View style={styles.datePickerContainer}>
                  <DateTimePicker
                    value={new Date(item[dateKey])}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      if (event.type === "set" && selectedDate) {
                        const today = new Date();
                        if (selectedDate > today) {
                          selectedDate = today;
                        }
                        setItems(index, dateKey, selectedDate);
                      }
                      // Oculta el picker tras seleccionar o cancelar
                      setShowPicker(null);
                    }}
                    style={styles.datePicker}
                  />
                </View>
              )}
            </>
          ) : (
            // En iOS se muestra siempre inline
            <DateTimePicker
              value={new Date(item[dateKey])}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                if (selectedDate) {
                  const today = new Date();
                  if (selectedDate > today) {
                    selectedDate = today;
                  }
                  setItems(index, dateKey, selectedDate);
                }
              }}
              style={styles.datePicker}
            />
          )}

          {/* Input de texto con un ícono a la derecha */}
          <Input
            placeholder={placeholder}
            value={item[textKey]}
            onChangeText={(text) => setItems(index, textKey, text)}
            containerStyle={styles.inputContainer}
            inputStyle={styles.inputText}
            rightIcon={<Icon name="link" size={20} color="gray" />}
          />

          {/* Botones de eliminar y agregar */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              marginTop: 4,
            }}
          >
            <Icon
              name="remove-circle-outline"
              size={24}
              color={items.length > 1 ? "red" : "gray"}
              onPress={items.length > 1 ? () => removeItem(index) : undefined}
            />
            <Icon
              name="add-circle-outline"
              size={24}
              color="green"
              onPress={() =>
                addItem({ [dateKey]: new Date(), [textKey]: "" })
              }
              style={{ marginLeft: 10 }}
            />
          </View>
        </View>
      ))}
    </>
  );
};

export default DateListField;
