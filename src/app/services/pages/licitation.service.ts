import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, catchError, of } from 'rxjs';
import { ContactPoint } from 'src/app/interfaces/tender.interface';
import { Codigo } from 'src/app/models/Codigos/codigo.model';
import { environment } from 'src/environments/environment';
import { UsuarioService } from '../auth/usuario.service';
//import { title } from 'process';

@Injectable({
  providedIn: 'root'
})
export class LicitationService {

  public url = environment._url;
  public url2 = environment._url2;

  constructor(private http: HttpClient, private router: Router, private usrService: UsuarioService) { }

  get headers(): Object {
    return {
      headers: {
        'Content-Type': 'application/json',
        'x-token': localStorage.getItem('token') || ''
      }
    }
  }




  cargarCodigos(busqueda: string) {
    const url = `${this.url2}index/productos-servicios?limit=20&search=${busqueda}`
    return this.http.get(url, this.headers)
      .pipe(
        map(resp => {
          return resp;
        })
      )
  }
  BuscarPorCodigo(busqueda: string) {
    const url = `${this.url2}index/producto-servicio/${busqueda}`
    return this.http.get(url, this.headers)
      .pipe(
        map(resp => {
          return resp;
        })
      )
  }

  /*crud de identify
  * cualquier cosa
  */
  identifierCreate(ocid: string, data: any) {
    ////(data);
    const url = `${this.url2}parties/identifier/${ocid}`
    return this.http.post(url, data, this.headers)
  }
  identifierShow(ocid: string, _id: string) {
    const url = `${this.url2}parties/identifier/${ocid}/${_id}`
    return this.http.get(url, this.headers)
      .pipe(
        map((resp: any) => {
          if (resp.ok) {
            return resp.contactPoint
          } else {
            return resp.ok
          }
        }),
        // catchError(err => of(false))
      )
  }

  identifierUpdate(ocid: any, data: any) {
    const url = `${this.url2}parties/identifier/${ocid}`
    return this.http.put(url, data, this.headers)
  }

  /*crud de contract point
  * cualquier cosa
  */
  ContractPointsCreate(ocid: string, data: any) {
    const url = `${this.url2}parties/contactPoint/${ocid}`
    return this.http.post(url, data, this.headers)
  }
  ContractPointsShow(ocid: string) {
    const url = `${this.url2}parties/contactPoint/${ocid}`
    return this.http.get(url, this.headers)
      .pipe(
        map((resp: any) => {
          if (resp.ok) {
            return resp.contactPoint
          } else {
            return resp.ok
          }
        }),
        // catchError(err => of(false))
      )
  }
  ContractPointsUpdate(ocid: string, data: any) {
    const url = `${this.url2}parties/contactPoint/${ocid}`
    return this.http.put(url, data, this.headers)
  }

  //Parties
  addressCreate(ocid: string, data: any) {
    const url = `${this.url2}parties/address/${ocid}`
    return this.http.post(url, data, this.headers)
  }
  addressShow(ocid: string) {
    const url = `${this.url2}parties/contactPoint/${ocid}`
    return this.http.get(url, this.headers)
      .pipe(
        map((resp: any) => {
          if (resp.ok) {
            return resp.contactPoint
          } else {
            return resp.ok
          }
        }),
        // catchError(err => of(false))
      )
  }
  addressUpdate(id: string, data: any) {
    const url = `${this.url2}parties/address/${id}`
    return this.http.put(url, data, this.headers)
  }
  getAlldata(ocid: string, key: string) {
    const url = `${this.url2}parties/getdata/${ocid}/${key}`
    return this.http.get(url, this.headers)
  }
  getpartiesID(ocid: string) {
    const url = `${this.url2}parties/partiesid/${ocid}`
    return this.http.get(url, this.headers)
  }

  getpartie(id: string) {
    const url = `${this.url2}parties/${id}`
    return this.http.get(url, this.headers)
  }

  UpdateParties(id: any, data: any) {
    const url = `${this.url2}parties/${id}`
    return this.http.put(url, data, this.headers)
  }



  getpartiesAll(ocid: string) {
    const url = `${this.url2}parties/partiesall/${ocid}`
    return this.http.get(url, this.headers)
  }
  createPartie(ocid: string, data: any) {
    const url = `${this.url2}parties/${ocid}`
    return this.http.post(url, data, this.headers)
  }
  borrarParti(id: string) {
    const url = `${this.url2}parties/${id}`
    return this.http.delete(url, this.headers)
  }

  // CreateEntityCRUD y values

  CreateEntity(data: any) {
    const url = `${this.url2}tenders/procuringEntity`
    return this.http.post(url, data, this.headers)
  }
  ShowEntity(ocid: string) {

  }
  UpdateEntity(data: any, id: string) {
    const url = `${this.url2}tenders/procuringEntity/${id}`
    return this.http.put(url, data, this.headers)
  }

  UpdateValue(data: any, id: string) {
    const url = `${this.url2}tenders/value/${id}`
    return this.http.put(url, data, this.headers)
  }
  UpdateMinValue(data: any, id: string) {
    const url = `${this.url2}tenders/minValue/${id}`
    return this.http.put(url, data, this.headers)
  }



