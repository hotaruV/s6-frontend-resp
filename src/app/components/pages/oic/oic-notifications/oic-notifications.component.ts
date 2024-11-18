import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { map } from 'rxjs';
import { UsuarioService } from 'src/app/services/auth/usuario.service';
import { OICservice } from 'src/app/services/pages/oic.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-oic-notifications',
  templateUrl: './oic-notifications.component.html',
  styleUrls: ['./oic-notifications.component.scss']
})
export class OicNotificationsComponent implements OnInit {
  public getRol: any
  public getNombres: any
  public user_id: string;
  public ocid: string;
  public revision_id: string;
  public arr_notificaciones: any[] = [];

  constructor(
    private oicServ: OICservice,
    private routeActive: ActivatedRoute,
    private userSrv: UsuarioService,
    private fb: UntypedFormBuilder,
    private router: Router) {
    this.user_id = userSrv.authID;
    this.getRol = userSrv.usuario.getRol;
    this.getNombres = userSrv.usuario.getNombres
    this.getRol = userSrv.usuario.getRol;
    this.routeActive.params.subscribe(({ ocid, revision_id }) => {
      this.ocid = ocid;
      this.revision_id = revision_id;
    })
  }

  public noficationForm = this.fb.group({
    ///uid: [],
    notification_text: [, [Validators.required]],
  });

  ngOnInit() {
    this.getAllNotifications();
  }
  getAllNotifications() {
    this.oicServ.getNotificacionsByRevition(this.ocid, this.revision_id)
      .pipe(
        map((resp: any) => {
          this.arr_notificaciones = resp.notificaciones;
        })
      ).subscribe()
  }


  campoNoValido(campo: string) {

    return (
      this.noficationForm.controls[campo].errors &&
      this.noficationForm.controls[campo].touched
    );
  }


  crearNotificacion() {
    if (this.noficationForm.invalid) {
      this.noficationForm.markAllAsTouched();
      return;
    }
    let form: any = this.noficationForm.value;
    this.oicServ.notificationCreate(form, this.ocid, this.revision_id)
      .subscribe((resp: any) => {
        if (resp.ok) {
          this.formReset(this.noficationForm);
          this.noficationForm.controls['notification_text'].setErrors(null);
          this.getAllNotifications();
          Swal.fire({
            icon: 'success',
            title: "<h5 style='color:#125DA9; font-size: 20px !important;'> Notificacióm enviada </h5>",
            text: resp.msg,
            confirmButtonText: "ACEPTAR",
            confirmButtonColor: '#125DA9',
            showConfirmButton: true,
            //timer: 1500
          })
        } else {
          Swal.fire({

            icon: 'error',
            title: "<h5 style='color:#125DA9; font-size: 20px !important;'> NO SE PUDO AGREGAR EL USUARIO </h5>",
            text: resp.msg,
            confirmButtonText: "ACEPTAR",
            confirmButtonColor: '#125DA9',
            showConfirmButton: true,
            //timer: 1500
          })
        }

      })


  }

  private formReset(form: FormGroup) {
    Object.keys(form.controls).forEach((key) => {
      form.get(key).setErrors(null);
    });
    form.reset();
  }


  marcarConcluido(alerta_id: any) {
    this.oicServ.cambiarEstus(alerta_id, 'concluido').pipe(
      map((r: any) => {
        this.getAllNotifications();
      })
    ).subscribe()
  }

}
