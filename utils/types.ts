// src/types.ts

export interface Afiliado {
  nombre: string;
  documento: string;
  tipoUsuario: string;
  tipoCuenta: string;
}

export interface Profile {
  nombre: string;
  documento: string;
  seudonimo: string;
  tipoUsuario: string;
  tipoCuenta: string;
  afiliados?: Afiliado[];
}
