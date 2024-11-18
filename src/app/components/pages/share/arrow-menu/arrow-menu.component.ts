import { ContratoService } from './../../../../services/pages/contrato.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-arrow-menu',
  templateUrl: './arrow-menu.component.html',
  styleUrls: ['./arrow-menu.component.scss']
})
export class ArrowMenuComponent implements OnInit {
  btn: string[] = ["btn-rightb", "btn-rightb", "btn-rightb", "btn-rightb", "btn-rightb"];
  deg: string = "pla";
  col: string[] = ["blanco", "blanco", "blanco", "blanco", "blanco"];

  urlA: string;

  constructor(
    private route: ActivatedRoute,
    private contractServ: ContratoService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.colores();
  }

  colores() {
    this.urlA = this.router.url
    let ruta = this.urlA.split('/');
    ////(ruta[4]);
    this.contractServ.cargarEtapa(this.urlA);
    switch (ruta[4]) {
      case 'planeacion':
        this.btn[0] = "btn-rightpla";
        this.btn[1] = "btn-rightb";
        this.btn[2] = "btn-rightb";
        this.btn[3] = "btn-rightb";
        this.btn[4] = "btn-rightb";
        this.col[0] = "normal";
        this.col[1] = "blanco";
        this.col[2] = "blanco";
        this.col[3] = "blanco";
        this.col[4] = "blanco";
        this.deg = "pla";
      break;
      case 'licitacion' :
        this.btn[0] = "btn-rightpla";
        this.btn[1] = "btn-rightlic";
        this.btn[2] = "btn-rightb";
        this.btn[3] = "btn-rightb";
        this.btn[4] = "btn-rightb";
        this.col[0] = "normal";
        this.col[1] = "normal";
        this.col[2] = "blanco";
        this.col[3] = "blanco";
        this.col[4] = "blanco";
        this.deg = "lic";
      break;
      case 'contrato':
        this.btn[0] = "btn-rightpla";
        this.btn[1] = "btn-rightlic";
        this.btn[2] = "btn-rightcon";
        this.btn[3] = "btn-rightadj";
        this.btn[4] = "btn-rightb";
        this.col[0] = "normal";
        this.col[1] = "normal";
        this.col[2] = "normal";
        this.col[3] = "normal";
        this.col[4] = "blanco";
        this.deg = "adj";
      break;
      case 'adjudicacion' :
        this.btn[0] = "btn-rightpla";
        this.btn[1] = "btn-rightlic";
        this.btn[2] = "btn-rightcon";
        this.btn[3] = "btn-rightb";
        this.btn[4] = "btn-rightb";
        this.col[0] = "normal";
        this.col[1] = "normal";
        this.col[2] = "normal";
        this.col[3] = "blanco";
        this.col[4] = "blanco";
        this.deg = "con";
      break;
      case 'sellado' :
        this.btn[0] = "btn-rightpla";
        this.btn[1] = "btn-rightlic";
        this.btn[2] = "btn-rightcon";
        this.btn[3] = "btn-rightadj";
        this.btn[4] = "btn-rightsel";
        this.col[0] = "normal";
        this.col[1] = "normal";
        this.col[2] = "normal";
        this.col[3] = "normal";
        this.col[4] = "normal";
        this.deg = "sel";
      break;
      default:
        break;
    }
    // if (this.urlA === '/sea/funcionarios/contrataciones/planeacion' ||
    //   'budget' || 'document' || 'milestone') {
    //   this.btn[0] = "btn-rightpla";
    //   this.btn[1] = "btn-rightb";
    //   this.btn[2] = "btn-rightb";
    //   this.btn[3] = "btn-rightb";
    //   this.btn[4] = "btn-rightb";
    //   this.col[0] = "normal";
    //   this.col[1] = "blanco";
    //   this.col[2] = "blanco";
    //   this.col[3] = "blanco";
    //   this.col[4] = "blanco";
    //   this.deg = "pla";
    // }
    // if (this.urlA === '/sea/funcionarios/contrataciones/licitacion' ||
    // 'address' || 'contractpoint') {
    //   this.btn[0] = "btn-rightpla";
    //   this.btn[1] = "btn-rightlic";
    //   this.btn[2] = "btn-rightb";
    //   this.btn[3] = "btn-rightb";
    //   this.btn[4] = "btn-rightb";
    //   this.col[0] = "normal";
    //   this.col[1] = "normal";
    //   this.col[2] = "blanco";
    //   this.col[3] = "blanco";
    //   this.col[4] = "blanco";
    //   this.deg = "lic";
    // }
    // if (this.urlA === '/sea/funcionarios/contrataciones/contrato') {
    //   this.btn[0] = "btn-rightpla";
    //   this.btn[1] = "btn-rightlic";
    //   this.btn[2] = "btn-rightcon";
    //   this.btn[3] = "btn-rightb";
    //   this.btn[4] = "btn-rightb";
    //   this.col[0] = "normal";
    //   this.col[1] = "normal";
    //   this.col[2] = "normal";
    //   this.col[3] = "blanco";
    //   this.col[4] = "blanco";
    //   this.deg = "con";
    // }
    // if (this.urlA === '/sea/funcionarios/contrataciones/adjudicacion') {
    //   this.btn[0] = "btn-rightpla";
    //   this.btn[1] = "btn-rightlic";
    //   this.btn[2] = "btn-rightcon";
    //   this.btn[3] = "btn-rightadj";
    //   this.btn[4] = "btn-rightb";
    //   this.col[0] = "normal";
    //   this.col[1] = "normal";
    //   this.col[2] = "normal";
    //   this.col[3] = "normal";
    //   this.col[4] = "blanco";
    //   this.deg = "adj";
    // }


    //   case '/sea/funcionarios/contrataciones/licitacion':
    //     this.btn[0] = "btn-rightpla";
    //     this.btn[1] = "btn-rightlic";
    //     this.btn[2] = "btn-rightb";
    //     this.btn[3] = "btn-rightb";
    //     this.btn[4] = "btn-rightb";
    //     this.col[0] = "normal";
    //     this.col[1] = "normal";
    //     this.col[2] = "blanco";
    //     this.col[3] = "blanco";
    //     this.col[4] = "blanco";
    //     this.deg = "lic";
    //     break;
    //   case '/sea/funcionarios/contrataciones/contrato':
    //     this.btn[0] = "btn-rightpla";
    //     this.btn[1] = "btn-rightlic";
    //     this.btn[2] = "btn-rightcon";
    //     this.btn[3] = "btn-rightb";
    //     this.btn[4] = "btn-rightb";
    //     this.col[0] = "normal";
    //     this.col[1] = "normal";
    //     this.col[2] = "normal";
    //     this.col[3] = "blanco";
    //     this.col[4] = "blanco";
    //     this.deg = "con";
    //     break;

    //   case '/sea/funcionarios/contrataciones/adjudicacion':
    //     this.btn[0] = "btn-rightpla";
    //     this.btn[1] = "btn-rightlic";
    //     this.btn[2] = "btn-rightcon";
    //     this.btn[3] = "btn-rightadj";
    //     this.btn[4] = "btn-rightb";
    //     this.col[0] = "normal";
    //     this.col[1] = "normal";
    //     this.col[2] = "normal";
    //     this.col[3] = "normal";
    //     this.col[4] = "blanco";
    //     this.deg = "adj";
    //     break;


    //   default:
    //     break;
    // }



  }
}
