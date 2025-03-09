import React, { useCallback, useEffect } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "../Profile.styles";
import { Afiliado, useAfiliadosStore } from "../afiliadosStore";
import Modales from "../Modales";
import AfiliadoItem from "./Afiliados";

interface PerfilSecundarioProps {
  afiliados: Afiliado[];
  reloadProfile: () => void;
  perfilSuper: string;
}

const PerfilSecundario: React.FC<PerfilSecundarioProps> = ({
  afiliados,
  reloadProfile,
  perfilSuper,
}) => {
  const router = useRouter();
  const {
    selectorVisible,
    modalVisible,
    passwordModalVisible,
    userModalVisible,
    afiliadoSeleccionado,
    tipoSeleccionado,
    abrirSelector,
    aceptarSelector,
    cerrarSelector,
    abrirModalPassword,
    abrirModalUser,
    cerrarModalPassword,
    cerrarModalUser,
    resetearEstados,
  } = useAfiliadosStore();

  const actualizarAfiliado = useCallback(
    (afiliado: Afiliado) => abrirSelector(afiliado),
    [abrirSelector]
  );

  const handlePasswordUpdate = useCallback(
    (afiliado: Afiliado) => abrirModalPassword(afiliado),
    [abrirModalPassword]
  );

  const handleUserDataUpdate = useCallback(
    (afiliado: Afiliado) => abrirModalUser(afiliado),
    [abrirModalUser]
  );

  const navigateToDetail = useCallback(
    (afiliado: Afiliado) => {
      router.push(
        `/home/profile/detalle?afiliado=${encodeURIComponent(
          JSON.stringify(afiliado)
        )}`
      );
    },
    [router]
  );

  const navigateToInformation = useCallback(
    (afiliado: Afiliado) => {
      router.push(
        `/home/profile/informacion?afiliado=${encodeURIComponent(
          JSON.stringify(afiliado)
        )}`
      );
    },
    [router]
  );
  const navigateToHistorial = useCallback(
    (afiliado: Afiliado) => {
      router.push(
        `/home/profile/historial?afiliado=${encodeURIComponent(
          JSON.stringify(afiliado)
        )}`
      );
    },
    [router]
  );
  const navigateToContactos = useCallback(
    (afiliado: Afiliado) => {
      router.push(
        `/home/profile/contactos?afiliado=${encodeURIComponent(
          JSON.stringify(afiliado)
        )}`
      );
    },
    [router]
  );

  if (!afiliados || afiliados.length === 0) {
    return <Text style={styles.noAfiliados}>No tiene afiliados.</Text>;
  }

  return (
    <View style={styles.afiliadosSection}>
      <Text style={styles.afiliadosTitle}>Afiliados</Text>
      {afiliados.map((afiliado, index) => (
        <AfiliadoItem
          key={index}
          afiliado={afiliado}
          perfilSuper={perfilSuper}
          actualizarAfiliado={actualizarAfiliado}
          handlePasswordUpdate={handlePasswordUpdate}
          handleUserDataUpdate={handleUserDataUpdate}
          navigateToDetail={navigateToDetail}
          navigateToInformation={navigateToInformation}
          navigateToContactos={navigateToContactos}
          navigateToHistorial={navigateToHistorial}
        />
      ))}

      <Modales
        selectorVisible={selectorVisible}
        modalVisible={modalVisible}
        passwordModalVisible={passwordModalVisible}
        userModalVisible={userModalVisible}
        tipoSeleccionado={tipoSeleccionado || ""}
        afiliadoSeleccionado={afiliadoSeleccionado}
        cerrarSelector={cerrarSelector}
        aceptarSelector={aceptarSelector}
        cerrarModalPassword={cerrarModalPassword}
        cerrarModalUser={cerrarModalUser}
        resetearEstados={resetearEstados}
        reloadProfile={reloadProfile}
      />
    </View>
  );
};

export default PerfilSecundario;
