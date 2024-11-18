//import { Amendment } from './../models/Contratos/contrato.model';

export interface respuesta {
  _id?: string;
  ok?: boolean;
  key?: string;
}

export interface respuestaTender {
  _id?: string;
  ok?: boolean
}

export interface Paties {
  identifier?:   null;
  name?:         string;
  address?:      Address;
  contactPoint?: ContactPoint;
  roles?:        any[];
  id?:           string;
}

export interface Address {
  streetAddress?: string;
  locality?:      string;
  region?:        string;
  postalCode?:    string;
  countryName?:   string;
  id?:            number;
}

export interface ContactPoint {
  name?:      string;
  email?:     string;
  telephone?: string;
  faxNumber?: string;
  url?:       string;
  id?:        number;
}



export interface Contacto {
  identifier?:   string;
  legalName?:         string;
  uri?:         string;
  address?:      Address;
  contactPoint?: ContactPoint;
  id?: string;
}

export interface Address {
  streetAddress?: string;
  locality?:      string;
  region?:        string;
  postalCode?:    string;
  countryName?:   string;
  id?:            number;
}

export interface ContactPoint {
  name?:      string;
  email?:     string;
  telephone?: string;
  faxNumber?: string;
  url?:       string;
  id?:        number;
}
export interface RespDataAll {
  contact_id?:    string;
  addres_id?:     string;
  identifier_id?: string;
  msj?: string;
  ok?: boolean
}

export interface Parties {
  parties?: Party[];
}

export interface Party {
  _id?:          string;
  identifier?:   Identifier;
  address?:      Address;
  contactPoint?: ContactPoint;
  roles?:        string[];
}

export interface Address {
  _id?:           string;
  streetAddress?: string;
  locality?:      string;
  region?:        string;
  postalCode?:    string;
  countryName?:   string;
  key?:           string;
  ocid?:          string;
}

export interface ContactPoint {
  _id?:       string;
  name?:      string;
  email?:     string;
  telephone?: string;
  faxNumber?: string;
  url?:       string;
  key?:       string;
  ocid?:      string;
}

export interface Identifier {
  _id?:       string;
  legalName?: string;
  uri?:       string;
  id?:        string;
  ocid?:      string;
  scheme?:    string;
}

export interface Amendment {
  _id?: string
  date?: string;
  rationale?: string;
  description?: string;
  ocid?: string;
}
export interface ItemID {
  item_id: string[];
}

export interface Item {
  items?: ItemElement[];
  itemsCount?: number;
  _id?:       String;
}

export interface ItemElement {
  description?:               string;
  classification?:            Classification;
  additionalClassifications?: Classification[];
  quantity?:                  number;
  unit?:                      Unit;
  typeItem?:                  string;
  _id?:                       string;
}

export interface Classification {
  id?:          string;
  scheme?:      string;
  description?: string;
  uri?:         string;
}

export interface Unit {
  name?:   string;
  values?: Values;
}

export interface Values {
  id?:       string;
  amount?:   number;
  currency?: string;
  valuesID?: string;
}