  CreateValue(data: any) {
    const url = `${this.url2}tenders/value`
    return this.http.post(url, data, this.headers)
  }
  ShowValue(ocid: string) {
  }


  CreateMinValue(data: any) {
    const url = `${this.url2}tenders/minValue`
    return this.http.post(url, data, this.headers)
  }
  ShowMinValue(ocid: string) {
  }


  CreateTenderPeriod(data: any) {
    const url = `${this.url2}tenders/tenderPeriod`
    return this.http.post(url, data, this.headers)
  }
  CreateEnquincyPeriod(data: any) {
    const url = `${this.url2}tenders/enquiryPeriod`
    return this.http.post(url, data, this.headers)
  }
  CreateAwardPeriod(data: any) {
    const url = `${this.url2}tenders/awardPeriod`
    return this.http.post(url, data, this.headers)
  }



  UpdateTenderPeriod(data: any, id: string) {
    const url = `${this.url2}tenders/tenderPeriod/${id}`
    return this.http.put(url, data, this.headers)
  }

  UpdateEnquincyPeriod(data: any, id: string) {
    const url = `${this.url2}tenders/enquiryPeriod/${id}`
    return this.http.put(url, data, this.headers)
  }

  UpdateAwardPeriod(data: any, id: string) {
    const url = `${this.url2}tenders/awardPeriod/${id}`
    return this.http.put(url, data, this.headers)
  }


  getTenderByOcid(ocid: string) {
    const url = `${this.url2}tenders/${ocid}`
    return this.http.get(url, this.headers);
  }
  createTender(data: any) {
    const url = `${this.url2}tenders`
    return this.http.post(url, data, this.headers)
  }
  UpdateTender(data: any) {
    const url = `${this.url2}tenders`
    return this.http.put(url, data, this.headers)
  }


  amendmentCreate(data: any) {
    const url = `${this.url2}documents/amendments`
    return this.http.post(url, data, this.headers)
  }

  amendmentShowAll(ocid: string, documentType: string) {
    const url = `${this.url2}documents/amendmentsocid/${ocid}?documentType=${documentType}`
    return this.http.get(url, this.headers)
  }

  amendmentShowID(ocid: string, documentType: string) {
    const url = `${this.url2}documents/amendmentid/${ocid}?documentType=${documentType}`
    return this.http.get(url, this.headers)
  }

  amendmentID(id: string) {
    const url = `${this.url2}documents/amendment/${id}`
    return this.http.get(url, this.headers)
  }


  amendmentDelete(id: string, ocid: string) {
    const url = `${this.url2}documents/amendments/${id}/${ocid}`
    return this.http.delete(url, this.headers)
  }

  amendmentUpdate(id: string, data: any) {
    const url = `${this.url2}documents/amendments/${id}`
    return this.http.put(url, data, this.headers)
  }


  itemValueCreate(data: any) {
    const url = `${this.url2}items/unit/value`
    return this.http.post(url, data, this.headers)
  }

  itemValueUpdate(data: any, id: string) {
    const url = `${this.url2}items/unit/value/${id}`
    return this.http.put(url, data, this.headers)
  }




  itemUnitCreate(data: any) {
    const url = `${this.url2}items/unit/`
    return this.http.post(url, data, this.headers)
  }

  itemUnitUpdate(data: any, id: string) {
    const url = `${this.url2}items/unit/${id}`
    return this.http.put(url, data, this.headers)
  }


  itemClasificationCreate(data: any) {
    const url = `${this.url2}items/classifications/`
    return this.http.post(url, data, this.headers)
  }


  itemClasificationUpdate(data: any, id: string) {
    const url = `${this.url2}items/classifications/${id}`
    return this.http.put(url, data, this.headers)
  }

  itemCreate(data: any) {
    const url = `${this.url2}items`
    return this.http.post(url, data, this.headers)
  }


  itemShow(ocid: string, typeItem: string) {
    const url = `${this.url2}items/${ocid}?item=${typeItem}`
    return this.http.get(url, this.headers)
  }

  itemShowAdwards(type: string, ocid: string, award_id: string) {
    const url = `${this.url2}items/${ocid}?award_id=${award_id}&item=${type}`
    return this.http.get(url, this.headers)
  }

  itemShowsID(ocid: string, typeItem: string, award_id: string) {
    const url = `${this.url2}items/getitemid/${ocid}?typeItem=${typeItem}&award_id=${award_id} `
    return this.http.get(url, this.headers)
  }

  itemDelete(id: string) {
    const url = `${this.url2}items/${id}`
    return this.http.delete(url, this.headers)
  }

  itemDeleteArr(id: any) {
    ////(id);
    const url = `${this.url2}items/arritem`
    return this.http.post(url, id, this.headers)
  }

  itemUpdate(data: any, id: string) {
    const url = `${this.url2}items/${id}`
    return this.http.put(url, data, this.headers)
  }


