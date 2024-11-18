import { AwardService } from './../../../../../../services/pages/award.service';
import { Component, OnInit, Pipe } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { respServer } from 'src/app/interfaces/planning.interface';
import { Award, AwardElement } from 'src/app/interfaces/awards.Interface';
import { LicitationService } from 'src/app/services/pages/licitation.service';



interface Generic {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-award',
  templateUrl: './award.component.html',
  styleUrls: ['./award.component.scss']
})
export class AwardComponent implements OnInit {
  public total: string;
  public adwardArray: AwardElement[] = [];
  public adwardIDArray: any[] = [];
  public var = "";
  public ocid: string;
  public mensajeBOOL: boolean = false
  public mensaje: string = "No se ha guardado ningna adjudicacion; NO PUEDE AVANZAR!! "

  public addAwd: any

  public btnGuardar: boolean = true
  public btnActualizar: boolean = false
  public btnSiguiente: boolean = true
  public btnNuevo: boolean = true
  public totalItems: []


  constructor(private fb: UntypedFormBuilder,
    private AdwardSvs: AwardService,
    private tenderSvc: LicitationService,
    private router: Router,
    private routeActive: ActivatedRoute
  ) {
    this.routeActive.params.subscribe(({ ocid }) => {
      this.ocid = ocid;
    })
  }

  ngOnInit(): void {
    this.getAdwards()
  }



  getAdwards() {
    this.addAwd = this.AdwardSvs.getAdward(this.ocid)
      .pipe(
        map((resp: Award) => {
          this.adwardArray = resp['awards'];
          if (this.adwardArray.length === 0) {
            this.btnGuardar = false;
            this.mensajeBOOL = true
          }
        })
      ).subscribe()

  }



  formReset(form: FormGroup) {
    form.reset();
    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null);
    });
  }

  crearAward() {
    this.AdwardSvs.getAwardOcid(this.ocid)
      .pipe(
        map((resp: any) => {
          this.adwardIDArray = resp.awardID;
          let data = {
            awards: this.adwardArray.length === 0 ? null : this.adwardArray,
          }
          this.tenderSvc.actulizarRelease(data, this.ocid).subscribe(resp => {
            this.next()
            localStorage.removeItem('award_id')
          })
        })
      ).subscribe()
  }


  forward() {
    this.router.navigate(['/sea/funcionarios/contrataciones/adjudicacion/items/', this.ocid])
  }

  next() {
    this.router.navigate(['/sea/funcionarios/inicio-contrato'])
  }

  borrarAdw(id: any) {
    localStorage.setItem('award_id', id)

    this.AdwardSvs.getCountItem(id)
      .pipe(
        map((resp: any) => {
          this.totalItems = resp.awards.items;
          if (this.totalItems.length > 0) {
            this.mensajeBOOL = true
            this.mensaje = `tiene un total de ${this.totalItems.length} items registrados; debe borrar todos los items para poder eliminar la adjudicacion. Será redirigido a la seccion de items para eleminarlos`
            setTimeout(() => {
              this.router.navigate(['/sea/funcionarios/contrataciones/adjudicacion/items/', this.ocid])
            }, 5000);
          } else {
            this.AdwardSvs.getAwardOcid(this.ocid)
              .pipe(
                map((resp: any) => {
                  this.adwardIDArray = resp.awardID;
                  let data = {
                    awards: this.adwardArray.length === 0 ? null : this.adwardArray,
                  }
                  this.tenderSvc.actulizarRelease(data, this.ocid).subscribe(resp => {
                    this.AdwardSvs.adwadDelete(id)
                      .pipe(
                        map((resp: any) => {
                          this.getAdwards()
                          localStorage.removeItem('award_id')
                        })
                      ).subscribe()
                  })
                })
              ).subscribe()
          }
        })
      ).subscribe()





  }

  editarAward(id: any){
    this.router.navigate(['/sea/funcionarios/contrataciones/adjudicacion/supplier/', this.ocid, id])
  }
}
