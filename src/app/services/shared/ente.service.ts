import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError, delay } from 'rxjs/operators';
import { Ente } from 'src/app/models/Entes/entes.model';
import { environment } from 'src/environments/environment';
import { EntesForm } from 'src/app/interfaces/entes.inteface';
import { EnteLoad } from 'src/app/interfaces/entesN.interfaces';

@Injectable({
  providedIn: 'root'
})
export class EnteService {
  private entesSubject: BehaviorSubject<Ente[]> = new BehaviorSubject<Ente[]>([]);
  public entes$: Observable<Ente[]> = this.entesSubject.asObservable();

  public url = environment._url;
  public url2 = environment._url2;

  // Método para definir las cabeceras
  get headers(): Object {
    return {
      headers: {
        'Content-Type': 'application/json',
        'x-token': localStorage.getItem('token') || '',
      },
    };
  }

  constructor(private http: HttpClient) { }

  // Método para cargar la lista de entes con cabeceras
  cargarEntesForm(): Observable<{ total: number; entes: Ente[] }> {
    const urlData = `${this.url2}users/entes-form`;
    return this.http.get<any>(urlData, this.headers).pipe(
      delay(100),
      map((resp) => {
        // Manejo de caso donde entes está vacío
        if (!resp || !Array.isArray(resp.entes)) {
          console.warn('La respuesta no contiene una propiedad "entes" válida o está vacía.');
          return { total: 0, entes: [] }; // Devuelve un objeto vacío
        }

        // Mapeo de la respuesta para crear instancias de Ente
        const entes = resp.entes.map(
          (e) => new Ente(
            e.ente,
            e.ente_id,
            e.siglas,
            e.estado,
            e.municipio,
            e.created_at,
            e.updated_at,
            e.id_usuario,
            e.uid,
            e.estatus
          )
        );

        return {
          total: resp.total || 0,
          entes,
        };
      }),
      catchError((error) => {
        console.error('Error al cargar entes:', error);
        return of({ total: 0, entes: [] }); // Devuelve un objeto vacío en caso de error
      })
    );
  }

  cargarEntes() {
    ////.log('EntreCargaEntes_usuario.service');
    const urlData = `${this.url2}users/entes`;
    return this.http.get<EnteLoad>(urlData, this.headers).pipe(
      delay(100),
      map((resp) => {
        const entes = resp.entes.map(
          (e) =>
            new Ente(
              e.ente,
              e.ente_id,
              e.siglas,
              e.estado,
              e.municipio,
              e.created_at,
              e.updated_at,
              e.id_usuario,
              e.uid,
              e.estatus)
        );
        return {
          total: resp.total,
          entes,
        };
      })
    );
  }

  // Método para crear un nuevo ente con cabeceras
  crearEnte2(FormData: EntesForm): Observable<any> {
    const url = `${this.url2}users/registerEnte`;
    return this.http.post(url, FormData, this.headers); // Incluye cabeceras aquí
  }

  // Método para agregar un ente a la lista local
  addEnte(newEnte: Ente): void {
    const currentEntes = this.entesSubject.getValue();
    this.entesSubject.next([...currentEntes, newEnte]);
  }

  // Método para actualizar la lista de entes
  updateEntes(updatedList: Ente[]): void {
    this.entesSubject.next(updatedList);
  }
}
