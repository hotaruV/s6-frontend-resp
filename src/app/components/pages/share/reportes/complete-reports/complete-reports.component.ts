import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ContratoService } from 'src/app/services/pages/contrato.service';
import { PlaningService } from 'src/app/services/pages/planing.service';
import { LicitationService } from 'src/app/services/pages/licitation.service';
import { AwardService } from 'src/app/services/pages/award.service';
import { ContractService } from 'src/app/services/pages/contract.service';
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";
import domtoimage from 'dom-to-image';

@Component({
  selector: 'app-complete-reports',
  templateUrl: './complete-reports.component.html',
  styleUrls: ['./complete-reports.component.scss']
})
export class CompleteReportsComponent implements OnInit {

  public ocid: string;
  public rationale: any
  public tender: any

  public reportArray: any[] = []
  public ContractDocuments: any[] = []
  public ContractItems: any[] = []
  public ContractParties: any[] = []
  public submissionMethod: any[] = []
  public awards: any[] = []
  // public supliers: any[] = []
  public contract: any[] = []

  public itemClasifications: any = {}
  public tenderObj: any = {}
  public tenderValue: any = {}
  public tenderMinValue: any = {}
  public procuringEntity: any = {}
  public enquiryPeriod: any = {}
  public awardPeriod: any = {}
  public tenderPeriod: any = {}
  public adwardObject: any = {}


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

  downloadPDF(): void {
    //await this.loaderService.showLoader()
    const pdfBlock = document.getElementById("reportContract")

    const imgWidth = 210
    const pageHeight = 297
    const imgHeight = pdfBlock.clientHeight * imgWidth / pdfBlock.clientWidth
    let heightLeft = imgHeight
    let position = 0

    const options = {
      background: "white",
      height: pdfBlock.clientHeight,
      width: pdfBlock.clientWidth
    }

    domtoimage.toPng(pdfBlock, options).then((fileUrl: any )  => {
      let doc = new jsPDF("p", "mm", "a4")
      doc.html
      doc.addImage(fileUrl, 'PNG', 0, position, imgWidth, imgHeight)

      heightLeft -= pageHeight

      for (let i = heightLeft; i >= 0; i -= pageHeight) {
        position = i - imgHeight
        doc.addPage("a4")
        doc.addImage(fileUrl, 'PNG', 0, position, imgWidth, imgHeight)
      }

      //this.loaderService.hideLoader()

      doc.save(`${new Date().toISOString()}_${this.ocid}.pdf`)
    }).catch(function (error) {
      console.error(error);
    });
  }

  ngOnInit(): void {
    this.getContract(this.ocid)
  }

  getContract(id: string) {
    this.contractServ.cargarUnContratoFinal(id).subscribe((res: any) => {
      this.reportArray = res.release[0];
      this.planning(res.release[0])
      this.ContractParties = res.release[0].parties;
      ////(res.release[0]);
      this.tender = res.release[0].tender;
      this.getDataTender(res)


    })
  }
  planning(res: any) {
    this.rationale = res.planning.rationale
    this.allDocuments(this.ocid);
    this.allItems(this.ocid);
    this.alladwards(this.ocid);
    this.allContracts(this.ocid);

  }

  allDocuments(ocid: string) {
    this.planingService.getByContratct(ocid)
      .subscribe(
        (resp: any) => {
          this.ContractDocuments = resp.documents
        }
      )
  }

  allItems(ocid: string) {
    this.tenderSvc.getItemByContratct(this.ocid)
      .subscribe((resp: any) => {
        this.ContractItems = resp.items
      })
  }

  alladwards(ocid: string) {
    this.AdwardSvs.getAwardAllOcid(ocid)
      .subscribe((resp: any) => {
        this.awards = resp.awards;
      })
  }
  allContracts(ocid: string) {
    this.ContSvs.getCountAllOcid(ocid).subscribe((resp: any) => {
      this.contract = resp.contr;
    })
  }


  getDataTender(res: any) {
    this.tenderObj = {
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
