import { useState, useEffect } from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator, StyleSheet } from "react-native";

export default function HomeLayout() {
  const [tipoCuenta, setTipoCuenta] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTipoCuenta = async () => {
      try {
        const storedTipo = await AsyncStorage.getItem("tipoCuenta");
        setTipoCuenta(storedTipo);
      } catch (error) {
        console.error("Error al obtener tipoCuenta:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTipoCuenta();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size='large' color='#0066cc' />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#005bb5", // Color azul para el texto activo
          tabBarInactiveTintColor: "#005bb5", // Color azul para el texto inactivo
          tabBarLabelStyle: { fontSize: 8 }, // Tamaño de fuente más pequeño
        }}>
        <Tabs.Screen
          name='homeScreen'
          options={{
            title: "Inicio",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='home' size={size} color={color} />
            ),
          }}
        />

        {/* Solo mostrar esta pestaña si tipoCuenta no es 'D' */}
        <Tabs.Screen
          name='RegistrarDependientes'
          options={{
            title: "Dependientes",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='person-add' size={size} color={color} />
            ),
            href: tipoCuenta === "D" ? null : "/home/RegistrarDependientes",
          }}
        />

        <Tabs.Screen
          name='profile'
          options={{
            title: "Perfil",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='person' size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name='lector'
          options={{
            title: "Cargar Archivo",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='file-tray' size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name='SettingScreen'
          options={{
            title: "Configuración",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='settings' size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: 375, // Limita el ancho para simular un dispositivo móvil
    width: "100%",
    alignSelf: "center", // Centra el contenedor horizontalmente
    backgroundColor: "#fff", // O el color que prefieras
    height: "100vh", // Ocupa toda la altura de la ventana
  },
});
