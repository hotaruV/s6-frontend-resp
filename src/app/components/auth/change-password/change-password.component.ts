import { UsuarioService } from 'src/app/services/auth/usuario.service';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
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
    //this.fistloginValidate()
  }

  fistloginValidate(){
    if(this.getFistLogin === false){
      switch (this.getRol) {
        case "seseaadmin":
          this.router.navigateByUrl('sea/funcionarios/registro')
        break;
        case "adminstrador_ente":
          this.router.navigateByUrl('sea/funcionarios/contrato')
        break;
      }
    }
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
        this.fistloginValidate()
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
