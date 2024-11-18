import { UsuarioService } from 'src/app/services/auth/usuario.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PlaningService } from '../../../../../../services/pages/planing.service';
import { UntypedFormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'

import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';

interface Format {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-planning',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.scss']
})
export class BuyerComponent implements OnInit {

  public ente: string;
  public buyer_id: string
  public budget_id: string

  public btnGuardar: boolean = true
  public btnActualizar: boolean = false

  public btnSiguiente: boolean = false
  public btnNuevo: boolean = false

  public ocid: string;

  monedas: Format[] = [
    { value: 'MXN', viewValue: 'Peso Mexícano (MXM)' },
    // { value: 'USD', viewValue: 'Dolar Estaunidense (USD)' },
    // { value: 'EUR', viewValue: 'Euro (EUR)' },
  ];


  public rfcPattern: string = '/^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/';


  constructor(private fb: UntypedFormBuilder,
    private planingService: PlaningService,
    private UsrService: UsuarioService,
    private router: Router,
    private rutaActiva: ActivatedRoute
  ) {
    this.ente = this.UsrService.Ente
    //localStorage.removeItem('ocid')
  }

  // public rfcpattern: string = '^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])([A-Z]|[0-9]){2}([A]|[0-9]){1})?$';

  public rfcMoralPattern: string = "^(([A-ZÑ&]{3})([0-9]{2})([0][13578]|[1][02])(([0][1-9]|[12][\\d])|[3][01])([A-Z0-9]{3}))|" + "(([A-ZÑ&]{3})([0-9]{2})([0][13456789]|[1][012])(([0][1-9]|[12][\\d])|[3][0])([A-Z0-9]{3}))|" + "(([A-ZÑ&]{3})([02468][048]|[13579][26])[0][2]([0][1-9]|[12][\\d])([A-Z0-9]{3}))|" + "(([A-ZÑ&]{3})([0-9]{2})[0][2]([0][1-9]|[1][0-9]|[2][0-8])([A-Z0-9]{3}))$";

  public buyerForm = this.fb.group({
    //Buyer
    name: ["", [Validators.required]],
    id: ["", [Validators.required, Validators.pattern(this.rfcMoralPattern)]],

    // budget
    description: ["", [Validators.required]],
    amount: ["", [Validators.required]],
    currency: ["MXN", [Validators.required]],
    uri: ["", [Validators.required]],
  })

  ngOnInit(): void {
    this.initialDoc();
    this.getData(this.ocid);
  }

  getData(ocid: string) {
    this.buyerForm.patchValue({ name: this.ente })
    this.planingService.getBuyer(ocid)
      .pipe(
        map((resp: any) => {
          if (resp.ok) {
            this.btnGuardar = false
            this.btnActualizar = true
            this.btnSiguiente = true
            this.buyer_id = resp.buyers._id
            this.buyerForm.patchValue({
              name: resp.buyers.name,
              id: resp.buyers.id
            });
            this.planingService.getBudget(this.ocid)
              .pipe(
                map((resp: any) => {
                  if (resp.ok) {
                    this.buyerForm.patchValue({
                      description: resp.budget.description,
                      uri: resp.budget.uri,
                      amount: resp.budget.amount.amount
                    });
                  }
                })
              ).subscribe()
          }

        })
      ).subscribe()


  }

  ActualizarBuyer(id: string) {
    let form = {
      name: this.buyerForm.value.name,
      id: this.buyerForm.value.id,
      ocid: this.ocid,

      description: this.buyerForm.value.description,
      amount: this.buyerForm.value.amount,
      currency: this.buyerForm.value.currency,
      uri: this.buyerForm.value.uri,
    };

    let formBuyerData = {
      name: form.name,
      id: form.id,
      ocid: this.ocid
    }

    let formBudget = {
      description: form.description,
      uri: form.uri,
      amount: {
        amount: form.amount,
        currency: form.currency
      },
      ocid: this.ocid
    }
    this.planingService.ActualizarBuyer(formBuyerData, id)
      .pipe(
        map((resp: any) => {
          this.planingService.ActualizarBudget(formBudget, this.ocid)
            .pipe(
              map((resp: any) => {
                if (resp.ok) {
                  Swal.fire({
                    //position: 'top-end',
                    icon: 'success',
                    title: 'La información se ha actualizado con exito',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  setTimeout(() => {
                    this.router.navigate(['/sea/funcionarios/contrataciones/planeacion/document', this.ocid])
                  }, 1800);
                }
              })
            ).subscribe()
        })
      ).subscribe()
  }


  campoNoValido(campo: string) {
    return (
      this.buyerForm.controls[campo].errors &&
      this.buyerForm.controls[campo].touched
    );
  }
  crearBuyer() {
    if (this.buyerForm.invalid) {
      this.buyerForm.markAllAsTouched();
      return;
    }
    let form = {
      name: this.buyerForm.value.name,
      id: this.buyerForm.value.id,
      ocid: this.ocid,

      description: this.buyerForm.value.description,
      amount: this.buyerForm.value.amount,
      currency: this.buyerForm.value.currency,
      uri: this.buyerForm.value.uri,
    };

    let formBuyerData = {
      name: form.name,
      id: form.id,
      ocid: this.ocid
    }

    let formBudget = {
      description: form.description,
      uri: form.uri,
      amount: {
        amount: form.amount,
        currency: form.currency
      },
      ocid: this.ocid
    }



    this.planingService.CrearBuyer(formBuyerData)
      .pipe(
        map(resp => {
          this.planingService.CrearPlanningBudget(formBudget)
            .pipe(
              map(resp => {
                ////(resp);
                this.formReset(this.buyerForm)
                this.router.navigate(['/sea/funcionarios/contrataciones/planeacion/document', this.ocid])
              })
            ).subscribe()
        })
      ).subscribe(resp => {

      })





  }

  initialDoc() {
    this.ocid = this.router.url
    let ruta = this.ocid.split('/');
    this.ocid = ruta[6];
  }

  formReset(form: FormGroup) {
    form.reset();
    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null);
      form.clearAsyncValidators()
    });
  }

  forward() {

  }

  next() {
    this.router.navigate(['/sea/funcionarios/contrataciones/planeacion/document', this.ocid])
  }



}
