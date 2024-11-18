import { MaterialModule } from './../material/material.module';
import { ShareModule } from './../pages/share/share.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';

import { ChangePasswordComponent } from './change-password/change-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FiltroPipe } from 'src/app/pipes/filtro.pipe';
import { FiltraPipe } from 'src/app/pipes/filtra.pipe';





@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    ChangePasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ShareModule,
    ReactiveFormsModule,
    MaterialModule,

  ]
})
export class AuthModule { }
