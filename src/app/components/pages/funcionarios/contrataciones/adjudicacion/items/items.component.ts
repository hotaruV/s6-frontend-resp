import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  @Input() ruta:string = "/sea/funcionarios/contrataciones/licitacion/milestone"
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

  redirect(e){
    this.router.navigate([this.ruta, this.ocid])
  }

}
