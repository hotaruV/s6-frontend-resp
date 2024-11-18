import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ContratoService } from '../../../../../services/pages/contrato.service';
import { PlaningService } from '../../../../../services/pages/planing.service';
import { LicitationService } from '../../../../../services/pages/licitation.service';
import { AwardService } from '../../../../../services/pages/award.service';
import { ContractService } from '../../../../../services/pages/contract.service';
import { Contract } from '../../../../../interfaces/release';

@Component({
  selector: 'app-contrat-reports',
  templateUrl: './contrat-reports.component.html',
  styleUrls: ['./contrat-reports.component.scss']
})
export class ContratReportsComponent implements OnInit {
  public contract = true;
  public ocid: string;

  public contractData: any[] = []
  public ContractArray: any[] = []


  public ContratcObject: any = {}
  public contractPeriod: any = {}
  public ContractValue: any = {}



  public items_tender: any[] = []
  public docs_tender: any[] = []

  constructor(
    public dialog: MatDialog,
    private routeActive: ActivatedRoute,
    private contractServ: ContratoService,
    private planingService: PlaningService,
    private tenderSvc: LicitationService,
    private AdwardSvs: AwardService,
    private ContSvs: ContractService,

  ) {
    this.routeActive.params.subscribe(({ ocid }) => {
      this.ocid = ocid;
    })
  }
  ngOnInit(): void {
    this.getContract(this.ocid)
  }

  getContract(id: string) {
    this.contractServ.cargarUnContratoFinal(id).subscribe((res: any) => {
      this.ContractArray = res.release[0].contracts;
      ////(this.ContractArray);
    })
  }

  viewContr(id: string, contractID: string) {
    this.ContSvs.getAwardByOCIDawdidcid(this.ocid, contractID, id).subscribe((resp: any) => {
      //(resp.contract);

      this.ContratcObject = {
        id: resp.contract.id,
        awardID: resp.contract.awardID,
        title: resp.contract.title,
        description: resp.contract.description,
        dateSigned: resp.contract.dateSigned,
        status: resp.contract.status,
      }
      this.dataCenter(resp.contract)
    })

  }
  private dataCenter(res: any) {
    //this.supliers = res.suppliers
    this.items_tender = res.items
    this.docs_tender = res.documents
    //(res.documents);


    // this.adwardObject = {
    //   title: res.title,
    //   description: res.description,
    //   status: res.status,
    //   date: res.date
    // }
    this.ContractValue = {
      amount: res.value.amount,
      currency: res.value.currency,
    }
    this.contractPeriod = {
      endDate: res.period.endDate,
      startDate: res.period.startDate,
    }

    // this.itemClasifications = {
    //   // durationInDays: res.release[0].tender.tenderPeriod.durationInDays,
    //   // endDate: res.release[0].tender.tenderPeriod.endDate,
    //   // maxExtentDate: res.release[0].tender.tenderPeriod.maxExtentDate,
    //   // startDate: res.release[0].tender.tenderPeriod.startDate,
    // }



  }




}
