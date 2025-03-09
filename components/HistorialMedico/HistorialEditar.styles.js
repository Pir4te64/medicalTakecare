// HistorialEditar.styles.ts

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    marginBottom: 12,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
    color: "gray",
  },
  itemContainer: {
    marginBottom: 12,
  },
  inputContainer: {
    marginBottom: 10,
    borderRadius: 8,
  },
  inputText: {
    fontSize: 14,
    color: "#333",
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  deleteText: {
    color: "red",
    marginLeft: 8,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  addText: {
    color: "green",
    marginLeft: 8,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 4,
  },
  formContainer: {
    marginBottom: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    gap: 10,
    width: "100%",
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    padding: 12,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#DC3545",
    borderRadius: 8,
    padding: 12,
  },
});

export default styles;
