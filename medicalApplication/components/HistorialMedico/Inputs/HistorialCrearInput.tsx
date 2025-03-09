import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";

interface EditableListFieldProps {
  label: string;
  placeholder: string;
  items: string[];
  onChangeItem: (index: number, value: string) => void;
  onRemoveItem: (index: number) => void;
  onAddItem: () => void;
}

const EditableListField: React.FC<EditableListFieldProps> = ({
  label,
  placeholder,
  items,
  onChangeItem,
  onRemoveItem,
  onAddItem,
}) => (
  <>
    <Text style={styles.label}>{label}:</Text>
    {items.map((item, index) => (
      <View key={`${label}-${index}`} style={styles.itemContainer}>
        <Input
          placeholder={placeholder}
          value={item}
          onChangeText={(text) => onChangeItem(index, text)}
          containerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          leftIcon={
            <Icon
              name="remove-circle-outline"
              size={24}
              color={items.length > 1 ? "red" : "gray"} // Deshabilitado si solo hay 1 elemento
              onPress={items.length > 1 ? () => onRemoveItem(index) : undefined} // No hace nada si es 1
            />
          }
          rightIcon={
            <Icon
              name="add-circle-outline"
              size={24}
              color="#007BFF"
              onPress={onAddItem}
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
  },
  inputText: {
    fontSize: 16,
  },
});

export default EditableListField;
