import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { map } from "rxjs";
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
  })
  export class OICservice {
    public url = environment._url;
    public url2 = environment._url2;

    constructor(private http: HttpClient, private router: Router) { }


    get headers(): Object {
        return {
          headers: {
            'Content-Type': 'application/json',
            'x-token': localStorage.getItem('token') || ''
          }
        }
      }

      cargarContratos() {
        const url = `${this.url2}oic/obtener-user`
        return this.http.get(url, this.headers)
          .pipe(
            map(resp => {
              return resp;
            })
          )
      }
      updateNotificationStatus(ocid: string) {
        const url = `${this.url2}oic/update-revision/${ocid}`
        return this.http.get(url, this.headers)
      }


      getNotificacionsByRevition(ocid: string, revision_id: string){
        const url = `${this.url2}oic/get-all-notifications/${ocid}/${revision_id}`
        return this.http.get(url, this.headers)
      }

      getUserNotificacions(){
        const url = `${this.url2}oic/get-user-notifications`
        return this.http.get(url, this.headers)
      }

      getOneNotificacions(id: string){
        const url = `${this.url2}oic/get-one-notifications/${id}`
        return this.http.get(url, this.headers)
      }

      notificationCreate(data: any, ocid: string,  revision_id: string){
        const url = `${this.url2}oic/create-notifications/${ocid}/${revision_id}`
        return this.http.post(url, data, this.headers)
      }

      cambiarEstus(notificacion_id: string, status: string){
        const url = `${this.url2}oic/cambiar-status/${notificacion_id}/${status}`
        return this.http.get(url, this.headers)
      }
  }