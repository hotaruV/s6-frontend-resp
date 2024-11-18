import { ContratacionesComponent } from './contrataciones/contrataciones.component';
import { FistLoginGuard } from 'src/app/guard/fist-login.guard';

// import { AdmEnteIndexComponent } from './admEnte-index/admEnte.component';
import { AuthGuard } from './../../../guard/auth.guard';

import { FuncionariosComponent } from './funcionarios.component';
import { FuncionariosIndexComponent } from './funcionarios-index/funcionarios-index.component';
import { ContratosIndexComponent } from './contratos-index/contratos-index.component';


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './users/register/register.component';
import { AdminGuard } from 'src/app/guard/admin.guard';
import { ActoresComponent } from './administracion/actores/actores.component';
import { FuncionarioComponent } from './administracion/funcionario/funcionario.component';
import { EntePublicoComponent } from './administracion/ente-publico/ente-publico.component';
import { OicComponent } from '../funcionarios/oic/oic.component';



const routes: Routes = [
  {
    path: '',
    component: FuncionariosComponent,
    //canActivate: [FistLoginGuard],
    children: [
      {
        path: 'sistema', component: FuncionariosIndexComponent, canActivate: [AuthGuard]
      },
      { path: 'registro', component: RegisterComponent, canActivate: [AuthGuard, FistLoginGuard, AdminGuard] },
      { path: 'administracion/funcionario', component: FuncionarioComponent, canActivate: [AuthGuard, FistLoginGuard] },
      { path: 'administracion/ente-publico', component: EntePublicoComponent, canActivate: [AuthGuard, FistLoginGuard] },
      { path: 'administracion/oic-alertas', component: OicComponent, canActivate: [AuthGuard, FistLoginGuard] },
      { path: 'administracion/actores', component: ActoresComponent, canActivate: [AuthGuard, FistLoginGuard] },
      //  { path: 'admEnte', component: AdmEnteIndexComponent, canActivate: [AuthGuard, FistLoginGuard] },
      { path: 'inicio-contrato', component: ContratosIndexComponent, canActivate: [AuthGuard, FistLoginGuard] },

      {
        path: 'contrataciones',
        component: ContratacionesComponent,
        canActivate: [AuthGuard],
        loadChildren: () => import('../funcionarios/contrataciones/contrataciones.module').then(m => m.ContratacionesModule),
      },

      { path: '**', redirectTo: '/auth/login' },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionariosRoutingModule { }
