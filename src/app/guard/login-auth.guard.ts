import { UsuarioService } from 'src/app/services/auth/usuario.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthGuard  {
  constructor(private router: Router,private usr:UsuarioService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any  {
      let valid = this.usr.validarToken();
      valid.subscribe(res => {
        if(res){
          this.router.navigateByUrl('sea/funcionarios/registro');
        }else{
          this.router.navigateByUrl('auth/login');
        }
      })
  }

}
