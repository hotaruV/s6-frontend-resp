import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html'
})
export class DocumentsComponent implements OnInit {

  @Input() Radelante: string = "/sea/funcionarios/contrataciones/contrato/items/"
  @Input() Ratras: string = "/sea/funcionarios/contrataciones/contrato/contract/"

  public ocid: string
  public awadID: string
  public contractID: string

  constructor(private router: Router,
    private routeActive: ActivatedRoute
  ) {
    this.routeActive.params.subscribe(({ ocid, id, cid }) => {
      this.ocid = ocid;
      this.awadID = id;
      this.contractID = cid;
    })
  }

  ngOnInit(): void {
  }

  redireccionA(e: string) {
    this.router.navigate([this.Radelante, this.ocid, this.awadID, this.contractID])
  }

  redireccionAT(e: string) {
    this.router.navigate([this.Ratras, this.ocid, this.awadID])
  }

}
