import { AwardService } from './../../../../../services/pages/award.service';
import { LicitationService } from 'src/app/services/pages/licitation.service';
import { map } from 'rxjs/operators';
import { respuestaTender } from './../../../../../interfaces/tender.interface';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { PlaningService } from './../../../../../services/pages/planing.service';
import { UntypedFormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ContractService } from 'src/app/services/pages/contract.service';
interface Format {
  value: string;
  viewValue: string;
}
interface Lenguajes {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent implements OnInit {


  public btnGuardar: boolean = true
  public btnNuevo: boolean = false

  public btnActualizar: boolean = false
  public btnCancelar: boolean = false
  public btnSiguiente: boolean = true
  public btnAtras: boolean = true




  public inactivGuardar: boolean = true;
  public ocid: string;
  public document_id: string;
  public awadID: string;
  public contID: string;
  public documentos = []
  public tipoDoc: {
    planning: 'Planeación',
    tender: 'Licitación',
    award: 'Adjudicación',
    contract: 'Contrato',
  }

  public urlPatern = /^[A-Za-z][A-Za-z\d.+-]*:\/*(?:\w+(?::\w+)?@)?[^\s/]+(?::\d+)?(?:\/[\w#!:.?+=&%@\-/]*)?$/

  @Input() documentType: string;
  @Input() BtnName: string;
  @Input() Radelante: string;
  @Input() Ratras: string;
  @Output() redireccionA: EventEmitter<any> = new EventEmitter();
  @Output() redireccionAT: EventEmitter<any> = new EventEmitter();

  format: Format[] = [
    { value: 'plaintext', viewValue: 'Plain text' },
    { value: 'xml', viewValue: 'XML' },
    { value: 'html', viewValue: 'HTML' },
    { value: 'application/pdf', viewValue: 'PDF' },
  ];

  lenguajes: Lenguajes[] = [
    { value: "es", viewValue: 'Español' },
    { value: "en", viewValue: 'Ingles' },
    { value: "pt", viewValue: 'Portuges' },
    { value: "fr", viewValue: 'Frances' },
    { value: "it", viewValue: 'Italiano' },
    { value: "ru", viewValue: 'Ruso' },
    { value: "zh", viewValue: 'Chino' },
    { value: "ja", viewValue: 'Japones' },
    { value: "other", viewValue: 'Otro' },
  ];

  constructor(private fb: UntypedFormBuilder,
    private planingService: PlaningService,
    private tenderSvc: LicitationService,
    private AdwardSvs: AwardService,
    private ContSvs: ContractService,
    private router: Router,
    private routeActive: ActivatedRoute
  ) {
    this.routeActive.params.subscribe(({ ocid, id, cid }) => {
      this.ocid = ocid;
      this.awadID = id;
      this.contID = cid;
    })
  }

  ngOnInit(): void {
    this.getDocuments()
    ////(this.documentType);
  }

  documentForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    url: ['', [Validators.required, Validators.pattern(this.urlPatern)]],
    datePublished: ['', [Validators.required]],
    format: ['', [Validators.required]],
    language: ['', [Validators.required]],

  })

  crearDocument() {
    if (this.documentForm.invalid) {
      this.documentForm.markAllAsTouched();
      return;
    }

    let form: any = this.documentForm.value;
    form = {
      documentType: this.documentType,
      title: form.title,
      description: form.description,
      url: form.url,
      datePublished: form.datePublished,
      format: form.format,
      language: form.language,
      document_id: this.ocid,
      award_id: this.documentType === 'award' ? localStorage.getItem('award_id') : '' || this.documentType === 'contract' ? this.awadID : '',
      contract_id: this.documentType === 'contract' ? this.contID : ''


    };
    this.planingService.CrearPlanningDocument(form, this.documentType)
      .subscribe((resp: respuestaTender) => {
        if (this.documentType === 'tender') {
          this.tenderUpdate(resp._id)
        }
        if (this.documentType === 'award') {
          this.adwardUpdate(resp._id)
          // //(resp._id);
        }
        if (this.documentType === 'contract') {
          this.ContractUpdate(resp._id)
        }
        this.documentForm.reset();
        this.getDocuments();
        this.btnGuardar = false
        this.btnNuevo = true
      })


  }

  formReset(form: FormGroup) {
    //this.inactivGuardar = true;

    form.reset();
    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null);
    });
  }

  campoNoValido(campo: string) {
    if (this.documentForm.valid) {
      this.inactivGuardar = false
    }
    return (
      this.documentForm.controls[campo].errors &&
      this.documentForm.controls[campo].touched
    );
  }

  getDocuments() {
    let award_id: string
    award_id = localStorage.getItem('award_id')
    ////(award_id);
    switch (this.documentType) {
      case 'award':
        this.planingService.getDocumentsAwardbyId(this.documentType, this.ocid, award_id)
          .subscribe((resp: any) => {
            this.documentos = resp.documents
          })
        break;
      case 'contract':
        ////(this.documentType);
        this.planingService.getDocumentsAward(this.documentType, this.ocid, this.contID)
          .subscribe((resp: any) => {
            this.documentos = resp.documents
          })
        break;
      default:
        this.planingService.getDocuments(this.documentType, this.ocid)
          .subscribe((resp: any) => {
            ////(resp);
            this.documentos = resp.documents
          })
        break;
    }
  }



  public borrarDoc(id: string) {
    Swal.fire({
      title: '¿Desea Continuar',
      text: "El documento será Borrado y no se podrá recuperar",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.planingService.deleteDocument(id, this.ocid, this.documentType).subscribe(r => {
          if (this.documentType === 'tender') {
            this.tenderUpdate(id);
          }
          if (this.documentType === 'award') {
            this.adwardUpdate(id);
          }
          if (this.documentType === 'contract') {
            this.ContractUpdate(id);
          }
          this.getDocuments()
          Swal.fire(
            'Borrado',
            'Se Ha Borrado Con Exito.',
            'success'
          )
        })

      }
    })
  }


  private tenderUpdate(id: string) {
    let allDocus = []

    this.planingService.getDocuments(this.documentType, this.ocid)
      .pipe(
        map((resp: any) => {
          allDocus = resp.documents
          let dataDocumenTender = {
            documents: allDocus,
            ocid: this.ocid
          }
          this.tenderSvc.UpdateTender(dataDocumenTender).subscribe(resp => {
            ////(resp);
          })

        })
      ).subscribe()
  }

  private adwardUpdate(id: string) {
    let allDocus = []
    let award_id: string
    award_id = localStorage.getItem('award_id')
    this.planingService.getDocumentsAward(this.documentType, this.ocid, award_id)
      .pipe(
        map((resp: any) => {
          //(resp);
          // return
          //allDocus = resp.documents
          // //(allDocus);
          // return
          let dataDocumenAward = {
            documents: resp.documents_id,
            ocid: this.ocid,
            _id: localStorage.getItem('award_id')
          }
          let id = localStorage.getItem('award_id')
          this.AdwardSvs.UpdateAward(dataDocumenAward, id).subscribe(resp => {
            //(resp);
          })

        })
      ).subscribe()
  }

  private ContractUpdate(id: string) {
    let allDocus = []
    this.planingService.getDocumentsAward(this.documentType, this.ocid, this.contID)
      .pipe(
        map((resp: any) => {
          ////(resp);
          allDocus = resp.documents
          let dataDocumenAward = {
            documents: allDocus,
            ocid: this.ocid,
            awardID: this.awadID
          }
          this.ContSvs.actualizarContract(dataDocumenAward).subscribe()
        })
      ).subscribe()
  }


  forward() {
    this.redireccionAT.emit(this.Ratras)
  }

  next() {
    this.redireccionA.emit(this.Radelante)
  }


  editarDoc(id: string) {
    this.planingService.getOneDocuments(id)
      .pipe(
        map((resp: any) => {
          ////(resp.documents);
          this.document_id = resp.documents._id
          this.btnGuardar = false
          this.btnActualizar = true
          this.btnCancelar = true
          this.btnNuevo = false
          this.documentForm.patchValue(
            {
              title: resp.documents.title,
              description: resp.documents.description,
              url: resp.documents.url,
              language: resp.documents.language,
              datePublished: resp.documents.datePublished,
              format: resp.documents.format,
            }

          )

        })
      ).subscribe()
  }

  updateDocument(id: string){
    if (this.documentForm.invalid) {
      this.documentForm.markAllAsTouched();
      return;
    }

    let form: any = this.documentForm.value;
    form = {
      title: form.title,
      description: form.description,
      url: form.url,
      language: form.language,
      datePublished: form.datePublished,
      format: form.format,
    };
    this.planingService.actualizarDocumentos(form, id)
    .pipe(
      map((resp:any)=> {
        if(resp.ok){
          this.cancel()
          this.formReset(this.documentForm)
          Swal.fire({ //position: 'top-end',
            icon: 'success',
            title: 'La información se ha actualizado con exito',
            showConfirmButton: false,
            timer: 1300
          })
          setTimeout(() => {
            this.next()
          }, 1500);
        }
      })
    ).subscribe()



  }

  cancel(){
    window.location.reload();
  }


}
