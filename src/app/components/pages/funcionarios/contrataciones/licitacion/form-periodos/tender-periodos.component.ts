import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { respuestaTender } from 'src/app/interfaces/tender.interface';

import { LicitationService } from 'src/app/services/pages/licitation.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-tender-period',
  templateUrl: './tender-periodos.component.html',
  styleUrls: ['./tender-periodos.component.scss']
})
export class PeriodosComponent implements OnInit {

  public btnGuardar: boolean = true
  public btnActualizar: boolean = false
  public btnSiguiente: boolean = true
  public btnNuevo: boolean = false

  public datosClass: boolean = true;
  public ocid: string;
  public tenderPeriod_id: string
  public enquincyPeriod_id: string
  public awardPeriod_id: string
  public tender_id: string

  public tenderP_id: string
  public enquincyP_id: string
  public awardP_id: string

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
    this.getTender();
  }
  getTender() {
    this.tenderSvc.getTenderByOcid(this.ocid)
      .pipe(
        map((resp: any) => {
          ////(resp.tender.tenderPeriod);
          if (resp.ok) {
            if (resp.tender.tenderPeriod !== null &&  resp.tender.tenderPeriod !== undefined && resp.tender.enquiryPeriod !== null &&  resp.tender.enquiryPeriod !== undefined && resp.tender.awardPeriod !== null && resp.tender.awardPeriod !== undefined) {
              this.btnGuardar = false
              this.btnActualizar = true
              this.btnSiguiente = true
              this.tender_id = resp.tender._id

              this.tenderP_id = resp.tender.tenderPeriod._id;
              this.enquincyP_id = resp.tender.enquiryPeriod._id;
              this.awardP_id = resp.tender.awardPeriod._id;

              this.periodForm.patchValue({
                startDate: resp.tender.tenderPeriod.startDate,
                endDate: resp.tender.tenderPeriod.endDate,
                maxExtentDate: resp.tender.tenderPeriod.maxExtentDate,
                durationInDays: resp.tender.tenderPeriod.durationInDays,


                startDateEnquincy: resp.tender.enquiryPeriod.startDate,
                endDateEnquincy: resp.tender.enquiryPeriod.endDate,
                maxExtentDateEnquincy: resp.tender.enquiryPeriod.maxExtentDate,
                durationInDaysEnquincy: resp.tender.enquiryPeriod.durationInDays,

                startDateAward: resp.tender.awardPeriod.startDate,
                endDateAward: resp.tender.awardPeriod.endDate,
                maxExtentDateAward: resp.tender.awardPeriod.maxExtentDate,
                durationInDaysAward: resp.tender.awardPeriod.durationInDays,
              });
            }

          }
        })
      )
      .subscribe()
  }
  public periodForm = this.fb.group({
    //Buyer
    startDate: ["", [Validators.required]],
    endDate: ["", [Validators.required]],
    maxExtentDate: ["", [Validators.required]],
    durationInDays: [""],

    startDateEnquincy: ["", [Validators.required]],
    endDateEnquincy: ["", [Validators.required]],
    maxExtentDateEnquincy: ["", [Validators.required]],
    durationInDaysEnquincy: [""],

    startDateAward: ["", [Validators.required]],
    endDateAward: ["", [Validators.required]],
    maxExtentDateAward: ["", [Validators.required]],
    durationInDaysAward: [""],
  })
  campoNoValido(campo: string) {
    return (
      this.periodForm.controls[campo].errors &&
      this.periodForm.controls[campo].touched
    );
  }
  formReset(form: FormGroup) {
    form.reset();
    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null);
    });
  }
  crearTenderP() {
    let values = {
      startDate: this.periodForm.value.startDate, //este es el rfc
      endDate: this.periodForm.value.endDate,
      maxExtentDate: this.periodForm.value.maxExtentDate,
      startDateEnquincy: this.periodForm.value.startDateEnquincy,
      endDateEnquincy: this.periodForm.value.endDateEnquincy,
      maxExtentDateEnquincy: this.periodForm.value.maxExtentDateEnquincy,
      startDateAward: this.periodForm.value.startDateAward,
      endDateAward: this.periodForm.value.endDateAward,
      maxExtentDateAward: this.periodForm.value.maxExtentDateAward
    }

    let dataTenderPeriod = {
      startDate: values.startDate,
      endDate: values.endDate,
      maxExtentDate: values.maxExtentDate,
      ocid: this.ocid
    }

    let dataEnquiencyPeriod = {
      startDate: values.startDateEnquincy,
      endDate: values.endDateEnquincy,
      maxExtentDate: values.maxExtentDateEnquincy,
      ocid: this.ocid
    }

    let dataAwardPeriod = {
      startDate: values.startDateAward,
      endDate: values.endDateAward,
      maxExtentDate: values.maxExtentDateAward,
      ocid: this.ocid
    }

    if (this.periodForm.invalid) {
      this.periodForm.markAllAsTouched();
      return;
    }

    this.tenderSvc.CreateTenderPeriod(dataTenderPeriod).subscribe((data: respuestaTender) => {
      this.tenderPeriod_id = data._id;
      this.tenderSvc.CreateEnquincyPeriod(dataEnquiencyPeriod).subscribe((data: respuestaTender) => {
        this.enquincyPeriod_id = data._id;
        this.tenderSvc.CreateAwardPeriod(dataAwardPeriod)
          .subscribe((data: respuestaTender) => {
            this.awardPeriod_id = data._id
            let dataTender = {
              "tenderPeriod": this.tenderPeriod_id,
              "enquiryPeriod": this.enquincyPeriod_id,
              "awardPeriod": this.awardPeriod_id,
              "ocid": this.ocid
            }
            this.tenderSvc.UpdateTender(dataTender).subscribe(data => {
              this.router.navigate(['/sea/funcionarios/contrataciones/licitacion/valores', this.ocid])
            })
          }
            , (err) => {
              Swal.fire("Periodo De Adjudicación", err.error.msg, 'error');
            })
      }
        , (err) => {
          Swal.fire("Periodo De Aclaraciones", err.error.msg, 'error');
        })
    }
      , (err) => {
        Swal.fire("Periodo De Licitación", err.error.msg, 'error');
      })




  }
  forward() {
    this.router.navigate(['/sea/funcionarios/contrataciones/licitacion/tender', this.ocid])
  }
  next() {
    this.router.navigate(['/sea/funcionarios/contrataciones/licitacion/valores', this.ocid])
  }
  ActualizarTenderp() {
    // this.tenderP_id
    // ////(this.tenderP_id);
    // this.enquincyP_id
    // ////(this.enquincyP_id);
    // this.awardP_id
    ////(this.awardP_id);
    let values = {
      startDate: this.periodForm.value.startDate, //este es el rfc
      endDate: this.periodForm.value.endDate,
      maxExtentDate: this.periodForm.value.maxExtentDate,
      startDateEnquincy: this.periodForm.value.startDateEnquincy,
      endDateEnquincy: this.periodForm.value.endDateEnquincy,
      maxExtentDateEnquincy: this.periodForm.value.maxExtentDateEnquincy,
      startDateAward: this.periodForm.value.startDateAward,
      endDateAward: this.periodForm.value.endDateAward,
      maxExtentDateAward: this.periodForm.value.maxExtentDateAward
    }

    let dataTenderPeriod = {
      startDate: values.startDate,
      endDate: values.endDate,
      maxExtentDate: values.maxExtentDate,
      ocid: this.ocid
    }

    let dataEnquiencyPeriod = {
      startDate: values.startDateEnquincy,
      endDate: values.endDateEnquincy,
      maxExtentDate: values.maxExtentDateEnquincy,
      ocid: this.ocid
    }

    let dataAwardPeriod = {
      startDate: values.startDateAward,
      endDate: values.endDateAward,
      maxExtentDate: values.maxExtentDateAward,
      ocid: this.ocid
    }

    if (this.periodForm.invalid) {
      this.periodForm.markAllAsTouched();
      return;
    }

    this.tenderSvc.UpdateTenderPeriod(dataTenderPeriod, this.tenderP_id).subscribe(resp => {
      this.tenderSvc.UpdateEnquincyPeriod(dataEnquiencyPeriod, this.enquincyP_id).subscribe(resp => {
        this.tenderSvc.UpdateAwardPeriod(dataAwardPeriod, this.awardP_id).subscribe((resp: any) => {
          if (resp.ok) {
            Swal.fire({
              //position: 'top-end',
              icon: 'success',
              title: 'La información se ha actualizado con exito',
              showConfirmButton: false,
              timer: 1500
            })
            this.getTender()
          }
        },
          (err) => {
            Swal.fire("Periodo De Adjudicación", err.error.msg, 'error');
          })
      }
        , (err) => {
          Swal.fire("Periodo De Aclaraciones", err.error.msg, 'error');
        })
    }
      , (err) => {
        Swal.fire("Periodo De Licitación", err.error.msg, 'error');
      })




    // this.tenderSvc.UpdateTender(data)
    // .pipe(
    //   map((resp: any) => {
    //     if(resp.ok){
    //       Swal.fire({
    //         //position: 'top-end',
    //         icon: 'success',
    //         title: 'La información se ha actualizado con exito',
    //         showConfirmButton: false,
    //         timer: 1500
    //       })
    //       setTimeout(() => {
    //         this.next()
    //       }, 1800);
    //     }
    //   })
    // )
  }

}
