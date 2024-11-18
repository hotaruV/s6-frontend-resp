import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../material/material.module';
import { ShareModule } from '../share/share.module';
import { OicIndexComponent } from './oic-index/oic-index.component';
import { OicNotificationsComponent } from './oic-notifications/oic-notifications.component';
import { oicRoutingModule } from './oic-routing.module';
import { OicComponent } from './oic.component';
import { NotificationsPipe } from 'src/app/pipes/notifications.pipe';
;



@NgModule({
  declarations: [
    OicComponent,
    OicIndexComponent,
    OicNotificationsComponent,
    NotificationsPipe,
  ],
  imports: [
    CommonModule,
    ShareModule,
    oicRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class OicModule { }
