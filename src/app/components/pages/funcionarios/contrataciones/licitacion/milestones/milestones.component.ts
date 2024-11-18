import { Router, ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-milestones',
  templateUrl: './milestones.component.html'
})
export class MilestonesComponent implements OnInit {

  @Input() BtnName: string;
  @Input() Radelante: string = "/sea/funcionarios/contrataciones/licitacion/amandments"
  @Input() Ratras: string = "/sea/funcionarios/contrataciones/licitacion/document"
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

  redirect(e:string){
    this.router.navigate([this.Radelante, this.ocid])
  }


  redireccionA(e: string) {
    this.router.navigate([this.Radelante, this.ocid])
  }

  redireccionAT(e: string) {
    this.router.navigate([this.Ratras, this.ocid])
  }

}
