import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff", // Color de fondo blanco
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5, // Para agregar una sombra sutil en dispositivos Android
    marginBottom: 20, // Espacio debajo del formulario
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333", // Color oscuro para el título
    marginBottom: 20, // Espacio debajo del título
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555", // Un gris para las etiquetas
    marginVertical: 10, // Espaciado vertical
  },
  dateButton: {
    paddingVertical: 10,
    backgroundColor: "#f0f0f0", // Color de fondo del botón de fecha
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
    color: "#007BFF", // Color azul para el texto de la fecha
  },
  inputContainer: {
    marginVertical: 10, // Espaciado vertical
  },
  input: {
    fontSize: 16,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: "#ccc", // Borde gris claro para los campos
  },
  button: {
    backgroundColor: "#007BFF", // Color de fondo del botón
    borderRadius: 5,
    paddingVertical: 12,
  },
  buttonContainer: {
    marginTop: 20, // Espacio antes del botón
  },
  datePicker: {
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2, // Para agregar una sombra sutil en dispositivos Android
  },
  datePicker: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
