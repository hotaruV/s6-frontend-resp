import { Component } from '@angular/core';
import { EntesForm } from 'src/app/interfaces/entes.inteface'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-register',
  template: `
    <app-funcionarios-index></app-funcionarios-index>
    <mat-tab-group mat-align-tabs="center">
      <mat-tab label="REGISTRO DE ENTE PÚBLICO">
        <app-register-ente (entesListUpdated)="onEntesListUpdated($event)"></app-register-ente>
      </mat-tab>
      <mat-tab label="REGISTRO DE USUARIOS">
        <app-register-usuarios [entesList]="entesList"></app-register-usuarios>
      </mat-tab>
    </mat-tab-group>
  `
})
export class RegisterComponent {
  public entesList: EntesForm[] = []; // Propiedad para almacenar la lista de entes

  onEntesListUpdated(entes: EntesForm[]) {
    this.entesList = entes; // Almacena la lista de entes recibida
  }
}
