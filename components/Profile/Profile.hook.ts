import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "@/utils/api";
import { Profile } from "@/utils/types"; // Asegúrate de importar correctamente las interfaces

const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Método para recargar el perfil
  const fetchProfile = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        throw new Error("No se encontró el token de autenticación");
      }

      const response = await fetch(`${API.PROFILE}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener el perfil");
      }

      const data = await response.json();

      if (data.success && data.body) {
        setProfile(data.body); // Actualizar el perfil con la respuesta
      } else {
        throw new Error(data.message || "Error desconocido");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error desconocido");
      }
    } finally {
      setLoading(false);
    }
  }, []); // Solo se ejecuta una vez al montar el hook

  // Método que los componentes pueden usar para forzar la recarga del perfil
  const refetchProfile = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchProfile(); // Vuelve a ejecutar el método fetchProfile
  }, [fetchProfile]);

  useEffect(() => {
    fetchProfile(); // Cargar el perfil inicialmente
  }, [fetchProfile]);

  return { profile, loading, error, refetchProfile };
};

export default useProfile;
