export class ServidoresEnte {
    constructor(
      
      public nombres_servidor: string,
      public primer_apellido_servidor: string,
      public segundo_apellido_servidor: string,
      public rfc_servidor: string,
      public cargo_servidor: string,
      public email_servidor: string,
      public telefono_servidor: string,
      public telefonofax_servidor: string,
      public area: string,
      public id_ente_publico: string,
      public created_at?: string,
      public updated_at?: string,
      public id_usuario?: string,
      public uid?: string,
      public estatus?: string,
    ) { }
   
    get getnombres_servidor(){
      return this.nombres_servidor;
    }
    get getprimer_apellido_servidor(){
      return this.primer_apellido_servidor;
    }
  
    get getrfc_servidor(){
      return this.rfc_servidor;
    }
  
    get getcargo_servidor(){
      return this.cargo_servidor;
    }
    get getemail_servidor(){
      return this.email_servidor;
    }
    get gettelefono_servidor(){
      return this.telefono_servidor;
    }
    get gettelefonofax_servidor(){
      return this.telefonofax_servidor;
    }
    get getarea(){
      return this.area;
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