// store/profileStore.ts
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '@/utils/api';
import { Profile } from '@/utils/types';

interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  loading: false,
  error: null,
  fetchProfile: async () => {
    set({ loading: true, error: null });
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos de timeout
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) throw new Error("No se encontró el token de autenticación");

      const response = await fetch(API.PROFILE, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
      });

      if (!response.ok) throw new Error("Error al obtener el perfil");

      const data = await response.json();
      if (data.success) {
        // Solo actualizamos si hay cambios
        set((state) => ({
          profile:
            JSON.stringify(state.profile) !== JSON.stringify(data.body)
              ? data.body
              : state.profile,
        }));
      } else {
        throw new Error(data.message || "Error desconocido");
      }
    } catch (err: any) {
      if (err.name === "AbortError") {
        set({ error: "Tiempo de espera agotado" });
      } else {
        set({ error: err instanceof Error ? err.message : "Error desconocido" });
      }
    } finally {
      clearTimeout(timeoutId);
      set({ loading: false });
    }
  },
}));
