export class Ente {
  constructor(
    public ente: string,
    public ente_id: string,
    public siglas: string,
    public estado: string,
    public municipio: string,
    public created_at?: string,
    public updated_at?: string,
    public id_usuario?: string,
    public uid?: string,
    public estatus?: string,
  ) { }

  get getEnte() {
    return this.ente;
  }
  get getUid() {
    return this.ente_id;
  }
  get getSiglas() {
    return this.siglas;
  }

  get getIdUsuario() {
    return this.id_usuario;
  }
  get getMunicipio() {
    return this.municipio
  }

  get getEstado() {
    return this.estado
  }


}