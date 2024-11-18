import { LoginAuthGuard } from './../../guard/login-auth.guard';
import { FistLoginGuard } from './../../guard/fist-login.guard';
import { AuthGuard } from './../../guard/auth.guard';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
//import { RegisterComponent } from './register/register.component';
// import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {path: 'login', component: LoginComponent, canActivate:[LoginAuthGuard]},
      {path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard]},
      {path: 'reset-password', component: ResetPasswordComponent,canActivate: [AuthGuard]},
      {path: '**', redirectTo: 'login'},
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
