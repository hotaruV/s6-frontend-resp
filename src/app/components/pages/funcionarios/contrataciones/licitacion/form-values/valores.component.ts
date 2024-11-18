import { respuestaTender } from '../../../../../../interfaces/tender.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { UsuarioService } from 'src/app/services/auth/usuario.service';
import { LicitationService } from 'src/app/services/pages/licitation.service';
import Swal from 'sweetalert2'


interface Moneda {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-procuring-entity',
  templateUrl: './valores.component.html',
  styleUrls: ['./valores.component.scss']
})
export class ValoresComponent implements OnInit {

  public btnGuardar: boolean = true
  public btnActualizar: boolean = false
  public btnSiguiente: boolean = true
  public btnNuevo: boolean = false

  public datosIdentifier: boolean = true;
  public ocid: string;
  public entity_id: string;
  public value_id: string;
  public minvalue_id: string;

  public tender_id: string



  moneda: Moneda[] = [
    { value: 'MXN', viewValue: 'Peso Mexicano (MXN)' },
    // { value: 'USD', viewValue: 'Dolar Estadounidense (USD)' },
    // { value: 'EUR', viewValue: 'Euro (EUR)' },
  ];

  constructor(private fb: UntypedFormBuilder,
    private tenderSvc: LicitationService,
    private router: Router,
    private routeActive: ActivatedRoute
  ) {
    this.routeActive.params.subscribe(({ ocid }) => {
      this.ocid = ocid;
    })
  }



  public procuringForm = this.fb.group({
    //procuring entinty
    name: ["", [Validators.required]],
    id: ["", [Validators.required]],
    //Value
    amount: ["", [Validators.required]],
    currency: ["MXN", [Validators.required]],
    // minvalue
    amountmin: ["", [Validators.required]],
    currencymin: ["MXN", [Validators.required]],
  })


  ngOnInit(): void {
    this.getTender()
  }

  getTender() {
    this.tenderSvc.getTenderByOcid(this.ocid)
      .pipe(
        map((resp: any) => {
          ////(resp.tender.procuringEntity);
          if (resp.ok) {
            if ( resp.tender.procuringEntity !== null && resp.tender.procuringEntity !== undefined
              && resp.tender.value !== null && resp.tender.value !== undefined
              && resp.tender.minValue !== null && resp.tender.minValue !== undefined) {
              this.btnGuardar = false
              this.btnActualizar = true
              this.btnSiguiente = true
              this.tender_id = resp.tender._id

              this.entity_id = resp.tender.procuringEntity._id
              this.value_id = resp.tender.value._id
              this.minvalue_id = resp.tender.minValue._id

              this.procuringForm.patchValue({
                name: resp.tender.procuringEntity.name,
                id: resp.tender.procuringEntity.id,
                amount: resp.tender.value.amount,
                currency: resp.tender.value.currency,
                amountmin: resp.tender.minValue.amount,
                currencymin: resp.tender.minValue.currency,


              });
            }

          }
        })
      ).subscribe()
  }

  campoNoValido(campo: string) {
    return (
      this.procuringForm.controls[campo].errors &&
      this.procuringForm.controls[campo].touched
    );
  }

  formReset(form: FormGroup) {
    form.reset();
    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null);
    });
  }

  crearProEntity() {
    ////(this.ocid);
    let values = {
      id: this.procuringForm.value.id, //este es el rfc
      name: this.procuringForm.value.name,
      amount: this.procuringForm.value.amount,
      currency: this.procuringForm.value.currency,
      minamount: this.procuringForm.value.amountmin,
      mincurrency: this.procuringForm.value.currencymin
    }

    let dataProcuring = {
      id: values.id,
      name: values.name,
      ocid: this.ocid
    }
    let dataValues = {
      amount: values.amount,
      currency: values.currency,
      ocid: this.ocid
    }
    let dataMinValues = {
      amount: values.minamount,
      currency: values.mincurrency,
      ocid: this.ocid
    }

    if (this.procuringForm.invalid) {
      this.procuringForm.markAllAsTouched();
      return;
    }

    this.tenderSvc.CreateEntity(dataProcuring).subscribe((data: respuestaTender) => {
      this.entity_id = data._id;
      this.tenderSvc.CreateValue(dataValues).subscribe((data: respuestaTender) => {
        this.value_id = data._id;
        this.tenderSvc.CreateMinValue(dataMinValues)
          .subscribe((data: respuestaTender) => {
            this.minvalue_id = data._id
            let dataTender = {
              "procuringEntity": this.entity_id,
              "value": this.value_id,
              "minValue": this.minvalue_id,
              "ocid": this.ocid
            }
            this.tenderSvc.UpdateTender(dataTender).subscribe(data => {
              this.router.navigate(['/sea/funcionarios/contrataciones/licitacion/document', this.ocid])
            })
          })
      })
    })



  }

  next() {
    this.router.navigate(['/sea/funcionarios/contrataciones/licitacion/document', this.ocid])
  }
  prev() {
    this.router.navigate(['/sea/funcionarios/contrataciones/licitacion/periodos', this.ocid])
  }


  ActualizarProc() {


    this.entity_id
    //(this.entity_id);
    this.value_id
    //(this.value_id);
    this.minvalue_id
    //(this.minvalue_id);
    let values = {
      id: this.procuringForm.value.id, //este es el rfc
      name: this.procuringForm.value.name,
      amount: this.procuringForm.value.amount,
      currency: this.procuringForm.value.currency,
      minamount: this.procuringForm.value.amountmin,
      mincurrency: this.procuringForm.value.currencymin
    }

    let dataProcuring = {
      id: values.id,
      name: values.name,
      ocid: this.ocid
    }
    let dataValues = {
      amount: values.amount,
      currency: values.currency,
      ocid: this.ocid
    }
    let dataMinValues = {
      amount: values.minamount,
      currency: values.mincurrency,
      ocid: this.ocid
    }

    if (this.procuringForm.invalid) {
      this.procuringForm.markAllAsTouched();
      return;
    }
    this.tenderSvc.UpdateEntity(dataProcuring, this.entity_id).subscribe(resp => {
      this.tenderSvc.UpdateValue(dataValues, this.value_id).subscribe(resp => {
        this.tenderSvc.UpdateMinValue(dataMinValues, this.minvalue_id).subscribe((resp: any) => {
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
        })
      })
    })
  }

}
