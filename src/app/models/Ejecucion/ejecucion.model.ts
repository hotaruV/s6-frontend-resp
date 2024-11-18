export class Ejecuciones {
    constructor(
        public ocid: any, //OK
        public rationale: string, //OK
        public description: string, //OK
        public budgeturl: string, //OK
        public budgetamount: number, //OK
        public budgetcurrency: string, //OK
        public tendertitle: string, //OK
        public tenderdescription: string, //OK
        public uintamount: number, //OK
        public uintcurrency: string, //OK
        public minValueamount: number, //OK
        public minValuecurrency: string, //OK
        public procurementMethod: string, //OK
        public procurementMethodDetails: string, //OK
        public procuringEntityname: string, //OK
        public procurementMethodRationale: string, //OK
        public eligibilityCriteria: string //OK
    ) { }
}