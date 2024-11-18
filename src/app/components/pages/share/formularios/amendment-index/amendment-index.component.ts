import { map } from 'rxjs/operators';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Amendment } from 'src/app/interfaces/tender.interface';
import { LicitationService } from 'src/app/services/pages/licitation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-amendment-index',
  templateUrl: './amendment-index.component.html',
  styleUrls: ['./amendment-index.component.scss']
})
export class AmendmentIndexComponent implements OnInit {

  @Input() documentType: string;
  @Input() BtnName: string;
  @Input() ruta: '/sea/funcionarios/contrataciones/licitacion/items';
  @Output() redireccion: EventEmitter<any> = new EventEmitter();

  public btnNext: boolean = true;
  public btnPrev: boolean;
  public btnGuardar: boolean = true;
  public btnNuevo: boolean = false;
  public btnActualizar: boolean = false;

  public datosAmand: boolean = true;
  public ocid: string;
  public amandments: Amendment[] = [];
  public partie_id: [];

  public Amedment: any;
  public amedment_id: string;

  constructor(private fb: UntypedFormBuilder,
    private tenderSvc: LicitationService,
    private router: Router,
    private routeActive: ActivatedRoute
  ) {
    this.routeActive.params.subscribe(({ ocid }) => {
      this.ocid = ocid;
    })
  }

  ngOnInit(): void {
    this.getAmedments();
  }

  getAmedments() {
    this.Amedment = this.tenderSvc.amendmentShowAll(this.ocid, this.documentType)
      .pipe(
        map((resp: Amendment[]) => {
          this.amandments = resp['amendments'];
        })
      ).subscribe()
  }

  public amendmentForm = this.fb.group({
    date: ["", [Validators.required]],
    rationale: ["", [Validators.required]],
    description: ["", [Validators.required]],
  })

  campoNoValido(campo: string) {
    return (
      this.amendmentForm.controls[campo].errors &&
      this.amendmentForm.controls[campo].touched
    );
  }

  formReset(form: FormGroup) {
    form.reset();
    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null);
    });
  }

  crearAmendments() {
    if (this.amendmentForm.invalid) {
      this.amendmentForm.markAllAsTouched();
      return;
    }
    let dataID = []
    let data = {
      date: this.amendmentForm.value.date,
      rationale: this.amendmentForm.value.rationale,
      description: this.amendmentForm.value.description,
      ocid: this.ocid,
      documentType: this.documentType
    }
    this.tenderSvc.amendmentCreate(data).subscribe(data => {
      this.amendmentForm.reset();
      this.btnNuevo = true;
      this.btnGuardar = false;
      this.getAmedments()

      switch (this.documentType) {
        case 'tender':
          this.Amedment = this.tenderSvc.amendmentShowID(this.ocid, this.documentType)
            .pipe(
              map((resp: any) => {
                dataID = resp.amendments_id;
                let form = {
                  amendments: dataID,
                  ocid: this.ocid
                }
                this.tenderSvc.UpdateTender(form).subscribe()
              })
            ).subscribe()
          break;

        case 'contract':
          this.Amedment = this.tenderSvc.amendmentShowID(this.ocid, this.documentType)
            .pipe(
              map((resp: any) => {
                dataID = resp.amendments_id;
                let form = {
                  amendments: dataID,
                  ocid: this.ocid
                }

              })
            ).subscribe()
          break;
      }
    })
    ////(data);
  }

  next() {
    this.redireccion.emit(this.ruta)
  }
  prev() {
    this.router.navigate(['/sea/funcionarios/contrataciones/licitacion/milestone', this.ocid])
  }

  borraramandments(id: string) {
    this.btnNuevo = false;
    this.btnGuardar = true;
    this.tenderSvc.amendmentDelete(id, this.ocid).subscribe(resp => {
      this.getAmedments()


      switch (this.documentType) {
        case 'tender':
          this.tenderSvc.amendmentShowID(this.ocid, this.documentType).subscribe((resp: any) => {
            let form = {
              ocid: this.ocid,
              amendments: resp.amendments_id
            }
            this.tenderSvc.UpdateTender(form).subscribe()
          })
          break;

        case 'contract':
          this.tenderSvc.amendmentShowID(this.ocid, this.documentType).subscribe((resp: any) => {
            let form = {
              ocid: this.ocid,
              amendments: resp.amendments_id
            }
            //this.tenderSvc.UpdateTender(form).subscribe()
          })
          break;
      }
    })
  }


  editaramandments(id: string) {
    this.btnNuevo = false;
    this.btnGuardar = false;
    this.btnActualizar = true;
    this.tenderSvc.amendmentID(id).pipe(
      map((resp: any) => {
        this.amedment_id = resp.amendments._id
        this.amendmentForm.patchValue(
          {
            date: resp.amendments.date,
            rationale: resp.amendments.rationale,
            description: resp.amendments.description,
            documentType: this.documentType
          }
        )

      })
    )
      .subscribe()
  }

  ActualizarAmendments() {
    let data = {
      date: this.amendmentForm.value.date,
      rationale: this.amendmentForm.value.rationale,
      description: this.amendmentForm.value.description,
      ocid: this.ocid,
      documentType: this.documentType
    }
    this.tenderSvc.amendmentUpdate(this.amedment_id, data)
      .pipe(
        map((resp: any) => {
          this.getAmedments();
          this.btnNuevo = false;
          this.btnGuardar = true;
          this.btnActualizar = false;
          Swal.fire({ //position: 'top-end',
            icon: 'success',
            title: 'La información se ha actualizado con exito',
            showConfirmButton: false,
            timer: 1300
          })
          setTimeout(() => {
            this.cancel()
          }, 1500);
        })
      )
      .subscribe()

  }

  cancel(){
    window.location.reload();
  }

}
