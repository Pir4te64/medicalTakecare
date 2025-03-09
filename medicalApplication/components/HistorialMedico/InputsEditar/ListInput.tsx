import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";

interface ListFieldProps {
  label: string;
  items: string[];
  setItems: (index: number, value: string) => void;
  addItem: () => void;
  removeItem: (index: number) => void;
  placeholder: string;
}

const ListField: React.FC<ListFieldProps> = ({
  label,
  items,
  setItems,
  addItem,
  removeItem,
  placeholder,
}) => (
  <>
    <Text style={styles.label}>{label}:</Text>
    {items.map((item, index) => (
      <View key={`${label}-${index}`} style={styles.itemContainer}>
        <Input
          placeholder={placeholder}
          value={item}
          onChangeText={(text) => setItems(index, text)}
          containerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          leftIcon={
            <Icon
              name="remove-circle-outline"
              size={24}
              color={items.length > 1 ? "red" : "gray"} // Deshabilitado si solo hay 1 elemento
              onPress={items.length > 1 ? () => removeItem(index) : undefined} // No hace nada si es 1
            />
          }
          rightIcon={
            <Icon
              name="add-circle-outline"
              size={24}
              color="#007BFF"
              onPress={addItem}
            />
          }
        />
      </View>
    ))}
  </>
);

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "gray",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  inputContainer: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 12,
  },
  inputText: {
    fontSize: 16,
    padding: 8,
    color: "#333",
  },
});

export default ListField;
