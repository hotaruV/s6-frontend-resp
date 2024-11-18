import Swal from 'sweetalert2';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { debounceTime, filter, forkJoin, map, Subject, switchMap } from 'rxjs';
import { Paises } from './../../../../../../interfaces/paises.inteface';
import { partidas } from './../../../../../../interfaces/partidas.inteface';
import { Municipios } from './../../../../../../interfaces/municipios.inteface';
import { Estados } from './../../../../../../interfaces/estados.inteface';
import { ServidoresEnte } from 'src/app/models/Entes/servidores.model';
import { Proveedores } from 'src/app/models/Entes/proveedores.model';
//importa los servicios que coectan la bd
import { UsuarioService } from '../../../../../../services/auth/usuario.service';
import { LicitationService } from '../../../../../../services/pages/licitation.service';


//DECLARACION DE LOS COMPONENTES DE LAS LISTAS
import { ItemsLicitacionComponent } from '../partial/items-licitacion/items-licitacion.component';
import { LicitantesComponent } from '../partial/licitantes/licitantes.component';
import { DocumentosLicitacionComponent } from '../partial/documentos-licitacion/documentos-licitacion.component';
import { HitosLicitacionComponent } from '../partial/hitos-licitacion/hitos-licitacion.component';
import { respuesta } from 'src/app/interfaces/tender.interface';
import { CodigosPostales } from 'src/app/models/Entes/codigos.model';
interface Generic {
  value: string;
  viewValue: string;
}


interface TenderResponse {
  ok: boolean;
  key: string;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']

})
export class InicioComponent implements OnInit {
  //aqui se deben declarar todas los componentes que contienen las listas
  @ViewChild(ItemsLicitacionComponent) items;
  @ViewChild(LicitantesComponent) licitantes;
  @ViewChild(DocumentosLicitacionComponent) documentos;
  @ViewChild(HitosLicitacionComponent) hitos;



