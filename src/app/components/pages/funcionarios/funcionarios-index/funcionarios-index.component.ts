import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/auth/usuario.service';

@Component({
  selector: 'app-funcionarios-index',
  templateUrl: './funcionarios-index.component.html',
  styleUrls: ['./funcionarios-index.component.scss']
})
export class FuncionariosIndexComponent implements OnInit {
  public getRol = '';
  constructor(
    private usrServ: UsuarioService,
    private router: Router,

  ) {
    this.getRol = usrServ.usuario.getRol;
    ////(this.getRol);
    switch (this.getRol) {
      case 'adminstrador_ente':
        this.router.navigate(['/sea/funcionarios/registro'])
        break;
      case 'oic':
        this.router.navigate(['/sea/oic/contratos'])
        break;
      case 'seseaadmin':
        this.router.navigate(['/sea/funcionarios/registro'])
        break;
    }
  }

  ngOnInit(): void {
    ////(this.getRol);
  }

}
