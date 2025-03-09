import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-elements"; // Importamos el botón de react-native-elements
import { AuthContext } from "@/utils/AuthProvider"; // Importa el contexto
import { useRouter } from "expo-router";

const SettingsComponent = () => {
  const { logout } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    logout(); // Llamamos a la función de logout del contexto
    router.replace("/"); // Redirigimos al index
  };

  return (
    <View style={styles.container}>
      {/* Botón de cerrar sesión con react-native-elements */}
      <View style={styles.buttonContainer}>
        <Button
          title="Cerrar Sesión"
          onPress={handleLogout}
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonTitle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  buttonContainer: {
    marginTop: 40,
    marginHorizontal: 20,
  },
  buttonStyle: {
    backgroundColor: "#2470ec", // Puedes ajustar el color aquí
    borderRadius: 10, // Bordes redondeados
    paddingVertical: 12, // Relleno vertical
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff", // Color del texto
  },
});

export default SettingsComponent;
