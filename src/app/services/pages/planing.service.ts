import { Budget } from './../../interfaces/release';
import { UsuarioService } from 'src/app/services/auth/usuario.service';
import { map, tap, delay, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Contrato } from 'src/app/interfaces/release';
import { Release } from '../../interfaces/release';
import {
  
  SolQuotes,
} from './../../interfaces/planning.interface';


@Injectable({
  providedIn: 'root'
})

export class PlaningService {

  public url = environment._url;
  public url2 = environment._url2;
  public buyer_id: string;
  public budget_id: string;
  public document_id: string[];
  public contrato = {}
  public documents = []
  public ocid_id: string;

  constructor(private http: HttpClient, private router: Router, private usrService: UsuarioService) { }

  get headers(): Object {
    return {
      headers: {
        'Content-Type': 'application/json',
        'x-token': localStorage.getItem('token') || ''
      }
    }
  }

  get user_id() {
    return this.usrService.authID;
  }
  get buyerid() {
    return this.buyer_id;
  }
  get buguet_id() {
    return this.budget_id
  }
  get ocidCid() {
    return this.ocid_id
  }




  GetContrato(): Observable<Contrato[]> {
    const url = `${this.url2}relases/contratoU`
    return this.http.get(url, this.headers)
      .pipe(
        delay(200),
        map((resp: Release) => {
          return resp.contratos
        })
      )
  }

  GetContratoAll(): Observable<Contrato[]> {
    const url = `${this.url2}relases/contratoAll`
    return this.http.get(url, this.headers)
      .pipe(
        delay(200),
        map((resp: Release) => {
          return resp.contratos
        })
      )
  }

  UserContracts() {
    const url = `${this.url2}relases/contratos`
    return this.http.get(url, this.headers)
  }

  GetContratoOCID(ocid: string) {
    const url = `${this.url2}relases/contratoO/${ocid}`
    return this.http.get(url, this.headers)
  }





  CrearContrato() {
    const url = `${this.url2}relases/contrato`
    return this.http.post(url, '', this.headers)
      .pipe(
        map(resp => {
          this.getContrat(resp)
        })
      )
  }

  CrearBuyer(FormData: any) {
    const url = `${this.url2}buyers`
    return this.http.post(url, FormData, this.headers)
      .pipe(tap((resp): any => {
        return resp;
      }))
  }

  ActualizarBuyer(FormData: any, id: string) {
    const url = `${this.url2}buyers/${id}`
    return this.http.put(url, FormData, this.headers)
      .pipe(tap((resp): any => {
        return resp;
      }))
  }
  ActualizarBudget(FormData: any, id: string) {
    const url = `${this.url2}planning/budget/${id}`
    return this.http.put(url, FormData, this.headers)
      .pipe(tap((resp): any => {
        return resp;
      }))
  }

  ActualizarPlanning(FormData: any, id: string) {
    const url = `${this.url2}planning/${id}`
    return this.http.put(url, FormData, this.headers)
      .pipe(tap((resp): any => {
        return resp;
      }))
  }

  private getContrat(resp: any) {
    this.ocid_id = resp.ocid
  }

  CrearPlanningBudget(FormData: any) {
    const url = `${this.url2}planning/budget`
    return this.http.post(url, FormData, this.headers);
  }
  //documents planning
  CrearPlanningDocument(FormData: any, type: String) {
    
    const url = `${this.url2}documents/documents?type=${type}`
    return this.http.post(url, FormData, this.headers)
  }
  // CrearPlanning(data: any) {
  //   data = {
  //     id: data.id,
  //     rationale: data.rationale.rationale,
  //     budget: data.budget,
  //     documents: data.document,
  //     milestones: data.milestone
  //   }
  //   const url = `${this.url2}planning`
  //   return this.http.post(url, data, this.headers)
  //     .pipe(
  //       map((resp: any) => {
  //         localStorage.setItem("planning_id", resp._id);
  //         return resp
  //       }))
  // }
  CrearPlanning(data: any) {
    //('entre a CrearPlanning service');
    data = {
      id: data.id,
    
        rationale: data.rationale,
        hasQuotes: data.hasQuotes,
        hasQuotes_why : data.cotizacion_no,
        requestingUnits:data.requestingUnits,
        responsibleUnits: data.responsibleUnits,
        contractingUnits:data.contractingUnits,
        requestForQuotes:data.requestForQuotes,

        budget:data.budget,
        documents:data.documents,
        milestones:data.milestones,
    }
    const url = `${this.url2}planning`
    return this.http.post(url, data, this.headers)
      .pipe(
        map((resp: any) => {
          localStorage.setItem("planning_id", resp._id);
          return resp
        }))
  }
  CrearPlanningMileStone(FormData: any, type: String) {
    const url = `${this.url2}documents/milestones?type=${type}`
    return this.http.post(url, FormData, this.headers)
  }

