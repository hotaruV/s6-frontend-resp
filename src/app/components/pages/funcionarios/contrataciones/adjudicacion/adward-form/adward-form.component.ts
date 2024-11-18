import { respServer } from './../../../../../../interfaces/planning.interface';
import { AwardService } from './../../../../../../services/pages/award.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { LicitationService } from 'src/app/services/pages/licitation.service';
import Swal from 'sweetalert2'

interface Moneda {
  value: string;
  viewValue: string;
}

interface Generic {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-adward-form',
  templateUrl: './adward-form.component.html',
  styleUrls: ['./adward-form.component.scss']
})
export class AdwardFormComponent implements OnInit {

  awardStatus: Generic[] = [
    { value: 'pending', viewValue: 'Adjudicación pendiente' },
    { value: 'active', viewValue: 'Adjudicación activa' },
    { value: 'cancelled', viewValue: 'Adjudicación cancelada' },
    { value: 'unsuccessful', viewValue: 'Adjudicación no concretada' },
  ];
  moneda: Moneda[] = [
    { value: 'MXN', viewValue: 'Peso Mexicano (MXN)' },
  ];

  public btnGuardar: boolean = true
  public btnActualizar: boolean = false
  public btnSiguiente: boolean = true
  public btnNuevo: boolean = false
  public btnCancelar: boolean = false
  public btnAtras: boolean = true
  public btnMenos: boolean = true


  public ocid: string
  public award_id: string;
  public suppliers_id = [];
  public periodAward_id: string;
  public valueAward_id: string;

  public datosValue: boolean = true;

