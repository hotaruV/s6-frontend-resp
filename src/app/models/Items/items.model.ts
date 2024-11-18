export class Items{
  constructor(
    public id: any,
    public description: any,
    public classification: Classification,
    public quantity: any,
    public unit : Unit,
    //public additionalClassifications: Classification[]=[],
  ){}


}
// Empieza classification
export class Classification{
  constructor(
    public id: any,
    public scheme: any,
    public description: any,
    public uri: any,
  ){}
}
// Termina classification
// Empieza AdditionalClassifications
export class AdditionalClassifications{
  constructor(
    public id: any,
    public scheme: any,
    public description: any,
    public uri: any,
  ){}
}
// Termina AdditionalClassifications
// Empieza unit
export class Unit{
  constructor(
    public id: any,
    public name: any,
    public values: Values,
  ){}
}
// Termina unit
// Empieza values
export class Values{
  constructor(
    public id: any,
    public amount: any,
    public currency: any,
  ){}
}
// Termina values
