import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Alert, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContactStore } from "./useContactStore";
import { PACIENTE_CONTACTO_POST } from "./ContactosPOST";
import { getAllContactos } from "./ContactosGETALL";
import { styles } from "./Contactos.Styles";
import ContactForm from "./CrearContacto";
import { Contact, ContactosComponentProps } from "./Contactos.Interface";
import { updateContact } from "./ContactosPUT";
import EditableContact from "./ContactosEditar";

const ContactosComponent: React.FC<ContactosComponentProps> = ({
  afiliadoData,
}) => {
  const navigation = useNavigation();
  const {
    contactos,
    showAddContact,
    contactInfo,
    toggleAddContact,
    updateContactInfo,
    resetContactInfo,
    setContactos,
  } = useContactStore();
  const [loading, setLoading] = useState(false);

  // ✅ Definimos una función que obtiene TODOS los contactos
  const fetchContacts = async () => {
    setLoading(true);
    try {
      const fetchedContactos = await getAllContactos(afiliadoData.id);
      setContactos(fetchedContactos);
    } catch (error) {
      Alert.alert(
        "Advertencia",
        "Antes de crear sus contactos debe crear su acta medica."
      );
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
    resetContactInfo(afiliadoData.id);
  }, [afiliadoData.id]);

  const handleAddContact = async () => {
    if (!contactInfo.name || !contactInfo.phone || !contactInfo.email) {
      Alert.alert("Error", "Por favor completa los campos obligatorios.");
      return;
    }

    try {
      const newContact = { ...contactInfo, id_afiliado: afiliadoData.id };
      await PACIENTE_CONTACTO_POST(newContact);
      Alert.alert("Éxito", "El contacto ha sido agregado correctamente.");
      resetContactInfo(afiliadoData.id);
      toggleAddContact();
      await fetchContacts(); // ✅ Actualiza la lista de contactos después de agregar
    } catch (error) {
      console.log(error);

      Alert.alert("Error", "No se pudo agregar el contacto.");
    }
  };

  const handleUpdateContact = async (
    contactId: string,
    updatedData: Partial<Contact>
  ) => {
    setLoading(true);
    try {
      await updateContact(contactId, {
        name: updatedData.name || "",
        phone: updatedData.phone || "",
        email: updatedData.email || "",
        observation: updatedData.observation || "",
      });

      Alert.alert("Éxito", "El contacto ha sido actualizado correctamente.");

      await fetchContacts(); // ✅ Actualiza la lista de contactos después de actualizar
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar el contacto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      )}

      <FlatList
        data={contactos}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <EditableContact
            item={item}
            contactos={contactos}
            setContactos={setContactos}
            handleUpdateContact={handleUpdateContact}
            getContacts={fetchContacts}
          />
        )}
        ListHeaderComponent={
          // ✅ Se agrega el formulario al final sin romper `FlatList`
          <ContactForm
            contactInfo={contactInfo}
            updateContactInfo={updateContactInfo}
            handleAddContact={handleAddContact}
            toggleAddContact={toggleAddContact}
            showAddContact={showAddContact}
          />
        }
        ListEmptyComponent={
          <Text style={styles.noContacts}>No hay contactos registrados.</Text>
        }
        contentContainerStyle={styles.scrollContainer}
      />
    </View>
  );
};

export default ContactosComponent;
