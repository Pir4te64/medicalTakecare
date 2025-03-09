// Allergic.styles.ts
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: "#007bff",
    padding: 5,
    borderRadius: 50,
  },
  errorText: {
    color: "red",
    marginVertical: 4,
  },
  allergiesList: {
    marginVertical: 8,
  },
  allergyItem: {
    flexDirection: "row",
    justifyContent: "space-between", // Alinear texto e ícono en extremos opuestos
    alignItems: "center", // Alinear verticalmente
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  allergyText: {
    fontSize: 16,
    flex: 1, // Para que ocupe el espacio disponible
  },
  predefinedButton: {
    backgroundColor: "#f0f0f0",
    padding: 8,
    borderRadius: 50,
    marginRight: 8,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  predefinedButtonText: {
    fontSize: 14,
  },
  disabledButtonText: {
    color: "#888",
  },
});
