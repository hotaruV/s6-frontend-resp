import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


interface menuItem {
  texto: string,
  ruta: string,
  update?: string
}
@Component({
  selector: 'app-tender-header-menu',
  templateUrl: './tender-header-menu.component.html',
  styleUrls: ['./tender-header-menu.component.scss']
})
export class TenderHeaderMenuComponent implements OnInit {

  public ocid: string;
  public flag:boolean = false;
  templateMenu: menuItem[] = [
    //  {
    //    texto: 'Inicio',
    //    ruta: `/sea/funcionarios/contrataciones/licitacion/inicio/${localStorage.getItem('ocid')}`
    // },
    // {
    //   texto: 'Licitación',
    //   ruta: `/sea/funcionarios/contrataciones/licitacion/tender/${localStorage.getItem('ocid')}`
    // },

    // {
    //   texto: 'Periodos',
    //   ruta: '/sea/funcionarios/contrataciones/licitacion/periodos'
    // },
    // {
    //   texto: 'Valores',
    //   ruta: `/sea/funcionarios/contrataciones/licitacion/valores`,
    //   update: `/sea/funcionarios/contrataciones/licitacion/valores/${localStorage.getItem('ocid')}`
    // },
    // {
    //   texto: 'Documentos',
    //   ruta: '/sea/funcionarios/contrataciones/licitacion/document'
    // },
    // {
    //   texto: 'Hitos',
    //   ruta: '/sea/funcionarios/contrataciones/licitacion/milestone'
    // },
    // {
    //   texto: 'Modificaciones',
    //   ruta: '/sea/funcionarios/contrataciones/licitacion/amandments'
    // },
    // {
    //   texto: 'Partes',
    //   ruta: '/sea/funcionarios/contrataciones/licitacion/partie'
    // },
    // {
    //   texto: 'Indentificación',
    //   ruta: `/sea/funcionarios/contrataciones/licitacion/contacto`
    // },
    // {
    //   texto: 'Items',
    //   ruta: '/sea/funcionarios/contrataciones/licitacion/items'
    // }

    // ,

  ];
  constructor(
    private router: Router,
    private routeActive: ActivatedRoute
  ) {
    this.routeActive.params.subscribe(({ ocid }) => {
      this.ocid = ocid;
    })
  }

  ngOnInit(): void {
  }

  cambiarFlag(){
    this.flag = !this.flag;
  }

}
