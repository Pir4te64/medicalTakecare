import { StyleSheet } from "react-native";

export const stylesModal = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo oscuro para contraste
  },
  modalContent: {
    width: "85%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "flex-start", // Alineación a la izquierda
    elevation: 5, // Sombra en Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#007AFF", // Color de título
    textAlign: "left", // Alineación a la izquierda
    width: "100%", // Asegura que ocupe todo el ancho
  },
  modalText: {
    fontSize: 14,
    marginBottom: 12,
    textAlign: "left", // Alineación a la izquierda
    color: "#333",
    width: "100%", // Asegura que ocupe todo el ancho
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
    backgroundColor: "#f9f9f9", // Fondo suave
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    marginVertical: 5,
    paddingHorizontal: 18,
    backgroundColor: "#f2f2f2",
    borderRadius: 6,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd", // Border light color
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
    textAlign: "left", // Alineación a la izquierda
  },
  buttonsContainer: {
    flexDirection: "row", 
    justifyContent: "space-between", // Distribuye los botones
    width: "100%", // Asegura que ocupen todo el ancho
    marginTop: 20,
  },
  closeButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: "#d9534f", // Color para el botón de cerrar
    borderRadius: 8,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  updateButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: "#007AFF", // Color azul para el botón de actualizar
    borderRadius: 8,
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
