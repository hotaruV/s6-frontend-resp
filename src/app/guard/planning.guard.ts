import { PlaningService } from 'src/app/services/pages/planing.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { respServer } from '../interfaces/planning.interface'


@Injectable({
  providedIn: 'root'
})
export class PlanningGuard  {

  private ocid: string;
  constructor(
    private planningServ: PlaningService,
    private router: Router,
  ) {
  }



  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {


    this.ocid = route.params['ocid'];
    let urlCompleta = state.url
    let url = urlCompleta.split('/')
    let ruta = url[4]; //planeacion licitacion contrato
    let formulario = url[5];  //plenacion/buyers/ocid ...etc

    switch (ruta) {
      case "planeacion":
        this.planningServ.getPlannigAll(this.ocid).subscribe(({budget, buyer, document}:respServer) =>{
          ////(document.length);
          if(buyer._id =! null){
            this.router.navigate(['/sea/funcionarios/contrataciones/planeacion/budget', this.ocid])
          }
          if(budget._id =! null){
            this.router.navigate(['/sea/funcionarios/contrataciones/planeacion/document', this.ocid])
          }
          switch (formulario){
            case "document":
              if(document.length >= 0){
                ////('aqui');
              }
          }
        })
      break;

      default:
        break;
    }




    // this.planningServ.GetContratoOCID(this.ocid).subscribe((resp: any) => {
    //   if (resp.release.buyer != null && resp.release.planning != null) {
    //     this.router.navigate(['/sea/funcionarios/contrataciones/licitacion', this.ocid])
    //     //("aqui")
    //   } else {
    //     this.planningServ.getPlannigAll(this.ocid).subscribe((resp: respServer) => {
    //       //(resp);
    //       return
    //       if (!resp.ok) {
    //         this.router.navigate(['/sea/funcionarios/contrataciones/planeacion/buyer', this.ocid])
    //       }

    //       if (resp.buyer != null) {
    //         this.router.navigate(['/sea/funcionarios/contrataciones/planeacion/budget', this.ocid])
    //       }
    //       if (resp.budget != null) {
    //         this.router.navigate(['/sea/funcionarios/contrataciones/planeacion/document', this.ocid])
    //       }
    //     })
    //   }
      // //return true
      // if (!resp.ok) {
      //   this.router.navigate(['/sea/funcionarios/contrataciones/planeacion/buyer', this.ocid])
      // }

      // if (resp.buyer != null) {
      //   this.router.navigate(['/sea/funcionarios/contrataciones/planeacion/budget', this.ocid])
      // }
      // if (resp.budget != null) {
      //   this.router.navigate(['/sea/funcionarios/contrataciones/planeacion/document', this.ocid])
      // }
      // if (resp.budget != null && resp.buyer != null) {
      //   this.planningServ.GetContratoOCID(this.ocid).subscribe((resp: any) => {
      //     if (resp.release.buyer != null && resp.release.planning) {
      //       this.router.navigate(['/sea/funcionarios/contrataciones/licitacion/address', this.ocid])
      //     }
      //   })
      // }



  }

}
