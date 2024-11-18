import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Award, AwardElement } from 'src/app/interfaces/awards.Interface';
import { AwardService } from 'src/app/services/pages/award.service';
import { LicitationService } from 'src/app/services/pages/licitation.service';
import { ContractService } from 'src/app/services/pages/contract.service';
import { map, Observable } from 'rxjs';


@Component({
  selector: 'app-contrato-index',
  templateUrl: './contrato-index.component.html',
  styleUrls: ['./contrato-index.component.scss']
})
export class ContratoIndexComponent implements OnInit {


  public total: string;
  public adwardArray: any[] = [];
  public contractArray: any[] = [];


  public ocid: string;
  public AwardID: string;
  public contractData: any = [];
  public contractID: any = [];
  public mensajeBOOL: boolean = false
  public mensaje: string = "No se ha guardado ningna adjudicacion; NO PUEDE AVANZAR!! "

  public addAwd: any
  public contContra: any

  public btnGuardar: boolean = true
  public btnActualizar: boolean = false
  public btnSiguiente: boolean = true
  public btnNuevo: boolean = true


  public mostratTabla: boolean = false;
  public totalItems: []
  public awvalid: boolean;


  constructor(
    private AdwardSvs: AwardService,
    private tenderSvc: LicitationService,
    private contratoSvc: ContractService,
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
          this.adwardArray = resp.awards;

          if (this.adwardArray.length !== 0) {
            let contaward = this.adwardArray.length
            this.contratoSvc.getCountAllOcid(this.ocid)
              .pipe(
                map((resp: any) => {
                  this.contractArray = resp.contr
                  this.adwardArray = [{
                    awards : this.adwardArray,
                    contracts: this.contractArray
                  }]
                  ////(this.adwardArray[0]);
                })
              ).subscribe()

          } else {
            this.btnGuardar = false;
            this.mensajeBOOL = true
          }
        })
      ).subscribe()

  }

  private dataContr() {

  }

  obtenerAWard(id: any) {
    this.AwardID = id
    this.contratoSvc.getDataAllContract(this.ocid, id)
      .pipe(
        map((resp: any) => {
          if (resp.ok && resp.contract.length !== 0) {
            this.contractData = resp.contract;
            this.mostratTabla = true
          } else {
            if (!this.mostratTabla) {
              this.router.navigate(['/sea/funcionarios/contrataciones/contrato/contract', this.ocid, id])
            } else {
              this.mostratTabla = false
            }
          }
        })
      ).subscribe()
  }

  crearContrato(id: any) {
    this.contratoSvc.getDataContract(this.ocid, id)
      .pipe(
        map((resp: any) => {
          const data = {
            contracts: resp.contracts,
          }
          ////(data);
          this.tenderSvc.actulizarRelease(data, this.ocid).subscribe(resp => {
            ////(resp);
            this.router.navigate(['/sea/funcionarios/inicio-contrato'])
          })
        })
      ).subscribe()
  }





  NuevoCOntrato(id: any) {
    this.router.navigate(['/sea/funcionarios/contrataciones/contrato/contract', this.ocid, id])
  }

  forward() {

  }
  next() {

  }


  borrarContrato(id: any) {
    ////(this.AwardID);
    this.contratoSvc.getCountItem(id)
      .pipe(
        map((resp: any) => {
          this.totalItems = resp.contrato.items;
          if (this.totalItems.length > 0) {
            this.mensajeBOOL = true
            this.mensaje = `tiene un total de ${this.totalItems.length} items registrados; debe borrar todos los items para poder eliminar la adjudicacion. Será redirigido a la seccion de items para eleminarlos`
            setTimeout(() => {
              this.router.navigate(['/sea/funcionarios/contrataciones/contrato/items/', this.ocid, this.AwardID, id])
            }, 5000);
          } else {
            this.contratoSvc.getCountOcid(this.ocid)
              .pipe(
                map((resp: any) => {
                  ////(resp);
                  this.contractID = resp.ContractID;
                  let data = {
                    contracts: this.contractID.length === 0 ? null : this.contractID,
                  }
                  ////(data);
                  this.tenderSvc.actulizarRelease(data, this.ocid).subscribe(resp => {
                    this.contratoSvc.ContractDelete(id)
                      .pipe(
                        map((resp: any) => {
                          this.obtenerAWard(this.AwardID)
                        })
                      ).subscribe()
                  })
                })
              ).subscribe()
          }
        })
      ).subscribe()





  }


  editarContrato(contract_id: any){
    this.router.navigate(['/sea/funcionarios/contrataciones/contrato/contract/', this.ocid, contract_id, this.AwardID ])
  }

}
