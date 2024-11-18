import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree, ActivatedRoute } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { UsuarioService } from '../services/auth/usuario.service';
import { ContratoService } from '../services/pages/contrato.service';
import { PlaningService } from '../services/pages/planing.service';

@Injectable({
  providedIn: 'root'
})
export class ContratPassUserGuard  {

  usuario_id = "";

  public ocids: [] = []
  public ocid: string
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private plainSrv: PlaningService,
    private UsrService: UsuarioService) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    this.UsrService.validarToken()
      .pipe(
        tap(resp => {
          let urlCompleta = state.url
          let url = urlCompleta.split('/')
          let ruta = url[4]; //planeacion licitacion contrato
          ////(url[5]);
          switch (ruta) {
            case 'sellado':
              this.ocid = url[5];
              break;

            default:
              this.ocid = url[6];
              break;
          }
          if (resp) {
            this.usuario_id = this.UsrService.usuario.uid;
            this.plainSrv.UserContracts().subscribe((resp: any) => {
              const incl = resp.contratos.includes(this.ocid)
              if (!incl && this.UsrService.rolUser !== 'seseaadmin') {
                //this.router.navigateByUrl('sea/funcionarios/inicio-contrato');
                this.router.navigateByUrl('sea/funcionarios/inicio-contrato');
              }
            })
          }

        })
      ).subscribe()


    this.plainSrv.GetContrato().subscribe(resp => {

      ////(resp[0]);
    })
    return true;
  }

}
