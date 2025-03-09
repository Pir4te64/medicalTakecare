import React from "react";
import { View } from "react-native";
import { Input, Button, Text, Divider } from "react-native-elements";
import { styles } from "./Contactos.Styles";

interface ContactFormProps {
  contactInfo: {
    name: string;
    phone: string;
    email: string;
    observation?: string;
  };
  updateContactInfo: (field: string, value: string) => void;
  handleAddContact: () => void;
  toggleAddContact: () => void;
  showAddContact: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({
  contactInfo,
  updateContactInfo,
  handleAddContact,
  toggleAddContact,
  showAddContact,
}) => {
  return (
    <View style={styles.container}>
      {showAddContact && (
        <View style={styles.formContainer}>
          <Divider style={styles.divider} />

          <Text style={styles.label}>Nombre</Text>
          <Input
            placeholder="Ingrese el nombre"
            value={contactInfo.name}
            onChangeText={(text) => updateContactInfo("name", text)}
            inputStyle={styles.inputText}
          />

          <Text style={styles.label}>Teléfono</Text>
          <Input
            placeholder="Ingrese el teléfono"
            keyboardType="numeric"
            value={contactInfo.phone}
            onChangeText={(text) => updateContactInfo("phone", text)}
            inputStyle={styles.inputText}
          />

          <Text style={styles.label}>Email</Text>
          <Input
            placeholder="Ingrese el email"
            value={contactInfo.email}
            onChangeText={(text) => updateContactInfo("email", text)}
            inputStyle={styles.inputText}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Observación</Text>
          <Input
            placeholder="Ingrese una observación"
            value={contactInfo.observation}
            onChangeText={(text) => updateContactInfo("observation", text)}
            inputStyle={styles.inputText}
            multiline
            numberOfLines={4}
            containerStyle={styles.textAreaContainer}
          />

          <Button
            title="Guardar Contacto"
            onPress={handleAddContact}
            buttonStyle={styles.button}
          />
        </View>
      )}
      <Button
        title={showAddContact ? "Cancelar" : "Agregar Contacto"}
        onPress={toggleAddContact}
        buttonStyle={styles.button}
      />
    </View>
  );
};

export default ContactForm;
