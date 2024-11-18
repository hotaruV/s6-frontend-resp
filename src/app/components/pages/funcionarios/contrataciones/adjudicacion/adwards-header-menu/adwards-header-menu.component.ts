import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface menuItem {
  texto: string,
  ruta: string
}

@Component({
  selector: 'app-adwards-header-menu',
  templateUrl: './adwards-header-menu.component.html',
  styleUrls: ['./adwards-header-menu.component.scss']
})
export class AdwardsHeaderMenuComponent implements OnInit {

  public ocid: string;
  public flag:boolean = false;

  templateMenu: menuItem[] = [

    // {
    //   texto: 'Adjudicaciones',
    //   ruta: `/sea/funcionarios/contrataciones/adjudicacion/awards/${localStorage.getItem('ocid')}`
    // },
    // {
    //   texto: 'Contratación',
    //   ruta: '/sea/funcionarios/contrataciones/adjudicacion/supplier/'
    // },
    // {
    //   texto: 'Documentos',
    //   ruta: '/sea/funcionarios/contrataciones/adjudicacion/document'
    // },
    // {
    //   texto: 'Items',
    //   ruta: '/sea/funcionarios/contrataciones/adjudicacion/items/'
    // }


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