  constructor(private fb: UntypedFormBuilder,
    private AdwardSvs: AwardService,
    private tenderSvc: LicitationService,
    private router: Router,
    private routeActive: ActivatedRoute
  ) {
    this.routeActive.params.subscribe(({ ocid, id }) => {
      this.ocid = ocid;
      if (id !== undefined) {
        localStorage.setItem('award_id', id)
        this.award_id = id
        this.getData()
      }

    })
  }
  ngOnInit(): void {
    this.addaward()

  }
  public AdwardForm = this.fb.group({
    // adward
    title: ["", [Validators.required]],
    description: ["", [Validators.required]],
    status: ["pending", [Validators.required]],
    date: ["2023-03-10", [Validators.required]],
    //values
    amount: ["110000", [Validators.required]],
    currency: ["MXN", [Validators.required]],
    //suppliers
    supliers: this.fb.array([]),
    //contractPeriod
    startDate: ["2023-03-16", [Validators.required]],
    endDate: ["2023-03-17", [Validators.required]],

  })
  public supliersForm = this.fb.group({
    name: ["", [Validators.required]],
    id: [""],
  });
  get suplierForm(): any {
    return this.AdwardForm.controls["supliers"] as FormArray;
  }
  addaward() {




    if (this.suplierForm.length + 1 <= 1) {
      this.btnMenos = false;
    } else {
      this.btnMenos = true;
    }
    // this.suplierForm.push(this.supliersForm);
    (<FormArray>this.AdwardForm.get('supliers')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'id': new FormControl(null, Validators.required),
      })
    );

  }
  deleteACs(AClIndex: number) {
    ////(AClIndex);

    if (this.suplierForm.length - 1 == 1) {
      this.btnMenos = false;
    } else {
      this.btnMenos = true;
    }
    if (this.suplierForm.length === 1) {
      return
    }
    this.suplierForm.removeAt(AClIndex);
  }
  formReset(form: FormGroup) {
    form.reset();
    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null);
    });
    this.btnSiguiente = true;
    this.btnNuevo = true;
    this.btnGuardar = false;
  }
  crearAdward() {
    let awardForm = {
      title: this.AdwardForm.value.title,
      description: this.AdwardForm.value.description,
      status: this.AdwardForm.value.status,
      date: this.AdwardForm.value.date,

      //suppliers
      supliers: this.AdwardForm.value.supliers,
      //values
      amount: this.AdwardForm.value.amount,
      currency: this.AdwardForm.value.currency,
      //contractPeriod
      startDate: this.AdwardForm.value.startDate,
      endDate: this.AdwardForm.value.endDate,
    }

    let ValuesData = {
      amount: awardForm.amount,
      currency: awardForm.currency,
      ocid: this.ocid
    }

    let PeriodData = {
      startDate: awardForm.startDate,
      endDate: awardForm.endDate,
      ocid: this.ocid
    }

    if (this.AdwardForm.invalid) {
      this.AdwardForm.markAllAsTouched();
      return;
    }

    this.AdwardSvs.createAwardValue(ValuesData)
      .pipe(
        map((resp: respServer) => {
          this.valueAward_id = resp._id;
          this.AdwardSvs.createAwardPeriod(PeriodData)
            .pipe(
              map((resp: respServer) => {
                this.periodAward_id = resp._id;
                let AdwardData = {
                  title: awardForm.title,
                  description: awardForm.description,
                  status: awardForm.status,
                  date: awardForm.date,
                }
                this.AdwardSvs.createAward(AdwardData)
                  .pipe(
                    map((resp: respServer) => {
                      localStorage.setItem("award_id", resp._id)
                      let award_id = localStorage.getItem('award_id')
                      this.AdwardSvs.createSuplier(this.AdwardForm.value.supliers, this.ocid, award_id)
                        .pipe(
                          map((resp: respServer) => {
                            this.AdwardSvs.getSupID(this.ocid, award_id)
                              .pipe(
                                map((resp: any) => {
                                  this.suppliers_id = resp.suppliers_id;
                                  let SuplierData = {
                                    value: this.valueAward_id,
                                    contractPeriod: this.periodAward_id,
                                    documents: [],
                                    suppliers: resp.suppliers_id,
                                    ocid: this.ocid,
                                    _id: award_id
                                  }
                                  this.AdwardSvs.UpdateAwardMain(SuplierData, award_id)
                                    .pipe(
                                      map((resp: any) => {
                                        this.router.navigate(['/sea/funcionarios/contrataciones/adjudicacion/document/', this.ocid])
                                      })
                                    ).subscribe()
                                })
                              ).subscribe()
                          })
                        ).subscribe()
                    })
                  ).subscribe()
              }, (err) => {
                Swal.fire("Periodo De Contratación", err.error.msg, 'error');
              }
              )
            ).subscribe()
        })
      ).subscribe()

  }
  next() {
    ////(this.dataKey);
    this.router.navigate(['/sea/funcionarios/contrataciones/adjudicacion/document/', this.ocid])
  }
  forward() {
    this.router.navigate(['/sea/funcionarios/inicio-contrato'])
  }
  campoNoValido(campo: string) {
    return (
      this.AdwardForm.controls[campo].errors &&
      this.AdwardForm.controls[campo].touched
    );
  }
  getData() {
    this.AdwardSvs.getCountItem(this.award_id)
      .pipe(
        map((resp: any) => {
          ////(resp.awards);
          this.btnGuardar = false
          this.btnActualizar = true


          this.award_id = resp.awards._id;
          this.valueAward_id = resp.awards.value._id
          this.periodAward_id = resp.awards.contractPeriod._id

          ////(this.suppliers_id);

          this.AdwardForm.patchValue({
            title: resp.awards.title,
            description: resp.awards.description,
            status: resp.awards.status,
            date: resp.awards.date,
            //values
            amount: resp.awards.value.amount,
            currency: resp.awards.value.currency,
            //suppliers
            supliers: resp.awards.suppliers,
            //contractPeriod
            startDate: resp.awards.contractPeriod.startDate,
            endDate: resp.awards.contractPeriod.endDate,
          })
        })
      )
      .subscribe()
    ////(this.award_id);
  }

  cancel() {

  }
  updateAward() {
    let awardForm = {
      title: this.AdwardForm.value.title,
      description: this.AdwardForm.value.description,
      status: this.AdwardForm.value.status,
      date: this.AdwardForm.value.date,

      //suppliers
      supliers: this.AdwardForm.value.supliers,
      //values
      amount: this.AdwardForm.value.amount,
      currency: this.AdwardForm.value.currency,
      //contractPeriod
      startDate: this.AdwardForm.value.startDate,
      endDate: this.AdwardForm.value.endDate,
    }

    let ValuesData = {
      amount: awardForm.amount,
      currency: awardForm.currency,
      ocid: this.ocid
    }

    let PeriodData = {
      startDate: awardForm.startDate,
      endDate: awardForm.endDate,
      ocid: this.ocid
    }
    let AdwardData = {
      title: awardForm.title,
      description: awardForm.description,
      status: awardForm.status,
      date: awardForm.date,
    }

    if (this.AdwardForm.invalid) {
      this.AdwardForm.markAllAsTouched();
      return;
    }

    this.AdwardSvs.updateAwardValue(ValuesData, this.valueAward_id).subscribe((resp: any) => {
      if (resp.ok) {
        this.AdwardSvs.updateAwardPeriod(PeriodData, this.periodAward_id).subscribe((resp: any) => {
          if (resp.ok) {
            this.AdwardSvs.updateAwardByID(AdwardData, this.award_id).subscribe((resp: any) => {
              if (resp.ok) {
                this.cancel()
                Swal.fire({ //position: 'top-end',
                  icon: 'success',
                  title: 'La información se ha actualizado con exito',
                  showConfirmButton: false,
                  timer: 1300
                })
                this.router.navigate(['/sea/funcionarios/contrataciones/adjudicacion/document', this.ocid])
              }
            })
          }
        })
      }
    })


  }

}
