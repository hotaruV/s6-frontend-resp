export interface Release {
  contratos?: Contrato[];

}

export interface Contrato {
  _id?:            string;
  tag?:            any[];
  parties?:        Party[] | null;
  awards?:         Award[];
  contracts?:      Contract[];
  id?:             string;
  ocid?:           string;
  date?:           Date;
  uid?:            string;
  initiationType?: string;
  language?:       string;
  buyer?:          Buyer | null;
  tender?:         Tender | null;
  planning?:       Planning | null;
  active?:         boolean;
}

export interface Award {
  _id?:            string;
  title?:          string;
  description?:    string;
  status?:         string;
  date?:           Date;
  suppliers?:      ProcuringEntity[];
  items?:          any[];
  documents?:      Document[];
  id?:             string;
  __v?:            number;
  contractPeriod?: ContractPeriod;
  ocid?:           string;
  value?:          Value;
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
  contract_id?:   string;
  documentType?:  string;
  title?:         string;
  description?:   string;
  url?:           string;
  datePublished?: Date;
  format?:        string;
  language?:      string;
  id?:            string;
}

export interface ProcuringEntity {
  _id?:      string;
  award_id?: string;
  id?:       string;
  name?:     string;
  ocid?:     string;
  values?:   Value;
}

export interface Value {
  _id?:      string;
  amount?:   number;
  currency?: string;
  ocid?:     string;
  id?:       string;
}

export interface Buyer {
  _id?:     string;
  id?:      string;
  ocid?:    string;
  name?:    string;
  user_id?: string;
  __v?:     number;
}

export interface Contract {
  _id?:         string;
  ocid?:        string;
  awardID?:     string;
  title?:       string;
  description?: string;
  status?:      string;
  period?:      Period;
  value?:       Value;
  items?:       Item[];
  dateSigned?:  Date;
  documents?:   Document[];
  id?:          string;
  __v?:         number;
}

export interface Item {
  _id?:                       string;
  award_id?:                  string;
  contract_id?:               string;
  typeItem?:                  string;
  description?:               string;
  classification?:            Budget;
  additionalClassifications?: any[];
  quantity?:                  number;
  unit?:                      ProcuringEntity;
  ocid?:                      string;
  id?:                        string;
}

export interface Budget {
  _id?:         string;
  scheme?:      string;
  description?: string;
  uri?:         string;
  ocid?:        string;
  id?:          string;
  legalName?:   string;
  amount?:      Amount;
}

export interface Amount {
  amount?:   number;
  currency?: string;
}

export interface Period {
  _id?:            string;
  id?:             string;
  startDate?:      Date;
  endDate?:        Date;
  maxExtentDate?:  Date;
  durationInDays?: number;
  ocid?:           string;
}

export interface Party {
  _id?:          string;
  identifier?:   Budget;
  name?:         string;
  address?:      Address;
  contactPoint?: ContactPoint;
  roles?:        string[];
  id?:           string;
  ocid?:         string;
  __v?:          number;
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

export interface Planning {
  _id?:        string;
  id?:         string;
  rationale?:  string;
  hasQuotes?: boolean;
  requestingUnits?: requestingUnit[];
  responsibleUnits?: responsibleUnit[];
  contractingUnits?: contractingUnit[];
  requestForQuotes?:requestForQuotes[];
  budget?:     Budget;
  documents?:  Document[];
  milestones?: Milestone[];
  __v?:        number;
}

export interface requestingUnit {
  id?:              string;
  nombres?:     string;
}

export interface responsibleUnit {
  id?:              string;
  nombres?:     string;
}
export interface contractingUnit {
  id?:              string;
  nombres?:     string;
}

export interface requestForQuotes {
  _id?:          string;
  title?:        string;
  description?:  string;
  period?:       period[];
}
export interface period{
  startDate?:          string;
  endDate?:  string;
  maxExtentDate?:        string;
  durationInDays?:        string;
 
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

export interface Tender {
  _id?:                        string;
  title?:                      string;
  description?:                string;
  status?:                     string;
  items?:                      Item[];
  procurementMethod?:          string;
  procurementMethodDetails?:   string;
  procurementMethodRationale?: string;
  awardCriteria?:              string;
  awardCriteriaDetails?:       string;
  submissionMethod?:           string[];
  submissionMethodDetails?:    string;
  hasEnquiries?:               boolean;
  numberOfTenderers?:          number;
  documents?:                  Document[];
  milestones?:                 any[];
  amendments?:                 any[];
  ocid?:                       string;
  id?:                         string;
  __v?:                        number;
  awardPeriod?:                Period;
  enquiryPeriod?:              Period;
  tenderPeriod?:               Period;
  minValue?:                   Value;
  procuringEntity?:            ProcuringEntity;
  value?:                      Value;
}
