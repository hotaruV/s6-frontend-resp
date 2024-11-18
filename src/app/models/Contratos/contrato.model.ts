
import { ProcuringEntity } from 'src/app/interfaces/release';
import { Items } from '../Items/items.model';
export class Contratos {
  constructor(
    public ocid: any,
    public id: any,
    public date: any,
    public language: any,
    public tag: Tag[],
    public initiationType: any,
    public parties: Partie[],
    public buyer: Buyer,
    public planning: Planning,
    public tender: Tender,
    public awards: Awards,
    public contracts: Contracts[],
  ) { }
}
// Empieza tag
export class Tag {
  constructor(
    public tag: any
  ) { }
}
// Termina tag
// Empieza partie
export class Partie {
  constructor(
    public identifier: Identifier,
    public name: any,
    public address: Address,
    public contactPoint: ContactPoint,
    public roles: Roles[],
    public id: any,
  ) { }
}
export class Identifier {
  constructor(
    public scheme: any,
    public id: any,
    public legalName: any,
    public uri: any,
  ) { }
}
export class Address {
  constructor(
    public streetAddress: any,
    public locality: any,
    public region: any,
    public postalCode: any,
    public countryName: any,
    public id: any,
  ) { }
}
export class ContactPoint {
  constructor(
    public name: any,
    public email: any,
    public telephone: any,
    public id: any,
    public url?: any,
    public faxNumber?: any,
  ) { }
}
export class Roles {
  constructor(
    public roles: any,
  ) { }
}
// Termina partie
// Empieza buyer
export class Buyer {
  constructor(
    public id: any,
    public name: any,
  ) { }
}
// Termina buyer
// Empieza awards
export class Awards {
  constructor(
    public id: any,
    public title: any,
    public description: any,
    public status: any,
    public date: Date,
    public value: Values,
    public suppliers: Suppliers[],
    public items: Items[],
    public contractPeriod: ContractPeriod,
    public documents: Documents[],
  ) { }
}
export class Documents {
  constructor(
    public id: any,
    public documentType: any,
    public title: any,
    public description: any,
    public datePublished: any,
    public language: any,
    public url?: any,
    public format?: any,
  ) { }
}

export class Budgets {
  constructor(
    public id: string,
    public description: string,
    public amount: Amount[]
  ) { }
}

export class Amount {
  constructor(
    public amount: number,
    public currency: string,
    public uri: string
  ) { }
}
export class Values {
  constructor(
    public id: any,
    public amount: any,
    public currency: any,
  ) { }
}
export class Suppliers {
  constructor(
    public id: any,
    public name: any,
  ) { }
}
export class ContractPeriod {
  constructor(
    public id: any,
    public startDate: any,
    public endDate: any,
  ) { }
}
// Termina awards
// Empieza contracts
export class Contracts {
  constructor(
    public id: any,
    public awardID: any,
    public title: any,
    public description: any,
    public status: any,
    public period: Period,
    public value: Values,
    public items: Items[],
    public dateSigned: Date,
    public documents: Documents[],
  ) { }
}
export class Period {
  constructor(
    public id: any,
    public startDate: any,
    public endDate: any,
    public maxExtentDate: any,
    public durationInDays: any,
  ) { }
}
// Termina contracts
export class Tender {
  constructor(
    public title: string,
    public description: string,
    public status: string,
    public procurementMethod: string,
    public procurementMethodDetails: string,
    public procurementMethodRationale: string,
    public awardCriteria: string,
    public awardCriteriaDetails: string,
    public submissionMethod: string[],
    public submissionMethodDetails: string,
    public tenderPeriod: Period,
    public enquiryPeriod: Period,
    public hasEnquiries: boolean,
    public awardPeriod: Period,
    public numberOfTenderers: number,
    public documents: Document[],
    public amendments: Amendment[],
    public milestones: Milestone[],
    public id: string,
  ) { }
}

export class Planning {
  constructor(
    public rationale: string,
    public budget: Budgets[],
    public documents: Documents[],
    public milestones: Milestone[],
    public id: string,
  ) { }
}

export class Milestone {
  constructor(
    public id: string,
    public title: string,
    public type: string,
    public dueDate: string,
    public dateMet: string,
    public dateModified: string,
    public status: string,
    public _id: string,
  ) { }
}

export class Amendment {
  constructor(
    public id: string,
    public date: string,
    public rationale: string,
    public description: string,
    public amendsReleaseID: string,
    public releaseID: string,
  ) { }

  //export class procuringEntity(){}
}
