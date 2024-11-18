import { UsuarioService } from './../services/auth/usuario.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private userService: UsuarioService,
    private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    return this.userService.validarToken()
      .pipe(
        tap(auth => {
          if (!auth) {
            this.router.navigateByUrl('auth/login');
          }
        })
      );
  }

}
