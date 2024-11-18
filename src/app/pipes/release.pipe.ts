import { Pipe, PipeTransform } from '@angular/core';
import { Contrato } from '../interfaces/release';

@Pipe({
  name: 'release',
})
export class ReleasePipe implements PipeTransform {
  transform(
    contratos: Contrato[],
    pages: number = 0,
    search: string = ''
  ): Contrato[] {
    const searchTerm = search.toUpperCase(); // Convertir el término de búsqueda a mayúsculas

    if (searchTerm.length === 0) {
      return contratos.slice(pages * 5, (pages + 1) * 5);
    }

    //(contratos);
    return contratos
      .filter((contract) => {
        return (
          (contract.tender?.title?.toUpperCase().includes(searchTerm) ||
            contract.buyer.name.toUpperCase().includes(searchTerm) ||
            contract.ocid.toUpperCase().includes(searchTerm)) &&
          contract.tender !== null
        );
      })
      .slice(pages * 5, (pages + 1) * 5);
  }
}
