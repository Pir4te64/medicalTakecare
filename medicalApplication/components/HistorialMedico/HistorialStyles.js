import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
    color: "gray",
  },
  itemContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "#f9f9f9",
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  inputContainer: {
    flex: 1,
    marginRight: 10,
    marginTop: 10,
  },
  inputText: {
    fontSize: 16,
  },
  dateButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  dateButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  datePickerContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
  },
  datePicker: {
    width: "100%",
  },
});
