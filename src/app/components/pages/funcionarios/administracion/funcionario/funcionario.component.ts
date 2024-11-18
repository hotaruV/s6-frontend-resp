import { Component } from '@angular/core';
import { UsuarioService } from '../../../../../services/auth/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.scss']
})
export class FuncionarioComponent {
  public getRol = '';
  public getNombres = '';
  public getIdUsuario = '';
  public getidentepublico = '';


  constructor(private usrServ: UsuarioService, private router: Router) {


  }


  redirigirAFuncionarios() {
    //('holi');
    this.router.navigate(['/administracion/actores']); // Reemplaza '/funcionarios' con la ruta real de tu sección de funcionarios
  }




}
