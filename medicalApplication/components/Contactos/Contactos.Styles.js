import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    elevation: 3, // Sombra en Android
  },
  scrollContainer: {
    flexGrow: 1, // Permite que el contenido pueda desplazarse completamente
    paddingBottom: 20, // Agrega espacio extra para evitar que el teclado cubra elementos
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  noContacts: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginTop: 10,
  },
  contactCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    elevation: 3, // Sombra en Android
    borderRadius: 10,
  },
  contactName: {
    fontSize: 8,
    color: "white",
  },
  formContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f3f3f3",
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    backgroundColor: "#fff",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  deleteButton: {
    backgroundColor: "red", // Botón rojo para eliminar
    marginLeft: 10, // Separación con el botón "Guardar"
  },
  button: {
    backgroundColor: "#007BFF", // Azul profesional
    borderRadius: 5,
    marginVertical: 10,
  },
  formContainer: {
    backgroundColor: "#f0f4f8",
    padding: 16,
    borderRadius: 10,
    elevation: 3, // Sombra en Android
    shadowColor: "#000", // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  divider: {
    backgroundColor: "#007BFF",
    height: 2,
    marginVertical: 10,
  },
  label: {
    marginLeft: 10,
    marginBottom: 5,
    color: "#007BFF",
  },
  inputText: {
    color: "#333",
  },
  textAreaContainer: {
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    borderRadius: 5,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    borderRadius: 5,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  buttonStyle: {
    flex: 1,
    marginHorizontal: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#007BFF",
  },
});