  getItemByContratct(ocid: string) {
    const url = `${this.url2}items/item-contract/${ocid}`
    return this.http.get(url, this.headers)
  }



  getItemID(id: string) {
    const url = `${this.url2}items/getitembyid/${id}`
    return this.http.get(url, this.headers)
  }

  UpdateItem(data: any, id: string) {
    const url = `${this.url2}items/${id}`
    return this.http.put(url, data, this.headers)
  }

  getTenderOcid(ocid: string) {
    const url = `${this.url2}tenders/${ocid}`
    return this.http.get(url, this.headers)
  }






  actulizarRelease(data: any, ocid: string) {
    const url = `${this.url2}relases/contratoUpdate/${ocid}`
    return this.http.put(url, data, this.headers)
  }


  actulizarReleaseStatus(data: any, ocid: string) {
    const url = `${this.url2}relases/contratoUpdateStatus/${ocid}`
    return this.http.put(url, data, this.headers)
  }


  validarRFC(rfc: string) {
    let mensaje = "";

    let rfcMoralPattern: string = "^(([A-ZÑ&]{3})([0-9]{2})([0][13578]|[1][02])(([0][1-9]|[12][\\d])|[3][01])([A-Z0-9]{3}))|" + "(([A-ZÑ&]{3})([0-9]{2})([0][13456789]|[1][012])(([0][1-9]|[12][\\d])|[3][0])([A-Z0-9]{3}))|" + "(([A-ZÑ&]{3})([02468][048]|[13579][26])[0][2]([0][1-9]|[12][\\d])([A-Z0-9]{3}))|" + "(([A-ZÑ&]{3})([0-9]{2})[0][2]([0][1-9]|[1][0-9]|[2][0-8])([A-Z0-9]{3}))$";

    let rfcFiscaPattern: string = "^(([A-ZÑ&]{4})([0-9]{2})([0][13578]|[1][02])(([0][1-9]|[12][\\d])|[3][01])([A-Z0-9]{3}))|" + "(([A-ZÑ&]{4})([0-9]{2})([0][13456789]|[1][012])(([0][1-9]|[12][\\d])|[3][0])([A-Z0-9]{3}))|" + "(([A-ZÑ&]{4})([02468][048]|[13579][26])[0][2]([0][1-9]|[12][\\d])([A-Z0-9]{3}))|" + "(([A-ZÑ&]{4})([0-9]{2})[0][2]([0][1-9]|[1][0-9]|[2][0-8])([A-Z0-9]{3}))$";


    if (rfc.match(rfcMoralPattern) || rfc.match(rfcFiscaPattern)) {
      if (rfc.match(rfcMoralPattern)) {
        return mensaje = "Persona Moral";
      }
      if (rfc.match(rfcFiscaPattern)) {
        return mensaje = "Persona Fisica";
      }
      return true;
    } else {
      return false;
    }

  }


  CrearLicitation(data: any) {
    //('entre a CrearLicitation service');
 //aqui iria el envio de información al backend, el nombre de la función es como se encuentra en el 
 //tender.routes del backend
 //modificar para el tender
    data = {
      id: data.id,
    
        title: data.title,
        description: data.description,
        status : data.status,

        tenderprocurementMethod: data.tenderprocurementMethod,
        tenderprocurementMethodDetails: data.tenderprocurementMethodDetails,
        tenderprocurementMethodRationale: data.tenderprocurementMethodRationale,
        tendercategoria: data.tendercategoria,
        tenderawardCriteria: data.tenderawardCriteria,
        tenderawardCriteriaDetails: data.tenderawardCriteriaDetails,
        tendersubmissionMethod: data.tendersubmissionMethod,
        tendersubmissionMethodDetails: data.tendersubmissionMethodDetails,

        procuringEntity: data.procuringEntity,

        items: data.items,
        value: data.value,
        minValue: data.minValue,
        

        procurementMethod: data.procurementMethod,
        procurementMethodDetails: data.procurementMethodDetails,
        procurementMethodRationale: data.procurementMethodRationale,
        mainProcurementCategory: data.mainProcurementCategory,
        additionalProcurementCategories: data.additionalProcurementCategories,
        awardCriteria: data.awardCriteria,
        awardCriteriaDetails: data.awardCriteriaDetails,
        submissionMethod: data.submissionMethod,
        submissionMethodDetails: data.submissionMethodDetails,
       
        
      tenderPeriod: data.tenderPeriod,
      enquiryPeriod: data.enquiryPeriod,
      hasEnquiries: data.hasEnquiries,
      clarificationMeetings: data.clarificationMeetings,

      eligibilityCriteria: data.eligibilityCriteria,
      tenderers: data.tenderers,

      awardPeriod:data.awardPeriod,
      contractPeriod: data.contractPeriod,

    
     // tenderers: tenderers,
     documents: data.documents,
      milestones: data.milestones,

      amendments: data.amendments
    }
    const url = `${this.url2}tenders`
    return this.http.post(url, data, this.headers)
      .pipe(
        map((resp: any) => {
          localStorage.setItem("tenders_id", resp._id);//regresa un id
          return resp
        }))
  }





}
