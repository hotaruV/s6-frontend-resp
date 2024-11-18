import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractService } from 'src/app/services/pages/contract.service';
import { LicitationService } from 'src/app/services/pages/licitation.service';
import { map, switchMap, tap } from 'rxjs';
import Swal from 'sweetalert2'

interface Status {
  value: string;
  viewValue: string;
}

interface Moneda {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {

  moneda: Moneda[] = [
    { value: 'MXN', viewValue: 'Peso Mexicano (MXN)' },
    { value: 'USD', viewValue: 'Dolar Estadounidense (USD)' },
    { value: 'EUR', viewValue: 'Euro (EUR)' },
  ];
  estatus: Status[] = [
    { value: 'pending', viewValue: 'Pendiente' },
    { value: 'active', viewValue: 'Activa' },
    { value: 'cancelled', viewValue: 'Cancelada' },
    { value: 'terminated', viewValue: 'Terminada' },
  ];

  public ocid: string
  public awadID: string
  public contractID: string
  public edit_id: string


  public botonUpdate: boolean = true;
  public btnGuardar: boolean = true
  public btnActualizar: boolean = false

  public btnDocumentos = false;


  public btnNuevo: boolean = false
  public btnCancelar: boolean = false
  public btnSiguiente: boolean = true
  public btnAtras: boolean = true

  public datosContract: boolean = true;


  public periodID: any;
  public valueID: any;

  constructor(private fb: UntypedFormBuilder,
    private ContSvs: ContractService,
    private tenderSvc: LicitationService,
    private router: Router,
    private routeActive: ActivatedRoute
  ) {
    this.routeActive.params.subscribe(({ ocid, contract_id, award_id }) => {
      this.ocid = ocid;
      this.awadID = award_id;
      ////(contract_id);
      if (contract_id !== undefined) {
        this.contractID = contract_id
        this.getData()
      }
    })
  }

  ngOnInit(): void {
  }

  getData() {
    this.ContSvs.getAwardByOCIDawdidcid(this.ocid, this.contractID, this.awadID)
      .pipe(map((resp: any) => {
        ////(resp.contract);
        this.btnGuardar = false
        this.btnActualizar = true
        this.btnCancelar = true
        this.valueID = resp.contract.value._id
        this.periodID = resp.contract.period._id
        this.contractForm.patchValue({
          title: resp.contract.title,
          description: resp.contract.description,
          status: resp.contract.status,
          dateSigned: resp.contract.dateSigned,
          //values
          amount: resp.contract.value.amount,
          currency: resp.contract.value.currency,
          //period
          startDate: resp.contract.period.startDate,
          endDate: resp.contract.period.endDate,
          maxExtentDate: resp.contract.period.maxExtentDate,
        })
      })
      )
      .subscribe()
  }

  public contractForm = this.fb.group({
    //values

    title: ["", [Validators.required]],
    description: ["", [Validators.required]],
    status: ["", [Validators.required]],
    dateSigned: ["", [Validators.required]],
    //values
    amount: ["", [Validators.required]],
    currency: ["MXN", [Validators.required]],
    //period
    startDate: ["", [Validators.required]],
    endDate: ["", [Validators.required]],
    maxExtentDate: ["", [Validators.required]],
  })

  campoNoValido(campo: string) {
    return (
      this.contractForm.controls[campo].errors &&
      this.contractForm.controls[campo].touched
    );
  }

