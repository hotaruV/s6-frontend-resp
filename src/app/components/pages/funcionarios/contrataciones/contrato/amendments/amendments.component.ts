import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LicitationService } from 'src/app/services/pages/licitation.service';

@Component({
  selector: 'app-amendments',
  templateUrl: './amendments.component.html',
  styleUrls: ['./amendments.component.scss']
})
export class AmendmentsComponent implements OnInit {

  @Input() ruta: string = "/sea/funcionarios/contrataciones/licitacion/milestone"

  public ocid: string


  constructor(private fb: UntypedFormBuilder,
    private tenderSvc: LicitationService,
    private router: Router,
    private routeActive: ActivatedRoute
  ) {
    this.routeActive.params.subscribe(({ ocid }) => {
      this.ocid = ocid;
    })
  }

  ngOnInit(): void {

  }


  redirect(e) {
    this.router.navigate([this.ruta, this.ocid])
  }

}
