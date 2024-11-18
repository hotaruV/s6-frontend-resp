import { ServidoresEnte } from '../models/Entes/servidores.model';

export interface ServidorEnte {
     
    nombres_servidor:     string;
    primer_apellido_servidor:     string;
    segundo_apellido_servidor:     string;
    rfc_servidor: string,
    cargo_servidor: string,
    email_servidor: string,
    telefono_servidor:    string;
    telefonofax_servidor: string;
    area:   string;
    id_ente_publico: string,
     created_at?: string,
     updated_at?: string,
     id_usuario?: string,
     _id?: string,
     uid?: string,
     estatus?: string,
    
    
  
   
  }
  export interface ServidorLoad {
    total: number;
    servidores: ServidorEnte[];
  }
  

  