import { ContratacionesModule } from './../pages/funcionarios/contrataciones/contrataciones.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

const routes: Routes = [
  {
    path: 'sea/publica',
    loadChildren: () => import('../pages/publicos/publicos.module').then(m => m.PublicosModule),
  },
  {
    path: 'sea/funcionarios',
    loadChildren: () => import('../pages/funcionarios/funcionarios.module').then(m => m.FuncionariosModule),
  },
  {
    path: 'sea/oic',
    loadChildren: () => import('../pages/oic/oic.module').then(m => m.OicModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule),
  },

  { path: '**', redirectTo: 'sea/funcionarios' }
];


@NgModule({
  imports: [
    // RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', initialNavigation: 'enabled' })
    // RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', initialNavigation: 'enabled' })
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', initialNavigation: 'enabledBlocking' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
