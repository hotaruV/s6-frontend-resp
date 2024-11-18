import { Proveedores } from '../models/Entes/proveedores.model';

export interface ProveedoresForm {
     tipo: string,
     razonsocialProv: string,
     rfcproveedor: string,
     uri_proveedor: string,
     nombres_rep_legal: string,
     primer_apellido_rep_legal: string,
     segundo_apellido_rep_legal: string,
     curp_rep_legal: string,
     lugar_proveedor: string,
     pais_proveedor: string,
     codigoPostal_proveedor: string,
     colonia_proveedor: string,
     localidad_proveedor: string,
     region_proveedor: string,
     calle_proveedor: string,
     numero_proveedor: string,
     nombres_contacto_prov: string,
     primer_apellido_contacto_prov: string,
     segundo_apellido_contacto_prov: string,
     email_contacto_prov: string,
     telefono_contacto_prov: string,
     telefonofax_contacto_prov: string,
     url_ente_contacto_prov: string,
     idioma_prov: string,
     id_ente_publico: string,
     created_at?: string,
     updated_at?: string,
     id_usuario?: string,
     _id?: string,
     uid?: string,
     estatus?: string,
}

export interface ProveedoresLoad {
  total: number;
  proveedores: Proveedores[];
}