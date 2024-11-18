import { Pipe, PipeTransform } from '@angular/core';
import { EnteForm } from '../interfaces/entesN.interfaces';

@Pipe({
  name: 'filtroE',
})
export class FiltraPipe implements PipeTransform {
  transform(
    entes: EnteForm[],
    page_Ente: number = 0,
    searchEnte: string = ''
  ): EnteForm[] {
    // Filtra los entes por nombre de ente si hay un término de búsqueda
    const filterEnte = entes.filter((e) =>
      e.ente.toUpperCase().includes(searchEnte.toUpperCase())
    );


    ////('page_Ente:' + page_Ente);
    // Aplica la paginación
    const startIndex = page_Ente;

    ////('startIndexE:' + startIndex);

    return filterEnte.slice(startIndex, startIndex + 10);
  }
}