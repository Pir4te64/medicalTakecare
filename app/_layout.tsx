// RootLayout.js
import { Stack, useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { AuthProvider, AuthContext } from "@/utils/AuthProvider";
import { LogBox, ActivityIndicator, View } from "react-native";

LogBox.ignoreLogs(["Text strings must be rendered within a <Text> component."]);

export default function RootLayout() {
  return (
    <AuthProvider>
      <MainStack />
    </AuthProvider>
  );
}

function MainStack() {
  const { token, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    // Redirige solo cuando ya se haya cargado el token
    if (!loading) {
      if (token) {
        // Si ya estás en /home/homeScreen no se vuelve a reemplazar
        router.replace("/home/homeScreen");
      } else {
        router.replace("/");
      }
    }
  }, [token, loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size='large' color='#0000ff' />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{ headerShown: false, title: "Inicio" }}
      />
      <Stack.Screen
        name='login'
        options={{ headerShown: true, title: "Iniciar Sesión" }}
      />
      <Stack.Screen
        name='register'
        options={{ headerShown: true, title: "Registro" }}
      />
      <Stack.Screen
        name='home'
        options={{ headerShown: false }} // Pantalla home sin header
      />
    </Stack>
  );
}
