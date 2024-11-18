import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContratoService } from 'src/app/services/pages/contrato.service';
import { MatDialog } from '@angular/material/dialog';

import { LicitationService } from '../../../../../services/pages/licitation.service';
import { Document, Milestone } from 'src/app/interfaces/planning.interface';
import { PlaningService } from 'src/app/services/pages/planing.service';
import { AwardService } from 'src/app/services/pages/award.service';
import { Budget } from 'src/app/interfaces/release';
import { Amount } from '../../../../../interfaces/release';



@Component({
  selector: 'app-planing-reports',
  templateUrl: './planing-reports.component.html',
  styleUrls: ['./planing-reports.component.scss']
})
export class PlaningReportsComponent implements OnInit {
  public ocid: string;
  public urlA: string;


  public documents_planning: Document[] = []
  public documents_hitos: Milestone[] = []
  public PlanningData: Budget[] = []


  public docObject: any = {}
  public MilObject: any = {}
  public planning_data: any = {}
  public PlanningAmountData: any = {}
  public rationale: any

  public documents: boolean = false
  public miles: boolean = false

  constructor(
    public dialog: MatDialog,
    private routeActive: ActivatedRoute,
    private contractServ: ContratoService,
    private planingService: PlaningService

  ) {
    this.routeActive.params.subscribe(({ ocid }) => {
      this.ocid = ocid;
    })
  }
  ngOnInit(): void {
    this.getContract(this.ocid);
  }


  getContract(id: string) {
    this.contractServ.cargarUnContratoFinal(id).subscribe((res: any) => {
      ////(res.release[0].planning.rationale);
      this.documents_planning = res.release[0].planning.documents
      this.documents_hitos = res.release[0].planning.milestones
      this.planning_data = res.release[0].planning.budget
      this.PlanningAmountData = res.release[0].planning.budget.amount
      this.rationale = res.release[0].planning.rationale

    })
  }






  viewDocument(id: string) {
    this.planingService.getOneDocuments(id).subscribe((resp: any) => {
      ////(resp.documents);
      this.documents = true
      this.docObject = {
        award_id: resp.documents.award_id,
        contract_id: resp.documents.contract_id,
        datePublished: resp.documents.datePublished,
        description: resp.documents.description,
        documentType: resp.documents.documentType,
        document_id: resp.documents.document_id,
        format: resp.documents.format,
        id: resp.documents.id,
        language: resp.documents.language,
        title: resp.documents.title,
        url: resp.documents.url,
        _id: resp.documents._id
      }
    })
  }

  viewMiles(id: string) {
    this.planingService.getMilestone(id).subscribe((resp: any) => {
      //(resp);
      this.miles = true
      this.MilObject = {
        dateMet: resp.milestones.dateMet,
        dateModified: resp.milestones.dateModified,
        description: resp.milestones.description,
        document_id: resp.milestones.document_id,
        dueDate: resp.milestones.dueDate,
        id: resp.milestones.id,
        status: resp.milestones.status,
        title: resp.milestones.title,
        type: resp.milestones.type,
        _id: resp.milestones.da_idteMet,
      }
    })
  }
}
