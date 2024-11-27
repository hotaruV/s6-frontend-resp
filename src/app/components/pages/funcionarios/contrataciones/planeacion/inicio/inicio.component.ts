import { Planning } from './../../../../../../services/pages/planning.interface';

import Swal from 'sweetalert2';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { PlaningService } from '../../../../../../services/pages/planing.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UsuarioService } from '../../../../../../services/auth/usuario.service';
import { Proveedores } from './../../../../../../models/Entes/proveedores.model';
import { partidas } from './../../../../../../interfaces/partidas.inteface';
import { ServidoresEnte } from 'src/app/models/Entes/servidores.model';
import { SolCotizacionesComponent } from '../partial/sol-cotizaciones/sol-cotizaciones.component';
import { ItemsComponent } from '../partial/items/items.component';
import { ProveedoresInvitadosComponent } from '../partial/proveedores-invitados/proveedores-invitados.component';
import { ItemsCotizadosComponent } from '../partial/items-cotizados/items-cotizados.component';
import { DocumentosComponent } from '../partial/documentos/documentos.component';
import { HitosComponent } from '../partial/hitos/hitos.component';
import { CotizacionesRecComponent } from '../partial/cotizaciones-rec/cotizaciones-rec.component';
import { LicitationService } from 'src/app/services/pages/licitation.service';
import { map } from 'rxjs';


interface Format {
  value: string;
  viewValue: string;
}
interface Cotizacion {
  _id: string;
  id: string;
  title: string;
  description: string;
}

interface value {
  //valor
  amount: string,
  currency: string,

}
interface unit {
  //UINT 

  id: string;
  numreq: string;
  scheme: string,
  name: string,
  valor: string,
  value: value,
  uri: string,

}
interface classification {

  //CLASIFICACION
  id: string;
  scheme: string,
  description: string,
  uri: string,

}
interface perido {


  startDate: string,
  endDate: string,
  maxExtentDate: string,
  undurationInDaysit: unit,
}
interface ProveedorEmisor {
  id: string;
  Suppliersname: string;
  name: string;
}

interface itemsCotizados {
  //item
  id: string;
  item: string,
  description: string,
  classification: classification,
  quantity: string,
  unit: unit,
  periodo: perido;
  proveedorEmisor: ProveedorEmisor,

}
interface items {
  //item
  id: string;
  item: string,
  description: string,
  classification: classification,
  quantity: string,
  unit: unit,

}
interface ProveedorInvitado {
  id: string;
  invitedSuppliersname: string;
  name: string;
}

