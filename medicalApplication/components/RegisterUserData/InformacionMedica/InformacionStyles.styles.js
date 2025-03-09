const { StyleSheet } = require("react-native");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f9f9f9", // Fondo claro minimalista
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333", // Texto oscuro para contraste
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    height: 45,
    borderBottomWidth: 2, // Solo borde inferior
    borderBottomColor: "#007BFF", // Azul vibrante
    backgroundColor: "transparent", // Sin fondo
    fontSize: 16,
    color: "#333", // Texto oscuro
    paddingHorizontal: 5,
    marginBottom: 15, // Espacio entre inputs
  },
  submitButton: {
    marginVertical: 20,
    backgroundColor: "#007BFF", // Azul vibrante
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3, // Sombra en Android
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  inputWrapper: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Para Android
    marginVertical: 10,
  },
  Alergiascontainer: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Para Android
    marginVertical: 15,
  },
});
