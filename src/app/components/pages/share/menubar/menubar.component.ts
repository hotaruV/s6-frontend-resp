import { UsuarioService } from 'src/app/services/auth/usuario.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent implements OnInit {
 public getRol: any
 public getNombres: any


  constructor(private usrServ: UsuarioService) {
    this.getRol = usrServ.usuario.getRol;
    this.getNombres = usrServ.usuario.getNombres
  }

  ngOnInit(): void {
    ////(this.getRol);
    //this.isAdmin()
  }



  logout(){
    this.usrServ.logout();
  }

}
