import Swal from 'sweetalert2';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { PlaningService } from '../../../../../../services/pages/planing.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { catchError, debounceTime, distinctUntilChanged, filter, map, of, Subject, switchMap } from 'rxjs';
import { Paises } from '../../../../../../interfaces/paises.inteface';
import { partidas } from '../../../../../../interfaces/partidas.inteface';
import { Municipios } from '../../../../../../interfaces/municipios.inteface';
import { Estados } from '../../../../../../interfaces/estados.inteface';
import { Esquemas } from '../../../../../../interfaces/esquemas.inteface';
import { Cucop } from '../../../../../../interfaces/cucop.inteface';
import { Proveedores } from 'src/app/models/Entes/proveedores.model';
import { ServidoresEnte } from 'src/app/models/Entes/servidores.model';

//importa los servicios que coectan la bd
import { UsuarioService } from '../../../../../../services/auth/usuario.service';
import { ContractService } from 'src/app/services/pages/contract.service';

//DECLARACION DE LOS COMPONENTES DE LAS LISTAS
import { DocumentosContratoComponent } from '../partial/documentos-contrato/documentos-contrato.component';
import { DocContratoComponent } from '../partial/doc-contrato/doc-contrato.component';
import { HitosContratoComponent } from '../partial/hitos-contrato/hitos-contrato.component';
import { HitosDelContratoComponent } from '../partial/hitos-del-contrato/hitos-del-contrato.component';
import { CodigosPostales } from 'src/app/models/Entes/codigos.model';
import { LicitationService } from 'src/app/services/pages/licitation.service';


interface Generic {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  @ViewChild(DocumentosContratoComponent) doc;
  @ViewChild(DocContratoComponent) documentos;
  @ViewChild(HitosContratoComponent) hitos;
  @ViewChild(HitosDelContratoComponent) hitosdel;