  getDocuments(type: string, document_id: string) {
    const url = `${this.url2}documents/documents/search/${type}/${document_id}`
    return this.http.get(url, this.headers)
  }


  getByContratct(ocid: string) {
    const url = `${this.url2}documents/${ocid}`
    return this.http.get(url, this.headers)
  } s

  getOneDocuments(document_id: string) {
    const url = `${this.url2}documents/documents/${document_id}`
    return this.http.get(url, this.headers)
  }
  actualizarDocumentos(FormData: any, document_id: string) {
    const url = `${this.url2}documents/documents/${document_id}`
    return this.http.put(url, FormData, this.headers)
  }

  getDocumentsAward(type: string, document_id: string, award_id: string) {
    const url = `${this.url2}documents/documents/search/${type}/${document_id}?award_id=${award_id}`
    return this.http.get(url, this.headers)
  }

  getDocumentsAwardbyId(type: string, document_id: string, award_id: string) {
    const url = `${this.url2}documents/document/search/${type}/${document_id}?award_id=${award_id}`
    return this.http.get(url, this.headers)
  }


  getDocumentsContract(type: string, document_id: string) {
    const url = `${this.url2}documents/documents/search/${type}/${document_id}`
    return this.http.get(url, this.headers)
  }

  getMilestones(type: string, document_id: string) {
    const url = `${this.url2}documents/milestones/search/${type}/${document_id}`
    return this.http.get(url, this.headers)
  }

  getPlannigAll(ocid: string) {
    const url = `${this.url2}planning/pla_query/${ocid}`
    return this.http.get(url, this.headers)
  }

  deleteDocument(id: string, ocid: string, doctype: string) {
    const url = `${this.url2}documents/documents/${id}/${ocid}?doc='${doctype}'`
    return this.http.delete(url, this.headers)
  }

  deleteMilestone(id: string, ocid: string, doctype: string) {
    const url = `${this.url2}documents/milestones/${id}/${ocid}?doc='${doctype}'`
    return this.http.delete(url, this.headers)
  }

  getMilestone(id: string) {
    const url = `${this.url2}documents/milestones/${id}`
    return this.http.get(url, this.headers)
  }

  updateMilestone(FormData: any, id: string) {
    const url = `${this.url2}documents/milestones/${id}`
    return this.http.put(url, FormData, this.headers)
  }

  actulizarReleaseDocument(data: any, ocid: string) {
    const url = `${this.url2}relases/contratoUpdate/${ocid}`
    return this.http.put(url, data, this.headers)
  }

  getBuyer(ocid: string) {
    const url = `${this.url2}buyers/${ocid}`
    return this.http.get(url, this.headers)
  }

  getBudget(ocid: string) {
    const url = `${this.url2}planning/budget/${ocid}`
    return this.http.get(url, this.headers)
  }

  getRationale(ocid: string) {
    const url = `${this.url2}planning/milestonesocid/${ocid}`
    return this.http.get(url, this.headers)
  }
  getInicio(ocid: string) {
    const url = `${this.url2}planning/inicio/${ocid}`
    return this.http.get(url, this.headers)
  }

