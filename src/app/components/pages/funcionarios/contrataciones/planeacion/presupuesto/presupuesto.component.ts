import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ServidoresEnte } from 'src/app/models/Entes/servidores.model';
import { UsuarioService } from 'src/app/services/auth/usuario.service';
import { LicitationService } from 'src/app/services/pages/licitation.service';
import { PlaningService } from 'src/app/services/pages/planing.service';

@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html',
  styleUrls: ['./presupuesto.component.scss']
})
export class PresupuestoComponent implements OnInit {

  public ocid: string = "";
  public getNombres = ""
  public getIdUsuario = ""
  public getidentepublico = ""
  public getRol = ""
  public buyer_id = ""
  public getentesreq: any;
  public servReq: ServidoresEnte[] = [];


  constructor(
    private fb: UntypedFormBuilder,
    private activateRute: ActivatedRoute,
    private planingService: PlaningService,
    private usrServ: UsuarioService,
    private router: Router,
    private tenderSvc: LicitationService,
  ) {

    this.activateRute.params.subscribe(({ ocid }) => {
      this.ocid = ocid
      this.getNombres = usrServ.usuario.getNombres;
      this.getIdUsuario = usrServ.usuario.getUid;
      this.getidentepublico = usrServ.usuario.getid_ente_publico.ente_id;
      this.getRol = usrServ.usuario.getRol;
      this.buyer_id = localStorage.getItem('buyer_id');
    })
  }

  ngOnInit(): void {
    this.getServidorRequirientes();

  }

  //funciones 
  getServidorRequirientes() {
    ////('Entre getServidorRequirientes: '+this.getidentepublico);

    this.getentesreq = this.usrServ.getServidorRequiriente(this.getidentepublico).subscribe(({ total, servidores }) => {

      if (servidores.length !== 0) {
        this.servReq = servidores;

      }

    });
    // //('Entre getServidorRequirientes: '+this.servReq );
  }

  presupuestoForm = this.fb.group({
    requestingUnitname: ['', [Validators.required]],//obligatorio 
  })

  campoNoValido(campo: string) {
    if (this.presupuestoForm.valid) {
      //this.inactivGuardar = false
    }
    return (
      this.presupuestoForm.controls[campo].errors &&
      this.presupuestoForm.controls[campo].touched
    );
  }

  guardarPresupuesto() {


  }
}
