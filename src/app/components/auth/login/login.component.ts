import { UsuarioService } from './../../../services/auth/usuario.service';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  public fist_login = true;
  public LoginForm = this.fb.group({
    // email: ['prueba@prueba.com', [Validators.required, Validators.pattern(this.emailPattern)],],
    // password: ['pass1234', [Validators.required]],
    email: ['', [Validators.required],],
    password: ['', [Validators.required]],
  })

  constructor(private router: Router, private fb: UntypedFormBuilder, private usr: UsuarioService) {

  }
  login() {
    if (this.LoginForm.invalid) {
      this.LoginForm.markAllAsTouched();
      return;
    }

    this.usr.login(this.LoginForm.value).subscribe(resp => {
      ////(resp.ok);
      if (resp.ok) {
        this.router.navigateByUrl('sea/funcionarios/sistema');
      }
    }, (err) => {
      Swal.fire("Error", err.error.msg, 'error');
    })



    //this.router.navigateByUrl('auth/register')

  }

  campoNoValido(campo: string) {
    return (
      this.LoginForm.controls[campo].errors &&
      this.LoginForm.controls[campo].touched
    );
  }

}
