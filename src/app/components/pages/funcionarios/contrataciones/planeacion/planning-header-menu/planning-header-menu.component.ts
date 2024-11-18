import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


interface menuItem {
  texto: string,
  ruta?: string
}

@Component({
  selector: 'app-planning-header-menu',
  templateUrl: './planning-header-menu.component.html'
})
export class PlanningHeaderMenuComponent implements OnInit {
  public ocid: string;
  public flag:boolean = false;



  constructor(
    private router: Router,
    private routeActive: ActivatedRoute
  ) {
    this.routeActive.params.subscribe(({ ocid }) => {
      this.ocid = localStorage.getItem('ocid');
    })
  }

  templateMenu: menuItem[] = [
    // {
    //   texto: 'Inicio',
    //   ruta: `/sea/funcionarios/contrataciones/planeacion/inicio/${localStorage.getItem('ocid')}`
    // },
    // {
    //   texto: 'Comprador',
    //   ruta: `/sea/funcionarios/contrataciones/planeacion/buyer/${localStorage.getItem('ocid')}`
    // },
    // {
    //   texto: 'Documentos',
    //   ruta: '/sea/funcionarios/contrataciones/planeacion/document'
    // },
    // {
    //   texto: 'Planeación',
    //   ruta: '/sea/funcionarios/contrataciones/planeacion/milestone/'
    // },

  ];

  ngOnInit(): void {

  }


  cambiarFlag(){
    this.flag = !this.flag;
  }



}
