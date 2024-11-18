import { ProveedoresLoad } from './../../interfaces/proveedores.interfaces';
import { ServidorLoad } from './../../interfaces/servidorEnte.inteface';
import { ServidorEnte } from './../../interfaces/servidorEnte.inteface';
import { Ente } from './../../models/Entes/entes.model';
import { ServidoresEnte } from './../../models/Entes/servidores.model';
import { Usuario } from '../../models/Usuarios/usuario.model';
import { Proveedores } from './../../models/Entes/proveedores.model';

import { Router } from '@angular/router';

import {
  LoginForm,
  UsuarioLoad,
  RegisterFOrm,
  ServidoresEnteLoad,
} from './../../interfaces/login.interface';
import { EntesForm, } from './../../interfaces/entes.inteface';
import { EnteForm, EnteLoad, } from './../../interfaces/entesN.interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap, Observable, catchError, of, delay } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Esquema {
  id: number;
  esquema: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public usuario: Usuario;
  public ente: Ente;
  public servidor: ServidoresEnte;

  public url = environment._url;
  public url2 = environment._url2;
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

  get rolUser(): 'seseaadmin' | 'adminstrador_ente' | 'oic' {
    return this.usuario.getRol;
  }

  get Ente() {
    return this.usuario.ente_publico;
  }

  get authID(): string {
    return this.usuario.getUid;
  }

  get fistlogin(): boolean {
    return this.usuario.getFistLogin;
  }

  listaEntes(search: string) {
    return this.http
      .get(`${this.url2}index/entes-publicos?search=${search}`)
      .pipe(
        tap((resp) => {
          return resp;
        })
      );
  }
  crearUsuario(FormData: RegisterFOrm) {
    ////.log(FormData);
    const url = `${this.url2}users/register`;
    return this.http.post(url, FormData, this.headers);
  }
  login(FormData: LoginForm) {
    let url = `${this.url2}login`;
    return this.http.post(url, FormData).pipe(
      tap((resp: LoginForm) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }
  cambiarPass(FormData: LoginForm) {
    const token = localStorage.getItem('token') || '';
    let url = `${this.url2}login/change-password`;
    return this.http
      .post(url, FormData, {
        headers: {
          'x-token': token,
        },
      })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }
  getUser(id: string) {
    const urlData = `${this.url2}users/buscar-uno/${id}`;
    return this.http.get<UsuarioLoad>(urlData, this.headers).pipe(
      map((resp) => {
        const usuario = resp;
        return usuario;
      })
    );
  }
  updateUser(FormData: RegisterFOrm) {
    const id = FormData.uid;
    const urlData = `${this.url2}users/${id}`;
    //.log("Inicio updateEnte_usuario.service: " + FormData.nombres);
    return this.http.put(urlData, FormData, this.headers);
  }
  updateEnte(FormData: EnteForm) {
    //.log("Inicio updateEnte_usuario.service: ");
    const id = FormData.uid;
    const urlData = `${this.url2}users/UpdateEntesURoute/${id}`;
    ////.log("url_usuario.service: "+ urlData);
    return this.http.put(urlData, FormData, this.headers);
  }
  updateEnteStatus(id: string) {
    const urlData = `${this.url2}users/updateStatusEnte/${id}`;
    return this.http.get(urlData, this.headers);
  }

  deleteEnte(id: string) {

    //.log("Entre deleteEnte_usuario.service: " + id);
    const urlData = `${this.url2}users/deleteentes/${id}`;
    //.log("url" + urlData);
    return this.http.put(urlData, '', this.headers);
  }

  deleteUsuario(id: string) {

    //.log("Entre deleteUsuario_usuario.service: " + id);
    const urlData = `${this.url2}users/deleteUsuario/${id}`;
    //.log("url" + urlData);
    return this.http.put(urlData, '', this.headers);
  }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http
      .get(`${this.url2}login/renew`, {
        headers: {
          'x-token': token,
        },
      })
      .pipe(
        map((res: any) => {
          ////.log(res);
          const {
            nombres,
            primer_apellido,
            rfc,
            email,
            ente_publico,
            rfc_homoclave,
            curp,
            rol,
            segundo_apellido,
            fist_login,
            id_ente_publico,
            created_at,
            updated_at,
            user_id,
            userName,
            cargo_publico,
          } = res.user;

          this.usuario = new Usuario(
            nombres,
            primer_apellido,
            rfc,
            email,
            '',
            ente_publico,
            rfc_homoclave,
            curp,
            rol,
            segundo_apellido,
            fist_login,
            id_ente_publico,
            created_at,
            updated_at,
            user_id,
            userName,
            cargo_publico
          );
          //this.usuario.imprimirUsuario();
          localStorage.setItem('token', res.token);
          return true;
        }),
        catchError((err) => of(false))
      );
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('auth/login');
  }
  cargarUsuarios() {
    const urlData = `${this.url2}users/usr`;
    return this.http.get<UsuarioLoad>(urlData, this.headers).pipe(
      delay(100),
      map((resp) => {
        const usuarios = resp.usuarios.map(
          (user) =>
            new Usuario(
              user.nombres,
              user.primer_apellido,
              user.rfc,
              user.email,
              '',
              user.ente_publico,
              user.rfc_homoclave,
              user.curp,
              user.role,
              user.segundo_apellido,
              user.fist_login,
              user.id_ente_publico,
              user.created_at,
              user.updated_at,
              user.uid,
              user.user_id,
              user.userName,
              user.cargo_publico
            )
        );
        return {
          total: resp.total,
          usuarios,
        };
      })
    );
  }

  getEnte(id: string) {
    //.log("Entre getEnte_usuario.service: " + id);
    const urlData = `${this.url2}users/buscar-unoente/${id}`;
    //.log("Entre getEnte_usuario.service: " + urlData);
    return this.http.get<EnteLoad>(urlData, this.headers).pipe(
      map((resp) => {
        const ente = resp;

        return ente;
      })
    );
  }
  listaEntesActivos(search: string) {
    ////.log('EntreCargaEntes_usuario.service');
    //const urlData = `${this.url2}users/entes`;
    //.log('listaEntesActivos.service: ' + search);
    const urlData = `${this.url2}users/Listaentes/${search}`;
    return this.http.get<EnteLoad>(urlData, this.headers).pipe(
      delay(100),
      map((resp) => {
        const entes = resp.entes.map(
          (e) =>
            new Ente(
              e.ente,
              e.siglas,
              e.estado,
              e.municipio,
              e.created_at,
              e.updated_at,
              e.id_usuario,
              e.uid,
            )
        );
        return {

          entes,
        };
      })
    );
  }
  listaEntesActivos2(search: string) {
    //.log('listaEntesActivos.service: ' + search);
    const urlData = `${this.url2}users/Listaentes/${search}`;
    return this.http.put(urlData, '', this.headers);
    ////.log('url: '+`${this.url2}users/Listaentes/${search}`);
    // return this.http
    //   .get(`${this.url2}users/Listaentes/${search}`)
    //   .pipe(
    //     tap((resp) => {
    //       return resp;
    //     })
    //   );
  }
  getServidorRequiriente(id: string) {
    const urlData = `${this.url2}users/ServidorRequirientes/${id}`;
    return this.http.get<ServidoresEnteLoad>(urlData, this.headers).pipe(
      delay(100),
      map((resp) => {
        const servidores = resp.servidores.map(
          (e) =>
            new ServidoresEnte(

              e.nombres_servidor,
              e.primer_apellido_servidor,
              e.segundo_apellido_servidor,
              e.rfc_servidor,
              e.cargo_servidor,
              e.email_servidor,
              e.telefono_servidor,
              e.telefonofax_servidor,
              e.area,
              e.id_ente_publico,
              e.created_at,
              e.updated_at,
              e.id_usuario,
              e.uid,
              e.estatus



            )
        );
        return {
          total: resp.total,
          servidores,
        };
      })
    );
  }
  getServidorContratante(id: string) {
    ////.log('EntreCargaEntes_usuario.service');
    const urlData = `${this.url2}users/ServidorContratante/${id}`;
    return this.http.get<ServidoresEnteLoad>(urlData, this.headers).pipe(
      delay(100),
      map((resp) => {
        const servidores = resp.servidores.map(
          (e) =>
            new ServidoresEnte(

              e.nombres_servidor,
              e.primer_apellido_servidor,
              e.segundo_apellido_servidor,
              e.rfc_servidor,
              e.cargo_servidor,
              e.email_servidor,
              e.telefono_servidor,
              e.telefonofax_servidor,
              e.area,
              e.id_ente_publico,
              e.created_at,
              e.updated_at,
              e.id_usuario,
              e.uid,
              e.estatus



            )
        );
        return {
          total: resp.total,
          servidores,
        };
      })
    );
  }
  getServidorResponsable(id: string) {
    ////.log('EntreCargaEntes_usuario.service');
    const urlData = `${this.url2}users/ServidorResponsable/${id}`;
    return this.http.get<ServidoresEnteLoad>(urlData, this.headers).pipe(
      delay(100),
      map((resp) => {
        const servidores = resp.servidores.map(
          (e) =>
            new ServidoresEnte(

              e.nombres_servidor,
              e.primer_apellido_servidor,
              e.segundo_apellido_servidor,
              e.rfc_servidor,
              e.cargo_servidor,
              e.email_servidor,
              e.telefono_servidor,
              e.telefonofax_servidor,
              e.area,
              e.id_ente_publico,
              e.created_at,
              e.updated_at,
              e.id_usuario,
              e.uid,
              e.estatus



            )
        );
        return {
          total: resp.total,
          servidores,
        };
      })
    );
  }
  resetPassword(id: string) {
    const urlData = `${this.url2}users/reset_password/${id}`;
    return this.http.put(urlData, '', this.headers);
  }

  listaEstados(search: string) {
    // //.log("listaEstados: "+search);
    return this.http
      .get(`${this.url2}index/estados?search=${search}`)
      .pipe(
        tap((resp) => {
          return resp;
        })
      );
  }

  listaPaises(search: string) {
    ////.log("listaPaises: "+search);
    return this.http
      .get(`${this.url2}index/paises?search=${search}`)
      .pipe(
        tap((resp) => {
          return resp;
        })
      );
  }
  listaPaisesProvedores() {
    ////.log("listaPaises: "+search);
    return this.http
      .get(`${this.url2}index/paisesAll`)
      .pipe(
        tap((resp) => {
          return resp;
        })
      );
  }
  listaCodigoPostal(codigoPostal: string) {
    return this.http.get(`${this.url2}index/codigos`, {
      params: {
        search: codigoPostal
      }
    });
  }

  listaColonias(search: string) {
    ////.log("entre2: "+search);
    return this.http
      .get(`${this.url2}index/colonias?search=${search}`)
      .pipe(
        tap((resp) => {
          return resp;
        })
      );
  }
  listaMunicipiosByEstado(idEstado: number) {
    ////.log("listaMunicipiosByEstado: "+search);
    return this.http
      .get(`${this.url2}index/municipiosById?search=${idEstado}`)
      .pipe(
        tap((resp) => {
          return resp;
        })
      );
  }
  listaMunicipiosdeEstado(search: string) {
    // //.log("si: "+search);
    return this.http
      .get(`${this.url2}index/municipiosdeEstado?search=${search}`)
      .pipe(
        tap((resp) => {

          return resp;
        })
      );
  }
  listaMunicipios(search: string) {
    // //.log("entre: " + search);
    return this.http
      .get(`${this.url2}index/municipiosByNombre?search=${search}`)
      .pipe(
        tap((resp) => {

          return resp;
        })
      );
  }
  crearEnte2(FormData: EntesForm) {
    //.log("Entre a crearEnte usuario_service registerEnte" + FormData);
    const url = `${this.url2}users/registerEnte`;
    return this.http.post(url, FormData, this.headers);
  }
  actEnte(FormData: EntesForm) {
    ////.log("Entre a actEnte usuario_service UpdateEntesbyEnte" + FormData);
    //const urlData = `${this.url2}users/UpdateEntesURoute/${id}`;
    const url = `${this.url2}users/UpdateEntesbyEnte`;
    ////.log("url" + url);
    return this.http.post(url, FormData, this.headers);
  }
  crearRegistroServidorEnte(FormData: ServidoresEnte) {
    ////.log("Entre a crearServidorEnte usuario_service" + FormData);
    const url = `${this.url2}users/registerServidorEnte`;
    return this.http.post(url, FormData, this.headers);
  }

  cargarServidores(id: string) {
    ////.log('cargarServidores.service,idEnte:' + id);

    const urlData = `${this.url2}users/serv/${id}`;
    ////.log('Entre cargarServidores_usuario.service urlData:' + urlData);
    return this.http.get<ServidorLoad>(urlData, this.headers).pipe(
      delay(100),
      map((resp) => {
        const servidores = resp.servidores.map(
          (servidor) =>
            new ServidoresEnte(

              servidor.nombres_servidor,
              servidor.primer_apellido_servidor,
              servidor.segundo_apellido_servidor,
              servidor.rfc_servidor,
              servidor.cargo_servidor,
              servidor.email_servidor,
              servidor.telefono_servidor,
              servidor.telefonofax_servidor,
              servidor.area,
              servidor.id_ente_publico,
              servidor.created_at,
              servidor.updated_at,
              servidor.id_usuario,
              servidor.uid,
              servidor.estatus

            )
        );
        return {
          total: resp.total,
          servidores,
        };
      })
    );
  }
  getServidor(id: string) {
    const urlData = `${this.url2}users/buscar-unoServidor/${id}`;
    ////.log('getServidor' + urlData);
    return this.http.get<ServidorLoad>(urlData, this.headers).pipe(
      map((resp) => {
        //.log('getServidor' + resp);
        const servidor = resp;
        return servidor;
      })
    );
  }

  deleteServidor(id: string) {

    ////.log("Entre deleteServidor_usuario.service: " + id);
    const urlData = `${this.url2}users/deleteServidor/${id}`;
    ////.log("url"+urlData);
    return this.http.put(urlData, '', this.headers);
  }
  updateServidor(FormData: ServidoresEnte) {
    const id = FormData.uid;
    const urlData = `${this.url2}users/UpdateServidor/${id}`;
    ////.log("Inicio updateEnte_usuario.service: "+FormData.nombres);
    return this.http.put(urlData, FormData, this.headers);
  }

  crearRegistroProveedor(FormData: Proveedores) {
    ////.log("Entre a crearRegistroProveedor usuario_service"+FormData);
    const url = `${this.url2}users/registrarProveedores`;
    return this.http.post(url, FormData, this.headers);
  }
  cargarProveedores(id: string) {
    ////.log('EntrecargarProveedores_usuario.service,idEnte:'+id);

    const urlData = `${this.url2}users/prov/${id}`;
    ////.log('Entre cargarProveedores_usuario.service urlData:' + urlData);
    return this.http.get<ProveedoresLoad>(urlData, this.headers).pipe(
      delay(100),
      map((resp) => {
        const proveedores = resp.proveedores.map(
          (proveedor) =>
            new Proveedores(
              proveedor.tipo,
              proveedor.razonsocialProv,
              proveedor.rfcproveedor,
              proveedor.uri_proveedor,
              proveedor.nombres_rep_legal,
              proveedor.primer_apellido_rep_legal,
              proveedor.segundo_apellido_rep_legal,
              proveedor.curp_rep_legal,
              proveedor.lugar_proveedor,
              proveedor.pais_proveedor,
              proveedor.codigoPostal_proveedor,
              proveedor.colonia_proveedor,
              proveedor.localidad_proveedor,
              proveedor.region_proveedor,
              proveedor.calle_proveedor,
              proveedor.numero_proveedor,
              proveedor.nombres_contacto_prov,
              proveedor.primer_apellido_contacto_prov,
              proveedor.segundo_apellido_contacto_prov,
              proveedor.email_contacto_prov,
              proveedor.telefono_contacto_prov,
              proveedor.telefonofax_contacto_prov,
              proveedor.url_ente_contacto_prov,
              proveedor.idioma_prov,
              proveedor.id_ente_publico,
              proveedor.created_at,
              proveedor.updated_at,
              proveedor.id_usuario,
              proveedor.uid,
              proveedor.estatus

            )
        );
        return {
          total: resp.total,
          proveedores,
        };
      })
    );
  }
  getProveedor(id: string) {
    const urlData = `${this.url2}users/buscar-unoProveedor/${id}`;
    ////.log('getProveedor' + urlData);
    return this.http.get<ProveedoresLoad>(urlData, this.headers).pipe(
      map((resp) => {
        ////.log('getProveedor' + resp);
        const proveedor = resp;
        return proveedor;
      })
    );
  }
  deleteProveedor(id: string) {

    ////.log("Entre deleteProveedor_usuario.service-: " + id);
    const urlData = `${this.url2}users/deleteProveedor/${id}`;
    ////.log("url"+urlData);
    return this.http.put(urlData, '', this.headers);
  }
  updateProveedor(FormData: Proveedores) {
    const id = FormData.uid;
    const urlData = `${this.url2}users/UpdateProveedor/${id}`;
    ////.log("Inicio updateEnte_usuario.service: "+FormData.nombres);
    return this.http.put(urlData, FormData, this.headers);
  }
  listaAllCucop() {
    //const url = `${this.url2}planning/inicio/${ocid}`
    const url = `${this.url2}index/cucopAll`;
    return this.http
      .get(url)
      .pipe(
        tap((resp) => {
          return resp;
        })
      );
  }
  listaCucop(search: string) {
    //const url = `${this.url2}planning/inicio/${ocid}`
    const url = `${this.url2}index/cucop?search=${search}`;
    ////.log("search cucop url: " + search);

    ////.log("listaCucop cucop url: " + url);

    return this.http
      .get(url)
      .pipe(
        tap((resp) => {
          return resp;
        })
      );
  }
  getDescripcionCucop(search: string) {
    ////.log("si search busca: " + search);
    const url = `${this.url2}index/getcucop?search=${search}`;
    ////.log("si: " + url);
    return this.http
      .get(url)
      .pipe(
        tap((resp) => {

          return resp;
        })
      );
  }
  listaAllEsquema() {

    const url = `${this.url2}index/esquemaAll`;
    return this.http
      .get(url)
      .pipe(
        tap((resp) => {
          return resp;
        })
      );
  }

  getSearchSquema(search: string): Observable<{ data: Esquema[] }> {
    const url = `${this.url2}index/esquemaSearch?search=${search}`;
    return this.http.get<{ data: Esquema[] }>(url);
  }


}
