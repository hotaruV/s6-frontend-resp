export interface Planning {
  buyer?:     Buyer;
  budget?:    Budget;
  document?:  Document[];
  milestone?: Milestone[];
}

export interface Budget {
  amount?:      Amount;
  _id?:         string;
  description?: string;
  ocid?:        string;
  uri?:         string;
  id?:          string;
}

export interface Amount {
  amount?:   number;
  currency?: string;
}

export interface Buyer {
  _id?:     string;
  id?:      string;
  ocid?:    string;
  name?:    string;
  user_id?: string;
}

export interface Document {
  _id?:           string;
  document_id?:   string;
  documentType?:  string;
  title?:         string;
  description?:   string;
  url?:           string;
  datePublished?: Date;
  format?:        string;
  language?:      string;
  id?:            string;
}

export interface Milestone {
  _id?:          string;
  document_id?:  string;
  title?:        string;
  type?:         string;
  description?:  string;
  dueDate?:      Date;
  dateMet?:      Date;
  dateModified?: Date;
  status?:       string;
  id?:           string;
}


export interface PlanningResp {
  rationale?:     string;
  budget?:    string;
  document?:  string[];
  milestone?: string[];
}

export interface respServer {
  _id?: string,
  ok: boolean
  total?: number
  buyer: BuyerResp
  document?: string
  mileston?: string
  budget:BudgetResp
  ocid: string
  uid: string
}
export interface BuyerResp {
  _id: boolean
}

export interface BudgetResp {
  _id: boolean
}



export interface ContracsOCID {
  version?:           string;
  uri?:               string;
  publishedDate?:     Date;
  publisher?:         Publisher;
  license?:           string;
  publicationPolicy?: string;
  release?:           Release;
}

export interface Publisher {
  name?:   string;
  scheme?: string;
  uid?:    string;
  uri?:    string;
}

export interface Release {
  ocid?:           string;
  date?:           Date;
  language?:       string;
  tag?:            any[];
  initiationType?: string;
  parties?:        null;
  buyer?:          Buyer;
  planning?:       Planning;
  tender?:         null;
  awards?:         null;
  contracts?:      null;
}

export interface Buyer {
  id?:   string;
  name?: string;
}

export interface Planning {
  rationale?:  string;
  budget?:     Budget;
  documents?:  any[];
  milestones?: any[];
}

export interface Budget {
  amount?:      Amount;
  description?: string;
  uri?:         string;
}

export interface Amount {
  amount?:   number;
  currency?: string;
}
export interface SolQuotes {
  id?: string;
  title?: string;
  description?: string;

}