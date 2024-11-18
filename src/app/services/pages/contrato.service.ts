import { ActivatedRoute, Router } from '@angular/router';
import { Contratos } from 'src/app/models/Contratos/contrato.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContratosLoad } from 'src/app/interfaces/contrato.interface';
import { map, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ejecuciones } from 'src/app/models/Ejecucion/ejecucion.model';

@Injectable({
  providedIn: 'root',
})
export class ContratoService {
  public contrato: Contratos;
  public url2 = environment._url2;
  public contratos;
  public title: string;
  public numCont: number = 0;
  public numBuy: number = 0;
  public listParty;
  public dataGrph = [0, 0, 0];
  public dataGrph1 = [0, 0, 0];
  public dataGrph2 = [0, 0, 0];
  public urlA = new Subject<string>();
  public url: string;

  constructor(private http: HttpClient, private router: Router) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get headers(): Object {
    return {
      headers: {
        'Content-Type': 'application/json',
        'x-token': localStorage.getItem('token') || '',
      },
    };
  }

  listaEntes() {
    return this.http.get(`${this.url2}relases/contratoAll?desde=0`).pipe(
      tap((resp) => {
        return resp;
      })
    );
  }

  cargarInfo() {

    let ocid: string;
    let date: Date;
    let title: string;
    let price: number;
    let description: string;
    let institucion: string;
    let method: string;
    let numCont: number = 0;
    let list;
    let x = 0;
    return this.cargarContratos().pipe(
      map((resp) => {
        const cont = resp.contratos.map((contracts) => {
          ////(contracts.tender.title);
          numCont = 0;
          ocid = contracts.ocid;
          date = contracts.date;
          description = contracts.tender.description;
          institucion = contracts.buyer.name;
          method = contracts.tender.procurementMethod;
          this.cargarContracts(contracts);
          this.cargarParties(contracts);
          let xid = x;
          // sum = this.cargarPrecio(contracts);

          // const s = sum
          //   .map((pre) => pre)
          //   .reduce((prev, curr) => prev + curr, 0);
          // price = parseFloat(s);
          let total = 0
          let numeros = this.cargarPrecio(contracts)[0];

          for (let i of numeros) total += i
          price = total;
          x++;
          title = this.title;
          numCont = this.numCont;
          list = this.listParty;
          return {
            ocid, date, title, price, xid, description, institucion, numCont, list, method
          };
        });
        return cont;
      })
    );
  }

  infoGraphs() {
    let numCont: number;
    let price: number;
    let method: string;
    let numBuyer: number;
    let lp = 0;
    let it = 0;
    let ad = 0;
    let clp = 0;
    let cit = 0;
    let cad = 0;
    return this.cargarContratos().pipe(
      map((resp) => {
        const cont = resp.contratos.map((contracts) => {
          let sum;
          numCont = this.numCont;
          this.cargarContracts(contracts);
          sum = this.cargarPrecio(contracts);
          numBuyer = this.numBuy;
          method = contracts.tender.procurementMethod;
          const s = sum
            .map((pre) => pre)
            .reduce((prev, curr) => prev + curr, 0);
          price = parseFloat(s);


          switch (method) {
            case "direct":
              ad = ad + price;
              cad++;
              break;
            case "selective":
              it = it + price;
              cit++;
              break;
            case "open":
              lp = lp + price;
              clp++;
              break;
          }

          return { price, numCont, method, numBuyer };
        });
        this.dataGrph1 = [lp, it, ad];
        this.dataGrph2 = [clp, cit, cad];
        return cont;
      })
    );
  }

  private cargarPrecio(res: any) {
    let sum;
    const contract = res.contracts.map((item: any) => {
      ////(item.items);
      const it = item.items.map((ir: any) => {
        sum = ir.quantity * ir.unit.values.amount;
        return sum;
      });
      return it;
    });
    return contract;
  }

  private cargarParties(res: any) {
    let listParty;
    const contract = res.parties.map((part) => {
      listParty = part.name;
      return listParty;
    });
    this.listParty = contract;
    return contract;
  }

  private cargarContracts(res: any) {
    ////(res.tender.title);
    const fill = res.contracts.map((contrat: any) => {
      this.title = res.tender.title;
      return contrat;
    });
    return fill;
  }

  cargarContratos() {
    const urlData = `${this.url2}relases/contratoAll`;
    return this.http.get<ContratosLoad>(urlData).pipe(
      map((resp) => {
        const contratos = resp.contratos.map(
          (cont) =>
            new Contratos(
              cont.ocid,
              cont.id,
              cont.date,
              cont.language,
              cont.tag,
              cont.initiationType,
              cont.parties,
              cont.buyer,
              cont.planning,
              cont.tender,
              cont.awards,
              cont.contracts
            )
        );
        return {
          total: resp.total,
          contratos,
        };
      })
    );
  }

  cargarUnContrato(id) {
    const urlData = `${this.url2}relases/contratoOP/${id}`;
    return this.http.get<ContratosLoad>(urlData).pipe(
      tap((resp) => {
        return resp;
      })
    );
  }

  cargarUnContratoFinal(id) {
    const urlData = `${this.url2}relases/contratoO/${id}`;
    return this.http.get<ContratosLoad>(urlData).pipe(
      tap((resp) => {
        return resp;
      })
    );
  }

  cargarBuyers() {
    const urlData = `${this.url2}buyers/buyersall`;
    return this.http.get<any>(urlData).pipe(
      map((resp) => {
        this.numBuy = resp.total;
        return resp
      })
    );
  }

  cargarNumContratos() {
    const urlData = `${this.url2}relases/contratoAll`;
    return this.http.get<ContratosLoad>(urlData).pipe(
      map((resp) => {
        this.numCont = resp.total;
        return resp
      })
    );
  }

  escogerGrafica(s: string) {
    switch (s) {
      case "0: null":
        this.dataGrph = this.dataGrph1
        break;
      case "cant":
        this.dataGrph = this.dataGrph2
        break;
      default:
        this.dataGrph = this.dataGrph1
        break;
    }
  }

  darDataGraficas() {
    return this.dataGrph;
  }

  cargarEtapa(urlA) {
    this.url = urlA;
    this.urlA.next(this.url);
  }

  mostrarEtapa(): Observable<string> {
    return this.urlA.asObservable();
  }

  getInfoEjecucion(ocid: string) {
    const urlData = `${this.url2}relases/getInfoEjecucion/${ocid}`;
    //('getInfoEjecucion -> '+urlData);

    return this.http.get<Ejecuciones>(urlData, this.headers).pipe(
      map((resp) => {
        //('getInfoEjecucion'+resp);
        const proveedor = resp;
        return proveedor;
      })
    );
    //return this.http.get(`${this.url2}relases/getInfoEjecucion/${ocid}`);
  }

  // getProveedor(id: string) {
  //   const urlData = `${this.url2}users/buscar-unoProveedor/${id}`;
  //   //('getProveedor'+urlData);
  //   return this.http.get<ProveedoresLoad>(urlData, this.headers).pipe(
  //     map((resp) => {
  //       //('getProveedor'+resp);
  //       const proveedor = resp;
  //       return proveedor;
  //     })
  //   );
  // }
}
