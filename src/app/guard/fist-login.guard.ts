import { Observable, tap } from 'rxjs';
import { Usuario } from '../models/Usuarios/usuario.model';
import { UsuarioService } from 'src/app/services/auth/usuario.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FistLoginGuard {
  public getRol: any;
  public usuario: Usuario;
  constructor(private UsrService: UsuarioService, private router: Router) {
    //this.getRol = UsrService.usuario.getRol
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.UsrService.validarToken().pipe(
      tap((auth) => {
        ////(this.UsrService.fistlogin);
        if (this.UsrService.fistlogin) {
          this.router.navigateByUrl('/auth/change-password');
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
