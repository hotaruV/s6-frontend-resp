import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs';
import { matDialog } from 'src/app/interfaces/matDialog.interface';
import { OICservice } from 'src/app/services/pages/oic.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  public notificaciones: any[] = []
  public alerta_id: string
  public btnAtendido = false



  public noficationForm = this.fb.group({
    ///uid: [],
    notification_text: [],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: matDialog,
    private oicsrv: OICservice,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.getNotifications()

  }

  getNotifications() {
    const revition_id = this.data.content.revition_id;
    const ocid = this.data.content.ocid;
    this.oicsrv.getNotificacionsByRevition(ocid, revition_id)
      .pipe(
        map((resp: any) => {
          this.notificaciones = resp.notificaciones
        })
      )
      .subscribe()
  }
  VerAlert(alerta_id: string) {
    this.btnAtendido = true;
    this.oicsrv.getOneNotificacions(alerta_id)
      .pipe(map((resp: any) => {
        this.alerta_id = resp.notificacion._id
        ////(resp.notificacion.status);
        this.noficationForm.patchValue({
          notification_text: resp.notificacion.notification_text
        });
        if (resp.notificacion.status !== 'atendido') {
          ////(resp.notificacion.status === 'atendido');
          this.oicsrv.cambiarEstus(alerta_id, 'visto').pipe(
            map((r: any) => {
              this.getNotifications();
            })
          ).subscribe();
        } else {
          this.btnAtendido = false
          this.getNotifications();
        }
      })
      ).subscribe();
  }


  cambiarStatusAtendido() {

    this.oicsrv.cambiarEstus(this.alerta_id, 'atendido').pipe(
      map((r: any) => {
        this.getNotifications();
        this.btnAtendido = false
      })
    ).subscribe()
  }
}
