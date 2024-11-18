import { map } from 'rxjs/operators';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Amendment } from 'src/app/interfaces/tender.interface';
import { LicitationService } from 'src/app/services/pages/licitation.service';

@Component({
  selector: 'app-amandments',
  templateUrl: './amandments.component.html',
  styleUrls: ['./amandments.component.scss']
})
export class AmandmentsComponent implements OnInit {

  @Input() ruta: string = "/sea/funcionarios/contrataciones/licitacion/partie"

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
