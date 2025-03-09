export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  observation?: string;
}

export interface ContactosComponentProps {
  afiliadoData: {
    nombre: string;
    documento: string;
    tipoUsuario: string;
    id: number;
  };
}
export interface EditableContactProps {
  item: Contact;
  contactos: Contact[];
  setContactos: (contactos: Contact[]) => void;
  handleUpdateContact: (
    contactId: string,
    updatedData: Partial<Contact>
  ) => void;
  getContacts: () => Promise<void>; // Función para recargar contactos
}
