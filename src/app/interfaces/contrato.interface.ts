import { Contratos } from './../models/Contratos/contrato.model';

export interface ContratosLoad{
  total: number,
  costo: number[],
  contratos: Contratos[],
}
export interface ContratosL {
  ocid: any;
  xid: any;
  date: any;
  title: any;
  price: any;
  description: any;
  institucion: any;
  numCont: any;
  list: any;
  method: any;
}
export interface Buyers {
  buyers?: BuyersClass;
}

export interface BuyersClass {
  _id?:  string;
  id?:   string;
  name?: string;
}

export interface Budget {
  description: string;
  amount:      Amount;
  uri:         string;
}

export interface Amount {
  amount:   string;
  currency: string;
}

export interface BudgetResponse {
  ok:  boolean;
  _id: string;
}



