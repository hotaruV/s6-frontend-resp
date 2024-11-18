import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { ContratPassUserGuard } from 'src/app/guard/contrat-pass-user.guard';

import { AmendmentsComponent } from './amendments/amendments.component';
import { ContractComponent } from './contract/contract.component';
import { ContratoIndexComponent } from './contrato-index/contrato-index.component';
import { ContratoComponent } from './contrato.component';
import { DocumentsComponent } from './documents/documents.component';
import { ItemIndexComponent } from './item-index/item-index.component';
import { ValueComponent } from './value/value.component';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard, ContratPassUserGuard],
    component: ContratoComponent,
    children: [
      // En esta ruta van los formularios de value y period
      // Objeto value / period
      {
        path: 'inicio/:ocid',
        component: InicioComponent
      },
      {
        path: 'value/:ocid/:id',
        component: ValueComponent
      },
      // Fin de las rutas conjuntas
      {
        path: 'contract/:ocid/:award_id',
        component: ContractComponent
      },
      {
        path: 'contract/:ocid/:contract_id/:award_id',
        component: ContractComponent
      },
      {
        path: 'document/:ocid/:id/:cid',
        component: DocumentsComponent
      },
      {
        path: 'items/:ocid/:id/:cid',
        component: ItemIndexComponent
      },
      {
        path: 'index/:ocid',
        component: ContratoIndexComponent
      },
      {
        path: 'amandments/:ocid',
        component: AmendmentsComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContratoRoutingModule { }
