import { BuyerComponent } from './buyer/buyer.component';
import { PlanningGuard } from './../../../../../guard/planning.guard';
import { UserDataGuard } from './../../../../../guard/user-data.guard';
import { PlaneacionComponent } from './planeacion.component';
import { AuthGuard } from './../../../../../guard/auth.guard';
import { MilestoneComponent } from './milestone/milestone.component';
import { BudgetComponent } from './budget/budget.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsComponent } from './documents/documents.component';
import { ContratPassUserGuard } from 'src/app/guard/contrat-pass-user.guard';


import { PlantillaComponent } from './planning/plantilla/plantilla.component';
import { PresupuestoComponent } from './presupuesto/presupuesto.component';


const routes: Routes = [

  {
    path: '',
    canActivate: [AuthGuard, UserDataGuard, ContratPassUserGuard],
    component: PlaneacionComponent,
    children: [
      {
        path: 'document/:ocid',
        component: DocumentsComponent,
      },
      {
        path: 'budget/:ocid',
        component: BudgetComponent,
      },
      {
        path: 'milestone/:ocid',
        component: MilestoneComponent,
      },

      {
        path: 'buyer',
        component: BuyerComponent,
      },

      {
        path: 'document',
        component: DocumentsComponent,
      },
      {
        path: 'budget',
        component: BudgetComponent,
      },
      {
        path: 'milestone',
        component: MilestoneComponent,
      },

      {
        path: 'buyer/:ocid',
        component: BuyerComponent,
      },
      {
        path: 'inicio/:ocid',
        //component: inicioPlaneacionComponent,
        component: PlantillaComponent
      },
      {
        path: 'presupuesto/:ocid',
        //component: inicioPlaneacionComponent,
        component: PresupuestoComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaneacionRoutingModule { }
