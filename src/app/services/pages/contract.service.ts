import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { map, tap, Observable, catchError, of, delay } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ContractService {
  public ocid_id: string;
  public url = environment._url;
  public url2 = environment._url2;
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }


  get headers(): Object {
    return {
      headers: {
        'Content-Type': 'application/json',
        'x-token': localStorage.getItem('token') || ''
      }
    }
  }


  contratoCreate(data: any){
    const url = `${this.url2}contracts`
    return this.http.post(url, data, this.headers)
  }
  CrearContrato(data: any) {
    //('entre a CrearContrato service');
    data = {
      id: data.id,
      contractstitle: data.contractstitle,
      contractsdescription: data.contractsdescription,
      contractsstatus: data.contractsstatus,
      contractPeriod:data.contractPeriod,
      value:data.value,
      items:data.items,
      dateSigned:data.dateSigned,
      surveillanceMechanisms:data.surveillanceMechanisms,
      guarantees:data.guarantees,
      documents:data.documents,
      implementation:data.implementation,
      relatedProcesses:data.relatedProcesses,
      milestones:data.milestones,
      amendments:data.amendments,

    }
    const url = `${this.url2}contracts`
    return this.http.post(url, data, this.headers)
      .pipe(
        map((resp: any) => {
          localStorage.setItem("contracts_id", resp._id);
          return resp
        }))
  }

  contratoValueCreate(data:any){
    const url = `${this.url2}contracts/value`
    return this.http.post(url, data, this.headers)
  }

  contratoValueUpdate(data:any, value_id: string){
    const url = `${this.url2}contracts/value/${value_id}`
    return this.http.put(url, data, this.headers)
  }

  contratoPeriodCreate(data:any){
    const url = `${this.url2}contracts/contractperiod`
    return this.http.post(url, data, this.headers)
    .pipe(
      tap((resp=> {
        return resp
      }))
    )
  }

  contratoPeriodUpdate(data:any, value_id: string){
    const url = `${this.url2}contracts/contractperiod/${value_id}`
    return this.http.put(url, data, this.headers)
  }


  contratoUpdate(data:any, value_id: string){
    const url = `${this.url2}contracts/${value_id}`
    return this.http.put(url, data, this.headers)
  }


  actualizarContract(data: any){
    const url = `${this.url2}contracts`
    return this.http.put(url, data, this.headers)
  }

  getDataContract(ocid:string, id:string){
    const url = `${this.url2}contracts/id/${ocid}/${id}`
    return this.http.get(url, this.headers)
  }

  getDataAllContract(ocid:string, id:string){
    const url = `${this.url2}contracts/all/${ocid}/${id}`
    return this.http.get(url, this.headers)
  }

  getCountItem(id:string){
    const url = `${this.url2}contracts/award/data/contract/${id}`
    return this.http.get(url, this.headers)
  }

  getCountOcid(ocid:string){
    const url = `${this.url2}contracts/award/ocid/contract/${ocid}`
    return this.http.get(url, this.headers)
  }

  getCountAllOcid(ocid:string){
    const url = `${this.url2}contracts/award/ocid/all/${ocid}`
    return this.http.get(url, this.headers)
  }

  ContractDelete(id: any){
    const url = `${this.url2}contracts/${id}`
    return this.http.delete(url, this.headers)
  }

  getAwardByOCIDawdidcid(ocid: string, contrac_id: string, award_id:string){
    const url = `${this.url2}contracts/data/${ocid}/${contrac_id}/${award_id}`
    return this.http.get(url, this.headers)
  }
}
