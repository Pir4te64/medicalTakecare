// components/Modales.tsx
import React from "react";
import ModalUpdateAPoderado from "@/components/Modal/ModalSettings/ModalUpdateApoderado/ModalUpdateApoderado";
import ModalSelector from "@/components/Modal/ModalSettings/ModalSector/ModalSelector";
import ModalUpdatePassword from "@/components/Modal/ModalSettings/ModalUpdatePassword/ModalUpdatePassword";
import ModalUpdateUser from "@/components/Modal/ModalSettings/ModalUpdateUser/ModalUpdateUser";

interface ModalesProps {
  selectorVisible: boolean;
  modalVisible: boolean;
  passwordModalVisible: boolean;
  userModalVisible: boolean;
  tipoSeleccionado: string;
  afiliadoSeleccionado: any;
  cerrarSelector: () => void;
  aceptarSelector: (tipo: string) => void;
  cerrarModalPassword: () => void;
  cerrarModalUser: () => void;
  resetearEstados: () => void;
  reloadProfile: () => void;
}

const Modales: React.FC<ModalesProps> = ({
  selectorVisible,
  modalVisible,
  passwordModalVisible,
  userModalVisible,
  tipoSeleccionado,
  afiliadoSeleccionado,
  cerrarSelector,
  aceptarSelector,
  cerrarModalPassword,
  cerrarModalUser,
  resetearEstados,
  reloadProfile,
}) => {
  return (
    <>
      <ModalSelector
        visible={selectorVisible}
        onClose={cerrarSelector}
        onAccept={async (tipo) => await aceptarSelector(tipo)}
      />
      <ModalUpdateAPoderado
        visible={modalVisible}
        afiliado={afiliadoSeleccionado}
        tipoSeleccionado={tipoSeleccionado}
        onClose={resetearEstados}
        reloadProfile={reloadProfile}
      />
      <ModalUpdatePassword
        afiliado={afiliadoSeleccionado}
        visible={passwordModalVisible}
        onClose={cerrarModalPassword}
        reloadProfile={reloadProfile}
      />
      <ModalUpdateUser
        visible={userModalVisible}
        onClose={cerrarModalUser}
        reloadProfile={reloadProfile}
        user={
          afiliadoSeleccionado
            ? {
                name: afiliadoSeleccionado.nombre,
                document: afiliadoSeleccionado.documento,
              }
            : undefined
        }
      />
    </>
  );
};

export default Modales;
