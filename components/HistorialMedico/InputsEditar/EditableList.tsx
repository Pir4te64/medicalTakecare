import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const FormList = ({
  title,
  data,
  setData,
  dateLabel,
  textLabel,
  getDateKey,
  getTextKey,
  convertToDate, // Recibimos la función como prop
}) => {
  return (
    <View>
      {data.map((item, index) => (
        <View key={`${title}-${index}`} style={styles.formContainer}>
          <Text style={styles.label}>{dateLabel}</Text>
          <DateTimePicker
            value={convertToDate(item[getDateKey])}
            mode="date"
            display="default"
            onChange={(event, date) => {
              if (date) {
                const updatedData = [...data];
                updatedData[index][getDateKey] = date.toISOString();
                setData(updatedData);
              }
            }}
          />

          <Text style={styles.label}>{textLabel}</Text>
          <TextInput
            style={styles.input}
            value={item[getTextKey]}
            onChangeText={(text) => {
              const updatedData = [...data];
              updatedData[index][getTextKey] = text;
              setData(updatedData);
            }}
            placeholder={textLabel}
          />

          <TouchableOpacity
            onPress={() => setData(data.filter((_, i) => i !== index))}
            style={styles.deleteButton}
          >
            <Text style={styles.deleteText}>Eliminar {title}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginBottom: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 4,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  deleteButton: {
    marginTop: 4,
    padding: 8,
    backgroundColor: "#f44336", // Red color for the delete button
    borderRadius: 4,
    alignItems: "center",
  },
  deleteText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default FormList;
