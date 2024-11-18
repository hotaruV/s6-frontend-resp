export class Proveedores {
    constructor(
    
        public tipo: string,
        public razonsocialProv: string,
        public rfcproveedor: string,
        public uri_proveedor: string,
        public nombres_rep_legal: string,
        public primer_apellido_rep_legal: string,
        public segundo_apellido_rep_legal: string,
        public curp_rep_legal: string,
        public lugar_proveedor: string,
        public pais_proveedor: string,
        public codigoPostal_proveedor: string,
        public colonia_proveedor: string,
        public localidad_proveedor: string,
        public region_proveedor: string,
        public calle_proveedor: string,
        public numero_proveedor: string,
        public nombres_contacto_prov: string,
        public primer_apellido_contacto_prov: string,
        public segundo_apellido_contacto_prov: string,
        public email_contacto_prov: string,
        public telefono_contacto_prov: string,
        public telefonofax_contacto_prov: string,
        public url_ente_contacto_prov: string,
        public idioma_prov: string,
        public id_ente_publico: string,
        public created_at?: string,
        public updated_at?: string,
        public id_usuario?: string,
        public uid?: string,
        public estatus?: string,
    ) { }
  
    get gettipo(){
      return this.tipo;
    }
    get getrazonsocialProv(){
      return this.razonsocialProv;
    }
    get getrfcproveedor(){
      return this.rfcproveedor;
    }
    get geturi_proveedor(){
      return this.uri_proveedor;
    }
    get getnombres_rep_legal(){
      return this.nombres_rep_legal;
    }
    get getsegundo_apellido_rep_legal(){
      return this.segundo_apellido_rep_legal;
    }
    get getcurp_rep_legal(){
      return this.curp_rep_legal;
    }
    get getlugar_proveedor(){
      return this.lugar_proveedor;
    }
    get getpais_proveedor(){
      return this.pais_proveedor;
    }
    get getcodigoPostal_proveedor(){
      return this.codigoPostal_proveedor;
    }
    get getcolonia_proveedor(){
      return this.colonia_proveedor;
    }
    get getlocalidad_proveedor(){
      return this.localidad_proveedor;
    }
    get getregion_proveedor(){
      return this.region_proveedor;
    }
    get getcalle_proveedor(){
      return this.calle_proveedor;
    }
    get getnumero_proveedor(){
      return this.numero_proveedor;
    }
    get getnombres_contacto_prov(){
      return this.nombres_contacto_prov;
    }
    get getprimer_apellido_contacto_prov(){
      return this.primer_apellido_contacto_prov;
    }
    get getsegundo_apellido_contacto_prov(){
      return this.segundo_apellido_contacto_prov;
    }
    get getemail_contacto_prov(){
      return this.email_contacto_prov;
    }
    get gettelefono_contacto_prov(){
      return this.telefono_contacto_prov;
    }
    get gettelefonofax_contacto_prov(){
      return this.telefonofax_contacto_prov;
    }
    get geturl_ente_contacto_prov(){
      return this.url_ente_contacto_prov;
    }
    get getidioma_prov(){
      return this.idioma_prov;
    }
    get getid_ente_publico(){
      return this.id_ente_publico;
    }
    get getcreated_at(){
      return this.created_at;
    }
    get getid_usuario(){
      return this.id_usuario;
    }
    get getupdated_at(){
      return this.updated_at;
    }
    get getuid(){
      return this.uid;
    }
    get getestatus(){
      return this.estatus;
    }
   
   
  
  
  }