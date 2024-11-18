import { Pipe, PipeTransform } from '@angular/core';
import { ContratoRevision } from '../interfaces/notificaciones.interface';

@Pipe({
  name: 'notifications',
})
export class NotificationsPipe implements PipeTransform {
  transform(
    contratos: ContratoRevision[],
    pages: number = 0,
    search: string = ''
  ): ContratoRevision[] {
    const searchTerm = search.toUpperCase();

    if (searchTerm.length === 0) {
      return contratos.slice(pages * 5, (pages + 1) * 5);
    }

    return contratos
      .filter((contracts) => {
        return (
          (
            contracts.tender?.title?.toUpperCase().includes(searchTerm) ||
            contracts.ocid.toUpperCase().includes(searchTerm)
          )
        );
      })
      .slice(pages * 5, (pages + 1) * 5);
  }
}
