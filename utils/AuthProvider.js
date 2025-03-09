// AuthProvider.js
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar el token almacenado al iniciar la app
  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("authToken");
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Error cargando token:", error);
      }
      setLoading(false);
    };

    loadToken();
  }, []);

  // Función para iniciar sesión
  const login = async (userToken) => {
    try {
      await AsyncStorage.setItem("authToken", userToken);
      console.log("Token guardado:", userToken);
      setToken(userToken);
    } catch (error) {
      console.error("Error guardando token:", error);
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      setToken(null);
    } catch (error) {
      console.error("Error eliminando token:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ token, loading, login, logout }}>
      {loading ? (
        // Muestra un splash o spinner mientras carga
        <></>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
