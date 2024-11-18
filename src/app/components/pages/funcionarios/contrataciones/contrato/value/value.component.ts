import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/auth/usuario.service';
import { LicitationService } from 'src/app/services/pages/licitation.service';

interface Moneda {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.scss']
})
export class ValueComponent implements OnInit {

  moneda: Moneda[] = [
    { value: 'MXN', viewValue: 'Peso Mexicano (MXN)' },
    { value: 'USD', viewValue: 'Dolar Estadounidense (USD)' },
    { value: 'EUR', viewValue: 'Euro (EUR)' },
  ];

  public botonUpdate: boolean = true;
  public botonSiguiente: boolean;

  public datosValue: boolean = true;

  constructor(private fb: UntypedFormBuilder,
    private licitationService: LicitationService,
    private UsrService: UsuarioService,
    private router: Router) { }

  ngOnInit(): void {
  }

  public valueForm = this.fb.group({
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
      this.valueForm.controls[campo].errors &&
      this.valueForm.controls[campo].touched
    );
  }

  formReset(form: FormGroup) {
    form.reset();
    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null);
    });
  }

  crearValue(){

  }

}
