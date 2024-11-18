import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-item-index',
  templateUrl: './item-index.component.html',
  styleUrls: ['./item-index.component.scss']
})
export class ItemIndexComponent implements OnInit {

  @Input() ruta: string = "/sea/funcionarios/contrataciones/contrato/index/"
  public ocid: string
  constructor(
    private router: Router,
    private routeActive: ActivatedRoute
  ) {
    this.routeActive.params.subscribe(({ ocid, id }) => {
      this.ocid = ocid;
    })
  }
  ngOnInit() {

  }
  ngOnDestroy() {

  }

  redirect(e) {
    this.router.navigate([this.ruta, this.ocid])
  }

}