  itemsDesc: Generic[] = [
    { value: '1', viewValue: 'BIENES' },
    { value: '2', viewValue: 'SERVICIOS', },
    { value: '3', viewValue: 'OBRA PÚBLICA' },
  ];
  awardsStatus: Generic[] = [
    { value: 'PENDIENTE', viewValue: 'PENDIENTE' },
    { value: 'ACTIVO', viewValue: 'ACTIVO' },
    { value: 'CANCELADO', viewValue: 'CANCELADO' },
    { value: 'SIN ÉXITO', viewValue: 'SIN ÉXITO' },
  ];
  implementations: Generic[] = [
    { value: 'TRANSFERENCIA', viewValue: 'TRANSFERENCIA' },
    { value: 'DEPOSITO', viewValue: 'DEPOSITO' },
    { value: 'EFECTIVO', viewValue: 'EFECTIVO' },
  ];
  paymentMethod: Generic[] = [
    { value: 'TRANSFERENCIA', viewValue: 'TRANSFERENCIA' },
    { value: 'DEPOSITO', viewValue: 'DEPÓSITO' },
    { value: 'EFECTIVO', viewValue: 'EFECTIVO' },
  ];
  contrataMethod: Generic[] = [
    { value: 'ABIERTA', viewValue: 'ABIERTA' },
    { value: 'SELECTIVA', viewValue: 'SELECTIVA' },
    { value: 'LIMITADA', viewValue: 'LIMITADA' },
    { value: 'DIRECTA', viewValue: 'DIRECTA' },
  ];
  format: Generic[] = [
    { value: 'plaintext', viewValue: 'PLAIN TEXT' },
    { value: 'xml', viewValue: 'XML' },
    { value: 'html', viewValue: 'HTML' },
    { value: 'application/pdf', viewValue: 'PDF' },
  ];
  procurementMethod: Generic[] = [
    { value: 'direct', viewValue: 'ADJUDICACIÓN DIRECTA' },
    { value: 'open', viewValue: 'LICITACIÓN PÚBLICA' },
    { value: 'selective', viewValue: 'INVITACIÓN RESTRINGIDA A CUANDO MENOS 3 PROVEEDORES' },
  ];
  categoria: Generic[] = [
    { value: '1', viewValue: 'BIENES Y PROVISIONES' },
    { value: '2', viewValue: 'OBRAS' },
    { value: '3', viewValue: 'SERVICIOS' },
  ];
  relationship: Generic[] = [
    { value: '1', viewValue: 'PRIMERA ETAPA DE UN ACUERDO MARCO' },
    { value: '2', viewValue: 'PROCESO DE PLANEACIÓN' },
    { value: '3', viewValue: 'CONTRATO PRINCIPAL (PARA SUB CONTRATOS)' },
    { value: '4', viewValue: 'PROCESO PREVIO' },
    { value: '5', viewValue: 'PROCESO SIN ÉXITO' },
    { value: '6', viewValue: 'SUB CONTRATO' },
    { value: '7', viewValue: 'PROCESO DE REEMPLAZO' },
    { value: '8', viewValue: 'PROCESO DE RENOVACIÓN' },
  ];
  awardCriteria: Generic[] = [
    { value: 'priceOnly', viewValue: 'SÓLO PRECIO' },
    { value: 'costOnly', viewValue: 'ÚNICAMENTE COSTO' },
    { value: 'qualityOnly', viewValue: 'ÚNICAMENTE CALIDAD' },
    { value: 'ratedCriteria', viewValue: 'CRITERIOS CALIFICADOS' },
    { value: 'lowestCost', viewValue: 'COSTO MÁS BAJO' },
    { value: 'bestProposal', viewValue: 'MEJOR PROPUESTA' },
    { value: 'bestValueToGovernment', viewValue: 'MEJOR VALOR PARA EL GOBIERNO' },
    { value: 'singleBidOnly', viewValue: 'OFERTA ÚNICA SOLAMENTE' },
  ];
  submissionMethod: Generic[] = [
    { value: 'electronicSubmission', viewValue: 'PRESENTACIÓN ELECTRÓNICA' },
    { value: 'electronicAuction', viewValue: 'SUBASTA ELECTRÓNICA' },
    { value: 'written', viewValue: 'ESCRITA' },
    { value: 'inPerson', viewValue: 'EN PERSONA' },
  ];
  items: Generic[] = [
    { value: '1', viewValue: 'BIENES' },
    { value: '2', viewValue: 'SERVICIOS', },
    { value: '3', viewValue: 'OBRA PÚBLICA' },
  ];
  schemes: Generic[] = [
    { value: '1', viewValue: 'HORA' },
    { value: '2', viewValue: 'PIEZA', },
    { value: '3', viewValue: 'KILOGRAMOS' },
  ];
  monedas: Generic[] = [
    { value: 'MXN', viewValue: 'PESO MEXÍCANO (MXM)' },
    { value: 'USD', viewValue: 'DOLAR ESTADUNIDENSE (USD)' },
    { value: 'EUR', viewValue: 'EURO (EUR)' },
  ];
  Mechanisms: Generic[] = [
    { value: '1', viewValue: 'PLAN DE ADQUISICIONES' },
    { value: '2', viewValue: 'ESTUDIO DE FACTIBILIDAD' },
    { value: '3', viewValue: 'ESTUDIOS DE IMPACTO URBANO Y AMBIENTAL' },
    { value: '4', viewValue: 'EVALUACIÓN DE LOS ACTIVOS Y RESPONSABILIDADES DEL GOBIERNO' },
    { value: '5', viewValue: 'JUSTIFICACIÓN DE LA CONTRATACIÓN' },
    { value: '6', viewValue: 'PLAN DE PROYECTO' },
    { value: '7', viewValue: 'PROYECTO DE CONVOCATORIA' },
    { value: '8', viewValue: 'REQUISICIÓN' },
    { value: '9', viewValue: 'CLÁUSULAS PARA EL MANEJO DE RIESGOS Y RESPONSABILIDADES' },
  ];
  tipodoc: Generic[] = [
    { value: '1', viewValue: 'PLAN DE ADQUISICIONES' },
    { value: '2', viewValue: 'ESTUDIO DE FACTIBILIDAD' },
    { value: '3', viewValue: 'ESTUDIOS DE IMPACTO URBANO Y AMBIENTAL' },
    { value: '4', viewValue: 'EVALUACIÓN DE LOS ACTIVOS Y RESPONSABILIDADES DEL GOBIERNO' },
    { value: '5', viewValue: 'JUSTIFICACIÓN DE LA CONTRATACIÓN' },
    { value: '6', viewValue: 'PLAN DE PROYECTO' },
    { value: '7', viewValue: 'PROYECTO DE CONVOCATORIA' },
    { value: '8', viewValue: 'REQUISICIÓN' },
    { value: '9', viewValue: 'CLÁUSULAS PARA EL MANEJO DE RIESGOS Y RESPONSABILIDADES' },
  ];
  tipoHito: Generic[] = [
    { value: '1', viewValue: 'AVISO A LA POBLACIÓN' },
    { value: '2', viewValue: 'APROBACIÓN' },
    { value: '3', viewValue: 'ENTREGA' },
    { value: '4', viewValue: 'EVALUACIÓN' },
    { value: '1', viewValue: 'FINANCIAMIENTO' },
    { value: '2', viewValue: 'INVOLUCRAMIENTO' },
    { value: '3', viewValue: 'REPORTE' },
    { value: '4', viewValue: 'CONTRATACIÓN' },
  ];
  status: Generic[] = [
    { value: "scheduled", viewValue: 'PROGRAMADO' },
    { value: "met", viewValue: 'CUMPLIDO' },
    { value: "notMet", viewValue: 'NO CUMPLIDO' },
    { value: "partiallyMet", viewValue: 'PARCIALMENTE CUMPLIDO' },
  ];
  lenguajes: Generic[] = [
    { value: "ES", viewValue: 'ESPAÑOL' },
    { value: "EN", viewValue: 'INGLES' },
    { value: "PT", viewValue: 'PORTUGUES' },
    { value: "FR", viewValue: 'FRANCES' },
    { value: "IT", viewValue: 'ITALIANO' },
    { value: "RU", viewValue: 'RUSO' },
    { value: "ZH", viewValue: 'CHINO' },
    { value: "JA", viewValue: 'JAPONES' },
    { value: "OTRO", viewValue: 'OTRO' },
  ];
  public arraypartidas: partidas[] = [];
  public arrayPais: Paises[] = [];
  public btnActualizar: boolean = false
  public btnActualizar2: boolean = false
  public btnActualizar3: boolean = false
  public btnActualizar4: boolean = false
  public botonCotizacion = true;
  public botonGuardarContrato = true;
  public botonEditarContrato = false;
  public botonItems = true;
  public botonLicitante = true;
  public botonProveedoresInvitado = true;
  public botonCotizaciones = true;
  public botonItemCotizados = true;
  public botonDocuments = true;
  public botonHito = true;
  public arrayEstado: Estados[] = [];
  public arrayMunicipio: Municipios[] = [];
  public search: string = '';
  public searchE: string = '';
  public searchEstado: string = '';

