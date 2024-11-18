import Swal from 'sweetalert2';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { PlaningService } from '../../../../../../services/pages/planing.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { Paises } from '../../../../../../interfaces/paises.inteface';
import { partidas } from '../../../../../../interfaces/partidas.inteface';
import { Municipios } from '../../../../../../interfaces/municipios.inteface';
import { Estados } from '../../../../../../interfaces/estados.inteface';
import { Proveedores } from 'src/app/models/Entes/proveedores.model';

//importa los servicios que coectan la bd
import { UsuarioService } from '../../../../../../services/auth/usuario.service';
import { AwardService } from './../../../../../../services/pages/award.service';

//DECLARACION DE LOS COMPONENTES DE LAS LISTAS
import { ItemsAdjudicacionComponent } from '../partial/items-adjudicacion/items-adjudicacion.component';
import { DocumentosAdjudicacionComponent } from '../partial/documentos-adjudicacion/documentos-adjudicacion.component';
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
  //aqui se deben declarar todas los componentes que contienen las listas
  @ViewChild(ItemsAdjudicacionComponent) items;
  @ViewChild(DocumentosAdjudicacionComponent) documentos;

  awardsStatus: Generic[] = [
    { value: 'PENDIENTE', viewValue: 'PENDIENTE' },
    { value: 'ACTIVO', viewValue: 'ACTIVO' },
    { value: 'CANCELADO', viewValue: 'CANCELADO' },
    { value: 'SIN ÉXITO', viewValue: 'SIN ÉXITO' },
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
  public botonEditarLicitacion: boolean = false
  public btnActualizar: boolean = false
  public btnActualizar2: boolean = false
  public btnActualizar3: boolean = false
  public btnActualizar4: boolean = false
  public botonCotizacion = true;
  public botonLicitacion = true;
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
  public getRol = '';
  public getNombres = '';
  public getIdUsuario = '';
  public getidentepublico = '';
  public ocid: string;

  public proveedoressuppliers: Proveedores[] = [];
  public getprovedoressuppliers: any;

  AdjudicacionForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    rationale: ['', [Validators.required]],
    status: ['', [Validators.required]],
    date: ['', [Validators.required]],
    amount: [null, [Validators.required, Validators.pattern(/^-?\d*[.,]?\d{0,2}$/)]],
    currency: [null, [Validators.required]],

    //suppliersname: ['', [Validators.required]],
    suppliersid: ['', [Validators.required]],
    suppliersidentificador: ['', [Validators.required]],

    itemid: ['', [Validators.required]],
    itemdescription: ['', [Validators.required]],


    //periodo del contrato
    startDate: [null, [Validators.required]],
    endDate: [null, [Validators.required]],
    maxExtentDate: [null, [Validators.required]],
    durationInDays: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]],

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
    private awardService: AwardService,
    private usrServ: UsuarioService,
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
    this.getAllProveedoresattendees();
    // this.getInicio()
  }

  /**
    * VALIDACIONES
    *
    */
  campoNoValido(campo: string) {
    if (this.AdjudicacionForm.valid) {
    }
    return (
      this.AdjudicacionForm.controls[campo].errors &&
      this.AdjudicacionForm.controls[campo].touched
    );


  }
  getPais() {
    this.usrServ
      .listaPaises(this.AdjudicacionForm.value.countryName)
      .subscribe((resp: any) => {
        this.arrayPais = resp.data;
      });
  }
  getEstados() {
    // //("entre getEstados:"+this.AdjudicacionForm.value.deliveryAddressregion);
    this.usrServ
      .listaEstados(this.AdjudicacionForm.value.deliveryAddressregion)
      .subscribe((resp: any) => {
        this.arrayEstado = resp.data;
      });
    ////("entre getEstados:"+this.arrayEstado);
  }

  onChangeEstado() {
    // //("entre:"+this.AdjudicacionForm.value.deliveryAddressregion);
    this.usrServ
      .listaMunicipiosdeEstado(this.AdjudicacionForm.value.deliveryAddressregion)
      .subscribe((resp: any) => {
        this.arrayMunicipio = resp.data;
      });
  }
  cancel() {
    window.location.reload();
  }
  getAllProveedoresattendees() {


    this.getprovedoressuppliers = this.usrServ.cargarProveedores(this.getidentepublico).subscribe(({ total, proveedores }) => {

      if (proveedores.length !== 0) {
        this.proveedoressuppliers = proveedores;
      }

    });
  }
  guardarAdjudicacion() {
    let mensaje;
    let form: any = this.AdjudicacionForm.value;
    //('entre a guardar');
    //verifico que los datos obligatorios esten completos
    if (this.AdjudicacionForm.invalid) {
      this.AdjudicacionForm.markAllAsTouched();
      return;
    }
    //verifico que las listas esten llenas
    if (
      this.items._items.length == 0
      || this.documentos.documentos.length == 0
    ) {
      //envia mensaje que las listas estan vacias
      if (this.items._items.length == 0) {
        this.items.itemsForm.markAllAsTouched();
        mensaje = "DEBE AGREGAR POR LO MENOS UN ITEM A SER ADJUDICADOS";
      }
      else if (this.documentos.documentos.length == 0) {
        this.documentos.docForm.markAllAsTouched();
        mensaje = "DEBE AGREGAR POR LO MENOS UN DOCUMENTO";
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

    }
    let _suppliers = this.proveedoressuppliers.find(item => item.uid == form.suppliersid);




    let suppliers = {
      id: form.suppliersid,
      name: _suppliers.razonsocialProv,
      identificador: form.suppliersidentificador,
    }
    let items = {
      itemid: form.itemid,
      itemdescription: form.itemdescription,
      items: this.items._items,
    }
    let contractPeriod = {

      startDate: form.startDate,
      endDate: form.endDate,
      maxExtentDate: form.maxExtentDate,
      durationInDays: form.durationInDays,


    }
    let _newAdjudicación = {
      id: this.ocid,//este siempre se manda
      title: form.title,
      description: form.description,
      rationale: form.rationale,
      status: form.status,
      date: form.date,
      value: value,
      suppliers: suppliers,
      items: items,
      contractPeriod: contractPeriod,
      documents: this.documentos.documentos,
      //ESTO DEBE SER UN ARRAY
      amendmentsdate: form.amendmentsdate,
      mendmentsrationale: form.mendmentsrationale,
      amendmentsid: form.amendmentsid,
      amendmentsdescription: form.amendmentsdescription,
      amendsReleaseID: form.amendsReleaseID,
      releaseID: form.releaseID,

    }
    this.awardService.CrearAward(_newAdjudicación)
      .subscribe((resp: any) => {
        if (resp.ok) {
          this.botonEditarLicitacion = true;
          this.botonLicitacion = false;
          let awards_id = resp._id

          const data = {
            awards: awards_id
          }

          this.tenderSvc.actulizarRelease(data, this.ocid).subscribe((resp: any) => {

            Swal.fire({
              icon: 'success',
              title: "<h5 style='color:#125DA9; font-size: 20px !important;'> ADJUDICACIÓN  </h5>",
              text: "SE HA GUARDADO LA ADJUDICACIÓN CON ÉXITO ",
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

  duracionEnDias(event) {
    const form: any = this.AdjudicacionForm.value;
    const fechaInicio1 = form.startDate;
    const fechaFin1 = form.endDate;

    if (fechaInicio1 && fechaFin1) {
      const diff = new Date(fechaFin1).getTime() - new Date(fechaInicio1).getTime();
      const duracion1 = diff / (1000 * 60 * 60 * 24);
      //console.log(duracion1)
      this.AdjudicacionForm.patchValue({
        durationInDays: duracion1,
      });
    }
  }

  onChangeActor() {

    const valor = this.AdjudicacionForm.value.suppliersid;
    let rfc = this.proveedoressuppliers.find((item: any) => item.uid == valor).rfcproveedor
    this.AdjudicacionForm.patchValue({
      suppliersidentificador: rfc,
    });


  }
}

