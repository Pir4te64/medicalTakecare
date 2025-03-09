import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../Profile.styles";
import { AfiliadoItemProps } from "./AfiliadoInterface";

const AfiliadoItem: React.FC<AfiliadoItemProps> = ({
  afiliado,
  perfilSuper,
  actualizarAfiliado,
  handlePasswordUpdate,
  handleUserDataUpdate,
  navigateToDetail,
  navigateToInformation,
  navigateToContactos,
  navigateToHistorial,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={styles.afiliadoContainer}>
      {/* Botón para expandir/cerrar */}
      <TouchableOpacity
        style={styles.afiliadoHeader}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <Text style={styles.afiliadoName}>{afiliado.nombre}</Text>
        <Ionicons
          name={isExpanded ? "chevron-up-outline" : "chevron-down-outline"}
          size={24}
          color="black"
        />
      </TouchableOpacity>

      {/* Contenido que se muestra/oculta sin librerías externas */}
      {isExpanded && (
        <TouchableOpacity activeOpacity={1} style={styles.afiliadoContent}>
          <View style={styles.afiliadoInfo}>
            <Ionicons name="card" size={16} color="#0066cc" />
            <Text style={styles.afiliadoText}> DNI: {afiliado.documento}</Text>
          </View>
          <View style={styles.afiliadoInfo}>
            <Ionicons name="shield-outline" size={16} color="#0066cc" />
            <Text style={styles.afiliadoText}>
              Tipo de Usuario: {afiliado.tipoUsuario}
            </Text>
          </View>
          <View
            style={{
              borderBottomColor: "blue",
              borderBottomWidth: 1,
              marginVertical: 10,
            }}
          />
          <View style={styles.iconsColumn}>
            <TouchableOpacity
              style={styles.iconRow}
              onPress={() => handlePasswordUpdate(afiliado)}
            >
              <Ionicons name="key-outline" size={24} color="#0066cc" />
              <Text style={styles.iconText}>Actualizar Contraseña</Text>
            </TouchableOpacity>
            {perfilSuper !== "D" && (
              <>
                <TouchableOpacity
                  style={styles.iconRow}
                  onPress={() => actualizarAfiliado(afiliado)}
                >
                  <Ionicons name="build-outline" size={24} color="#0066cc" />
                  <Text style={styles.iconText}>Actualizar Datos</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconRow}
                  onPress={() => navigateToInformation(afiliado)}
                >
                  <Ionicons
                    name="clipboard-outline"
                    size={24}
                    color="#0066cc"
                  />
                  <Text style={styles.iconText}>Información</Text>
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity
              style={styles.iconRow}
              onPress={() => handleUserDataUpdate(afiliado)}
            >
              <Ionicons name="person-outline" size={24} color="#0066cc" />
              <Text style={styles.iconText}>Editar Usuario</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconRow}
              onPress={() => navigateToDetail(afiliado)}
            >
              <Ionicons name="eye-outline" size={24} color="#0066cc" />
              <Text style={styles.iconText}>Ver Detalles</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconRow}
              onPress={() => navigateToContactos(afiliado)}
            >
              <Ionicons name="call-outline" size={24} color="#0066cc" />
              <Text style={styles.iconText}>Contactos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconRow}
              onPress={() => navigateToHistorial(afiliado)}
            >
              <Ionicons name="time-outline" size={24} color="#0066cc" />
              <Text style={styles.iconText}>Historial</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AfiliadoItem;
