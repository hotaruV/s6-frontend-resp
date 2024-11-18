//import { UsuarioService } from './../services/auth/usuario.service';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { tap } from 'rxjs';
import { ContratoService } from '../services/pages/contrato.service';

@Injectable({
  providedIn: 'root'
})
export class ContratoGuard implements CanActivate {

  urlA : string;
  urlAnt : string;
  loading : boolean = true;

  constructor(private router: Router, private route:ActivatedRoute, private contractServ: ContratoService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      this.contractServ.mostrarEtapa().subscribe( url => {
        this.loading = true;
        this.urlA = url;
        if (this.urlAnt == undefined) {
          this.urlAnt = url;
        }
        this.loading = false;
      });
      // do {} while (this.loading == false);
      ////(this.urlA);
      if(this.urlA == "planeacion"){
        ////(this.urlAnt);
        switch (this.urlAnt) {
          case "contrato":
          case "adjudicacion":
          case "licitacion":
              return false
            break;
          case "planeacion" :
          case "sellado" :
            this.urlAnt = this.urlA;
            return true
            break;
        }
      };

      if(this.urlA == "licitacion"){
        ////(this.urlAnt);
        switch (this.urlAnt) {
          case "contrato":
          case "adjudicacion":
          case "sellado":
            return false
            break;
          case "planeacion" :
          case "licitacion" :
            this.urlAnt = this.urlA;
            return true
            break;
        }
      };

      if(this.urlA == "contrato"){
        ////(this.urlAnt);
        switch (this.urlAnt) {
          case "planeacion":
          case "adjudicacion":
          case "sellado":
            return false
            break;
          case "licitacion" :
          case "contrato" :
            this.urlAnt = this.urlA;
            return true
            break;
        }
      };

      if(this.urlA == "adjudicacion"){
        ////(this.urlAnt);
        switch (this.urlAnt) {
          case "sellado":
          case "planeacion":
          case "licitacion":
            return false
            break;
          case "contrato" :
          case "adjudicacion" :
            this.urlAnt = this.urlA;
            return true
            break;
        }
      };

      if(this.urlA == "sellado"){
        ////(this.urlAnt);
        switch (this.urlAnt) {
          case "contrato":
          case "planeacion":
          case "licitacion":
              return false
            break;
          case "adjudicacion" :
          case "sellado" :
            this.urlAnt = this.urlA;
            return true
            break;
        }
      };
      // this.contractServ.mostrarEtapa().subscribe( url => {
      //   this.urlAnt = url;
      // });
      return true;
  }

}
