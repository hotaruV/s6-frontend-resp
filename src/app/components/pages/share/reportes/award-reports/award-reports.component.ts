import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Document, Milestone } from 'src/app/interfaces/release';
import { ContratoService } from 'src/app/services/pages/contrato.service';
import { PlaningService } from '../../../../../services/pages/planing.service';
import { LicitationService } from '../../../../../services/pages/licitation.service';
import { AwardService } from '../../../../../services/pages/award.service';
import { AwardElement } from '../../../../../interfaces/awards.Interface';

@Component({
  selector: 'app-award-reports',
  templateUrl: './award-reports.component.html',
  styleUrls: ['./award-reports.component.scss']
})
export class AwardReportsComponent implements OnInit {
  public ocid: string;

  public adwardObject: any = {}

  public AwardValue: any = {}


  public contractPeriod: any = {}


  public itemAditonialclassification: any = {}
  public itemclassification: any = {}
  public itemValues: any = {}
  public itemUnit: any = {}


  public adwardArray: any[] = [];
  public documents_planning: Document[] = []
  public items_tender: any[] = []
  public docs_tender: any[] = []


  public amendments: any[] = []

  public supliers: any[] = []


  public docObject: any = {}
  public ItemObject: any = {}
  public itemClasifications: any = {}





  public amendment: any = {}



  public documents: boolean = true
  public miles: boolean = true
  public items: boolean = true
  public partie: boolean = true
  public award: boolean = true

  constructor(
    public dialog: MatDialog,
    private routeActive: ActivatedRoute,
    private contractServ: ContratoService,
    private planingService: PlaningService,
    private tenderSvc: LicitationService,
    private AdwardSvs: AwardService,

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
      this.amendments = res.release[0].tender.amendments
      this.documents_planning = res.release[0].tender.documents

      this.adwardArray = res.release[0].awards;





    })
  }






  viewDocument(id: string) {
    this.planingService.getOneDocuments(id).subscribe((resp: any) => {
      //(resp);
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
  viewItems(id: string) {
    this.tenderSvc.getItemID(id).subscribe((resp: any) => {
      ////(resp.item);
      this.items = true

      this.itemAditonialclassification = {
        description: resp.item.classification.description,
        id: resp.item.classification.id,
        scheme: resp.item.classification.scheme,
      }

      this.itemclassification = {
        description: resp.item.classification.description,
        id: resp.item.classification.id,
        scheme: resp.item.classification.scheme,
      }
      this.itemValues = {
        amount: resp.item.unit.values.amount,
        currency: resp.item.unit.values.currency,
      }
      this.itemUnit = {
        name: resp.item.unit.name,
        values: this.itemValues
      }


      this.ItemObject = {
        award_id: resp.item.award_id,
        contract_id: resp.item.contract_id,
        description: resp.item.description,
        quantity: 1,
        _id: 1
      }
    })

  }
  viewamed(id: string) {
    this.tenderSvc.amendmentID(id).subscribe((resp: any) => {
      //(resp.amendments);

      this.amendment = {
        amendsReleaseID: "1",
        date: "2023-03-17T06:00:00.000Z",
        description: "no proporcionada",
        ocid: "ocds-7e7fnm-000-00001",
        rationale: "sin justificación"
      }
    })
  }


  viewAwd(id: string) {
    this.award = true;
    ////(id);
    this.AdwardSvs.getCountItem(id)
      .subscribe((resp: any) => {
        this.dataCenter(resp.awards);


      })
  }

  private dataCenter(res: any) {
    this.supliers = res.suppliers
    this.items_tender = res.items
    this.docs_tender = res.documents
    //(res);


    this.adwardObject = {
      title: res.title,
      description: res.description,
      status: res.status,
      date: res.date
    }
    this.AwardValue = {
      amount: res.value.amount,
      currency: res.value.currency,
    }
    this.contractPeriod = {
      endDate: res.contractPeriod.endDate,
      startDate: res.contractPeriod.startDate,
    }

    this.itemClasifications = {
      // durationInDays: res.release[0].tender.tenderPeriod.durationInDays,
      // endDate: res.release[0].tender.tenderPeriod.endDate,
      // maxExtentDate: res.release[0].tender.tenderPeriod.maxExtentDate,
      // startDate: res.release[0].tender.tenderPeriod.startDate,
    }



  }

}