  tenderStatus: Generic[] = [
    { value: 'planning', viewValue: 'PLANEACIÓN' },
    { value: 'planned', viewValue: 'PLANEADO' },
    { value: 'active', viewValue: 'ACTIVO' },
    { value: 'cancelled', viewValue: 'CANCELADO' },
    { value: 'unsuccessful', viewValue: 'SIN ÉXITO' },
    { value: 'complete', viewValue: 'COMPLETO' },
    { value: 'withdrawn', viewValue: 'RETIRADO' },
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
  // itemsDescription: Generic[] = [
  //   { value: '1', viewValue: 'BIENES' },
  //   { value: '2',viewValue: 'SERVICIOS',},
  //   { value: '3', viewValue: 'OBRA PÚBLICA' },
  // ];
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
  public botonLicitacion = true;
  public botonEditarLicitacion: boolean = false
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
  public servCon: ServidoresEnte[] = [];
  public getRol = '';
  public getNombres = '';
  public getIdUsuario = '';
  public getidentepublico = '';
  public ocid: string;
  public getentesreq: any;
  public proveedoresattendees: Proveedores[] = [];
  public getprovedoresattendees: any;


  public parties: any[] = [];
  public partie_id: [];
  public dataKey: string;

  public addres_id
  public contact_id
  public identifier_id

  public licitation_id: any;

  private debouncer = new Subject<string>()
  public _codigosEnte: CodigosPostales[] = [];



  public servofficials: ServidoresEnte[] = [];
  public getservofficials: any;
  LicitacionForm = this.fb.group({
    //GENERALES
    //se tienen que quitar todos las variables que se crean en una lista
    tendertitle: ['', [Validators.required]],
    tenderstatus: ['', [Validators.required]],
    tenderdescription: ['', [Validators.required]],

    tenderprocurementMethod: ['', [Validators.required]],
    tenderprocurementMethodDetails: ['', [Validators.required]],
    tenderprocurementMethodRationale: ['', [Validators.required]],
    tendercategoria: ['', [Validators.required]],
    tenderawardCriteria: ['', [Validators.required]],
    tenderawardCriteriaDetails: ['', [Validators.required]],
    tendersubmissionMethod: ['', [Validators.required]],
    tendersubmissionMethodDetails: ['', [Validators.required]],

    //CONTRATANTE
    procuringEntityname: ['', [Validators.required]],
    procuringEntityrfc: ['', [Validators.required]],

    itemid: [null, [Validators.required]],
    itemdescription: ['', [Validators.required]],


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

    //valor
    valueamount: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    valuecurrency: [null, [Validators.required]],

    //min valor
    minValueamount: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    minValuecurrency: [null, [Validators.required]],

    procurementMethod: [null, [Validators.required]],
    procurementMethodDetails: [null, [Validators.required]],
    procurementMethodRationale: [null, [Validators.required]],
    mainProcurementCategory: [null, [Validators.required]],
    additionalProcurementCategories: [null, [Validators.required]],
    awardCriteria: [null, [Validators.required]],
    awardCriteriaDetails: [null, [Validators.required]],
    submissionMethod: [null, [Validators.required]],
    submissionMethodDetails: [null, [Validators.required]],



    //periodo de licitacion
    tenderPeriodstartDate: [null, [Validators.required]],
    tenderPeriodendDate: [null, [Validators.required]],
    tenderPeriodmaxExtentDate: [null, [Validators.required]],
    tenderPerioddurationInDays: [null, [Validators.required], Validators.pattern(/^[0-9]+$/)],

    //periodo de aclaración

    enquiryPeriodstartDate: [null, [Validators.required]],
    enquiryPeriodendDate: [null, [Validators.required]],
    enquiryPeriodmaxExtentDate: [null, [Validators.required]],
    enquiryPerioddurationInDays: [null, [Validators.required], Validators.pattern(/^[0-9]+$/)],

    sol_aclaracion: [null, [Validators.required]],

    //JUNTA DE ACLARACIONES

    clarificationMeetingsid: [null, [Validators.required]],
    clarificationMeetingsdate: [null, [Validators.required]],
    //ASISTENTE
    attendeesid: [null, [Validators.required]],
    attendeesname: [null, [Validators.required]],

    //servidores publicos
    officialsname: [null, [Validators.required]],
    officialsid: [null, [Validators.required]],
    eligibilityCriteria: [null, [Validators.required]],
    //licitantes
    //licitantename: [null, [Validators.required]],
    //licitanteid: [null, [Validators.required]],

    //periodo de evaluacion
    awardPeriodstartDate: [null, [Validators.required]],
    awardPeriodendDate: [null, [Validators.required]],
    awardPeriodmaxExtentDate: [null, [Validators.required]],
    awardPerioddurationInDays: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]],

    //periodo del contrato
    contractPeriodstartDate: [null, [Validators.required]],
    contractPeriodendDate: [null, [Validators.required]],
    contractPeriodmaxExtentDate: [null, [Validators.required]],
    contractPerioddurationInDays: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    //numberOfTenderers: [null,],

    //modificacion
    amendmentsdate: [null, [Validators.required]],
    mendmentsrationale: [null, [Validators.required]],
    amendmentsid: [null, [Validators.required]],
    amendmentsdescription: [null, [Validators.required]],
    amendsReleaseID: [null, [Validators.required]],
    releaseID: [null, [Validators.required]],





  })

  /**
    * INICIALIZACIONES
    *
    */
  constructor(
    //aqui es donde van declarados los servicios para la conexión a la bd
    private licitationService: LicitationService,
    private usrServ: UsuarioService,
    // termina servicios
    private fb: UntypedFormBuilder,
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
    ////('usuario', this.getRol);

    this.getServidorContratante();
    this.getAllProveedoresattendees();
    this.getAllServidores();
    this.setupDebouncer();
    this.setPaisLugarEnte();
    this.getTender();
  }

  private setPaisLugarEnte() {
    this.LicitacionForm.get('lugar')?.valueChanges.subscribe(value => {
      const paisControl = this.LicitacionForm.get('countryName');
      if (value === 'EXTRANJERO') {
        paisControl?.enable();
      } else {
        paisControl?.setValue('MÉXICO');
        paisControl?.disable();
      }
    });
  }

  campoNoValido(campo: string) {
    if (this.LicitacionForm.valid) {
    }
    return (
      this.LicitacionForm.controls[campo].errors &&
      this.LicitacionForm.controls[campo].touched
    );


  }
  getPais() {
    this.usrServ
      .listaPaises(this.LicitacionForm.value.countryName)
      .subscribe((resp: any) => {
        this.arrayPais = resp.data;
      });
  }
  getEstados() {
    // //("entre getEstados:"+this.LicitacionForm.value.deliveryAddressregion);
    this.usrServ
      .listaEstados(this.LicitacionForm.value.deliveryAddressregion)
      .subscribe((resp: any) => {
        this.arrayEstado = resp.data;
      });
    ////("entre getEstados:"+this.arrayEstado);
  }

  onChangeEstado() {
    // //("entre onChangeEstado: "+this.LicitacionForm.value.deliveryAddressregion);
    this.usrServ
      .listaMunicipiosdeEstado(this.LicitacionForm.value.deliveryAddressregion)
      .subscribe((resp: any) => {
        this.arrayMunicipio = resp.data;
      });
  }
  cancel() {
    window.location.reload();
  }

  getServidorContratante() {
    // //('Entre getServidorContratante: '+this.getidentepublico);



    this.getentesreq = this.usrServ.getServidorContratante(this.getidentepublico).subscribe(({ total, servidores }) => {

      if (servidores.length !== 0) {
        this.servCon = servidores;

      }

    });
    // //('Entre getServidorContratante: '+this.servCon );
  }
  onChangeActor() {

    const valor = this.LicitacionForm.value.procuringEntityname;

    let rfc = this.servCon.find(item => item.uid == valor).rfc_servidor;

    this.LicitacionForm.patchValue({
      procuringEntityrfc: rfc,
    });


  }

  onChangeActor1() {

    const valor = this.LicitacionForm.value.officialsname;
    let rfc = this.servofficials.find((item: any) => item.uid == valor).rfc_servidor;
    this.LicitacionForm.patchValue({
      officialsid: rfc,
    });


  }

  onChangeActor2() {

    const valor = this.LicitacionForm.value.attendeesname;
    //console.log(valor);
    //let rfc = this.servCon.find(item => item.uid == valor).rfc_servidor;
    let rfc = this.proveedoresattendees.find((item: any) => item.uid == valor).rfcproveedor
    //console.log(rfc[0]);
    this.LicitacionForm.patchValue({
      attendeesid: rfc,
    });


  }
  getAllProveedoresattendees() {

    this.getprovedoresattendees = this.usrServ.cargarProveedores(this.getidentepublico)
      .subscribe(({ total, proveedores }) => {

        if (proveedores.length !== 0) {
          this.proveedoresattendees = proveedores;
          //this.crearParties(this.proveedoresattendees)
        }

      });
  }

  crearParties(provedorId) {


    this.usrServ.getProveedor(provedorId).subscribe((prov: any) => {
      if (!prov) {
        console.error('No se encontraron datos del proveedor:', prov);
        return; // Salir si no hay datos válidos
      }

      // Crear los objetos necesarios a partir de los datos del proveedor
      let party_identifier = {
        legalName: prov.razonsocialProv,
        uri: prov.uri_proveedor,
        id: prov.rfcproveedor,
        ocid: this.ocid,
      };

      let party_contact = {
        name: prov.nombres_contacto_prov,
        email: prov.email_contacto_prov,
        telephone: prov.telefono_contacto_prov,
        faxNumber: prov.telefonofax_contacto_prov,
        url: prov.uri_proveedor,
        _id: prov.rfcproveedor,
        ocid: this.ocid,
      };

      let party_address = {
        streetAddress: prov.calle_proveedor,
        locality: prov.localidad_proveedor,
        region: prov.region_proveedor,
        postalCode: prov.codigoPostal_proveedor,
        countryName: prov.pais_proveedor,
        _id: prov.rfcproveedor,
        ocid: this.ocid,
      };

      // Usamos forkJoin para hacer las 3 llamadas en paralelo
      forkJoin({
        identifier: this.tenderSvc.identifierCreate(this.ocid, party_identifier),
        contactPoint: this.tenderSvc.ContractPointsCreate(this.ocid, party_contact),
        address: this.tenderSvc.addressCreate(this.ocid, party_address),
      }).subscribe({
        next: (responses: any) => {
          // Validar que cada respuesta contenga un _id
          if (!responses.identifier || !responses.contactPoint || !responses.address) {
            console.error('Una de las respuestas es indefinida:', responses);
            return;
          }

          const identifier_id = responses.identifier._id;
          const contact_id = responses.contactPoint._id;
          const address_id = responses.address._id;

          // Crear la partie con los IDs obtenidos
          const partyForm = {
            name: prov.razonsocialProv,
            identifier: identifier_id,
            address: address_id,
            contactPoint: contact_id,
            roles: [], // Asegúrate de asignar los roles correctos aquí
            id: 'i-party',
            ocid: this.ocid,
          };

          // Llamada para crear la partie
          this.licitationService.createPartie(this.ocid, partyForm).subscribe({
            next: (partieResp: any) => {
              // Obtener el ID de las parties
              this.licitationService.getpartiesID(this.ocid).subscribe({
                next: (partiesResp: any) => {
                  const parties_id = partiesResp.parties;

                  // Formulario para actualizar el release con las parties
                  const form = {
                    parties: parties_id,
                  };

                  // Actualizamos el release con las parties
                  this.licitationService.actulizarRelease(form, this.ocid).subscribe({
                    next: (releaseResp: any) => {

                    },
                    error: (err) => {
                      console.error('Error al actualizar el release:', err);
                    },
                  });
                },
                error: (err) => {
                  console.error('Error al obtener IDs de las parties:', err);
                },
              });
            },
            error: (err) => {
              console.error('Error al crear la partie:', err);
            },
          });
        },
        error: (err) => {
          console.error('Error al crear los objetos en paralelo:', err);
        },
      });
    });
  }


  getTender() {
    this.botonEditarLicitacion = true;
    this.licitationService.getTenderOcid(this.ocid)
      .pipe(
        map((resp: any) => {
          if (resp.ok) {
            const tender = resp.tender;

            this.LicitacionForm.patchValue({
              tendertitle: tender.title || '',
              tenderstatus: tender.status || '',
              tenderdescription: tender.description || '',
              tenderprocurementMethod: tender.procurementMethod || '',
              tenderprocurementMethodDetails: tender.procurementMethodDetails || '',
              tenderprocurementMethodRationale: tender.procurementMethodRationale || '',
              tenderawardCriteria: tender.awardCriteria || '',
              mainProcurementCategory: tender.mainProcurementCategory || '',
              additionalProcurementCategories: tender.additionalProcurementCategories || '',
              tenderawardCriteriaDetails: tender.awardCriteriaDetails || '',
              tendersubmissionMethod: tender.submissionMethod ? tender.submissionMethod.join(', ') : '',
              tendersubmissionMetyhodDetails: tender.submissionMethodDetails || '',

              // Lugar de entrega - Aquí tendrías que ajustar según el objeto de "items" o "documents"
              itemid: tender.items ? tender.items[0].id : null,
              itemdescription: tender.items ? tender.items[0].description : '',

              // Contratante (en este caso `procuringEntity` es null, pero cuando tengas datos puedes mapearlos aquí)
              procuringEntityname: tender.procuringEntity ? tender.procuringEntity.name : '',
              procuringEntityrfc: tender.procuringEntity ? tender.procuringEntity.rfc : '',

              // Periodo de evaluación (Award Period)
              awardPeriodstartDate: tender.awardPeriod ? tender.awardPeriod.startDate : null,
              awardPeriodendDate: tender.awardPeriod ? tender.awardPeriod.endDate : null,
              awardPeriodmaxExtentDate: tender.awardPeriod ? tender.awardPeriod.maxExtentDate : null,

              // Periodo de licitación (Tender Period)
              tenderPeriodstartDate: tender.tenderPeriod ? tender.tenderPeriod.startDate : null,
              tenderPeriodendDate: tender.tenderPeriod ? tender.tenderPeriod.endDate : null,
              tenderPeriodmaxExtentDate: tender.tenderPeriod ? tender.tenderPeriod.maxExtentDate : null,

              // Otros campos del formulario pueden ir mapeados aquí de acuerdo a los datos de la respuesta
              // Para valores y monedas si son null, puedes ajustar con condicionales
              minValueamount: tender.minValue ? tender.minValue.amount : null,
              valueamount: tender.value ? tender.value.amount : null,
              minValuecurrency: tender.minValue ? tender.minValue.currency : '',
              valuecurrency: tender.value ? tender.value.currency : ''
            });
          } else {
            return;
          }
        })
      ).subscribe();
  }





  private setupDebouncer() {
    this.debouncer
      .pipe(
        debounceTime(1000),
        filter(searchTerm => searchTerm.length === 5),
        switchMap(searchTerm => this.usrServ.listaCodigoPostal(searchTerm))
      )
      .subscribe((resp: any) => {
        this._codigosEnte = resp.data;
        ////(this._codigosEnte);
        if (this._codigosEnte.length === 1) {
          const data = this._codigosEnte[0];
          this.LicitacionForm.patchValue({
            colonia: data.colonia,
            pais: 'MEXICO',
          });
        }
      });
  }


  cargaColonias(searchTerm: string): Subject<string> {
    this.debouncer.next(searchTerm);
    return this.debouncer;
  }

  getAllServidores() {
    this.getservofficials = this.usrServ.cargarServidores(this.getidentepublico).subscribe(({ total, servidores }) => {
      if (servidores.length !== 0) {
        this.servofficials = servidores;
      }
    });
  }






  guardarLicitation() {
    let mensaje;
    let form: any = this.LicitacionForm.value;


    //verifico que los datos obligatorios esten completos
    if (this.LicitacionForm.invalid) {
      this.LicitacionForm.markAllAsTouched();
      return;
    }


    //verifico que las listas esten llenas
    if (
      this.items._items.length == 0
      || this.documentos.documentos.length == 0
      || this.hitos.hitos.length == 0
    ) {
      //envia mensaje que las listas estan vacias
      if (this.items._items.length == 0) {
        this.items.itemsForm.markAllAsTouched();
        mensaje = "DEBE AGREGAR POR LO MENOS UN ITEM A SER COTIZADOS";
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
        title: "<h5 style='color:#125DA9; font-size: 20px !important;'> NO SE PUEDE GUARDAR LA LICITACIÓN </h5>",
        text: mensaje,
        confirmButtonText: "ACEPTAR",
        confirmButtonColor: '#125DA9',
        showConfirmButton: true,
        //timer: 1500
      })
      //return;
    }
    let namecontracting;
    let _contracting = this.servCon.find(item => item.uid == form.procuringEntityname);
    if (_contracting.segundo_apellido_servidor != null)
      namecontracting = _contracting.nombres_servidor + " " + _contracting.primer_apellido_servidor + " " + _contracting.segundo_apellido_servidor;
    else
      namecontracting = _contracting.nombres_servidor + " " + _contracting.primer_apellido_servidor;

    let procuringEntity = {

      id: form.procuringEntityname,
      name: namecontracting,
      rfc: form.procuringEntityrfc,

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
      itemid: form.itemid,
      itemdescription: form.itemdescription,
      items: this.items._items,
      deliveryLocation: deliveryLocation,
      deliveryAddress: deliveryAddress,
    }



    let tenderValue = {
      valueamount: form.valueamount,
      valuecurrency: form.valuecurrency
    }

    let minValue = {
      minValueamount: form.minValueamount,
      minValuecurrency: form.minValuecurrency
    }

    let tenderPeriod = {
      startDate: form.tenderPeriodstartDate,
      endDate: form.tenderPeriodendDate,
      maxExtentDate: form.tenderPeriodmaxExtentDate,
      durationInDays: form.tenderPerioddurationInDays
    }

    let enquiryPeriod = {
      startDate: form.enquiryPeriodstartDate,
      endDate: form.enquiryPeriodendDate,
      maxExtentDate: form.enquiryPeriodmaxExtentDate,
      durationInDays: form.enquiryPerioddurationInDays
    }
    let sourceattendees = this.proveedoresattendees.find(item => item.uid == form.attendeesname);


    let attendees = {
      id: form.attendeesname,
      name: sourceattendees.razonsocialProv,
      identificador: form.attendeesid
    }


    let nameofficials;
    let _officials = this.servofficials.find(item => item.uid == form.officialsname);
    if (_officials.segundo_apellido_servidor != null)
      nameofficials = _officials.nombres_servidor + " " + _officials.primer_apellido_servidor + " " + _officials.segundo_apellido_servidor;
    else
      nameofficials = _officials.nombres_servidor + " " + _officials.primer_apellido_servidor;



    let officials = {
      id: form.officialsname,
      name: nameofficials,
      identificador: form.officialsid,
    }

    let clarificationMeetings = {
      id: form.clarificationMeetingsid,
      date: form.clarificationMeetingsdate,
      attendees: attendees,
      officials: officials
    }

    let awardPeriod = {
      startDate: form.awardPeriodstartDate,
      endDate: form.awardPeriodendDate,
      maxExtentDate: form.awardPeriodmaxExtentDate,
      durationInDays: form.awardPerioddurationInDays
    }

    let contractPeriod = {
      startDate: form.contractPeriodstartDate,
      endDate: form.contractPeriodendDate,
      maxExtentDate: form.contractPeriodmaxExtentDate,
      durationInDays: form.contractPerioddurationInDays
    }


    let amendments = {
      date: form.amendmentsdate,
      rationale: form.mendmentsrationale,
      id: form.amendmentsid,
      description: form.amendmentsdescription,
      amendsReleaseID: form.amendsReleaseID,
      releaseID: form.releaseID
    }
    ////('entre a guardar.' + form.tendersubmissionMethod);
    let _newLicitation = {
      id: this.ocid,//este siempre se manda
      title: form.tendertitle,
      description: form.tenderdescription,
      status: form.tenderstatus,
      ///no esta en el excel
      tenderprocurementMethod: form.tenderprocurementMethod,
      tenderprocurementMethodDetails: form.tenderprocurementMethodDetails,
      tenderprocurementMethodRationale: form.tenderprocurementMethodRationale,
      tendercategoria: form.tendercategoria,
      tenderawardCriteria: form.tenderawardCriteria,
      tenderawardCriteriaDetails: form.tenderawardCriteriaDetails,

      tendersubmissionMethod: form.tendersubmissionMethod,
      tendersubmissionMethodDetails: form.tendersubmissionMethodDetails,
      ///termina no esta en el excel

      procuringEntity: procuringEntity,
      items: items,

      value: tenderValue,
      minValue: minValue,
      procurementMethod: form.procurementMethod,
      procurementMethodDetails: form.procurementMethodDetails,
      procurementMethodRationale: form.procurementMethodRationale,
      mainProcurementCategory: form.mainProcurementCategory,
      additionalProcurementCategories: form.additionalProcurementCategories,
      awardCriteria: form.awardCriteria,
      awardCriteriaDetails: form.awardCriteriaDetails,
      submissionMethod: form.submissionMethod,
      submissionMethodDetails: form.submissionMethodDetails,

      //

      tenderPeriod: tenderPeriod,
      enquiryPeriod: enquiryPeriod,
      hasEnquiries: form.sol_aclaracion,
      clarificationMeetings: clarificationMeetings,

      eligibilityCriteria: form.eligibilityCriteria,
      tenderers: this.licitantes.proveedoresinvitados,

      awardPeriod: awardPeriod,
      contractPeriod: contractPeriod,

      documents: this.documentos.documentos,
      milestones: this.hitos.hitos,

      amendments: amendments
    }

    //si pasa las validaciones mandar guardar los datos a la bd
    // //(_newLicitation)
    // return

    this.licitationService.CrearLicitation(_newLicitation)
      .subscribe((resp: any) => {
        if (resp.ok) {
          this.botonEditarLicitacion = true;
          this.botonLicitacion = false;
          let licitation_id = resp._id

          const data = {
            tender: licitation_id
          }

          this.tenderSvc.actulizarRelease(data, this.ocid).subscribe((resp: any) => {
            let partie = this.crearParties(attendees.id)


            localStorage.removeItem('tenders_id');

          })


          Swal.fire({
            icon: 'success',
            title: "<h5 style='color:#125DA9; font-size: 20px !important;'> LICITACIÓN  </h5>",
            text: "SE HA GUARDADO LA LICITACIÓN CON ÉXITO ",
            confirmButtonText: "ACEPTAR",
            confirmButtonColor: '#125DA9',
            showConfirmButton: true,
            //timer: 1500
          })
          this.router.navigate(['/sea/funcionarios/inicio-contrato'])
          localStorage.removeItem("planning_id")
          localStorage.removeItem("buyer_id")

        }


        else {
          //  this.router.navigateByUrl(this.Radelante)
        }
      })

  }


  duracionEnDias(event) {
    const form: any = this.LicitacionForm.value;
    const fechaInicio1 = form.tenderPeriodstartDate;
    const fechaFin1 = form.tenderPeriodendDate;

    if (fechaInicio1 && fechaFin1) {
      const diff = new Date(fechaFin1).getTime() - new Date(fechaInicio1).getTime();
      const duracion1 = diff / (1000 * 60 * 60 * 24);
      this.LicitacionForm.patchValue({
        tenderPerioddurationInDays: duracion1,
      });
    }
  }

  // Función para calcular la duración del periodo de consulta
  duracionEnDias2(event) {
    const form: any = this.LicitacionForm.value;
    const fechaInicio2 = form.enquiryPeriodstartDate;
    const fechaFin2 = form.enquiryPeriodendDate;

    if (fechaInicio2 && fechaFin2) {
      const diff2 = new Date(fechaFin2).getTime() - new Date(fechaInicio2).getTime();
      const duracion2 = diff2 / (1000 * 60 * 60 * 24);
      this.LicitacionForm.patchValue({
        enquiryPerioddurationInDays: duracion2,
      });
    }
  }

  // Función para calcular la duración del periodo de adjudicación
  duracionEnDias3(event) {
    const form: any = this.LicitacionForm.value;
    const fechaInicio3 = form.awardPeriodstartDate;
    const fechaFin3 = form.awardPeriodendDate;

    if (fechaInicio3 && fechaFin3) {
      const diff3 = new Date(fechaFin3).getTime() - new Date(fechaInicio3).getTime();
      const duracion3 = diff3 / (1000 * 60 * 60 * 24);
      this.LicitacionForm.patchValue({
        awardPerioddurationInDays: duracion3,
      });
    }
  }

  // Función para calcular la duración del periodo contractual
  duracionEnDias4(event) {
    const form: any = this.LicitacionForm.value;
    const fechaInicio4 = form.contractPeriodstartDate;
    const fechaFin4 = form.contractPeriodendDate;

    if (fechaInicio4 && fechaFin4) {
      const diff4 = new Date(fechaFin4).getTime() - new Date(fechaInicio4).getTime();
      const duracion4 = diff4 / (1000 * 60 * 60 * 24);
      this.LicitacionForm.patchValue({
        contractPerioddurationInDays: duracion4,
      });
    }
  }
}
