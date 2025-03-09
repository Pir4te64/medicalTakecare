// store/afiliadosStore.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export interface Afiliado {
  nombre: string;
  documento: string;
  tipoUsuario: string;
  tipoCuenta: string;
  seudonimo: string;
}

interface AfiliadosState {
  selectorVisible: boolean;
  modalVisible: boolean;
  passwordModalVisible: boolean;
  userModalVisible: boolean;
  afiliadoSeleccionado: Afiliado | null;
  tipoSeleccionado: string | null;
  // Acciones
  abrirSelector: (afiliado: Afiliado) => void;
  cerrarSelector: () => void;
  aceptarSelector: (tipo: string) => Promise<void>;
  abrirModalPassword: (afiliado: Afiliado) => void;
  abrirModalUser: (afiliado: Afiliado) => void;
  cerrarModalPassword: () => void;
  cerrarModalUser: () => void;
  abrirModalAPoderado: (afiliado: Afiliado, tipo?: string) => void;
  cerrarModalAPoderado: () => void;
  resetearEstados: () => void;
}

export const useAfiliadosStore = create<AfiliadosState>((set) => ({
  selectorVisible: false,
  modalVisible: false,
  passwordModalVisible: false,
  userModalVisible: false,
  afiliadoSeleccionado: null,
  tipoSeleccionado: null,
  abrirSelector: (afiliado) =>
    set({ afiliadoSeleccionado: afiliado, selectorVisible: true }),
  cerrarSelector: () => set({ selectorVisible: false }),
  aceptarSelector: async (tipo) => {
    // Actualizamos el tipo y cerramos el selector
    await AsyncStorage.setItem("tipoSeleccionado", tipo);
    set({ tipoSeleccionado: tipo, selectorVisible: false, modalVisible: true });
  },
  abrirModalPassword: (afiliado) =>
    set({ afiliadoSeleccionado: afiliado, passwordModalVisible: true }),
  abrirModalUser: (afiliado) =>
    set({ afiliadoSeleccionado: afiliado, userModalVisible: true }),
  cerrarModalPassword: () => set({ passwordModalVisible: false }),
  cerrarModalUser: () => set({ userModalVisible: false }),
  abrirModalAPoderado: (afiliado, tipo = null) =>
    set({
      afiliadoSeleccionado: afiliado,
      tipoSeleccionado: tipo,
      modalVisible: true,
    }),
  cerrarModalAPoderado: () => set({ modalVisible: false }),
  resetearEstados: () =>
    set({
      selectorVisible: false,
      modalVisible: false,
      passwordModalVisible: false,
      userModalVisible: false,
      afiliadoSeleccionado: null,
      tipoSeleccionado: null,
    }),
}));
