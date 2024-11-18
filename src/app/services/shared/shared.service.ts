import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/components/pages/share/Material/modal/modal.component';

import { NotificationDialogModalComponent } from 'src/app/components/pages/share/Material/notifacions-dialog-modal/notifacions-dialog-modal.component';
import { matDialog } from 'src/app/interfaces/matDialog.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private matDialog: MatDialog
  ) { }

  openDialogNotifications(data: matDialog, width: string = '80%') {
    this.matDialog.open(NotificationDialogModalComponent, {
      data,
      width: width // Aquí especificas el ancho del diálogo
    });
  }

  openDialogModalFuncionarios(data: matDialog, width: string = '80%') {
    this.matDialog.open(ModalComponent, {
      data,
      width: width // Aquí especificas el ancho del diálogo
    });
  }
}
