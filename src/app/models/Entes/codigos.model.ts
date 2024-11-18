export class CodigosPostales {
    constructor(
      
      public idcp: string,
      public idmunicipio: string,
      public idestado: string,
      public cp: string,
      public colonia: string,
    ) { }
   
    get getidcp(){
      return this.idcp;
    }
    get getidmunicipio(){
      return this.idmunicipio;
    }
  
    get getidestado(){
      return this.idestado;
    }
  
    get getcp(){
      return this.cp;
    }
    get getcolonia(){
      return this.colonia;
    }
    
  }