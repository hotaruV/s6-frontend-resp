import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServidoresEnte } from 'src/app/models/Entes/servidores.model';
import { UsuarioService } from 'src/app/services/auth/usuario.service';
import { LicitationService } from 'src/app/services/pages/licitation.service';
import { PlaningService } from 'src/app/services/pages/planing.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-InicioComponentPlanning',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponentPlanning {
  public ocid: string = "";
  public getNombres = ""
  public getIdUsuario = ""
  public getidentepublico = ""
  public getRol = ""
  public buyer_id = ""
  public getentesreq: any;
  public servReq: ServidoresEnte[] = [];
  public servRes: ServidoresEnte[] = [];
  public servCon: ServidoresEnte[] = [];
  public showEditButton: boolean = false;

  public hasQuotes: string = 'SI';
  why: boolean;


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
    this.getServidorContratante();
    this.getServidorResponsable();

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
  getServidorContratante() {
    // //('Entre getServidorContratante: '+this.getidentepublico);

    this.getentesreq = this.usrServ.getServidorContratante(this.getidentepublico).subscribe(
      ({ total, servidores }) => {

        if (servidores.length !== 0) {
          this.servCon = servidores;
        }

      }
    );
    // //('Entre getServidorContratante: '+this.servCon );
  }
  getServidorResponsable() {
    // //('Entre getServidorResponsable: '+this.getidentepublico);

    this.getentesreq = this.usrServ.getServidorResponsable(this.getidentepublico).subscribe(({ total, servidores }) => {

      if (servidores.length !== 0) {
        this.servRes = servidores;

      }

    });
    //  //('Entre getServidorResponsable: '+this.servRes );
  }

  presupuestoForm = this.fb.group({
    requestingUnitname: ['', [Validators.required]],//obligatorio 
    rationale: ['', [Validators.required]],//obligatorio 
    hasQuotes: ['', [Validators.required]],//obligatorio 
    cotizacion_no: ['', [Validators.required]],//obligatorio 
    responsibleUnitname: ['', [Validators.required]],//obligatorio 
    contractingUnitname: ['', [Validators.required]],//obligatorio 
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

  hasQuotesno() {

    this.hasQuotes = "NO";
    this.why = false;

  }
  hasQuotessi() {
    this.hasQuotes = "SI";
    this.why = true;
  }

  guardarInicio() {


    let form: any = this.presupuestoForm.value;
    //console.log(form.hasQuotes);
    if (this.presupuestoForm.invalid) {
      this.presupuestoForm.markAllAsTouched();
      return;
    }

    let buyer_id = localStorage.getItem("buyer_id") || this.buyer_id;
    let planning_id = localStorage.getItem("planning_id")


    const data = {
      buyer: buyer_id,
      planning: planning_id
    }

    this.tenderSvc.actulizarRelease(data, this.ocid).subscribe((resp: any) => {


      Swal.fire({
        icon: 'success',
        title: "<h5 style='color:#125DA9; font-size: 20px !important;'> PLANEACIÓN  </h5>",
        text: "SE HA GUARDADO LA PLANEACIÓN CON ÉXITO ",
        confirmButtonText: "ACEPTAR",
        confirmButtonColor: '#125DA9',
        showConfirmButton: true,
        //timer: 1500
      })


      this.router.navigate(['/sea/funcionarios/inicio-contrato'])
      localStorage.removeItem("planning_id")
      localStorage.removeItem("buyer_id")
    })

  }
}
