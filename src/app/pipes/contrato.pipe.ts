import { Pipe, PipeTransform } from '@angular/core';
import { ContratosL } from '../interfaces/contrato.interface';

@Pipe({
  name: 'contract',
})
export class FiltroPipe implements PipeTransform {
  transform(
    all: ContratosL[] = [],
    page: number = 0,
    search: string = ''
  ): ContratosL[] {
    const searchTerm = search.toLowerCase(); // Convertir el término de búsqueda a minúsculas

    if (searchTerm.length === 0) {
      return all.slice(page * 20, (page + 1) * 20);
    }

    return all
      .filter((contract) => {
        return (
          contract.ocid.includes(searchTerm) ||
          contract.title.toLowerCase().includes(searchTerm) ||
          contract.description.toLowerCase().includes(searchTerm) ||
          contract.institucion.toLowerCase().includes(searchTerm) ||
          contract.method.toLowerCase().includes(searchTerm)
        );
      })
      .slice(page * 20, (page + 1) * 20);
  }
}
