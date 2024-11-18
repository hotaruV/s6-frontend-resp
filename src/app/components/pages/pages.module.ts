import { RouterModule } from '@angular/router';
import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { ShareModule } from './share/share.module';



@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    MaterialModule,
    RouterModule,

  ],
  declarations: [
    PagesComponent
  ]

})
export class PagesModule { }
