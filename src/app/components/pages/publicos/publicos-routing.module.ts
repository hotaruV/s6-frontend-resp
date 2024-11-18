import { PublicosComponent } from './publicos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContratosComponent } from './contratos/contratos.component';
import { GraficasComponent } from './graficas/graficas.component';
import { ReporteComponent } from './reporte/reporte.component';

const routes: Routes = [
  {
    path: '',
    component: PublicosComponent,
    children: [
      { path: 'visor-ciudadano', component: ContratosComponent },
      { path: 'graficas', component: GraficasComponent },
      { path: 'reporte/:ocid', component: ReporteComponent },

      { path: '**', redirectTo: 'visor-ciudadano' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicosRoutingModule { }
