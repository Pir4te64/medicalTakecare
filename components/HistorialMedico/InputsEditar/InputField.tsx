import { Input, Text } from "react-native-elements";
import { StyleSheet, View } from "react-native";

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
}

export const InputField = ({
  label,
  value,
  onChangeText,
  placeholder,
}: InputFieldProps) => (
  <View style={{ marginVertical: 10 }}>
    <Text style={styles.label}>{label}</Text>
    <Input
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      inputContainerStyle={styles.inputContainer}
      inputStyle={styles.input}
      placeholderTextColor="#a9a9a9"
      rightIcon={{
        type: "font-awesome",
        name: "pencil",
        color: "#aaa",
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "gray",
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  input: {
    fontSize: 16,
  },
});
