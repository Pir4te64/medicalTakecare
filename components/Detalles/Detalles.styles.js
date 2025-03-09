const { StyleSheet } = require("react-native");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerText: {
    fontSize: 18,
    marginVertical: 10,
  },
  collapsibleHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 10,
    marginBottom: 10,
  },
  collapsibleHeaderText: {
    fontSize: 18,
    color: "#fff",
  },
  queryContainer: {
    width: "80%",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
    borderRadius: 10,
  },
  datePickerContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
  },
  button: {
    borderRadius: 30,
    width: "100%",
    padding: 10,
    backgroundColor: "#007bff",
  },
  buttonTitle: {
    textAlign: "center",
    width: "100%", // Asegura que ocupe todo el ancho para que se centre correctamente
  },
  resultContainer: {
    marginTop: 20,
    width: "100%",
  },
});
export const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    color: "#333",
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    color: "#333",
    marginBottom: 20,
  },
};
