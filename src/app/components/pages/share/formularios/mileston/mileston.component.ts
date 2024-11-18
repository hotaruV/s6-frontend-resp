import { respuestaTender } from './../../../../../interfaces/tender.interface';
import { LicitationService } from 'src/app/services/pages/licitation.service';
import { map, switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { PlaningService } from 'src/app/services/pages/planing.service';
import { UntypedFormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';


interface Status {
  value: string;
  viewValue: string;
}

interface Types {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-mileston',
  templateUrl: './mileston.component.html',
  styleUrls: ['./mileston.component.scss']
})
export class MilestonComponent implements OnInit {

  public inactivGuardar: boolean = true;
  public ocid: string;
  public nuevo: string;
  public milestones = []
  public rationale: string
  public milestone_id: string


  public btnGuardar: boolean = true
  public btnNuevo: boolean = false

  public btnActualizar: boolean = false
  public btnSiguiente: boolean = true
  public btnAtras: boolean = true
  public btnCancelar: boolean = false
  public btnTerminar: boolean = false

  @Input() milestoneType: string;
  @Input() BtnName: string;
  @Input() Radelante: string;
  @Input() Ratras: string;
  @Output() redireccionA: EventEmitter<any> = new EventEmitter();
  @Output() redireccionAT: EventEmitter<any> = new EventEmitter();

  status: Status[] = [
    { value: "scheduled", viewValue: 'Programado' },
    { value: "met", viewValue: 'Cumplido' },
    { value: "notMet", viewValue: 'No cumplido' },
    { value: "partiallyMet", viewValue: 'Parcialmente cumplido' },
  ];

  type: Types[] = [
    { value: "publicNotices", viewValue: 'Avisos a la población' },
    { value: "approval", viewValue: 'De aprobación' },
    { value: "delivery", viewValue: 'De entrega' },
    { value: "assessment", viewValue: 'De evaluación' },
    { value: "financing", viewValue: 'De financiamiento' },
    { value: "engagement", viewValue: 'De involucramiento' },
    { value: "reporting", viewValue: 'De reporte' },
    { value: "preProcurement", viewValue: 'Previos a la contratación' },
  ];

  constructor(private fb: UntypedFormBuilder,
    private planingService: PlaningService,
    private router: Router,
    private activateRute: ActivatedRoute,
    private tenderSvc: LicitationService,
  ) {
    this.activateRute.params.subscribe(({ ocid }) => {
      this.ocid = ocid;
      // this.milestoreForm.value.documentType = this.milestoneType
    })
  }

  ngOnInit(): void {
    this.initialDoc()
  }

  milestoreForm = this.fb.group({
    type: ["", [Validators.required]],
    title: ["", [Validators.required]],
    description: ["", [Validators.required]],
    dueDate: ["", [Validators.required]],
    dateMet: ["", [Validators.required]],
    dateModified: ['', [Validators.required]],
    status: ['', [Validators.required]]
  })




  campoNoValido(campo: string) {
    if (this.milestoreForm.valid) {
      this.inactivGuardar = false
    }
    return (
      this.milestoreForm.controls[campo].errors &&
      this.milestoreForm.controls[campo].touched
    );


  }

  crearMilestone() {
    if (this.milestoreForm.invalid) {
      this.milestoreForm.markAllAsTouched();
      return;
    }
    let form: any = this.milestoreForm.value;
    form = {
      type: form.type,
      title: form.title,
      description: form.description,
      dueDate: form.dueDate,
      dateMet: form.dateMet,
      dateModified: form.dateModified,
      status: form.status,
      document_id: this.ocid
    };
    ////(form);

    this.planingService.CrearPlanningMileStone(form, this.milestoneType)
      .subscribe((resp: respuestaTender) => {
        if (this.milestoneType == 'tender') {
          this.tenderUpdate(resp._id)
        }
        this.milestoreForm.reset()
        this.initialDoc()
      })
  }

  // agregarOtro() {
  //   this.nuevo = "Nuevo Documento"
  //   //window.location.reload();
  // }


  borrarMile(id: string) {
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
        this.planingService.deleteMilestone(id, this.ocid, this.milestoneType).subscribe(r => {
          if (this.milestoneType === 'tender') {
            this.tenderUpdate(id);
          }
          this.initialDoc()
          Swal.fire(
            'Borrado',
            'Se Ha Borrado Con Exito.',
            'success'
          )
        })

      }
    })
  }

  initialDoc() {


    this.activateRute.params.pipe(
      switchMap(({ ocid }) => this.planingService.getMilestones(this.milestoneType, ocid))
    )
      .subscribe((resp: any) => {
        ////(resp);
        this.milestones = resp.milestones
      })

    // this.planingService.getMilestones(this.milestoneType, this.ocid)
    //   .subscribe((resp: any) => {
    //     this.milestones = resp.milestones
    //     //(resp);
    //   })
  }



  forward() {
    this.redireccionAT.emit(this.Ratras)
  }

  next() {
    this.redireccionA.emit(this.Radelante)
  }


  private tenderUpdate(id: string) {
    let allDocus = []
    this.planingService.getMilestones(this.milestoneType, this.ocid)
      .pipe(
        map((resp: any) => {
          ////(resp);
          allDocus = resp.milestones
          let dataDocumenTender = {
            milestones: allDocus,
            ocid: this.ocid
          }
          this.tenderSvc.UpdateTender(dataDocumenTender).subscribe()
        })
      ).subscribe()
  }





  ActualizarMile(id: string) {
    this.planingService.getMilestone(id)
      .pipe(map((resp: any) => {
        //(resp);
        this.milestone_id = resp.milestones._id;
        this.btnGuardar = false
        this.btnActualizar = true
        this.btnCancelar = true
        this.btnNuevo = false
        this.btnSiguiente = false

        this.milestoreForm.patchValue(
          {
            type: resp.milestones.type,
            title: resp.milestones.title,
            status: resp.milestones.status,
            description: resp.milestones.description,
            dueDate: resp.milestones.dueDate,
            dateMet: resp.milestones.dateMet,
            dateModified: resp.milestones.dateModified,
            // dateModified: resp.milestones.dateModified,
          }
        )
      })
      )
      .subscribe()
  }


  updateMilestone() {

    if (this.milestoreForm.invalid) {
      this.milestoreForm.markAllAsTouched();
      return;
    }
    let form: any = this.milestoreForm.value;
    form = {
      type: form.type,
      title: form.title,
      description: form.description,
      dueDate: form.dueDate,
      dateMet: form.dateMet,
      dateModified: form.dateModified,
      status: form.status,
      document_id: this.ocid
    };
    this.planingService.updateMilestone(form, this.milestone_id)
      .pipe(
        map((resp: any) => {
          if (resp.ok) {
            this.initialDoc()
            this.btnTerminar = true;
            this.cancel()
            this.formReset(this.milestoreForm)
            Swal.fire({ //position: 'top-end',
              icon: 'success',
              title: 'La información se ha actualizado con exito',
              showConfirmButton: false,
              timer: 1300
            })

          }
        })
      ).subscribe()

  }


  cancel() {
    window.location.reload();
  }

  formReset(form: FormGroup) {
    //this.inactivGuardar = true;

    form.reset();
    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null);
    });
  }

  terminar() {
    this.router.navigate(['/sea/funcionarios/inicio-contrato/'])
  }

}
