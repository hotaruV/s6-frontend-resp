import { Usuario } from '../models/Usuarios/usuario.model';
import { ServidoresEnte } from '../models/Entes/servidores.model';
import { Ente } from '../models/Entes/entes.model';

export interface LoginForm {
  email: string;
  password: string;
  token?: string;
  ok?: boolean;
}

export interface UsuarioLoad {
  total: number;
  usuarios: Usuario[];
}
export interface ServidoresEnteLoad {
  total: number;
  servidores: ServidoresEnte[];
}
export interface RegisterFOrm {
  nombres: string;
  primer_apellido: string;
  rfc: string;
  email: string;
  password?: string;
  ente_publico?: string;
  rfc_homoclave?: string;
  curp?: string;
  role?: string;
  segundo_apellido?: string;
  fist_login?: boolean;
  id_ente_o?: string;
  created_at?: string;
  updated_at?: string;
  uid?: string;
  userName?: string;
  cargo_publico?: string;
}



