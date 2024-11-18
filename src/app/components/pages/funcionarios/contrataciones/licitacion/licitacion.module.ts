import { ValoresComponent } from './form-values/valores.component';
import { ShareModule } from './../../../share/share.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LicitacionRoutingModule } from './licitacion-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/components/material/material.module';
import { ContactoComponent } from './form-contacto/contacto.component';


import { ItemsComponent } from './form-items/items.component';

import { AditionalClassificationComponent } from './aditional-classification/aditional-classification.component';


import { PeriodosComponent } from './form-periodos/tender-periodos.component';

import { DocumentsComponent } from './documents/documents.component';
import { MilestonesComponent } from './milestones/milestones.component';
import { AmandmentsComponent } from './amandments/amandments.component';

import { PartieComponent } from './partie/partie.component';
import { TenderComponent } from './tender/tender.component';
import { TenderHeaderMenuComponent } from './tender-header-menu/tender-header-menu.component';
import { RfcComponent } from './rfc/rfc.component';
import { InicioComponent } from './inicio/inicio.component';
import { ItemsLicitacionComponent } from './partial/items-licitacion/items-licitacion.component';
import { ListItemsLicitacionComponent } from './partial/items-licitacion/list-items-licitacion/list-items-licitacion.component';
import { LicitantesComponent } from './partial/licitantes/licitantes.component';
import { ListLicitantesComponent } from './partial/licitantes/list-licitantes/list-licitantes.component';
import { DocumentosLicitacionComponent } from './partial/documentos-licitacion/documentos-licitacion.component';
import { ListDocumentosLicitacionComponent } from './partial/documentos-licitacion/list-documentos-licitacion/list-documentos-licitacion.component';
import { HitosLicitacionComponent } from './partial/hitos-licitacion/hitos-licitacion.component';
import { ListHitosLicitacionComponent } from './partial/hitos-licitacion/list-hitos-licitacion/list-hitos-licitacion.component';


@NgModule({
  declarations: [
    ContactoComponent,
    ValoresComponent,
    ItemsComponent,
    AditionalClassificationComponent,

    DocumentsComponent,
    MilestonesComponent,
    AmandmentsComponent,
    PeriodosComponent,
    PartieComponent,
    TenderComponent,
    TenderHeaderMenuComponent,
    RfcComponent,
    InicioComponent,
    ItemsLicitacionComponent,
    ListItemsLicitacionComponent,
    LicitantesComponent,
    ListLicitantesComponent,
    DocumentosLicitacionComponent,
    ListDocumentosLicitacionComponent,
    HitosLicitacionComponent,
    ListHitosLicitacionComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LicitacionRoutingModule,
    ShareModule
  ]
})
export class LicitacionModule { }
