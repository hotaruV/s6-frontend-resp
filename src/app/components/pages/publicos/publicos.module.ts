import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { NgChartsModule } from 'ng2-charts';
import { PublicosRoutingModule } from './publicos-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../share/share.module';
import { ContratosComponent } from './contratos/contratos.component';
import { GraficasComponent } from './graficas/graficas.component';
import { ModalComponent } from './modal/modal.component';
import { FormatterComponent } from '../../../formatter/formatter.component';
import { FiltroPipe } from './../../../pipes/contrato.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { GraficaComponent } from './graficas/grafica/grafica.component';
import { PublicosComponent } from './publicos.component';
import { ReporteComponent } from './reporte/reporte.component';

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    PublicosRoutingModule,
    NgChartsModule
  ],
  declarations: [
    PublicosComponent,
    FiltroPipe,
    ContratosComponent,
    GraficasComponent,
    ModalComponent,
    FormatterComponent,
    GraficaComponent,
    ReporteComponent
  ]

})
export class PublicosModule { }
