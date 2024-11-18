import { SelladoComponent } from './sellado/sellado.component';
import { ContratoComponent } from './contrato/contrato.component';
import { AdjudicacionComponent } from './adjudicacion/adjudicacion.component';
import { LicitacionComponent } from './licitacion/licitacion.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContratPassUserGuard } from 'src/app/guard/contrat-pass-user.guard';

const routes: Routes = [

  {
    path: 'planeacion',
    loadChildren: () => import('./planeacion/planeacion.module').then(m => m.PlaneacionModule),
  },
  {
    path: 'licitacion',
    component: LicitacionComponent,

    loadChildren: () => import('./licitacion/licitacion.module').then(m => m.LicitacionModule)
  },
  {
    path: 'adjudicacion',
    component: AdjudicacionComponent,
    loadChildren: () => import('./adjudicacion/adjudicacion.module').then(m => m.AdjudicacionModule)
  },
  {
    path: 'contrato',
    component: ContratoComponent,
    loadChildren: () => import('./contrato/contrato.module').then(m => m.ContratoModule)
  },
  {
    path: 'sellado/:ocid',
    component: SelladoComponent,
    canActivate: [ContratPassUserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContratacionesRoutingModule { }
