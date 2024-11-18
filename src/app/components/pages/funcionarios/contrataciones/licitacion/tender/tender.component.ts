import { Component, OnInit, Pipe } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { LicitationService } from 'src/app/services/pages/licitation.service';
import Swal from 'sweetalert2'

interface Generic {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-tender',
  templateUrl: './tender.component.html',
  styleUrls: ['./tender.component.scss']
})
export class TenderComponent implements OnInit {

  tenderStatus: Generic[] = [
    { value: 'planning', viewValue: 'Planificación' },
    { value: 'planned', viewValue: 'Planificado' },
    { value: 'active', viewValue: 'Activo' },
    { value: 'cancelled', viewValue: 'Cancelado' },
    { value: 'unsuccessful', viewValue: 'Fracasado' },
    { value: 'complete', viewValue: 'Completado' },
    { value: 'withdrawn', viewValue: 'Retirado' },
  ];

  procurementMethod: Generic[] = [
    { value: 'direct', viewValue: 'Adjudicación directa' },
    { value: 'selective', viewValue: 'Investigación Restringida (3 Provedores)' },
    { value: 'open', viewValue: 'Convocatoria abierta' },
  ];

  awardCriteria: Generic[] = [
    { value: 'priceOnly', viewValue: 'Precio individual más bajo' },
    { value: 'costOnly', viewValue: 'Precio final más bajo' },
    { value: 'qualityOnly', viewValue: 'Mejor calidad' },
    { value: 'ratedCriteria', viewValue: 'Criterios específicos' },
    { value: 'lowestCost', viewValue: 'Costo más bajo' },
    { value: 'bestProposal', viewValue: 'Mejor propuesta' },
    { value: 'bestValueToGovernment', viewValue: 'Mejor valor para el gobierno' },
    { value: 'singleBidOnly', viewValue: 'Oferta única' },
  ];

  submissionMethod: Generic[] = [
    { value: 'electronicSubmission', viewValue: 'Envió electrónico' },
    { value: 'electronicAuction', viewValue: 'Subasta electrónica' },
    { value: 'written', viewValue: 'Escrito firmado' },
    { value: 'inPerson', viewValue: 'En persona' },
  ];

  public botonUpdate: boolean = true;
  public btnNext: boolean = true;
  public btnPrev: boolean = true;

  public btnGuardar: boolean = true
  public btnActualizar: boolean = false

  public btnSiguiente: boolean = false
  public btnNuevo: boolean = false

  public datosTender: boolean = true;
  public ocid: string;

  public texto: string[] = [];
  public key: string[] = [];
  public var = "";


  public tender_id: string



  constructor(private fb: UntypedFormBuilder,
    private tenderSvc: LicitationService,
    private router: Router,
    private routeActive: ActivatedRoute
  ) {
    this.routeActive.params.subscribe(({ ocid }) => {
      this.ocid = ocid;
    })
  }



  public tenderForm = this.fb.group({
    //Buyer
    title: ["", [Validators.required]],
    description: ["", [Validators.required]],
    status: ["", [Validators.required]],
    procurementMethod: ["", [Validators.required]],
    procurementMethodDetails: ["", [Validators.required]],
    procurementMethodRationale: ["", [Validators.required]],
    awardCriteria: ["", [Validators.required]],
    awardCriteriaDetails: ["", [Validators.required]],
    submissionMethod: ["", [Validators.required]],
    submissionMethodDetails: ["", [Validators.required]],
    numberOfTenderers: ["", [Validators.required]],


    // title: ["Salida de viaje", [Validators.required]],
    // description: ["Se puede establecer nuevo contrato", [Validators.required]],
    // status: ["planning", [Validators.required]],
    // procurementMethod: ["direct", [Validators.required]],
    // procurementMethodDetails: ["Se admitiran nuevas partes", [Validators.required]],
    // procurementMethodRationale: ["Se puede renovar", [Validators.required]],
    // awardCriteria: ["qualityOnly", [Validators.required]],
    // awardCriteriaDetails: ["Se pueden renovar", [Validators.required]],
    // submissionMethod: [["electronicSubmission", 'written'], [Validators.required]],
    // submissionMethodDetails: ["Se admiten cambios", [Validators.required]],

  })