  public ocid: string;

  public ArrayCucop: Cucop[] = [];
  public ArrayCucop2: Cucop[] = [];
  public Cucop: Cucop;

  public ArrayEsquema: Esquemas[] = [];
  public ArrayEsquema2: Esquemas[] = [];
  public Esquema: Esquemas;

  public proveedoresguarantor: Proveedores[] = [];
  public getprovedoresguarantor: any;
  public getRol = '';
  public getNombres = '';
  public getIdUsuario = '';
  public getidentepublico = '';

  public servpayer: ServidoresEnte[] = [];
  public getservpayer: any;

  public servpayee: ServidoresEnte[] = [];
  public getservpayee: any;

  public proveedorespayee: Proveedores[] = [];
  public getprovedorespayee: any;


  private debouncerCucop = new Subject<string>()
  private debouncerColonia = new Subject<string>()
  public _codigosEnte: CodigosPostales[] = [];

  ContratoForm = this.fb.group({

    contractstitle: ['', [Validators.required]],
    contractsdescription: ['', [Validators.required]],
    contractsstatus: ['', [Validators.required]],

    startDate: [null, [Validators.required]],
    endDate: [null, [Validators.required]],
    maxExtentDate: [null, [Validators.required]],
    durationInDays: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]],

    //VALUE
    amount: [null, [Validators.required, Validators.pattern(/^-?\d*[.,]?\d{0,2}$/)]],
    amountNet: [null, [Validators.required, Validators.pattern(/^-?\d*[.,]?\d{0,2}$/)]],
    currency: [null, [Validators.required]],
    exchangeRatesrate: [null, [Validators.required]],
    exchangeRatescurrency: [null, [Validators.required]],
    exchangeRatesdate: [null, [Validators.required]],
    exchangeRatessource: [null, [Validators.required]],

