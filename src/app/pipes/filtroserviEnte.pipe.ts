import { Pipe, PipeTransform } from '@angular/core';
import { RegisterFOrm } from '../interfaces/login.interface';

@Pipe({
  name: 'filtro',
})
export class FiltroPipe implements PipeTransform {
  transform(
    usuarios: RegisterFOrm[],
    page: number = 0,
    search: string = ''
  ): RegisterFOrm[] {
    // Filtra los usuarios por userName o rfc si hay un término de búsqueda
    const filterUser = usuarios.filter((usr) =>
      usr.userName.toUpperCase().includes(search.toUpperCase()) ||
      usr.rfc.toUpperCase().includes(search.toUpperCase()) ||
      usr.ente_publico.toUpperCase().includes(search.toUpperCase())
    );


    // Aplica la paginación
    const startIndex = page ;
    return filterUser.slice(startIndex, startIndex + 15);
  }
}