  ngOnInit(): void {
    this.getTender()
  }

  getTender() {
    this.tenderSvc.getTenderByOcid(this.ocid)
      .pipe(
        map((resp: any) => {
          if (resp.ok) {
            this.btnGuardar = false
            this.btnActualizar = true
            this.btnSiguiente = true
            this.tender_id = resp.tender._id
            this.tenderForm.patchValue({

              title: resp.tender.title,
              description: resp.tender.description,
              status: resp.tender.status,
              procurementMethod: resp.tender.procurementMethod,
              procurementMethodDetails: resp.tender.procurementMethodDetails,
              procurementMethodRationale: resp.tender.procurementMethodRationale,
              awardCriteria: resp.tender.awardCriteria,
              awardCriteriaDetails: resp.tender.awardCriteriaDetails,
              submissionMethod: resp.tender.submissionMethod,
              submissionMethodDetails: resp.tender.submissionMethodDetails,
              numberOfTenderers: resp.tender.numberOfTenderers,

            });
          }
        })
      )
      .subscribe()
  }

  campoNoValido(campo: string) {
    return (
      this.tenderForm.controls[campo].errors &&
      this.tenderForm.controls[campo].touched
    );
  }

  formReset(form: FormGroup) {
    form.reset();
    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null);
    });
  }

  crearTender() {
    let data = {
      title: this.tenderForm.value.title,
      description: this.tenderForm.value.description,
      status: this.tenderForm.value.status,
      procurementMethod: this.tenderForm.value.procurementMethod,
      procurementMethodDetails: this.tenderForm.value.procurementMethodDetails,
      procurementMethodRationale: this.tenderForm.value.procurementMethodRationale,
      awardCriteria: this.tenderForm.value.awardCriteria,
      awardCriteriaDetails: this.tenderForm.value.awardCriteriaDetails,
      submissionMethod: this.tenderForm.value.submissionMethod,
      submissionMethodDetails: this.tenderForm.value.submissionMethodDetails,
      numberOfTenderers: this.tenderForm.value.numberOfTenderers,
      ocid: this.ocid
    }

    if (this.tenderForm.invalid) {
      this.tenderForm.markAllAsTouched();
      return;
    }

    this.tenderSvc.createTender(data).subscribe(data => {
      this.router.navigate(['/sea/funcionarios/contrataciones/licitacion/periodos', this.ocid])
    })

    ////(values);

  }

  next() {
    this.router.navigate(['/sea/funcionarios/contrataciones/licitacion/periodos', this.ocid])
  }
  prev() {
    this.router.navigate(['/sea/funcionarios/contrataciones/licitacion/partie', this.ocid])
  }


  ActualizarTender(id: string) {
    let data = {
      _id: this.tender_id,
      title: this.tenderForm.value.title,
      description: this.tenderForm.value.description,
      status: this.tenderForm.value.status,
      procurementMethod: this.tenderForm.value.procurementMethod,
      procurementMethodDetails: this.tenderForm.value.procurementMethodDetails,
      procurementMethodRationale: this.tenderForm.value.procurementMethodRationale,
      awardCriteria: this.tenderForm.value.awardCriteria,
      awardCriteriaDetails: this.tenderForm.value.awardCriteriaDetails,
      submissionMethod: this.tenderForm.value.submissionMethod,
      submissionMethodDetails: this.tenderForm.value.submissionMethodDetails,
      numberOfTenderers: this.tenderForm.value.numberOfTenderers,
      ocid: this.ocid
    }

    if (this.tenderForm.invalid) {
      this.tenderForm.markAllAsTouched();
      return;
    }
    this.tenderSvc.UpdateTender(data)
    .pipe(
      map((resp: any) => {
        if(resp.ok){
          Swal.fire({
            //position: 'top-end',
            icon: 'success',
            title: 'La información se ha actualizado con exito',
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout(() => {
            this.next()
          }, 1800);
        }
      })
    )
    .subscribe()
  }

}
