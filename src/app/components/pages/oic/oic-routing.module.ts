import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { SelladoComponent } from '../funcionarios/contrataciones/sellado/sellado.component';
import { OicIndexComponent } from './oic-index/oic-index.component';
import { OicNotificationsComponent } from './oic-notifications/oic-notifications.component';
import { OicComponent } from './oic.component';




const routes: Routes = [
  {
    path: '',
    component: OicComponent,
    
   
    children: [
      { path: 'contratos', component: OicIndexComponent, canActivate: [AuthGuard] },
      { path: 'contratos/revision/:ocid', component: SelladoComponent, canActivate: [AuthGuard] },
      { path: 'notificaciones/:ocid/:revision_id', component: OicNotificationsComponent, canActivate: [AuthGuard] },
      { path: '**', redirectTo: 'contratos' },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class oicRoutingModule { }
