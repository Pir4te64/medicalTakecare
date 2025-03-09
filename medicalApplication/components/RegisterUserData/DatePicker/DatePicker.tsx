import React, { useState } from "react";
import { View, Text, Platform, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "react-native-elements";
interface DatePickerInputProps {
  date: Date;
  onChange: (date: Date) => void;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  date,
  onChange,
}) => {
  const [show, setShow] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShow(false);
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  // Formatear fecha como DD/MM/YYYY
  const formatDate = (date?: Date | null) => {
    if (!date) return "No seleccionada"; // Evita error si la fecha es null
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Fecha de Nacimiento</Text>

      <Button
        title="Seleccionar fecha"
        onPress={() => setShow(true)}
        buttonStyle={{ backgroundColor: "#007BFF" }}
      />
      <Text style={styles.selectedDate}>
        Fecha seleccionada: {formatDate(date)}
      </Text>
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
          maximumDate={new Date()}
          style={styles.datePicker}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 10,
    borderColor: "#007BFF",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#E6F0FF",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#007BFF",
  },
  selectedDate: {
    marginTop: 10,
    fontSize: 16,
    color: "#007BFF",
    textAlign: "center",
  },
  datePicker: {
    backgroundColor: "#fff",
  },
});

export default DatePickerInput;
