import { environment } from './../../../environments/environment';
import { UsuarioService } from './../auth/usuario.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AwardService {

  public ocid_id: string;
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


  getAdward(ocid: string) {
    const url = `${this.url2}awards/${ocid}`
    return this.http.get(url, this.headers)
  }


  createSuplier(data: any, ocid: string, award_id: string){
    ////(data);
    const url = `${this.url2}awards/suppliers/${ocid}?award_id=${award_id}`
    return this.http.post(url, data, this.headers)
  }
  getSupID(ocid: string, award_id: string){
    const url = `${this.url2}awards/suppliersIDS/${ocid}?award_id=${award_id}`
    return this.http.get(url, this.headers)
  }

  createAwardPeriod(data: any){
    const url = `${this.url2}awards/contractPeriod`
    return this.http.post(url, data, this.headers)
  }

  updateAwardPeriod(data: any, id: string) {
    const url = `${this.url2}awards/contractPeriod/${id}`
    return this.http.put(url, data, this.headers)
  }

  createAwardValue(data: any){
    const url = `${this.url2}awards/value`
    return this.http.post(url, data, this.headers)
  }

  updateAwardValue(data: any, id: string) {
    const url = `${this.url2}awards/value/${id}`
    return this.http.put(url, data, this.headers)
  }


  createAward(data: any){
    const url = `${this.url2}awards`
    return this.http.post(url, data, this.headers)
  }


  UpdateAward(data: any, id: string){
    const url = `${this.url2}awards/${id}`
    return this.http.put(url, data, this.headers)
  }

  UpdateAwardID(data: any, id: string){
    const url = `${this.url2}awards/update/id`
    return this.http.put(url, data, this.headers)
  }

  UpdateAwardMain(data: any, id: string){
    const url = `${this.url2}awards/update/${id}`
    return this.http.put(url, data, this.headers)
  }

  updateAwardByID(data: any, id: string) {
    const url = `${this.url2}awards/${id}`
    return this.http.put(url, data, this.headers)
  }


  getDocuments(type: string, document_id: string) {
    const url = `${this.url2}documents/documents/search/${type}/${document_id}`
    return this.http.get(url, this.headers)
  }

  getMilestones(type: string, document_id: string) {
    const url = `${this.url2}documents/milestones/search/${type}/${document_id}`
    return this.http.get(url, this.headers)
  }


  getAwardOcid(ocid:string){
    const url = `${this.url2}awards/awardsbyocid/${ocid}`
    return this.http.get(url, this.headers)
  }
  getAwardAllOcid(ocid:string){
    const url = `${this.url2}awards/${ocid}`
    return this.http.get(url, this.headers)
  }

  getCountItem(id:string){
    const url = `${this.url2}awards/awd/${id}`
    return this.http.get(url, this.headers)
  }

  adwadDelete(id: string) {
    const url = `${this.url2}awards/${id}`
    return this.http.delete(url, this.headers)
  }
  CrearAward(data: any) {
    //('entre a CrearAward service');
    data = {
      id: data.id,
    
      title: data.title,
      description: data.description,
       rationale : data.rationale,
       status:data.status,
       date: data.date,
       value:data.value,
       suppliers:data.suppliers,
       items:data.items,
       contractPeriod:data.contractPeriod,
       documents:data.documents,
       //ESTO DEBE SER UN ARRAY
       amendmentsdate:  data.amendmentsdate,
       mendmentsrationale:  data.mendmentsrationale,
       amendmentsid:  data.amendmentsid,
       amendmentsdescription:  data.amendmentsdescription,
       amendsReleaseID:  data.amendsReleaseID,
       releaseID:  data.releaseID,
    }
    const url = `${this.url2}awards`
    return this.http.post(url, data, this.headers)
      .pipe(
        map((resp: any) => {
          localStorage.setItem("awards_id", resp._id);
          return resp
        }))
  }

}
