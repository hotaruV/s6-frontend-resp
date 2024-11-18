import { UsuarioService } from 'src/app/services/auth/usuario.service';
import { Budget } from './../../../../../../interfaces/contrato.interface';
import { Router } from '@angular/router';
import { PlaningService } from './../../../../../../services/pages/planing.service';
import { UntypedFormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
interface Format {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})


export class BudgetComponent implements OnInit {

  public btnGuardar: boolean = true
  public btnActualizar: boolean = false
  public btnSiguiente: boolean = true
  public btnNuevo: boolean = false


  public usr_id: string;
  public buget_id: string = ""
  public buget_db: string = ""
  public ocid:string;
  public urlPatern = /^[A-Za-z][A-Za-z\d.+-]*:\/*(?:\w+(?::\w+)?@)?[^\s/]+(?::\d+)?(?:\/[\w#!:.?+=&%@\-/]*)?$/

  constructor(private fb: UntypedFormBuilder,
    private planingService: PlaningService,
    private UsrService: UsuarioService,
    private router: Router
  ) {
    this.buget_id = this.planingService.buguet_id;
    this.usr_id = this.UsrService.authID;
  }
  monedas: Format[] = [
    { value: 'MXN', viewValue: 'Peso Mexícano (MXM)' },
    { value: 'USD', viewValue: 'Dolar Estaunidense (USD)' },
    { value: 'EUR', viewValue: 'Euro (EUR)' },
  ];





  budgetForm = this.fb.group({
    description: ["", [Validators.required]],
    amount: ["", [Validators.required]],
    currency: ["", [Validators.required]],
    uri: ['', [Validators.required ,Validators.pattern(this.urlPatern)]],
  })



  ngOnInit(): void {
    ////(this.budgetForm.value.amount);
    this.isBuget();
  }

  campoNoValido(campo: string) {
    return (
      this.budgetForm.controls[campo].errors &&
      this.budgetForm.controls[campo].touched
    );
  }

  crearbudget() {
    if (this.budgetForm.invalid) {
      this.budgetForm.markAllAsTouched();
      return;
    }
    let form: any = this.budgetForm.value;
    form = {
      "description": form.description,
      "uri": form.uri,
      'amount': {
        "amount": this.budgetForm.value.amount,
        "currency": this.budgetForm.value.currency
      },
      "ocid": this.ocid
    };
    this.planingService.CrearPlanningBudget(form).subscribe(resp => {
      this.router.navigate(['/sea/funcionarios/contrataciones/planeacion/document', this.ocid])
    })

  }



  isBuget() {
    this.ocid = this.router.url
    let ruta = this.ocid.split('/');
    this.ocid = ruta[6];
  }


  formReset(form: FormGroup) {
    form.reset();
    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null);
    });
  }


  forward() {
    this.router.navigate(['/sea/funcionarios/contrataciones/planeacion/buyer', this.ocid])
  }

  next() {
    this.router.navigate(['/sea/funcionarios/contrataciones/planeacion/document', this.ocid])
  }

}
