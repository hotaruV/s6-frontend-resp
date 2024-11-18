import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ContratoRevision } from 'src/app/interfaces/notificaciones.interface';
import { UsuarioService } from 'src/app/services/auth/usuario.service';
import { OICservice } from 'src/app/services/pages/oic.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-oic',
  templateUrl: './oic.component.html',
  styleUrls: ['./oic.component.scss']
})
export class OicComponent implements OnInit {
  public user_id: string;
  public ocid: string;
  public search: string;
  public pages: number = 0;
  public contratos: ContratoRevision[] = [];
  public notificaciones: any[] = [];
  public usuarioNotificacion: any[] = [];
  public loading: boolean = true;
  public mensaje: string;
  public btnActive: boolean = false;
  public boton: boolean = false;
  public getRol: any;
  public getNombres: any;
  public getSecretaria: string = "";

  public ModalTitle = "Notificaciones enviadas al ENTE"

  constructor(private oicServ: OICservice,
    private userSrv: UsuarioService,
    private modalSrv: SharedService,
    private router: Router) {
    this.user_id = userSrv.authID;
    this.getRol = userSrv.usuario.getRol;
    this.getNombres = userSrv.usuario.getNombres
  }


  ngOnInit(): void {
    this.getContratos();
  }

  getContratos() {
    this.oicServ.cargarContratos()
      .pipe(
        map((resp: any) => {
          ////(resp.auditoria);

          const contratosArray: ContratoRevision[] = resp.auditoria.map((item: any) => ({
            _id: item._id,
            id: item.contrato_id.id,
            ocid: item.contrato_id.ocid,
            date: item.contrato_id.date,
            tender: item.contrato_id.tender,
            language: item.contrato_id.language,
            initiationType: item.contrato_id.initiationType,
            status: item.status
          }));

          this.contratos = contratosArray;
          ////(this.contratos);
          this.getSecretaria = resp.ente_publico;
        })
      )
      .subscribe();
  }
  nextPages() {
    this.pages += 5
  }
  PrevPages() {
    if (this.pages > 0) {
      this.pages -= 5
    }
  }


  getNotificationStatus(contratoId: string): string {
    const notificacion = this.notificaciones.find(n => n.contrato_id === contratoId);
    return notificacion ? notificacion.status : 'NO REVISADO';
  }


  verContrato(ocid: string) {
    //alert(ocid)
    this.router.navigate(['/sea/oic/contratos/revision', ocid])
  }

  verNotificaciones(ocid: string, contrato_id: string) {
    ////(contrato_id);
    const revision = this.contratos.find(n => n._id === contrato_id);
    this.router.navigate(['/sea/oic/notificaciones', ocid, revision._id])
  }

  openmodal(notificaion_id: string, ocid: string) {
    this.modalSrv.openDialogModalFuncionarios({
      title: this.ModalTitle,
      content:{
        revition_id: notificaion_id,
        ocid: ocid
      }
    });
  }

  onSearchContract(search: string) {
    this.pages = 0
    this.search = search.toLowerCase()

    ////(this.search);
  }
}

