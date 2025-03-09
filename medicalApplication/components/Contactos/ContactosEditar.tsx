import React, { useState } from "react";
import { View, Alert, TouchableOpacity } from "react-native";
import { Input, Button, Text, Divider, Icon } from "react-native-elements";
import { EditableContactProps } from "./Contactos.Interface";
import { styles } from "./Contactos.Styles";
import { deleteContact } from "./ContactosDelete";

const EditableContact: React.FC<EditableContactProps> = ({
  item,
  contactos,
  setContactos,
  handleUpdateContact,
  getContacts,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleDeleteContact = async () => {
    Alert.alert(
      "Eliminar contacto",
      "¿Estás seguro de que deseas eliminar este contacto?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: async () => {
            const success = await deleteContact(item.id);
            if (success) {
              setContactos(contactos.filter((c) => c.id !== item.id));
              await getContacts();
            } else {
              Alert.alert("Error", "No se pudo eliminar el contacto.");
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  const toggleEditing = async () => {
    if (isEditing) {
      // Guardar cambios
      await handleUpdateContact(item.id, item);
    }
    // Cambiar estado de edición
    setIsEditing(!isEditing);
  };

  return (
    <View style={styles.contactCard}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <Text
          h4
          h4Style={{ fontSize: 24, fontWeight: 400 }}
          style={styles.contactName}
        >
          {item.name}
        </Text>
        <Icon
          name={isExpanded ? "chevron-up" : "chevron-down"}
          type="feather"
          color="white"
          size={28}
        />
      </TouchableOpacity>

      {isExpanded && (
        <View>
          <Divider style={styles.divider} />

          <Text style={styles.label}>Nombre:</Text>
          <Input
            placeholder="Ingrese el nombre"
            value={item.name}
            onChangeText={(text) =>
              setContactos(
                contactos.map((c) =>
                  c.id === item.id ? { ...c, name: text } : c
                )
              )
            }
            inputStyle={styles.inputText}
            disabled={!isEditing}
          />

          <Text style={styles.label}>Email:</Text>
          <Input
            placeholder="Ingrese el email"
            value={item.email}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(text) =>
              setContactos(
                contactos.map((c) =>
                  c.id === item.id ? { ...c, email: text } : c
                )
              )
            }
            inputStyle={styles.inputText}
            disabled={!isEditing}
          />

          <Text style={styles.label}>Teléfono:</Text>
          <Input
            placeholder="Ingrese el teléfono"
            keyboardType="numeric"
            value={item.phone}
            onChangeText={(text) =>
              setContactos(
                contactos.map((c) =>
                  c.id === item.id ? { ...c, phone: text } : c
                )
              )
            }
            inputStyle={styles.inputText}
            disabled={!isEditing}
          />

          <Text style={styles.label}>Observación:</Text>
          <Input
            placeholder="Ingrese una observación"
            value={item.observation || ""}
            onChangeText={(text) =>
              setContactos(
                contactos.map((c) =>
                  c.id === item.id ? { ...c, observation: text } : c
                )
              )
            }
            inputStyle={styles.inputText}
            multiline
            numberOfLines={3}
            containerStyle={styles.textAreaContainer}
            disabled={!isEditing}
          />

          <View style={styles.buttonContainer}>
            <Button
              title={isEditing ? "Guardar" : "Editar"}
              onPress={toggleEditing}
              buttonStyle={styles.button}
              containerStyle={styles.buttonStyle}
            />
            <Button
              title="Eliminar"
              onPress={handleDeleteContact}
              buttonStyle={styles.deleteButton}
              containerStyle={styles.buttonStyle}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default EditableContact;
