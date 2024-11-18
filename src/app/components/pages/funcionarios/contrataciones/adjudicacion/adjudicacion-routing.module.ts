import { AdwardFormComponent } from './adward-form/adward-form.component';
import { ItemsComponent } from './items/items.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { AdjudicacionComponent } from './adjudicacion.component';
import { AwardComponent } from './award/award.component';
import { DocumentsComponent } from './documents/documents.component';
import { ContratPassUserGuard } from 'src/app/guard/contrat-pass-user.guard';
import { InicioComponent } from './inicio/inicio.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard, ContratPassUserGuard],
    component: AdjudicacionComponent,
    children: [
      // En value se unificaron los tres formularios
      // Objetos value / supplier / contractPeriod
      {
        path: 'inicio/:ocid',
        component: InicioComponent
      },
      {
        path: 'supplier/:ocid',
        component: AdwardFormComponent
      },
      {
        path: 'supplier/:ocid/:id',
        component: AdwardFormComponent
      },
      {
        path: 'document/:ocid',
        component: DocumentsComponent
      },
      {
        path: 'awards/:ocid',
        component: AwardComponent
      },
      {
        path: 'items/:ocid',
        component: ItemsComponent
      },



      {
        path: 'supplier',
        component: AdwardFormComponent
      },

      {
        path: 'document',
        component: DocumentsComponent
      },
      {
        path: 'awards',
        component: AwardComponent
      },
      {
        path: 'items',
        component: ItemsComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdjudicacionRoutingModule { }
