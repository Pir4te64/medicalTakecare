import { create } from "zustand";

interface ContactState {
  showAddContact: boolean;
  contactInfo: {
    userId: number;
    name: string;
    phone: string;
    email: string;
    observation: string;
  };
  contactos: any[]; // Estado para almacenar los contactos
  toggleAddContact: () => void;
  updateContactInfo: (field: string, value: string) => void;
  resetContactInfo: (userId: number) => void;
  setContactos: (contactos: any[]) => void; // Método para actualizar los contactos
  fetchContactos: () => void; // Método para cargar contactos desde el backend
}

export const useContactStore = create<ContactState>((set) => ({
  showAddContact: false,
  contactInfo: {
    userId: 0,
    name: "",
    phone: "",
    email: "",
    observation: "",
  },
  contactos: [], // Inicializamos con un arreglo vacío
  toggleAddContact: () =>
    set((state) => ({ showAddContact: !state.showAddContact })),
  updateContactInfo: (field, value) =>
    set((state) => ({
      contactInfo: { ...state.contactInfo, [field]: value },
    })),
  resetContactInfo: (userId) =>
    set({
      contactInfo: { userId, name: "", phone: "", email: "", observation: "" },
    }),
  setContactos: (contactos) => set({ contactos }), // Para actualizar la lista de contactos
  fetchContactos: () => {
    // Función para obtener los contactos desde la API
    set({ contactos: [] }); // Limpiar contactos antes de la carga
  },
}));
