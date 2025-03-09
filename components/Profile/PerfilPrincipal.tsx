import React, { useCallback, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./Profile.styles";
import ModalUpdateUser from "../Modal/ModalSettings/ModalUpdateUser/ModalUpdateUser";
import ModalUpdatePassword from "../Modal/ModalSettings/ModalUpdatePassword/ModalUpdatePassword";
import { useRouter } from "expo-router";
import ProfileActions, { Action } from "./ProfileActions";

interface PerfilPrincipalProps {
  profile: {
    nombre: string;
    documento: string;
    seudonimo: string;
    tipoUsuario: string;
    tipoCuenta: string;
  };
  reloadProfile: () => void; // Para recargar el perfil después de actualizar
}

const PerfilPrincipal: React.FC<PerfilPrincipalProps> = ({
  profile,
  reloadProfile,
}) => {
  const [nombre, setNombre] = useState(profile.nombre);
  const [isNameModalVisible, setIsNameModalVisible] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);

  const router = useRouter(); // Hook de navegación

  useEffect(() => {
    setNombre(profile.nombre);
  }, [profile]);

  // Funciones de navegación
  const navigateToInformation = useCallback(() => {
    router.push(
      `/home/profile/informacion?afiliado=${encodeURIComponent(
        JSON.stringify(profile)
      )}`
    );
  }, [router, profile]);

  const navigateToDetails = useCallback(() => {
    router.push(
      `/home/profile/detalle?afiliado=${encodeURIComponent(
        JSON.stringify(profile)
      )}`
    );
  }, [router, profile]);

  const navigateToContactos = useCallback(() => {
    router.push(
      `/home/profile/contactos?afiliado=${encodeURIComponent(
        JSON.stringify(profile)
      )}`
    );
  }, [router, profile]);

  const navigateToHistorial = useCallback(() => {
    router.push(
      `/home/profile/historial?afiliado=${encodeURIComponent(
        JSON.stringify(profile)
      )}`
    );
  }, [router, profile]);
  const navigateToEstadistica = useCallback(() => {
    router.push(
      `/home/profile/visual?afiliado=${encodeURIComponent(
        JSON.stringify(profile)
      )}`
    );
  }, [router, profile]);
  // Definimos las acciones a pasar al componente de botones
  const actions: Action[] = [
    { label: "Actualizar Nombre", onPress: () => setIsNameModalVisible(true) },
    {
      label: "Actualizar Contraseña",
      onPress: () => setIsPasswordModalVisible(true),
    },
    { label: "Información", onPress: navigateToInformation },
    { label: "Detalle", onPress: navigateToDetails },
    { label: "Contactos", onPress: navigateToContactos },
    { label: "Historial", onPress: navigateToHistorial },
    { label: "Ver Estadisca", onPress: navigateToEstadistica },
  ];

  return (
    <View style={styles.profileDetails}>
      <View style={styles.profileInfo}>
        <Ionicons name="person-outline" size={16} color="#ffffff" />
        <Text style={styles.profileText}>{nombre}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Ionicons name="card" size={16} color="#ffffff" />
        <Text style={styles.profileText}>{profile.documento}</Text>
      </View>

      {/* Renderizamos el componente con los botones */}
      <ProfileActions actions={actions} />

      {/* Modal para actualizar nombre */}
      <ModalUpdateUser
        visible={isNameModalVisible}
        onClose={() => setIsNameModalVisible(false)}
        user={{ name: nombre, document: profile.documento }}
        reloadProfile={() => {
          setIsNameModalVisible(false);
          reloadProfile();
        }}
      />

      {/* Modal para actualizar contraseña */}
      <ModalUpdatePassword
        visible={isPasswordModalVisible}
        onClose={() => setIsPasswordModalVisible(false)}
        afiliado={profile}
        reloadProfile={() => {
          setIsPasswordModalVisible(false);
          reloadProfile();
        }}
      />
    </View>
  );
};

export default PerfilPrincipal;
