import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ContratoService } from '../../../../../services/pages/contrato.service';
import { PlaningService } from '../../../../../services/pages/planing.service';
import { LicitationService } from '../../../../../services/pages/licitation.service';
import { AwardService } from '../../../../../services/pages/award.service';
import { Document, Milestone } from 'src/app/interfaces/planning.interface';
import { Budget } from 'src/app/interfaces/release';
import { Item } from 'src/app/interfaces/tender.interface';

@Component({
  selector: 'app-tender-reports',
  templateUrl: './tender-reports.component.html',
  styleUrls: ['./tender-reports.component.scss']
})
export class TenderReportsComponent implements OnInit {

  public ocid: string;
  public urlA: string;


  public tender: any = {}
  public tenderValue: any = {}
  public tenderMinValue: any = {}
  public procuringEntity: any = {}
  public enquiryPeriod: any = {}
  public awardPeriod: any = {}
  public tenderPeriod: any = {}
  public submissionMethod: any[] = []

  public itemAditonialclassification: any = {}
  public itemclassification: any = {}
  public itemValues: any = {}
  public itemUnit: any = {}

  public documents_planning: Document[] = []
  public documents_hitos: Milestone[] = []
  public items_tender: any[] = []
  public parties: any[] = []
  public partiRol: any[] = []
  public amendments: any[] = []


  public docObject: any = {}
  public ItemObject: any = {}
  public MilObject: any = {}
  public planning_data: any = {}
  public PlanningAmountData: any = {}
  public itemClasifications: any = {}

  public part: any = {}

  public identifier: any = {}
  public contactPoint: any = {}
  public address: any = {}
  public rationale: any
  public amendment: any = {}



  public documents: boolean = true
  public miles: boolean = true
  public items: boolean = true
  public partie: boolean = true




  ngOnInit(): void {
    this.getContract(this.ocid)
  }

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

  getContract(id: string) {
    this.contractServ.cargarUnContratoFinal(id).subscribe((res: any) => {
      this.submissionMethod = res.release[0].tender.submissionMethod
      this.documents_planning = res.release[0].tender.documents
      this.documents_hitos = res.release[0].tender.milestones
      this.items_tender = res.release[0].tender.items
      this.parties = res.release[0].parties
      this.amendments = res.release[0].tender.amendments
      ////(res.release[0].tender.amendments);
      this.dataCenter(res);

      ////(this.enquiryPeriod);
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

  viewItems(id: string) {
    this.tenderSvc.getItemID(id).subscribe((resp: any) => {
      //(resp.item);
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

  viewPartie(id: string) {

    this.partie = true;
    ////(id);
    this.tenderSvc.getpartie(id).subscribe((resp: any) => {
      this.partiRol = resp.paties.roles;
      this.part = {
        id: resp.paties.id,
        name: resp.paties.name
      }
      this.identifier = {
        id: resp.paties.identifier.id,
        legalName: resp.paties.identifier.legalName,
        scheme: resp.paties.identifier.scheme,
        uri: resp.paties.identifier.uri,
      }
      this.contactPoint = {
        email: resp.paties.contactPoint.email,
        faxNumber: resp.paties.contactPoint.faxNumber,
        key: resp.paties.contactPoint.key,
        name: resp.paties.contactPoint.name,
        telephone: resp.paties.contactPoint.telephone,
        url: resp.paties.contactPoint.url,
      },
        this.address = {
          countryName: resp.paties.address.countryName,
          key: resp.paties.address.key,
          locality: resp.paties.address.locality,
          ocid: resp.paties.address.ocid,
          postalCode: resp.paties.address.postalCode,
          region: resp.paties.address.region,
          streetAddress: resp.paties.address.streetAddress,
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

  private dataCenter(res: any) {
    this.tender = {
      awardCriteria: res.release[0].tender.awardCriteria,
      awardCriteriaDetails: res.release[0].tender.awardCriteriaDetails,
      description: res.release[0].tender.description,
      id: res.release[0].tender.id,
      numberOfTenderers: res.release[0].tender.numberOfTenderers,
      procurementMethod: res.release[0].tender.procurementMethod,
      procurementMethodDetails: res.release[0].tender.procurementMethodDetails,
      procurementMethodRationale: res.release[0].tender.procurementMethodRationale,
      status: res.release[0].tender.status,
      submissionMethodDetails: res.release[0].tender.submissionMethodDetails,
      title: res.release[0].tender.title,
    }
    this.tenderValue = {
      amount: res.release[0].tender.value.amount,
      currency: res.release[0].tender.value.currency,
    }
    this.tenderMinValue = {
      amount: res.release[0].tender.minValue.amount,
      currency: res.release[0].tender.minValue.currency,
    }
    this.procuringEntity = {
      name: res.release[0].tender.procuringEntity.name
    }
    this.enquiryPeriod = {
      durationInDays: res.release[0].tender.enquiryPeriod.durationInDays,
      endDate: res.release[0].tender.enquiryPeriod.endDate,
      maxExtentDate: res.release[0].tender.enquiryPeriod.maxExtentDate,
      startDate: res.release[0].tender.enquiryPeriod.startDate,
    }
    this.awardPeriod = {
      durationInDays: res.release[0].tender.awardPeriod.durationInDays,
      endDate: res.release[0].tender.awardPeriod.endDate,
      maxExtentDate: res.release[0].tender.awardPeriod.maxExtentDate,
      startDate: res.release[0].tender.awardPeriod.startDate,
    }
    this.tenderPeriod = {
      durationInDays: res.release[0].tender.tenderPeriod.durationInDays,
      endDate: res.release[0].tender.tenderPeriod.endDate,
      maxExtentDate: res.release[0].tender.tenderPeriod.maxExtentDate,
      startDate: res.release[0].tender.tenderPeriod.startDate,
    }
    this.itemClasifications = {
      durationInDays: res.release[0].tender.tenderPeriod.durationInDays,
      endDate: res.release[0].tender.tenderPeriod.endDate,
      maxExtentDate: res.release[0].tender.tenderPeriod.maxExtentDate,
      startDate: res.release[0].tender.tenderPeriod.startDate,
    }
  }


}
