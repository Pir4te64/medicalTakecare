import { Afiliado } from "@/utils/types";

export interface AfiliadoItemProps {
  afiliado: Afiliado;
  perfilSuper: string;
  actualizarAfiliado: (afiliado: Afiliado) => void;
  handlePasswordUpdate: (afiliado: Afiliado) => void;
  handleUserDataUpdate: (afiliado: Afiliado) => void;
  navigateToDetail: (afiliado: Afiliado) => void;
  navigateToInformation: (afiliado: Afiliado) => void;
  navigateToContactos: (afiliado: Afiliado) => void;
  navigateToHistorial: (afiliado: Afiliado) => void;
}