    title: [null, [Validators.required]],
    description: ['', [Validators.required]],

    clasifscheme: ['', [Validators.required]],
    clasifdescription: [null, [Validators.required]],
    clasifuri: [null, [Validators.required]],
    clasifquantity: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]],

    //UINT 
    uintscant: [, Validators.pattern(/^[0-9]+$/)],
    uintscheme: [null, [Validators.required]],
    unitname: [null, [Validators.required]],
    uintvalor: [null, [Validators.required]],
    uintamount: [null, [Validators.required, Validators.pattern(/^-?\d*[.,]?\d{0,2}$/)]],
    uintcurrency: [null, [Validators.required]],
    uinturi: [null, [Validators.required]],

    //LUGAR DE ENTREGA

    DeliveryLocationgeometrytype: [null, [Validators.required]],
    deliveryLocationgeometrycoordinates: [null, [Validators.required]],
    deliveryLocationgazetteerscheme: [null, [Validators.required]],
    gazetteeridentifiers: [null, [Validators.required]],
    gazetteerdescription: [null, [Validators.required]],
    gazetteeruri: [null, [Validators.required]],

    //LUGAR QUE SE ENCUENTRA
    lugar: ['MÉXICO'],
    countryName: [{ value: 'MÉXICO', disabled: true }, [Validators.required]],
    postalCode: [null, [Validators.required]],
    colonia: [null, [Validators.required]],
    deliveryAddresslocality: [null, [Validators.required]],
    deliveryAddressregion: [null, [Validators.required]],
    numero: [null, [Validators.required]],
    street: [null, [Validators.required]],

    surveillanceMechanisms: [null, [Validators.required]],
    dateSigned: [null, [Validators.required]],

    //garantias
    guaranteestype: [null, [Validators.required]],
    guaranteesDate: [null, [Validators.required]],
    guaranteesobligations: [null, [Validators.required]],
    guaranteesamount: [null, [Validators.required, Validators.pattern(/^-?\d*[.,]?\d{0,2}$/)]],
    guaranteescurrency: [null, [Validators.required]],
    guarantorname: ['', [Validators.required]],
    guarantorstartDate: [null, [Validators.required]],
    guarantorendDate: [null, [Validators.required]],
    guarantormaxExtentDate: [null, [Validators.required]],
    guarantordurationInDays: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]],

    implementationsstatus: ['', [Validators.required]],
    transactionssource: ['', [Validators.required]],
    transactionspaymentMethod: ['', [Validators.required]],
    transactionsdate: ['', [Validators.required]],
    transactionsamount: ['', [Validators.required, Validators.pattern(/^-?\d*[.,]?\d{0,2}$/)]],
    transactionscurrency: ['', [Validators.required]],
    payername: ['', [Validators.required]],
    payeename: ['', [Validators.required]],
    transactionsuri: ['', [Validators.required]],

    relatedProcessesrelationship: ['', [Validators.required]],
    relatedProcessestitle: ['', [Validators.required]],
    relatedProcessesuri: ['', [Validators.required]],

    //modificacion
    amendmentsdate: [null, [Validators.required]],
    amendmentsrationale: [null, [Validators.required]],
    amendmentsid: [null, [Validators.required]],
    amendmentsdescription: [null, [Validators.required]],
    amendsReleaseID: [null, [Validators.required]],
    releaseID: [null, [Validators.required]],

    /*************************** */




  })

  /**
    * INICIALIZACIONES
    *
    */
  constructor(
    private usrServ: UsuarioService,
    private fb: UntypedFormBuilder,
    private contractService: ContractService,
    private activateRute: ActivatedRoute,
    private router: Router,
    private tenderSvc: LicitationService,
  ) {

    this.activateRute.params.subscribe(({ ocid }) => {
      this.ocid = ocid;
      this.getNombres = usrServ.usuario.getNombres;
      this.getIdUsuario = usrServ.usuario.getUid;
      this.getidentepublico = usrServ.usuario.getid_ente_publico.ente_id;
      this.getRol = usrServ.usuario.getRol;
    })
  }

  ngOnInit(): void {

    this.getAllCucop();
    this.getAllEsquemas();
    this.getAllProveedoresguarantor();
    this.getAllServidores();
    this.getAllProveedorespayee();
    this.setupDebouncerItem();
    this.setupDebouncerColonia();
    this.setPaisLugarEnte();
    this.setPaisLugarProvedor();

  }

  private setupDebouncerItem() {
    this.debouncerCucop
      .pipe(
        debounceTime(500), // Aumenta el tiempo de debounce para reducir la carga
        distinctUntilChanged(), // Evita consultas duplicadas
        switchMap((searchTerm: string) => {
          this.ContratoForm.patchValue({ clasifdescription: '' });
          return this.usrServ.getDescripcionCucop(searchTerm).pipe(
            catchError((error) => {
              console.error('Error al obtener datos de Cucop:', error);
              return of({ data: [] }); // Retorna un array vacío en caso de error
            })
          );
        })
      )
      .subscribe((resp: any) => {
        this.ArrayCucop = resp.data;
        ////(this.ArrayCucop);
        if (this.ArrayCucop.length === 1) {
          const data = this.ArrayCucop[0];
          this.ContratoForm.patchValue({
            clasifscheme: data.CLAVECUCoP,
            clasifdescription: data.DESCRIPCION,
            clasifquantity: data.PARTIDAGENERICA,
          });
        }
      });
  }
  private setupDebouncerColonia() {
    this.debouncerColonia
      .pipe(
        debounceTime(300),
        filter(searchTerm => searchTerm.length === 5),
        switchMap(searchTerm => this.usrServ.listaCodigoPostal(searchTerm))
      )
      .subscribe((resp: any) => {
        this._codigosEnte = resp.data;
        ////(this._codigosEnte);
        if (this._codigosEnte.length === 1) {
          const data = this._codigosEnte[0];
          this.ContratoForm.patchValue({
            colonia: data.colonia,
            pais: 'MEXICO',
          });
        }
      });
  }

  private setPaisLugarEnte() {
    this.ContratoForm.get('lugar')?.valueChanges.subscribe(value => {
      const paisControl = this.ContratoForm.get('pais');
      if (value === 'EXTRANJERO') {
        paisControl?.enable();
      } else {
        paisControl?.setValue('MÉXICO');
        paisControl?.disable();
      }
    });
  }

  private setPaisLugarProvedor() {
    this.ContratoForm.get('lugar')?.valueChanges.subscribe(value => {
      const paisControl = this.ContratoForm.get('countryName');
      if (value === 'EXTRANJERO') {
        paisControl?.enable();
      } else {
        paisControl?.setValue('MÉXICO');
        paisControl?.disable();
      }
    });
  }

  cargaColonias(searchTerm: string): Subject<string> {
    this.debouncerColonia.next(searchTerm);
    return this.debouncerColonia;
  }

  /**
    * VALIDACIONES
    *
    */
  campoNoValido(campo: string) {
    if (this.ContratoForm.valid) {
    }
    return (
      this.ContratoForm.controls[campo].errors &&
      this.ContratoForm.controls[campo].touched
    );


  }
  getPais() {
    this.usrServ
      .listaPaises(this.ContratoForm.value.countryName)
      .subscribe((resp: any) => {
        this.arrayPais = resp.data;
      });
  }
  getEstados() {
    // //("entre getEstados:"+this.ContratoForm.value.deliveryAddressregion);
    this.usrServ
      .listaEstados(this.ContratoForm.value.deliveryAddressregion)
      .subscribe((resp: any) => {
        this.arrayEstado = resp.data;
      });
    ////("entre getEstados:"+this.arrayEstado);
  }

  onChangeEstado() {
    // //("entre:"+this.ContratoForm.value.deliveryAddressregion);
    this.usrServ
      .listaMunicipiosdeEstado(this.ContratoForm.value.deliveryAddressregion)
      .subscribe((resp: any) => {
        this.arrayMunicipio = resp.data;
      });
  }
  cancel() {
    window.location.reload();
  }
  getAllCucop() {

    this.usrServ
      .listaAllCucop()
      .subscribe((resp: any) => {
        this.ArrayCucop2 = resp.data;
      });

  }

  getCucop() {
    ////("entre getCucop :" + this.ContratoForm.value.clasifscheme);
    const valor = this.ContratoForm.value.clasifscheme;
    if (valor.length > 5) {
      this.usrServ
        .listaCucop(this.ContratoForm.value.clasifscheme)
        .subscribe((resp: any) => {
          this.ArrayCucop = resp.data;
        });

    }

  }

  onChangeCucopBuscar() {
    //("entre buscar onChangeCucopBuscar: " + this.ContratoForm.value.clasifscheme);
    const valor = this.ContratoForm.value.clasifscheme;
    if (valor.length > 5) {
      this.ArrayCucop = this.ArrayCucop2
        .filter(({ DESCRIPCION }) => DESCRIPCION.includes(valor.toUpperCase()));

    }


  }

  getAllEsquemas() {

    this.usrServ
      .listaAllEsquema()
      .subscribe((resp: any) => {
        this.ArrayEsquema2 = resp.data;
      });

  }
  onChangeEsquemaBuscar() {
    //("entre buscar onChangeCucopBuscar: " + this.ContratoForm.value.uintscheme);
    const valor = this.ContratoForm.value.uintscheme;
    if (valor.length > 3) {
      this.ArrayEsquema = this.ArrayEsquema2.filter(({ esquema }) => esquema.includes(valor.toUpperCase()));

    }


  }
  getAllProveedoresguarantor() {


    this.getprovedoresguarantor = this.usrServ.cargarProveedores(this.getidentepublico).subscribe(({ total, proveedores }) => {

      if (proveedores.length !== 0) {
        this.proveedoresguarantor = proveedores;
      }

    });
  }
  getAllServidores() {
    // //('Entre getServidorContratante: '+this.getidentepublico);

    this.getservpayer = this.usrServ.cargarServidores(this.getidentepublico).subscribe(({ total, servidores }) => {

      if (servidores.length !== 0) {
        this.servpayer = servidores;
        this.servpayee = servidores;

      }

    });
    // //('Entre getServidorContratante: '+this.servCon );
  }
  getAllProveedorespayee() {


    this.getprovedorespayee = this.usrServ.cargarProveedores(this.getidentepublico).subscribe(({ total, proveedores }) => {

      if (proveedores.length !== 0) {
        this.proveedorespayee = proveedores;
      }

    });
  }
  guardarContrato() {
    let mensaje;
    let form: any = this.ContratoForm.value;
    //('entre a guardar');
    //verifico que los datos obligatorios esten completos
    if (this.ContratoForm.invalid) {
      this.ContratoForm.markAllAsTouched();
      return;
    }
    //verifico que las listas esten llenas
    if (
      this.documentos.documentos.length == 0
      || this.hitos.hitos.length == 0
      || this.doc.documentos.length == 0
      || this.hitosdel.hitos.length == 0
    ) {
      //envia mensaje que las listas estan vacias
      if (this.documentos.documentos.length == 0) {
        this.documentos.docForm.markAllAsTouched();
        mensaje = "DEBE AGREGAR POR LO MENOS UN DOCUMENTO DE GARANTIA";
      }
      else if (this.doc.documentos.length == 0) {
        this.doc.docForm.markAllAsTouched();
        mensaje = "DEBE AGREGAR POR LO MENOS UN DOCUMENTO DE LA EJECUCIÓN";
      }
      else if (this.hitos.hitos.length == 0) {
        this.hitos.hitosForm.markAllAsTouched();
        mensaje = "DEBE AGREGAR POR LO MENOS UN HITO DE LA EJECUCIÓN";
      }
      else if (this.hitosdel.hitos.length == 0) {
        this.hitosdel.hitosForm.markAllAsTouched();
        mensaje = "DEBE AGREGAR POR LO MENOS UN HITO DEL CONTRATO";
      }

      Swal.fire({

        icon: 'error',
        title: "<h5 style='color:#125DA9; font-size: 20px !important;'> NO SE PUEDE GUARDAR LA ADJUDICACIÓN </h5>",
        text: mensaje,
        confirmButtonText: "ACEPTAR",
        confirmButtonColor: '#125DA9',
        showConfirmButton: true,
        //timer: 1500
      })
      return;
    }

    let value = {
      //valor
      amount: form.amount,
      currency: form.currency,
      amountNet: form.amountNet,
    }


    let exchangeRates = {


      exchangeRatesrate: form.exchangeRatesrate,
      exchangeRatescurrency: form.exchangeRatescurrency,
      exchangeRatesdate: form.exchangeRatesdate,
      exchangeRatessource: form.exchangeRatessource,


    }
    let contractPeriod = {

      startDate: form.startDate,
      endDate: form.endDate,
      maxExtentDate: form.maxExtentDate,
      durationInDays: form.durationInDays,
      exchangeRates: exchangeRates,


    }
    let valueitem = {
      //valor
      amount: form.uintamount,
      currency: form.uintcurrency,

    }
    let unit = {
      //UINT 

      id: this.ocid,//este siempre se manda
      numreq: form.uintscant,
      scheme: form.uintscheme,
      name: form.unitname,
      valor: form.uintvalor,
      value: valueitem,
      uri: form.uinturi,

    }
    let classification = {

      //CLASIFICACION
      id: this.ocid,//este siempre se manda
      scheme: form.clasifscheme,
      description: form.clasifdescription,
      uri: form.clasifuri,

    }
    let deliveryLocation = {

      //CLASIFICACION
      id: this.ocid,//este siempre se manda
      geometrytype: form.DeliveryLocationgeometrytype,
      geometrycoordinates: form.deliveryLocationgeometrycoordinates,
      gazetteerscheme: form.deliveryLocationgazetteerscheme,
      gazetteeridentifiers: form.gazetteeridentifiers,
      gazetteerdescription: form.gazetteerdescription,
      gazetteeruri: form.gazetteeruri,
    }

    let deliveryAddress = {
      lugar: form.lugar,
      colonia: form.colonia,
      street: form.street,
      numero: form.numero,

      streetAddress: form.street + ' ' + form.numero,
      locality: form.deliveryAddresslocality,
      region: form.deliveryAddressregion,
      postalCode: form.postalCode,
      countryName: form.countryName,

    }

    let items = {
      //item
      id: this.ocid,//este siempre se manda
      item: form.title,
      description: form.description,
      classification: classification,
      quantity: form.clasifquantity,
      unit: unit,
      deliveryLocation: deliveryLocation,
      deliveryAddress: deliveryAddress,
    }
    let guaranteesvalueitem = {
      //valor
      amount: form.guaranteesamount,
      currency: form.guaranteescurrency,

    }
    let _guarantor = this.proveedoresguarantor.find(item => item.uid == form.guarantorname);


    let guarantor = {
      id: form.guarantorname,
      name: _guarantor.razonsocialProv,
    }
    let guaranteesPeriod = {

      startDate: form.guarantorstartDate,
      endDate: form.guarantorendDate,
      maxExtentDate: form.guarantormaxExtentDate,
      durationInDays: form.guarantordurationInDays,
    }
    let guarantees = {

      guaranteestype: form.guaranteestype,
      guaranteesDate: form.guaranteesDate,
      guaranteesobligations: form.guaranteesobligations,
      value: guaranteesvalueitem,
      guarantor: guarantor,
      period: guaranteesPeriod,

    }
    let transactionsvalue = {
      //valor
      amount: form.transactionsamount,
      currency: form.transactionscurrency,

    }

    let _payer = this.servpayer.find(item => item.uid == form.payername);

    let namecontracting;
    if (_payer.segundo_apellido_servidor != null)
      namecontracting = _payer.nombres_servidor + " " + _payer.primer_apellido_servidor + " " + _payer.segundo_apellido_servidor;
    else
      namecontracting = _payer.nombres_servidor + " " + _payer.primer_apellido_servidor;

    let payer = {
      id: form.payername,
      name: namecontracting,
    }

    let _payee = this.proveedorespayee.find(item => item.uid == form.payeename);

    let payee = {
      id: form.suppliersid,
      name: _payee.razonsocialProv,
      identificador: form.suppliersidentificador,
    }
    let transactions = {

      source: form.transactionssource,
      paymentMethod: form.transactionspaymentMethod,
      date: form.transactionsdate,
      value: transactionsvalue,
      payer: payer,
      payee: payee,
      uri: form.transactionsuri,
    }
    let implementation = {
      status: form.implementationsstatus,
      transactions: transactions,
      milestones: this.hitos.hitos,
      documents: this.doc.documentos,
    }
    let relatedProcesses = {
      relatedProcessesrelationship: form.relatedProcessesrelationship,
      //relatedProcessesscheme
      //relatedProcessesidentifier
      relatedProcessestitle: form.relatedProcessestitle,
      relatedProcessesuri: form.relatedProcessesuri,

    }
    let amendments = {
      date: form.amendmentsdate,
      rationale: form.amendmentsrationale,
      id: form.amendmentsid,
      description: form.amendmentsdescription,
      amendsReleaseID: form.amendsReleaseID,
      releaseID: form.releaseID,


    }
    let _newContrato = {
      id: this.ocid,//este siempre se manda
      contractstitle: form.contractstitle,
      contractsdescription: form.contractsdescription,
      contractsstatus: form.contractsstatus,
      contractPeriod: contractPeriod,
      value: value,
      items: items,
      dateSigned: form.dateSigned,
      surveillanceMechanisms: form.surveillanceMechanisms,
      guarantees: guarantees,
      documents: this.documentos.documentos,
      implementation: implementation,
      relatedProcesses: relatedProcesses,
      milestones: this.hitosdel.hitos,
      amendments: amendments,
    }
    this.contractService.CrearContrato(_newContrato)
      .subscribe((resp: any) => {
        if (resp.ok) {
          this.botonEditarContrato = true;
          this.botonGuardarContrato = false;
          let contracts_id = resp._id
          const data = {
            contracts: contracts_id
          }

          this.tenderSvc.actulizarRelease(data, this.ocid).subscribe((resp: any) => {
            Swal.fire({
              icon: 'success',
              title: "<h5 style='color:#125DA9; font-size: 20px !important;'> CONTRATO  </h5>",
              text: "SE HA GUARDADO LA CONTRATO CON ÉXITO ",
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
        else {
          //  this.router.navigateByUrl(this.Radelante)
        }
      })

  }

  onSelectCucop(item: any) {
    // Actualizar la descripción cuando se selecciona un nuevo item del autocompletado
    this.ContratoForm.patchValue({
      clasifscheme: item.CLAVECUCoP,
      clasifdescription: item.DESCRIPCION,
      clasifquantity: item.PARTIDAESPECIFICA,
      unitname: item.UNIDADDEMEDIDA_sugerida,
    });
  }


  onChangeCucop(searchTerm: string): Subject<string> {
    this.debouncerCucop.next(searchTerm);
    return this.debouncerCucop;
  }

  setupDebouncerCucu(): void {
    this.debouncerCucop.pipe(
      debounceTime(1000),
      switchMap((searchTerm: string) => {
        this.ContratoForm.patchValue({ clasifdescription: '' });
        return this.usrServ.getSearchSquema(searchTerm);
      })
    ).subscribe((resp: { data: any[] }) => {
      this.ArrayEsquema = resp.data;
      if (this.ArrayEsquema.length === 1) {
        const data = this.ArrayEsquema[0];
        this.ContratoForm.patchValue({
          clasifdescription: data.esquema,
        });
      }
    });
  }

  calcularMonto() {
    // Obtén el valor actual del formulario
    const formValues = this.ContratoForm.value;

    const unidadesRequeridas = formValues.uintscant || 0; // Usa 0 si está vacío
    const valor = formValues.uintvalor || 0; // Usa 0 si está vacío

    // Calcula el monto
    const monto = unidadesRequeridas * valor;

    // Actualiza el campo 'uintamount' con el resultado del cálculo
    this.ContratoForm.patchValue({
      uintamount: monto
    });
  }


  duracionEnDias(event) {
    const form: any = this.ContratoForm.value;
    const fechaInicio1 = form.startDate;
    const fechaFin1 = form.endDate;
  
    if (fechaInicio1 && fechaFin1) {
      const diff = new Date(fechaFin1).getTime() - new Date(fechaInicio1).getTime();
      const duracion = diff / (1000 * 60 * 60 * 24);
      this.ContratoForm.patchValue({
        durationInDays: duracion,
      });
    }
  }

  duracionEnDias2(event) {
    const form: any = this.ContratoForm.value;
    const fechaInicio2 = form.guarantorstartDate;
    const fechaFin2 = form.guarantorendDate;
  
    if (fechaInicio2 && fechaFin2) {
      const diff = new Date(fechaFin2).getTime() - new Date(fechaInicio2).getTime();
      const duracion2 = diff / (1000 * 60 * 60 * 24);
      this.ContratoForm.patchValue({
        guarantordurationInDays: duracion2,
      });
    }
  }

}
