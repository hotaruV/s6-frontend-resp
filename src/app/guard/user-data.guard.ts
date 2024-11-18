import { UsuarioService } from 'src/app/services/auth/usuario.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataGuard  {

  usuario_id = "";

  constructor(private UsrService: UsuarioService,
    private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    //return true;

    return this.UsrService.validarToken().pipe(
      tap(auth => {
        this.usuario_id = this.UsrService.usuario.uid;
        return this.usuario_id;
        ////(this.UsrService.usuario);
        // if (this.UsrService.uid) {
        //   this.router.navigateByUrl('/auth/change-password');
        //   return false;
        // } else {
        //   return true;
        // }
      })
    )
  }

}
