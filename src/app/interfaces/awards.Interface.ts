export interface Award {
  awards?: AwardElement[];
}

export interface AwardElement {
  title?:          string;
  description?:    string;
  status?:         string;
  date?:           Date;
  suppliers?:      Supplier[];
  items?:          Item[];
  documents?:      Document[];
  contractPeriod?: ContractPeriod;
  ocid?:           string;
  value?:          Value;
  _id?:          Value;
}

export interface ContractPeriod {
  _id?:       string;
  startDate?: Date;
  endDate?:   Date;
  ocid?:      string;
}

export interface Document {
  _id?:           string;
  document_id?:   string;
  award_id?:      string;
  documentType?:  string;
  title?:         string;
  description?:   string;
  url?:           string;
  datePublished?: Date;
  format?:        string;
  language?:      string;
}

export interface Item {
  _id?:                       string;
  award_id?:                  string;
  typeItem?:                  string;
  description?:               string;
  classification?:            Classification;
  additionalClassifications?: any[];
  quantity?:                  number;
  unit?:                      Supplier;
  ocid?:                      string;
  id?:                        string;
}

export interface Classification {
  _id?:         string;
  scheme?:      string;
  description?: string;
  uri?:         string;
  ocid?:        string;
  id?:          string;
}

export interface Supplier {
  _id?:      string;
  name?:     string;
  values?:   Value;
  ocid?:     string;
  id?:       string;
  award_id?: string;
}

export interface Value {
  _id?:      string;
  amount?:   number;
  currency?: string;
  ocid?:     string;
  id?:       string;
}
