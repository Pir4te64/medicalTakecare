import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"; // Importar los iconos de Ionicons

export interface Action {
  label: string;
  onPress: () => void;
}

interface ProfileActionsProps {
  actions: Action[];
}

const ProfileActions: React.FC<ProfileActionsProps> = ({ actions }) => {
  const [isExpanded, setIsExpanded] = useState(false); // Estado para controlar el colapso

  const toggleExpand = () => {
    setIsExpanded(!isExpanded); // Cambiar el estado al hacer clic
  };

  return (
    <View style={styles.container}>
      {/* Botón que actúa como caja colapsable */}
      <TouchableOpacity
        style={styles.toggleButton} // Estilo del botón de colapso/expansión
        onPress={toggleExpand}
      >
        <Text style={styles.toggleText}>
          {isExpanded ? "Ocultar funciones" : "Mostrar funciones"}
        </Text>
        {/* Icono de flecha dependiendo del estado */}
        <Ionicons
          name={isExpanded ? "chevron-up" : "chevron-down"} // Flecha hacia arriba o hacia abajo
          size={24}
          color="white"
        />
      </TouchableOpacity>

      {/* Mostrar los botones solo si isExpanded es verdadero */}
      {isExpanded && (
        <View style={styles.actionsContainer}>
          {actions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.updateButton}
              onPress={action.onPress}
            >
              <Text style={styles.buttonText}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%", // Asegura que ocupe todo el ancho
  },
  toggleButton: {
    width: "100%", // Hace que el botón ocupe todo el ancho
    padding: 15,
    backgroundColor: "#007BFF", // Color del botón
    alignItems: "center", // Centra el texto
    borderRadius: 5,
    flexDirection: "row", // Para alinear el texto y la flecha
    justifyContent: "space-between", // Espaciado entre el texto y la flecha
  },
  toggleText: {
    color: "white",
    fontSize: 16,
  },
  actionsContainer: {
    marginTop: 10,
  },
  updateButton: {
    padding: 10,
    backgroundColor: "transparent", // Color del botón de acción
    marginVertical: 5,
    borderRadius: 50,
    alignItems: "center",
    borderColor: "white",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default ProfileActions;
