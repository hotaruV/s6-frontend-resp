import Swal from 'sweetalert2';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { PlaningService } from './../../../../../../services/pages/planing.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { map, switchMap } from 'rxjs';



@Component({
  selector: 'app-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.scss']
})
export class MilestoneComponent implements OnInit {

  @Input() BtnName: string = "Terminar Planeación";
  @Input() Radelante: string = "/sea/funcionarios/inicio-contrato"
  @Input() Ratras: string = "/sea/funcionarios/contrataciones/planeacion/budget"


  public ocid: string;
  public buyer: string;
  public budget: string;
  public rationale: string;
  public hasQuotes: boolean;
  public _id: string;
  public planning_id: string;
  public documents = [];
  public milestones = [];

  public cotizacion_no: string;

  public btnActualizarRazon: boolean = false
  public btnSiguiente: boolean = true


  constructor(
    private router: Router,
    private planingService: PlaningService,
    private activateRute: ActivatedRoute,
    private fb: UntypedFormBuilder
  ) {
    // this.BtnName = "Terminar Planeación";
    this.activateRute.params.subscribe(({ ocid }) => {
      this.ocid = ocid
    })
  }

  ngOnInit(): void {
    this.getMileStone()
  }

  getMileStone() {
    this.planingService.getRationale(this.ocid)
      .pipe(
        map((res: any) => {
          if (res.ok) {
            this.rationale = res.rationale;
            this.PlanningForm.patchValue({
              rationale: this.rationale
            })
            this.btnActualizarRazon = true
            this.btnSiguiente = false
          }

        })
      )
      .subscribe()
  }


  PlanningForm = this.fb.group({
    rationale: ['', [Validators.required]],
    hasQuotes: ['', ],
    cotizacion_no: ['', ],
    nom_requiriente: ['', [Validators.required]],
    nom_contratante: ['', [Validators.required]],
    nom_representante: ['', [Validators.required]],
  })

  CrearPlanning(e: string) {
    if (this.PlanningForm.invalid) {
      this.PlanningForm.markAllAsTouched();
      return;
    }

    let mils = []
    let dock = []

    this.activateRute.params
      .pipe(
        switchMap(({ ocid }) => this.planingService.getPlannigAll(ocid))
      )
      .subscribe((resp: any) => {
        this.buyer = resp.buyer
        this.budget = resp.budget._id;
        this.documents = resp.document;
        this.milestones = resp.milestone;
        this.documents.map((doc, id) => {
          dock.push(doc._id)
        })
        this.milestones.map((mi, id) => {
          mils.push(mi._id)
        })
        let newPlanning = {
          id: this.ocid,
          rationale: this.PlanningForm.value,
          budget: this.budget,
          document: dock,
          milestone: mils
        }
        this.planingService.CrearPlanning(newPlanning)
          .subscribe((resp: any) => {
            if (resp.ok) {
              let planning_id = localStorage.getItem("planning_id")
              let form = {
                "buyer": this.buyer,
                "planning": planning_id
              }
              this.planingService.actulizarReleaseDocument(form, this.ocid)
                .subscribe()
              this.router.navigateByUrl(this.Radelante)
              localStorage.removeItem('planning_id')
            }
            // } else {
            //   Swal.fire({
            //     icon: 'error',
            //     title: 'Error!',
            //     text: 'No se puede crear mas de una planeación',
            //   })
            //   this.router.navigateByUrl(this.Radelante)
            // }

            else{
              this.router.navigateByUrl(this.Radelante)
            }
          })



      })



  }



  campoNoValido(campo: string) {
    if (this.PlanningForm.valid) {
      //this.inactivGuardar = false
    }
    return (
      this.PlanningForm.controls[campo].errors &&
      this.PlanningForm.controls[campo].touched
    );


  }


  redireccionA(e: string) {
    this.router.navigate([this.Radelante])
  }

  redireccionAT(e: string) {
    this.router.navigate([this.Ratras, this.ocid])
  }

  getrationale(ocid: string) {

  }


  actualizarRationale() {
    if (this.PlanningForm.invalid) {
      this.PlanningForm.markAllAsTouched();
      return;
    }
    this.planingService.getRationale(this.ocid)
      .pipe(
        map((res: any) => {
            this.planning_id = res._id;
            ////(this.PlanningForm.value.rationale);
            let data = {
              rationale :  this.PlanningForm.value.rationale
            }
            this.planingService.ActualizarPlanning(data, this.planning_id).pipe(
              map((res:any) => {
                if(res.ok){
                  //this.cancel()
                  Swal.fire({ //position: 'top-end',
                    icon: 'success',
                    title: 'La razón se ha actualizado con exito',
                    showConfirmButton: false,
                    timer: 2300
                  });
                  this.getrationale(this.ocid)
                  // this.PlanningForm.controls['rationale'].disable();
                  // this.btnActualizarRazon = false;
                }
              })
            ).subscribe()
        })
      )
      .subscribe()
  }


  cancel(){
    window.location.reload();
  }


}
