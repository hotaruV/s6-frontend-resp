import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';




@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit, OnDestroy {


  @Input() Radelante: string = "/sea/funcionarios/contrataciones/licitacion/document"
  @Input() Ratras: string = "/sea/funcionarios/contrataciones/licitacion/amandments/"






  public ocid: string
  constructor(
    private router: Router,
    private routeActive: ActivatedRoute
  ) {
    this.routeActive.params.subscribe(({ ocid }) => {
      this.ocid = ocid;
    })
  }
  ngOnInit() {

  }
  ngOnDestroy() {

  }


  redireccionA(e: string) {
    this.router.navigate([this.Radelante, this.ocid])
  }

  redireccionAT(e: string) {
    this.router.navigate([this.Ratras, this.ocid])
  }

}
