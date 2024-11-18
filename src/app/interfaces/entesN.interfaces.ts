import { Ente } from '../models/Entes/entes.model';

export interface EnteForm {
  uid?: string;
  ente?: string;
  ente_id?: string;
  siglas?: string;
  estado?: string;
  municipio?: string;
  created_at?: string;
  updated_at?: string;
  id_usuario?: string;
  estatus?: string;
}

export interface EnteLoad {
  total: number;
  entes: Ente[];
}