  formReset(form: FormGroup) {
    form.reset();
    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null);
    });
  }

  crearContract() {
    if (this.contractForm.invalid) {
      this.contractForm.markAllAsTouched();
      return;
    }

    let ContratoForm = {

      title: this.contractForm.value.title,
      description: this.contractForm.value.description,
      status: this.contractForm.value.status,
      dateSigned: this.contractForm.value.dateSigned,
      amount: this.contractForm.value.amount,
      currency: this.contractForm.value.currency,
      startDate: this.contractForm.value.startDate,
      endDate: this.contractForm.value.endDate,
      maxExtentDate: this.contractForm.value.maxExtentDate,
    }



    let dataValues = {
      amount: ContratoForm.amount,
      currency: ContratoForm.currency,
      id: this.ocid
    }
    let dataPeriod = {
      startDate: ContratoForm.startDate,
      endDate: ContratoForm.endDate,
      maxExtentDate: ContratoForm.maxExtentDate,
      id: this.ocid
    }
    ////(dataValues);

    this.ContSvs.contratoValueCreate(dataValues)
      .pipe(
        map((resp: any) => {
          this.valueID = resp._id;
          this.ContSvs.contratoPeriodCreate(dataPeriod)
            .pipe(
              tap((resp: any) => {
                this.periodID = resp._id;
                let dataContract = {
                  awardID: this.awadID,
                  ocid: this.ocid,
                  title: ContratoForm.title,
                  description: ContratoForm.description,
                  status: ContratoForm.status,
                  dateSigned: ContratoForm.dateSigned,
                  period: this.periodID,
                  value: this.valueID
                }
                this.ContSvs.contratoCreate(dataContract)
                  .pipe(
                    map((resp: any) => {

                      this.router.navigate(['/sea/funcionarios/contrataciones/contrato/document', this.ocid, this.awadID, resp._id])
                      //Swal.fire("Success", "Guardado Con exito", 'success');
                    })
                  ).subscribe()
              })
            ).subscribe()
        }, (err) => {
          Swal.fire("Periodo De Contratación", err.error.msg, 'error');
        })
      ).subscribe()
  }


  forward() {
    this.router.navigate(['/sea/funcionarios/contrataciones/contrato/index', this.ocid])
  }

  next() {
    this.router.navigate(['/sea/funcionarios/contrataciones/contrato/document', this.ocid, this.awadID, this.awadID])
  }


  cancel() {
    this.router.navigate(['/sea/funcionarios/contrataciones/contrato/index', this.ocid])
  }

  updateIdentifie() {
    if (this.contractForm.invalid) {
      this.contractForm.markAllAsTouched();
      return;
    }

    let ContratoForm = {
      title: this.contractForm.value.title,
      description: this.contractForm.value.description,
      status: this.contractForm.value.status,
      dateSigned: this.contractForm.value.dateSigned,
      amount: this.contractForm.value.amount,
      currency: this.contractForm.value.currency,
      startDate: this.contractForm.value.startDate,
      endDate: this.contractForm.value.endDate,
      maxExtentDate: this.contractForm.value.maxExtentDate,
    }

    let dataValues = {
      amount: ContratoForm.amount,
      currency: ContratoForm.currency,
      id: this.ocid
    }
    let dataPeriod = {
      startDate: ContratoForm.startDate,
      endDate: ContratoForm.endDate,
      maxExtentDate: ContratoForm.maxExtentDate,
      id: this.ocid
    }


    this.ContSvs.contratoValueUpdate(dataValues, this.valueID).subscribe((resp: any) => {
      if(resp.ok){
        this.ContSvs.contratoPeriodUpdate(dataPeriod, this.periodID).subscribe((resp:any) => {
          if(resp.ok){
            let dataContract = {
              title: ContratoForm.title,
              description: ContratoForm.description,
              status: ContratoForm.status,
              dateSigned: ContratoForm.dateSigned,
            }
            this.ContSvs.contratoUpdate(dataContract, this.contractID).subscribe((resp: any) => {
              if(resp.ok){
                Swal.fire({ //position: 'top-end',
                  icon: 'success',
                  title: 'La información se ha actualizado con exito',
                  showConfirmButton: false,
                  timer: 2300
                })
                // this.getData()
                this.btnCancelar = false;
                this.btnActualizar = false;
                this.btnSiguiente = false;
                this.btnDocumentos = true;
              }
            })
          }
        })
      }
    })
  }
}
