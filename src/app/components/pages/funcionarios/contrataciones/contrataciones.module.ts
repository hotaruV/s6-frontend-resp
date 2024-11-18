import { MaterialModule } from './../../../material/material.module';
import { ShareModule } from './../../share/share.module';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { ContratacionesRoutingModule } from './contrataciones-routing.module';
import { ContratacionesComponent } from './contrataciones.component';
import { PlaneacionComponent } from './planeacion/planeacion.component';
import { LicitacionComponent } from './licitacion/licitacion.component';
import { AdjudicacionComponent } from './adjudicacion/adjudicacion.component';
import { ContratoComponent } from './contrato/contrato.component';
import { SelladoComponent } from './sellado/sellado.component';
import { FormatterComponentFinal } from 'src/app/formatter/formatterfinal.component';

import localesESMX from '@angular/common/locales/es-MX'

registerLocaleData(localesESMX, 'es')

@NgModule({
  declarations: [
    FormatterComponentFinal,
    LicitacionComponent,
    ContratacionesComponent,
    PlaneacionComponent,
    AdjudicacionComponent,
    ContratoComponent,
    SelladoComponent,
  ],
  imports: [
    CommonModule,
    ContratacionesRoutingModule,
    ShareModule,
    MaterialModule,
  ],
  providers: [{provide: LOCALE_ID, useValue: 'es-MX'}]
})
export class ContratacionesModule { }
