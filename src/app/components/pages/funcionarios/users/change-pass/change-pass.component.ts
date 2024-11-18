
import { UsuarioService } from 'src/app/services/auth/usuario.service';
import { Router } from '@angular/router';
import { Validators, UntypedFormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})
export class ChangePassComponent implements OnInit {

  public passPattern: string = '^[a-zA-Z0-9]{8,15}$';

  public getEmail = "";
  public getRol = "";
  public getFistLogin = false;
  public NewPassForm = this.fb.group({
    lastpassword: ['', [Validators.required]],
    newpassword: ['', [Validators.required, Validators.pattern(this.passPattern)]],
  })

  constructor(private router: Router, private fb: UntypedFormBuilder, private usr:UsuarioService) {
    this.getEmail = usr.usuario.getEmail
    this.getFistLogin = usr.usuario.getFistLogin
    this.getRol = usr.usuario.getRol
  }

  ngOnInit(): void {

  }



  changePass() {
    if (this.NewPassForm.invalid) {
      this.NewPassForm.markAllAsTouched();
      return;
    }
    this.usr.cambiarPass(this.NewPassForm.value).subscribe(resp => {
      Swal.fire({icon: 'success',title: 'Contraseña Cambiada Con Exito',showConfirmButton: false, timer: 2000});
      this.getFistLogin = false;
      setTimeout(() => {

      }, 2000);
    }, (err)=> {
      Swal.fire("Error", err.error.msg, 'error');
    })
  }

  campoNoValido(campo: string) {
    return (
      this.NewPassForm.controls[campo].errors &&
      this.NewPassForm.controls[campo].touched
    );
  }

}
