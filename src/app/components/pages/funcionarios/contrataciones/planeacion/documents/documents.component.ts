import { Router, ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})


export class DocumentsComponent implements OnInit {


  @Input() Radelante: string = "/sea/funcionarios/contrataciones/planeacion/milestone"
  @Input() Ratras: string = "/sea/funcionarios/contrataciones/planeacion/budget"

  public ocid: string

  constructor(
    private router: Router,
    private routerActive: ActivatedRoute
  ) {
    this.routerActive.params.subscribe(({ ocid }) => {
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