  listaCucop(search: string) {
    //const url = `${this.url2}planning/inicio/${ocid}`
    const url = `${this.url2}planning/cucop?search=${search}`;
     //("listaCucop cucop url: "+url);

     return this.http
       .get(url)
       .pipe(
         tap((resp) => {
           return resp;
         })
       );
   }
   getDescripcionCucop(search: string) {
    //("si search: "+search);
    const url = `${this.url2}planning/getcucop?search=${search}`;
    //("si: "+url);
     return this.http
       .get(url)
       .pipe(
         tap((resp) => {
           
           return resp;
         })
       );
   }
   getPlanning(ocid: string) {
    const url = `${this.url2}planning/getPlanningbyOcid/${ocid}`
    return this.http.get(url, this.headers)
  }
  getPlanningPeriod(id: string) {
    const url = `${this.url2}planning/getPlanningPeriod/${id}`
    return this.http.get(url, this.headers)
  }
  getPlanningCotizacion(id: string) {
    const url = `${this.url2}planning/getPlanningCotizacion/${id}`
    return this.http.get(url, this.headers)
  }
  getPlanningItems(id: string) {
    const url = `${this.url2}planning/getPlanningItems/${id}`
    return this.http.get(url, this.headers)
  }
  getDatosPlanningCotizaciones(iCot: string,peri: string,issuingSupplier: string) {
    const url = `${this.url2}planning/getDatosPlanningCotizaciones/${iCot}/${peri}/${issuingSupplier}`
    return this.http.get(url, this.headers)
  }
  getPlanningbudget(id: string) {
    const url = `${this.url2}planning/getPlanningbudget/${id}`
    return this.http.get(url, this.headers)
  }
  getPlanningbudgetValue(id: string) {
    const url = `${this.url2}planning/getPlanningbudgetValue/${id}`
    return this.http.get(url, this.headers)
  }
  getPlanningItemsValue(id: string) {
    const url = `${this.url2}planning/getPlanningItemsValue/${id}`
    return this.http.get(url, this.headers)
  }
  getPlanningItemsClasiffic(id: string) {
    const url = `${this.url2}planning/getPlanningItemsClassific/${id}`
    return this.http.get(url, this.headers)
  }
  getPlanningItemsUnit(id: string) {
    const url = `${this.url2}planning/getPlanningItemsUint/${id}`
    return this.http.get(url, this.headers)
  }
  getPlanningItemsinvitedSuppliers(id: string) {
    const url = `${this.url2}planning/getPlanningItemsinvitedSuppliers/${id}`
    return this.http.get(url, this.headers)
  }
  getPlanningItemsQuotes(id: string) {
    const url = `${this.url2}planning/getPlanningItemsQuotes/${id}`
    return this.http.get(url, this.headers)
  }
  getPlanningItemsQuo(id: string) {
    const url = `${this.url2}planning/getPlanningItemsQuo/${id}`
    return this.http.get(url, this.headers)
  }
  getPlanningItemsCotizacion(id: string) {
    const url = `${this.url2}planning/getPlanningItemsCotizacion/${id}`
    return this.http.get(url, this.headers)
  }
  getPlanningPeriodbudgetBreakdown(id: string) {
    const url = `${this.url2}planning/getPlanningPeriodbudgetBreakdown/${id}`
    return this.http.get(url, this.headers)
  }
  getPlanningbudgetBreakdown(id: string) {
    const url = `${this.url2}planning/getPlanningbudgetBreakdown/${id}`
    return this.http.get(url, this.headers)
  }
  getPlanningbudgetBreakdownValue(id: string) {
    const url = `${this.url2}planning/getPlanningbudgetBreakdownValue/${id}`
    return this.http.get(url, this.headers)
  }
  getPlanningbudgetBreakdownbudgetLines(id: string) {
    const url = `${this.url2}planning/getPlanningbudgetBreakdownbudgetLines/${id}`
    return this.http.get(url, this.headers)
  }
  getPlanningbudgetBreakdownbudgetLinesComponets(id: string) {
    const url = `${this.url2}planning/getPlanningbudgetBreakdownbudgetLinesComponets/${id}`
    return this.http.get(url, this.headers)
  }
  getPlanningbudgetBreakdownbudgetLinessourceParty(id: string) {
    const url = `${this.url2}planning/getPlanningbudgetBreakdownbudgetLinessourceParty/${id}`
    return this.http.get(url, this.headers)
  }

  getPlanningDocuments(id: string) {
    const url = `${this.url2}planning/getPlanningDocuments/${id}`
    return this.http.get(url, this.headers)
  }
  getPlanningHitos(id: string) {
    const url = `${this.url2}planning/getPlanningHitos/${id}`
    return this.http.get(url, this.headers)
  }

  deleteSolQuotes(_id: string,_idOcid: string) {
    const url = `${this.url2}planning/deletePlanningCotizacion/${_id}/${_idOcid}/`
    return this.http.put(url, '', this.headers);
  
  }
  
  savePlanning_Cotizacion(FormData: SolQuotes,_idOcid: string) {
    
    const id = 1;
    const urlData = `${this.url2}planning/savePlanning_Cotizacion/${id}/${_idOcid}/`;
    return this.http.put(urlData, FormData, this.headers)
        .pipe(tap((resp): any => {
          return resp;
        }))
  }
  updateSolQuotes(FormData: SolQuotes) {
    
     const id = FormData._id;  
     const urlData = `${this.url2}planning/updatePlanning_Cotizacion/${id}`;
    
     return this.http.put(urlData, FormData, this.headers)
         .pipe(tap((resp): any => {
           return resp;
         }))
   
   }
}
