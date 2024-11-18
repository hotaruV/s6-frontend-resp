import { UsuarioService } from 'src/app/services/auth/usuario.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {
  public getRol = "";
  constructor(private UsrService: UsuarioService,
    private router: Router) {
    //this.getRol = UsrService.usuario.getRol
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.UsrService.validarToken().pipe(
      tap(auth => {
        ////(this.UsrService.fistlogin);
        if (this.UsrService.rolUser !== 'seseaadmin') {
          // this.router.navigateByUrl('sea/funcionarios/inicio-contrato')
          this.router.navigateByUrl('sea/funcionarios/administracion/funcionario')
          return false
        } else {
          return true
        }
      })
    )
    //return true



  }

}