interface Documento {
  id: string;
  title: string;
  Type: string;
  description: string;
  url: string;
  format: string;
  language: string;
  datePublished: string;
  dateModified: string;
}
interface Hito {
  id: string;
  milestonestitle: string;
  milestonesType: string;
  milestonesdescription: string;
  milestonescode: string;
  milestonesdueDate: string;
  milestonesdateMet: string;
  milestonesdateModified: string;
  milestonesstatus: string;
}
interface Cotizacion_ {
  id: string;
  cotizadescription: string;
  cotizadate: string;
}
//  Quotes_: Cotizacion[] = [];
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class inicioPlaneacionComponent implements OnInit {
  @ViewChild(SolCotizacionesComponent) sol_cotizaciones;
  @ViewChild(ItemsComponent) items;
  @ViewChild(ProveedoresInvitadosComponent) prov_invitado;
  @ViewChild(CotizacionesRecComponent) cot_cotizados;
  @ViewChild(ItemsCotizadosComponent) items_cotizados;
  @ViewChild(DocumentosComponent) documentos;
  @ViewChild(HitosComponent) hitos;

  monedas: Format[] = [
    { value: 'MXN', viewValue: 'PESO MEXÍCANO (MXM)' },
    { value: 'USD', viewValue: 'DOLAR ESTADUNIDENSE (USD)' },
    { value: 'EUR', viewValue: 'EURO (EUR)' },
  ];
  partidas: Format[] = [
    { 'value': "1000", 'viewValue': "SERVICIOS PERSONALES" },
    { 'value': "1100", 'viewValue': "REMUNERACIONES AL PERSONAL DE CARACTER PERMANENTE" },
    { 'value': "1200", 'viewValue': "REMUNERACIONES AL PERSONAL DE CARACTER TRANSITORIO" },
    { 'value': "1300", 'viewValue': "REMUNERACIONES ADICIONALES Y ESPECIALES" },
    { 'value': "1400", 'viewValue': "SEGURIDAD SOCIAL" },
    { 'value': "1500", 'viewValue': "OTRAS PRESTACIONES SOCIALES Y ECONOMICAS" },
    { 'value': "1600", 'viewValue': "PREVISIONES" },
    { 'value': "1700", 'viewValue': "PAGO DE ESTIMULOS A SERVIDORES PUBLICOS" },
    { 'value': "2000", 'viewValue': "MATERIALES Y SUMINISTROS" },
    { 'value': "2100", 'viewValue': "MATERIALES DE ADMINISTRACION, EMISION DE DOCUMENTOS Y ARTICULOS OFICIALES" },
    { 'value': "2200", 'viewValue': "ALIMENTOS Y UTENSILIOS" },
    { 'value': "2300", 'viewValue': "MATERIAS PRIMAS Y MATERIALES DE PRODUCCION Y COMERCIALIZACION" },
    { 'value': "2400", 'viewValue': "MATERIALES Y ARTICULOS DE CONSTRUCCION Y DE REPARACION" },
    { 'value': "2500", 'viewValue': "PRODUCTOS QUIMICOS, FARMACEUTICOS Y DE LABORATORIO" },
    { 'value': "2600", 'viewValue': "COMBUSTIBLES, LUBRICANTES Y ADITIVOS" },
    { 'value': "2700", 'viewValue': "VESTUARIO, BLANCOS, PRENDAS DE PROTECCION Y ARTICULOS DEPORTIVOS" },
    { 'value': "2800", 'viewValue': "MATERIALES Y SUMINISTROS PARA SEGURIDAD" },
    { 'value': "2900", 'viewValue': "HERRAMIENTAS, REFACCIONES Y ACCESORIOS MENORES" },
    { 'value': "3000", 'viewValue': "SERVICIOS GENERALES" },
    { 'value': "3100", 'viewValue': "SERVICIOS BASICOS" },
    { 'value': "3200", 'viewValue': "SERVICIOS DE ARRENDAMIENTO" },
    { 'value': "3300", 'viewValue': "SERVICIOS PROFESIONALES, CIENTIFICOS, TECNICOS Y OTROS SERVICIOS" },
    { 'value': "3400", 'viewValue': "SERVICIOS FINANCIEROS, BANCARIOS Y COMERCIALES" },
    { 'value': "3500", 'viewValue': "SERVICIOS DE INSTALACION, REPARACION, MANTENIMIENTO Y CONSERVACION" },
    { 'value': "3600", 'viewValue': "SERVICIOS DE COMUNICACION SOCIAL Y PUBLICIDAD" },
    { 'value': "3700", 'viewValue': "SERVICIOS DE TRASLADO Y VIATICOS" },
    { 'value': "3800", 'viewValue': "SERVICIOS OFICIALES" },
    { 'value': "3900", 'viewValue': "OTROS SERVICIOS GENERALES" },
    { 'value': "4000", 'viewValue': "TRANSFERENCIAS, ASIGNACIONES, SUBSIDIOS Y OTRAS AYUDAS" },
    { 'value': "4100", 'viewValue': "TRANSFERENCIAS INTERNAS Y ASIGNACIONES AL SECTOR PÚBLICO" },
    { 'value': "4200", 'viewValue': "TRANSFERENCIAS AL RESTO DEL SECTOR PÚBLICO" },
    { 'value': "4300", 'viewValue': "SUBSIDIOS Y SUBVENCIONES" },
    { 'value': "4400", 'viewValue': "AYUDAS SOCIALES" },
    { 'value': "4500", 'viewValue': "PENSIONES Y JUBILACIONES" },
    { 'value': "4600", 'viewValue': "TRANSFERENCIAS A FIDEICOMISOS, MANDATOS Y OTROS ANALOGOS" },
    { 'value': "4700", 'viewValue': "TRANSFERENCIAS A LA SEGURIDAD SOCIAL" },
    { 'value': "4800", 'viewValue': "DONATIVOS" },
    { 'value': "4900", 'viewValue': "TRANSFERENCIAS AL EXTERIOR" },
    { 'value': "5000", 'viewValue': "BIENES MUEBLES, INMUEBLES E INTANGIBLES" },
    { 'value': "5100", 'viewValue': "MOBILIARIO Y EQUIPO DE ADMINISTRACION" },
    { 'value': "5200", 'viewValue': "MOBILIARIO Y EQUIPO EDUCACIONAL Y RECREATIVO" },
    { 'value': "5300", 'viewValue': "EQUIPO E INSTRUMENTAL MEDICO Y DE LABORATORIO" },
    { 'value': "5400", 'viewValue': "VEHICULOS Y EQUIPO DE TRANSPORTE" },
    { 'value': "5500", 'viewValue': "EQUIPO DE DEFENSA Y SEGURIDAD" },
    { 'value': "5600", 'viewValue': "MAQUINARIA, OTROS EQUIPOS Y HERRAMIENTAS" },
    { 'value': "5700", 'viewValue': "ACTIVOS BIOLOGICOS" },
    { 'value': "5800", 'viewValue': "BIENES INMUEBLES" },
    { 'value': "5900", 'viewValue': "ACTIVOS INTANGIBLES" },
    { 'value': "6000", 'viewValue': "INVERSION PÚBLICA" },
    { 'value': "6100", 'viewValue': "OBRA PÚBLICA EN BIENES DE DOMINIO PÚBLICO" },
    { 'value': "6200", 'viewValue': "OBRA PÚBLICA EN BIENES PROPIOS" },
    { 'value': "6300", 'viewValue': "PROYECTOS PRODUCTIVOS Y ACCIONES DE FOMENTO" },
    { 'value': "7000", 'viewValue': "INVERSIONES FINANCIERAS Y OTRAS PROVISIONES" },
    { 'value': "7100", 'viewValue': "0 INVERSIONES PARA EL FOMENTO DE ACTIVIDADES PRODUCTIVAS" },
    { 'value': "7200", 'viewValue': "ACCIONES Y PARTICIPACIONES DE CAPITAL" },
    { 'value': "7300", 'viewValue': "COMPRA DE TITULOS Y VALORES" },
    { 'value': "7400", 'viewValue': "CONCESION DE PRÉSTAMOS" },
    { 'value': "7500", 'viewValue': "INVERSIONES EN FIDEICOMISOS, MANDATOS Y OTROS ANALOGOS" },
    { 'value': "7600", 'viewValue': "OTRAS INVERSIONES FINANCIERAS" },
    { 'value': "7600", 'viewValue': "PROVISIONES PARA CONTINGENCIAS Y OTRAS EROGACIONES ESPECIALES" },
    { 'value': "7900", 'viewValue': "PARTICIPACIONES Y APORTACIONES" },
    { 'value': "8100", 'viewValue': "PARTICIPACIONES" },
    { 'value': "8300", 'viewValue': "APORTACIONES" },
    { 'value': "8500", 'viewValue': "CONVENIOS" },
    { 'value': "9000", 'viewValue': "DEUDA PÚBLICA" },
    { 'value': "9100", 'viewValue': "AMORTIZACION DE LA DEUDA PÚBLICA" },
    { 'value': "9200", 'viewValue': "INTERESES DE LA DEUDA PÚBLICA" },
    { 'value': "9300", 'viewValue': "COMISIONES DE LA DEUDA PÚBLICA" },
    { 'value': "9400", 'viewValue': "GASTOS DE LA DEUDA PÚBLICA" },
    { 'value': "9500", 'viewValue': "COSTO POR COBERTURAS" },
    { 'value': "9600", 'viewValue': "APOYOS FINANCIEROS" },
    { 'value': "9900", 'viewValue': "ADEUDOS DE EJERCICIOS FISCALES ANTERIORES (ADEFAS)" }

  ];


  public botonGuardarPlaneacion = true;
  public botonEditarPlaneacion = false;
  buttonDisabled: boolean;
  public arraypartidas: partidas[] = [];
  public getentesreq: any;
  public hasQuotes: string = 'SI';
  why: boolean;
  public planningSelect!: string;
  public ocid: string;
  public servReq: ServidoresEnte[] = [];
  public servRes: ServidoresEnte[] = [];
  public servCon: ServidoresEnte[] = [];
  public servidores: ServidoresEnte[] = [];
  public getRol = '';
  public getNombres = '';
  public getIdUsuario = '';
  public getidentepublico: any;

  public proveedoresEmisor: Proveedores[] = [];
  public proveedoresParty: Proveedores[] = [];
  public getprovedoresParty: any;
  public addPlanning: any

  public planning_id: any;
  public buyer_id: any;

  PlanningForm = this.fb.group({
    _id: [],
    //aqui solo se validara los campos que no estan en alguna lista
    rationale: ['', [Validators.required]],//obligatorio
    hasQuotes: ['',],

    cotizacion_no: ['',],
    requestingUnitname: ['', [Validators.required]],//obligatorio 
    responsibleUnitname: ['', [Validators.required]],//obligatorio 
    contractingUnitname: ['', [Validators.required]],//obligatorio 

    startDate: ['', [Validators.required]],//obligatorio
    endDate: ['', [Validators.required]],//obligatorio
    maxExtentDate: ['', [Validators.required]],//obligatorio
    durationInDays: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],//obligatorio

    //presupuesto
    budgetdescription: [null, [Validators.required]],//obligatorio
    budgeturl: [null, [Validators.required]],//obligatorio
    budgetamount: [null, [Validators.required, Validators.pattern(/^-?\d*[.,]?\d{0,2}$/)]],//obligatorio
    budgetcurrency: [null, [Validators.required]],//obligatorio
    budgetproject: [null, [Validators.required]],//obligatorio
    budgetprojectID: [null, [Validators.required]],//obligatorio
    budgeturi: [null, [Validators.required]],//obligatorio

    //DESGLOCE PRESUPUESTO
    budgetBreakdowndescription: [null, [Validators.required]],//obligatorio
    budgetBreakdownamount: [null, [Validators.required, Validators.pattern(/^-?\d*[.,]?\d{0,2}$/)]],//obligatorio
    budgetBreakdowncurrency: [null, [Validators.required]],//obligatorio
    budgetBreakdownuri: [null, [Validators.required]],//obligatorio

    //periodo presupuesto
    budgetBreakdownstartDate: [null, [Validators.required]],//obligatorio
    budgetBreakdownendDate: [null, [Validators.required]],//obligatorio
    budgetBreakdownmaxExtentDate: [null, [Validators.required]],//obligatoriov
    budgetBreakdownmaxdurationInDays: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]],//obligatorio

    //lineas presupuestarias
    budgetLinesorigin: [null, [Validators.required]],//obligatorio

    //componentes
    budgetLinescomponentsname: [null,],
    budgetLinescomponentslevel: [null,],
    budgetLinescomponentscode: [null,],
    budgetLinescomponentsdescription: [null, [Validators.required]],//obligatorio

    //actore fuente
    budgetBreakdownsourcePartyname: [null,],//obligatorio
  })
  /**
    * INICIALIZACIONES
    *
    */
  constructor(
    private fb: UntypedFormBuilder,
    private activateRute: ActivatedRoute,
    private planingService: PlaningService,
    private usrServ: UsuarioService,
    private router: Router,
    private tenderSvc: LicitationService,
  ) {

    this.activateRute.params.subscribe(({ ocid }) => {
      this.ocid = ocid
      this.getNombres = usrServ.usuario.getNombres;
      this.getIdUsuario = usrServ.usuario.getUid;
      this.getidentepublico = usrServ.usuario.getid_ente_publico.ente_id;
      this.getRol = usrServ.usuario.getRol;
      this.buyer_id = localStorage.getItem('buyer_id');
    })
  }

  ngOnInit(): void {
    this.why = false;
    this.buttonDisabled = true;
    this.getServidorRequirientes();
    this.getServidorContratante();
    this.getServidorResponsable();
    this.getAllProveedoresParty();

    //buscar si ya existe la planeación
    this.getplanning();
    this.getbuyer()



  }

  getbuyer() {
    this.planingService.getBuyer(this.getidentepublico).
      pipe(
        map(((resp: any) => {
          localStorage.setItem('buyer_id', resp.buyers._id)
        })))
      .subscribe();
  }

  getplanning() {
    let periodo;
    //obtener planning guardado

    this.planingService.getPlanning(this.ocid).subscribe((resp: any) => {



      if (resp.planning != "" && resp.planning != null) {
        let amountbudget_, currencybudget_, budgetLinesorigin;
        let amountbudgetBreakdown_, currencybudgetBreakdown_;
        const _id = resp.planning._id;
        const id = resp.planning.id;
        const rationale = resp.planning.rationale;
        const cotizacion_no = resp.planning.hasQuotes;
        const hasQuotes_why = resp.planning.hasQuotes_why;
        let hasQuotes = '';
        ////(' cotizacion_no: '+cotizacion_no);
        if (cotizacion_no == true)
          hasQuotes = 'SI';
        else
          hasQuotes = 'NO';
        const listrequestingUnitname = resp.planning.requestingUnits;
        let requestingUnitname = '';
        listrequestingUnitname.forEach(element => {

          requestingUnitname = element.id;

        });
        const listresponsibleUnits = resp.planning.responsibleUnits;
        let responsibleUnits = '';
        listresponsibleUnits.forEach(element => {

          responsibleUnits = element.id;

        });
        const listcontractingUnitname = resp.planning.contractingUnits;
        let contractingUnits = '';
        listcontractingUnitname.forEach(element => {

          contractingUnits = element.id;

        });

        if (hasQuotes == "NO")
          this.hasQuotesno();

        if (hasQuotes == "SI")
          this.hasQuotessi();

        /**************comienza sol coizaciones*********/
        const requestForQuotes = resp.planning.requestForQuotes;
        requestForQuotes.forEach(element => {
          const _q = element.quotes_;
          const Quotes_: Cotizacion[] = [];
          _q.forEach(c => {
            //let amountbudget_,currencybudget_;
            //let contCotizaciones=Quotes_.length;
            // contCotizaciones+=1;
            this.planingService.getPlanningCotizacion(c).subscribe((resp: any) => {
              const quotes_ = resp.quotes_;

              let cotizacion: Cotizacion = {
                _id: quotes_._id,//aqui va el _id si no es 0
                id: quotes_.id,//contCotizaciones.toString(),
                title: quotes_.title,
                description: quotes_.description,

              };
              ////(' cotizacion: ' + cotizacion);
              Quotes_.push(cotizacion);

            });

          });
          this.sol_cotizaciones.cotizaciones = Quotes_;
          /**************termina sol coizaciones*********/
          /**************comienza periodo*********/
          periodo = element.period;
          this.planingService.getPlanningPeriod(periodo).subscribe((resp: any) => {
            const per = resp.period;
            const startDate = per.startDate;
            const endDate = per.endDate;
            const maxExtentDate = per.maxExtentDate;
            const durationInDays = per.durationInDays;

            this.PlanningForm.patchValue({
              startDate,
              endDate,
              maxExtentDate,
              durationInDays,
            });

          });
          /**************termina periodo*********/
          /**************comienza items*********/
          const _itemC: items[] = [];
          const iCot = element.items;
          let contIc = iCot.length;
          let amount_, currency_, iduint_, numreq_, scheme_, name_, valor_, uri_, idclasi, schemeclasi, descriptionclasi;
          let uriclasi;


          if (contIc == 1)//cuando es solo 1 registro en la lista
          {
            this.planingService.getPlanningItems(iCot).subscribe((resp: any) => {
              const items_ = resp.items;

              const itemunit = items_.unit;
              iduint_ = itemunit.id;
              numreq_ = itemunit.numreq;

              scheme_ = itemunit.scheme;
              name_ = itemunit.name;
              valor_ = itemunit.valor;
              uri_ = itemunit.uri;
              const idValue = itemunit.values;

              amount_ = idValue.amount;
              currency_ = idValue.currency;


              let nuevovalor: value = {
                amount: amount_,
                currency: currency_,
              }

              let nuevouint: unit = {
                //UINT 
                id: iduint_,

                numreq: numreq_,
                scheme: scheme_,
                name: name_,
                valor: valor_,
                value: nuevovalor,
                uri: uri_,

              }
              const classification_ = items_.classification;
              idclasi = classification_.id;
              schemeclasi = classification_.scheme;
              descriptionclasi = classification_.description;
              uriclasi = classification_.uri;

              let nuevoclasificacion: classification = {
                id: idclasi,
                scheme: schemeclasi,
                description: descriptionclasi,
                uri: uriclasi,
              }

              let nuevo: items = {
                id: items_.id,
                item: items_.title,
                description: items_.description,
                classification: nuevoclasificacion,
                quantity: items_.quantity,
                unit: nuevouint,

              }
              _itemC.push(nuevo);
            });
          }
          else {
            // //(' iCot: '+ iCot);
            iCot.forEach(d => {
              contIc = _itemC.length;
              contIc += 1;
              //  //(' recorro y obtego item id: '+d);
              this.planingService.getPlanningItems(d).subscribe((resp: any) => {
                const items_ = resp.items;

                const itemunit = items_.unit;
                iduint_ = itemunit.id;
                numreq_ = itemunit.numreq;

                scheme_ = itemunit.scheme;
                name_ = itemunit.name;
                valor_ = itemunit.valor;
                uri_ = itemunit.uri;
                const idValue = itemunit.values;

                amount_ = idValue.amount;
                currency_ = idValue.currency;


                let nuevovalor: value = {
                  amount: amount_,
                  currency: currency_,
                }

                let nuevouint: unit = {
                  //UINT 
                  id: iduint_,

                  numreq: numreq_,
                  scheme: scheme_,
                  name: name_,
                  valor: valor_,
                  value: nuevovalor,
                  uri: uri_,

                }
                const classification_ = items_.classification;
                idclasi = classification_.id;
                schemeclasi = classification_.scheme;
                descriptionclasi = classification_.description;
                uriclasi = classification_.uri;

                let nuevoclasificacion: classification = {
                  id: idclasi,
                  scheme: schemeclasi,
                  description: descriptionclasi,
                  uri: uriclasi,
                }

                let nuevo: items = {
                  id: items_.id,
                  item: items_.title,
                  description: items_.description,
                  classification: nuevoclasificacion,
                  quantity: items_.quantity,
                  unit: nuevouint,

                }
                _itemC.push(nuevo);



              });

            });
          }
          /*****************termina items *****************/

          /*****************comienza proveedores invitados ************* */
          const _invitedSuppliers: ProveedorInvitado[] = [];
          const invitedSuppliers = element.invitedSuppliers;
          let contInv = invitedSuppliers.length;

          if (contInv == 1) {

            this.planingService.getPlanningItemsinvitedSuppliers(invitedSuppliers).subscribe((resp: any) => {
              const prov_ = resp.actor;
              let proveedor: ProveedorInvitado = {
                invitedSuppliersname: prov_.name,
                id: prov_.id,

                name: prov_.name
              };
              _invitedSuppliers.push(proveedor);


            });

          }
          else {
            invitedSuppliers.forEach(d => {
              this.planingService.getPlanningItemsinvitedSuppliers(d).subscribe((resp: any) => {
                const prov_ = resp.actor;
                let proveedor: ProveedorInvitado = {
                  invitedSuppliersname: prov_.name,
                  id: prov_.id,

                  name: prov_.name
                };
                _invitedSuppliers.push(proveedor);


              });

            });


          }


          /*****************termina proveedores invitados  *****************/

          /*****************comienza cotizaciones ************* */

          const _quotes: Cotizacion_[] = [];
          const _itemCotizados: itemsCotizados[] = [];
          const _issuingSupplier: ProveedorEmisor[] = [];

          const quotes = element.quotes;
          let contquotes = quotes.length;

          if (contquotes == 1) {

            this.planingService.getPlanningItemsQuotes(quotes).subscribe((resp: any) => {
              const quotes_ = resp.quotes;

              const quo = quotes_.quo;
              let contquo = quo.length;
              if (contquo == 1) {

                this.planingService.getPlanningItemsQuo(quo).subscribe((resp: any) => {
                  const quo_ = resp.quo;
                  let cotiza: Cotizacion_ = {
                    id: quo_.id,
                    cotizadescription: quo_.description,
                    cotizadate: quo_.date,

                  };
                  _quotes.push(cotiza);
                });
              }
              else {

                quo.forEach(d => {
                  this.planingService.getPlanningItemsQuo(d).subscribe((resp: any) => {
                    const quo_ = resp.quo;
                    let cotiza: Cotizacion_ = {
                      id: quo_.id,
                      cotizadescription: quo_.description,
                      cotizadate: quo_.date,

                    };
                    _quotes.push(cotiza);
                  });

                });

              }

              ////(' recorro y obtego quotes_.cotizaciones id: ' + quotes_.cotizaciones);
              let contCiti = quotes_.cotizaciones.length;
              if (contCiti == 1) {

                this.planingService.getPlanningItemsCotizacion(quotes_.cotizaciones).subscribe((resp: any) => {
                  const cotizados_ = resp.cotizados;


                  const iCot = cotizados_.items;
                  const peri = cotizados_.period;

                  const issuingSupplier = cotizados_.issuingSupplier;


                  this.planingService.getDatosPlanningCotizaciones(iCot, peri, issuingSupplier).subscribe((resp: any) => {
                    const items_ = resp.item;

                    const itemunit = items_.unit;
                    iduint_ = itemunit.id;
                    numreq_ = itemunit.numreq;

                    scheme_ = itemunit.scheme;
                    name_ = itemunit.name;
                    valor_ = itemunit.valor;
                    uri_ = itemunit.uri;
                    const idValue = itemunit.values;

                    amount_ = idValue.amount;
                    currency_ = idValue.currency;


                    let nuevovalor: value = {
                      amount: amount_,
                      currency: currency_,
                    }

                    let nuevouint: unit = {
                      //UINT 
                      id: iduint_,

                      numreq: numreq_,
                      scheme: scheme_,
                      name: name_,
                      valor: valor_,
                      value: nuevovalor,
                      uri: uri_,

                    }
                    const classification_ = items_.classification;
                    idclasi = classification_.id;
                    schemeclasi = classification_.scheme;
                    descriptionclasi = classification_.description;
                    uriclasi = classification_.uri;


                    let nuevoclasificacion: classification = {
                      id: idclasi,
                      scheme: schemeclasi,
                      description: descriptionclasi,
                      uri: uriclasi,
                    }

                    const periodo_ = resp.periodo;
                    let per = {

                      startDate: periodo_.startDate,
                      endDate: periodo_.endDate,
                      maxExtentDate: periodo_.maxExtentDate,
                      undurationInDaysit: periodo_.durationInDays,


                    }
                    const actor_ = resp.actor;

                    let proveedor: ProveedorEmisor = {
                      Suppliersname: actor_.Suppliersname,
                      name: actor_.name,
                      id: actor_.id,


                    };


                    let nu: itemsCotizados = {

                      id: items_.id,
                      item: items_.title,
                      description: items_.description,
                      classification: nuevoclasificacion,
                      quantity: items_.quantity,
                      unit: nuevouint,
                      periodo: per,
                      proveedorEmisor: proveedor,

                    }


                    _itemCotizados.push(nu);



                  });



                  //aqui se construe el primer item                   



                });
              }
              else {
                // //(' entre varios  quotes_.cotizaciones id: '+quotes_.cotizaciones);
                quotes_.cotizaciones.forEach(d => {
                  ////(' entre d: ' + d);
                  this.planingService.getPlanningItemsCotizacion(d).subscribe((resp: any) => {
                    const cotizados_ = resp.cotizados;


                    const iTe = cotizados_.items;
                    const peri = cotizados_.period;

                    const issuingSupplier = cotizados_.issuingSupplier;
                    let contIc = iCot.length;


                    this.planingService.getDatosPlanningCotizaciones(iTe, peri, issuingSupplier).subscribe((resp: any) => {
                      const items_ = resp.item;
                      ////(' entre items_unit: ' + items_.unit.id);
                      const itemunit = items_.unit;
                      iduint_ = itemunit.id;
                      numreq_ = itemunit.numreq;

                      scheme_ = itemunit.scheme;
                      name_ = itemunit.name;
                      valor_ = itemunit.valor;
                      uri_ = itemunit.uri;
                      const idValue = itemunit.values;

                      amount_ = idValue.amount;
                      currency_ = idValue.currency;


                      let nuevovalor: value = {
                        amount: amount_,
                        currency: currency_,
                      }

                      let nuevouint: unit = {
                        //UINT 
                        id: iduint_,

                        numreq: numreq_,
                        scheme: scheme_,
                        name: name_,
                        valor: valor_,
                        value: nuevovalor,
                        uri: uri_,

                      }
                      const classification_ = items_.classification;
                      idclasi = classification_.id;
                      schemeclasi = classification_.scheme;
                      descriptionclasi = classification_.description;
                      uriclasi = classification_.uri;


                      let nuevoclasificacion: classification = {
                        id: idclasi,
                        scheme: schemeclasi,
                        description: descriptionclasi,
                        uri: uriclasi,
                      }

                      const periodo_ = resp.periodo;
                      let per = {

                        startDate: periodo_.startDate,
                        endDate: periodo_.endDate,
                        maxExtentDate: periodo_.maxExtentDate,
                        undurationInDaysit: periodo_.durationInDays,


                      }
                      const actor_ = resp.actor;

                      let proveedor: ProveedorEmisor = {
                        Suppliersname: actor_.Suppliersname,
                        name: actor_.name,
                        id: actor_.id,


                      };


                      let nu: itemsCotizados = {

                        id: items_.id,
                        item: items_.title,
                        description: items_.description,
                        classification: nuevoclasificacion,
                        quantity: items_.quantity,
                        unit: nuevouint,
                        periodo: per,
                        proveedorEmisor: proveedor,

                      }


                      _itemCotizados.push(nu);



                    });



                    //aqui se construe el primer item                   



                  });


                });

              }

            });

          }

          /*****************termina cotizaciones ************* */

          /*****************presupuesto ************* */


          //value

          this.planingService.getPlanningbudgetValue(resp.planning.budget.value).subscribe((resp: any) => {
            const value_ = resp.value;

            amountbudget_ = value_.amount;
            currencybudget_ = value_.currency;

            this.PlanningForm.patchValue({

              budgetamount: amountbudget_,//3
              budgetcurrency: currencybudget_,//4
            });
          });

          const bud_ = resp.planning.budget.budgetBreakdown;
          bud_.forEach(c => {

            this.planingService.getPlanningbudgetBreakdown(c).subscribe((resp: any) => {
              const Breakdown = resp.Breakdown;

              const budgetBreakdowndescription = Breakdown.description;
              const budgetBreakdownuri = Breakdown.uri;

              this.PlanningForm.patchValue({

                budgetBreakdowndescription: budgetBreakdowndescription,//8
                budgetBreakdownuri: budgetBreakdownuri,//11

              });

              this.planingService.getPlanningPeriodbudgetBreakdown(Breakdown.periodo).subscribe((resp: any) => {
                const per = resp.period;

                const startDate = per.startDate;
                const endDate = per.endDate;
                const maxExtentDate = per.maxExtentDate;
                const durationInDays = per.durationInDays;

                this.PlanningForm.patchValue({

                  budgetBreakdownstartDate: startDate,//12
                  budgetBreakdownendDate: endDate,//13
                  budgetBreakdownmaxExtentDate: maxExtentDate,//14
                  budgetBreakdownmaxdurationInDays: durationInDays,//15
                });
              });

              this.planingService.getPlanningbudgetBreakdownValue(Breakdown.value).subscribe((resp: any) => {
                const value_ = resp.value;

                amountbudgetBreakdown_ = value_.amount;
                currencybudgetBreakdown_ = value_.currency;
                this.PlanningForm.patchValue({

                  budgetBreakdownamount: amountbudgetBreakdown_,//9
                  budgetBreakdowncurrency: currencybudgetBreakdown_,//10
                });
              });

              this.planingService.getPlanningbudgetBreakdownbudgetLines(Breakdown.budgetLines).subscribe((resp: any) => {
                const budgetLine_ = resp.budgetLine;

                budgetLinesorigin = budgetLine_.origin;
                const components = budgetLine_.components;
                const sourceParty = budgetLine_.sourceParty;
                this.PlanningForm.patchValue({

                  budgetLinesorigin: budgetLinesorigin,//16
                });

                this.planingService.getPlanningbudgetBreakdownbudgetLinesComponets(components).subscribe((resp: any) => {
                  const Componets_ = resp.Componets;

                  const budgetLinescomponentsname = Componets_.name;
                  const budgetLinescomponentslevel = Componets_.level;
                  const budgetLinescomponentscode = Componets_.code;
                  const budgetLinescomponentsdescription = Componets_.description;

                  this.PlanningForm.patchValue({

                    budgetLinescomponentsname: budgetLinescomponentsname,//17
                    budgetLinescomponentslevel: budgetLinescomponentslevel,//18
                    budgetLinescomponentscode: budgetLinescomponentscode,//19
                    budgetLinescomponentsdescription: budgetLinescomponentsdescription,//20

                  });
                });

                this.planingService.getPlanningbudgetBreakdownbudgetLinessourceParty(sourceParty).subscribe((resp: any) => {
                  const prov_ = resp.actor;


                  this.PlanningForm.patchValue({

                    budgetBreakdownsourcePartyname: prov_.id,
                  });


                });
              });
            });
          });


          ////(' this.why: ' + this.why);

          this.planningSelect = resp.planning;

          this.PlanningForm.patchValue({
            _id,
            id,
            rationale,
            hasQuotes: this.hasQuotes,
            why: this.why,
            cotizacion_no: hasQuotes_why,
            requestingUnitname: requestingUnitname,
            responsibleUnitname: responsibleUnits,
            contractingUnitname: contractingUnits,
            budgetdescription: resp.planning.budget.description,
            budgetproject: resp.planning.budget.project,
            budgetprojectID: resp.planning.budget.projectID,
            budgeturl: resp.planning.budget.uri,
            budgeturi: resp.planning.budget.projecturi,

          });


          /*****************termina presupuesto ************* */
          /**************** inicia documentos     ************ */
          ////('Lista documentos id: '+element._id);
          const Doc_: Documento[] = [];
          const documentes_ = resp.planning.documents;

          // //('objeto documentos: '+ documentes_);
          documentes_.forEach(element => {

            this.planingService.getPlanningDocuments(element._id).subscribe((resp: any) => {
              const documento = resp.documento;
              // //(' documento '+documento);
              let doc: Documento = {
                id: documento.id,
                title: documento.title,
                Type: documento.Type,
                description: documento.description,
                url: documento.url,
                format: documento.format,
                language: documento.language,
                datePublished: documento.datePublished,
                dateModified: documento.dateModified,

              };
              Doc_.push(doc);

            });


          });

          /*****************   termina documentos   ***************** */
          /**************** inicia hitos     ************ */

          const Hito_: Hito[] = [];
          const hitos_ = resp.planning.milestones;


          hitos_.forEach(element => {
            ////(' hitos_id: ' + element._id);
            this.planingService.getPlanningHitos(element._id).subscribe((resp: any) => {
              const h = resp.hito;
              ////(' hitos: ' + h);
              let hito: Hito = {
                id: h.id,
                milestonestitle: h.title,
                milestonesType: h.Type,
                milestonesdescription: h.description,
                milestonescode: h.code,
                milestonesdueDate: h.dueDate,
                milestonesdateMet: h.dateMet,
                milestonesdateModified: h.dateModified,
                milestonesstatus: h.status,

              };
              Hito_.push(hito);

            });


          });
          /*****************   termina hitos   ***************** */
          /*****************inicia llenar listas ************* */
          this.prov_invitado.proveedoresinvitados = _invitedSuppliers;
          this.cot_cotizados.cotizaciones = _quotes;
          this.sol_cotizaciones.cotizaciones = Quotes_;
          this.items._items = _itemC;
          this.items_cotizados._itemsCotizados = _itemCotizados;
          this.documentos.documentos = Doc_;
          this.hitos.hitos = Hito_;

          //this.proveedoresEmisor= _issuingSupplier;
          /*****************termina  llenar listas ************* */
        });







      }

      if (this.planningSelect) {
        localStorage.setItem('planning_id', resp._id);
        this.botonGuardarPlaneacion = false;
        this.botonEditarPlaneacion = true;
        this.planning_id = localStorage.getItem('planning_id');




      }

    });





  }
  precibirchange(event) {
    // //("precibirchange" );
    let form: any = this.PlanningForm.value;

    //event.target.value
    let duracuion = 0;
    let fechaInicio = form.startDate;
    let fechaFin = form.endDate;
    if (fechaInicio != null && fechaFin != null && fechaInicio != "" && fechaFin != "") {
      let diff = fechaFin - fechaInicio;

      duracuion = diff / (1000 * 60 * 60 * 24);
      this.PlanningForm.patchValue({
        durationInDays: duracuion,
      });

    }

  }
  precibirchangeDesgloce(event) {
    // //("precibirchange" );
    let form: any = this.PlanningForm.value;

    //event.target.value
    let duracuion = 0;
    let fechaInicio = form.budgetBreakdownstartDate;
    let fechaFin = form.budgetBreakdownendDate;
    if (fechaInicio != null && fechaFin != null && fechaInicio != "" && fechaFin != "") {
      let diff = fechaFin - fechaInicio;
      // //("fechaFin :" +fechaFin);
      duracuion = diff / (1000 * 60 * 60 * 24);
      this.PlanningForm.patchValue({
        budgetBreakdownmaxdurationInDays: duracuion,
      });

    }

  }
  getServidorRequirientes() {
    ////('Entre getServidorRequirientes: '+this.getidentepublico);

    this.getentesreq = this.usrServ.getServidorRequiriente(this.getidentepublico).subscribe(({ total, servidores }) => {

      if (servidores.length !== 0) {
        this.servReq = servidores;

      }

    });
    // //('Entre getServidorRequirientes: '+this.servReq );
  }
  getServidorContratante() {
    // //('Entre getServidorContratante: '+this.getidentepublico);

    this.getentesreq = this.usrServ.getServidorContratante(this.getidentepublico).subscribe(
      ({ total, servidores }) => {

        if (servidores.length !== 0) {
          this.servCon = servidores;
        }

      }
    );
    // //('Entre getServidorContratante: '+this.servCon );
  }
  getServidorResponsable() {
    // //('Entre getServidorResponsable: '+this.getidentepublico);

    this.getentesreq = this.usrServ.getServidorResponsable(this.getidentepublico).subscribe(({ total, servidores }) => {

      if (servidores.length !== 0) {
        this.servRes = servidores;

      }

    });
    //  //('Entre getServidorResponsable: '+this.servRes );
  }
  getAllProveedoresParty() {
    // //(this.getidentepublico)
    this.getprovedoresParty = this.usrServ.cargarProveedores(this.getidentepublico).subscribe(({ total, proveedores }) => {

      if (proveedores.length !== 0) {
        this.proveedoresParty = proveedores;
      }

    });
  }
  /**
    * VALIDACIONES
    *
    */
  campoNoValido(campo: string) {
    if (this.PlanningForm.valid) {
      //this.inactivGuardar = false
    }
    return (
      this.PlanningForm.controls[campo].errors &&
      this.PlanningForm.controls[campo].touched
    );
  }
  /**
  * acciones
  *
  */
  hasQuotesno() {

    this.hasQuotes = "NO";
    this.why = false;

  }
  hasQuotessi() {
    this.hasQuotes = "SI";
    this.why = true;
  }
  cancel() {
    window.location.reload();
  }
  guardarPlanning() {

    this.buttonDisabled = false;
    let mensaje;
    let form: any = this.PlanningForm.value;
    ////('entre a guardar');
    //verifico que los datos obligatorios esten completos
    if (this.PlanningForm.invalid) {
      this.PlanningForm.markAllAsTouched();
      return;
    }
    //verifico que si selecciono no
    if (this)
      //verifico que las listas esten llenas
      if (
        //this.sol_cotizaciones.cotizaciones.length == 0 ||
        this.items._items.length == 0
        || this.cot_cotizados.cotizaciones.length == 0
        || this.items_cotizados._itemsCotizados.length == 0
        || this.prov_invitado.proveedoresinvitados.length == 0
        || this.documentos.documentos.length == 0
        || this.hitos.hitos.length == 0
      ) {
        //envia mensaje que las listas estan vacias
        if (this.sol_cotizaciones.cotizaciones.length == 0) {
          this.sol_cotizaciones.cotForm.markAllAsTouched();
          mensaje = "DEBE AGREGAR POR LO MENOS UNA SOLICITUD DE COTIZACIÓN";
        }
        else if (this.items._items.length == 0) {
          this.items.itemsForm.markAllAsTouched();
          mensaje = "DEBE AGREGAR POR LO MENOS UN ITEM A SER COTIZADOS";
        }
        else if (this.cot_cotizados.cotizaciones.length == 0) {
          this.cot_cotizados.cotForm.markAllAsTouched();
          mensaje = "DEBE AGREGAR POR LO MENOS UNA COTIZACIÓN";
        }
        else if (this.items_cotizados._itemsCotizados.length == 0) {
          this.items_cotizados.itemsForm.markAllAsTouched();
          mensaje = "DEBE AGREGAR POR LO MENOS UN ITEM COTIZADO";
        }
        else if (this.prov_invitado.proveedoresinvitados.length == 0) {
          this.prov_invitado.FormProvInv.markAllAsTouched();
          mensaje = "DEBE AGREGAR POR LO MENOS UN PROVEEDOR INVITADO";
        }
        else if (this.documentos.documentos.length == 0) {
          this.documentos.docForm.markAllAsTouched();
          mensaje = "DEBE AGREGAR POR LO MENOS UN DOCUMENTO";
        }
        else if (this.hitos.hitos.length == 0) {
          this.hitos.hitosForm.markAllAsTouched();
          mensaje = "DEBE AGREGAR POR LO MENOS UN HITO";
        }
        Swal.fire({

          icon: 'error',
          title: "<h5 style='color:#125DA9; font-size: 20px !important;'> NO SE PUEDE GUARDAR LA PLANEACIÓN </h5>",
          text: mensaje,
          confirmButtonText: "ACEPTAR",
          confirmButtonColor: '#125DA9',
          showConfirmButton: true,
          //timer: 1500
        })
        return;
      }

    let _requesting = this.servReq.find(item => item.uid == form.requestingUnitname);

    let namerequesting;
    if (_requesting.segundo_apellido_servidor != null)
      namerequesting = _requesting.nombres_servidor + " " + _requesting.primer_apellido_servidor + " " + _requesting.segundo_apellido_servidor;
    else
      namerequesting = _requesting.nombres_servidor + " " + _requesting.primer_apellido_servidor;

    let requesting = {
      id: form.requestingUnitname,
      name: namerequesting,
    }
    let _responsible = this.servRes.find(item => item.uid == form.responsibleUnitname);
    let nameresponsible;
    if (_responsible.segundo_apellido_servidor != null)
      nameresponsible = _responsible.nombres_servidor + " " + _responsible.primer_apellido_servidor + " " + _responsible.segundo_apellido_servidor;
    else
      nameresponsible = _responsible.nombres_servidor + " " + _responsible.primer_apellido_servidor;


    let responsible = {
      id: form.responsibleUnitname,
      name: nameresponsible,
    }
    let _contracting = this.servCon.find(item => item.uid == form.contractingUnitname);

    let namecontracting;
    if (_contracting.segundo_apellido_servidor != null)
      namecontracting = _contracting.nombres_servidor + " " + _contracting.primer_apellido_servidor + " " + _contracting.segundo_apellido_servidor;
    else
      namecontracting = _contracting.nombres_servidor + " " + _contracting.primer_apellido_servidor;


    let contracting = {
      id: form.contractingUnitname,
      name: namecontracting,
    }

    let periodo = {

      startDate: form.startDate,
      endDate: form.endDate,
      maxExtentDate: form.maxExtentDate,
      durationInDays: form.durationInDays,


    }
    let quotes = {

      quo: this.cot_cotizados.cotizaciones,
      cotizaciones: this.items_cotizados._itemsCotizados,

    }
    let requestForQuotes = {
      id: this.ocid,
      quotes_: this.sol_cotizaciones.cotizaciones,
      period: periodo,
      items: this.items._items,
      invitedSuppliers: this.prov_invitado.proveedoresinvitados,
      quotes: quotes,

    }
    let Breakdownvalue = {
      //valor
      amount: form.budgetBreakdownamount,
      currency: form.budgetBreakdowncurrency,

    }
    let Breakdownperiodo = {

      startDate: form.budgetBreakdownstartDate,
      endDate: form.budgetBreakdownendDate,
      maxExtentDate: form.budgetBreakdownmaxExtentDate,
      durationInDays: form.budgetBreakdownmaxdurationInDays,


    }
    let BreakdownComponent = {

      name: form.budgetLinescomponentsname,
      level: form.budgetLinescomponentslevel,
      code: form.budgetLinescomponentscode,
      description: form.budgetLinescomponentsdescription,


    }
    let sourcePartyname = this.proveedoresParty.find(item => item.uid == form.budgetBreakdownsourcePartyname);


    let BreakdownsourceParty = {
      id: form.budgetBreakdownsourcePartyname,
      name: sourcePartyname.razonsocialProv,



    }

    let BreakdownLines = {

      origin: form.budgetLinesorigin,
      components: BreakdownComponent,
      sourceParty: BreakdownsourceParty,

    }

    let budgetBreakdown = {
      //valor
      id: this.ocid,
      description: form.budgetBreakdowndescription,
      ocid: this.ocid,
      value: Breakdownvalue,
      uri: form.budgetBreakdownuri,
      periodo: Breakdownperiodo,
      budgetLines: BreakdownLines,

    }
    let value = {
      //valor
      amount: form.budgetamount,
      currency: form.budgetcurrency,

    }
    ////('requesting:'+requesting);
    let budget = {
      id: this.ocid,
      description: form.budgetdescription,
      uri: form.budgeturl,
      ocid: this.ocid,
      value: value,
      project: form.budgetproject,
      projectID: form.budgetprojectID,
      projecturi: form.budgeturi,
      budgetBreakdown: budgetBreakdown,

    }
    let hasq;
    if (form.hasQuotes == 'SI') {
      hasq = true;
    }
    else {
      hasq = false;
    }

    let _newPlanning = {
      id: this.ocid,
      rationale: form.rationale,
      //hasQuotes: form.hasQuotes,
      hasQuotes: hasq,
      hasQuotes_why: form.cotizacion_no,
      requestingUnits: requesting,
      responsibleUnits: responsible,
      contractingUnits: contracting,
      requestForQuotes: requestForQuotes,
      //falta presupuesto
      budget: budget,
      documents: this.documentos.documentos,
      milestones: this.hitos.hitos,
    }




    // aqui se esta guardando el formulario en la api (backend)
    this.planingService.CrearPlanning(_newPlanning)
      .subscribe((resp: any) => {
        if (resp.ok) {

          this.botonEditarPlaneacion = true;
          this.botonGuardarPlaneacion = false;
          let planning_id = localStorage.getItem("planning_id")
          let buyer_id = localStorage.getItem("buyer_id") || this.buyer_id;

          const data = {
            buyer: buyer_id,
            planning: planning_id
          }


          this.tenderSvc.actulizarRelease(data, this.ocid).subscribe((resp: any) => {


            Swal.fire({
              icon: 'success',
              title: "<h5 style='color:#125DA9; font-size: 20px !important;'> PLANEACIÓN  </h5>",
              text: "SE HA GUARDADO LA PLANEACIÓN CON ÉXITO ",
              confirmButtonText: "ACEPTAR",
              confirmButtonColor: '#125DA9',
              showConfirmButton: true,
              //timer: 1500
            })
            this.router.navigate(['/sea/funcionarios/inicio-contrato'])
            localStorage.removeItem("planning_id")
            localStorage.removeItem("buyer_id")
          })


        }

        {
          //  SI ES EDICIÓN

          Swal.fire({
            icon: 'success',
            title: "<h5 style='color:#125DA9; font-size: 20px !important;'> PLANEACIÓN  </h5>",
            text: "SE HA EDITADO LA PLANEACIÓN CON ÉXITO ",
            confirmButtonText: "ACEPTAR",
            confirmButtonColor: '#125DA9',
            showConfirmButton: true,
            //timer: 1500

          })
          this.router.navigate(['/sea/funcionarios/inicio-contrato'])
          localStorage.removeItem("planning_id")
          localStorage.removeItem("buyer_id")

        }
      })



  }
}
