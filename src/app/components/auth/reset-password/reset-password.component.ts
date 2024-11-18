import { UsuarioService } from 'src/app/services/auth/usuario.service';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private router: Router, private fb: UntypedFormBuilder, private usr:UsuarioService) { }

  ngOnInit(): void {
  }


}
