import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs';
import { matDialog } from 'src/app/interfaces/matDialog.interface';
import { OICservice } from 'src/app/services/pages/oic.service';


@Component({
  selector: 'app-dialog-modal',
  templateUrl: './notifacions-dialog-modal.component.html',
  styleUrls: ['./notifacions-dialog-modal.component.scss']
})
export class NotificationDialogModalComponent implements OnInit{
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: matDialog, 
    private oicsrv: OICservice){}
  ngOnInit(): void {
    this.getNotifications()
  }

  getNotifications(){
    this.oicsrv.getUserNotificacions()
    .pipe(
      map((resp: any) => {
        this.data.content = resp.notificaciones;
      })
    ).subscribe()
  }
}
