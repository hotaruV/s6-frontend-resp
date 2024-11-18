import { PeriodosComponent } from './form-periodos/tender-periodos.component';
import { ValoresComponent } from './form-values/valores.component';
import { AuthGuard } from './../../../../../guard/auth.guard';
import { LicitacionComponent } from './licitacion.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactoComponent } from './form-contacto/contacto.component';
import { ItemsComponent } from './form-items/items.component';
import { AditionalClassificationComponent } from './aditional-classification/aditional-classification.component';
import { DocumentsComponent } from './documents/documents.component';
import { MilestonesComponent } from '../licitacion/milestones/milestones.component';
import { AmandmentsComponent } from './amandments/amandments.component';
import { PartieComponent } from './partie/partie.component';
import { TenderComponent } from './tender/tender.component';
import { InicioComponent } from './inicio/inicio.component';
import { ContratPassUserGuard } from 'src/app/guard/contrat-pass-user.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard, ContratPassUserGuard],
    component: LicitacionComponent,
    children: [
      {
        path: 'inicio/:ocid',
        component: InicioComponent
      },
      {
        path: 'contacto/:ocid',
        component: ContactoComponent
      },
      {
        path: 'contacto/:ocid/:id',
        component: ContactoComponent
      },
      {
        path: 'partie/:ocid/:key',
        component: PartieComponent
      },
      {
        path: 'partie/:ocid/:id/:key',
        component: PartieComponent
      },
      {
        path: 'partie/:ocid',
        component: PartieComponent
      },
        // tender /  Value
        // Objeto procuringEntity / value / minValue / tenderPeriod
      {
        path: 'valores/:ocid',
        component: ValoresComponent
      },
      {
        path: 'periodos/:ocid',
        component: PeriodosComponent
      },

      //items
      {
        path: 'items/:ocid',
        component: ItemsComponent
      },
      {
        path: 'document/:ocid',
        component: DocumentsComponent
      },
      {
        path: 'milestone/:ocid',
        component: MilestonesComponent
      },
      {
        path: 'amandments/:ocid',
        component: AmandmentsComponent
      },
      {
        path: 'tender/:ocid',
        component: TenderComponent
      },

      {
        path: 'contacto',
        component: ContactoComponent
      },
      {
        path: 'partie',
        component: PartieComponent
      },

        // tender /  Value
        // Objeto procuringEntity / value / minValue / tenderPeriod
      {
        path: 'valores',
        component: ValoresComponent
      },
      {
        path: 'periodos',
        component: PeriodosComponent
      },

      //items
      {
        path: 'items',
        component: ItemsComponent
      },
      {
        path: 'document',
        component: DocumentsComponent
      },
      {
        path: 'milestone',
        component: MilestonesComponent
      },
      {
        path: 'amandments',
        component: AmandmentsComponent
      },
      {
        path: 'tender',
        component: TenderComponent
      },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicitacionRoutingModule { }
