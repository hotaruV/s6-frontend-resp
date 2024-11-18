import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html'
})
export class DocumentsComponent implements OnInit {



  @Input() Radelante: string = "/sea/funcionarios/contrataciones/licitacion/milestone"
  @Input() Ratras: string = "/sea/funcionarios/contrataciones/licitacion/valores/"




  public ocid: string

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




  redireccionA(e: string) {
    this.router.navigate([this.Radelante, this.ocid])
  }

  redireccionAT(e: string) {
    this.router.navigate([this.Ratras, this.ocid])
  }

}
