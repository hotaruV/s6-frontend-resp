import { Ente } from "../Entes/entes.model";

export class Usuario {
  constructor(
    public nombres: string,
    public primer_apellido: string,
    public rfc: string,
    public email: string,
    public password?: string,
    public ente_publico?: string,
    public rfc_homoclave?: string,
    public curp?: string,
    public role?: 'seseaadmin' | 'adminstrador_ente' | 'oic',
    public segundo_apellido?: string,
    public fist_login?: boolean,
    public id_ente_publico?: any,
    public created_at?: string,
    public updated_at?: string,
    public uid?: string,
    public user_id?: string,
    public userName?: string,
    public estatus?: string,
    public cargo_publico?: string,
  ) { }



  get getEmail() {
    return this.email;
  }
  get getid_ente_publico() {
    return this.id_ente_publico;
  }

  get getUid() {
    return this.uid;
  }
  get getFistLogin() {
    return this.fist_login
  }

  get getRol() {
    return this.role
  }

  get getNombres() {
    return this.nombres + " " + this.primer_apellido
  }





}
