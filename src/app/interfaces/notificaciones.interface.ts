export interface Contratos {
  _id?: string;
  id?: string;
  ocid?: string;
  date?: string;
  tender?: any;
  language?: string;
  initiationType?: string;
}

export interface ContratoRevision extends Contratos {
  status?: string;
}

export interface Revisiones {
  _id?: string;
  uid?: string;
  ocid?: string;
  contrato_id?: Contratos;
  status?: string;
  created_at?: string;
  updated_at?: string | null;
}