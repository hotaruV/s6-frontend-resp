import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContratoRoutingModule } from './contrato-routing.module';
import { ContractComponent } from './contract/contract.component';
import { ValueComponent } from './value/value.component';
import { DocumentsComponent } from './documents/documents.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/components/material/material.module';
import { ShareModule } from '../../../share/share.module';
import { ContratoIndexComponent } from './contrato-index/contrato-index.component';
import { ItemIndexComponent } from './item-index/item-index.component';
import { AmendmentsComponent } from './amendments/amendments.component';
import { InicioComponent } from './inicio/inicio.component';
import { ItemsContratoComponent } from './partial/items-contrato/items-contrato.component';
import { ListItemsContratoComponent } from './partial/items-contrato/list-items-contrato/list-items-contrato.component';
import { DocumentosContratoComponent } from './partial/documentos-contrato/documentos-contrato.component';
import { ListDocumentosContratoComponent } from './partial/documentos-contrato/list-documentos-contrato/list-documentos-contrato.component';
import { HitosContratoComponent } from './partial/hitos-contrato/hitos-contrato.component';
import { ListHitosContratoComponent } from './partial/hitos-contrato/list-hitos-contrato/list-hitos-contrato.component';
import { DocContratoComponent } from './partial/doc-contrato/doc-contrato.component';
import { ListDocContratoComponent } from './partial/doc-contrato/list-doc-contrato/list-doc-contrato.component';
import { HitosDelContratoComponent } from './partial/hitos-del-contrato/hitos-del-contrato.component';
import { ListHitosDelContratoComponent } from './partial/hitos-del-contrato/list-hitos-del-contrato/list-hitos-del-contrato.component';



@NgModule({
  declarations: [
    ContractComponent,
    ValueComponent,
    DocumentsComponent,
    ContratoIndexComponent,
    ItemIndexComponent,
    AmendmentsComponent,
    InicioComponent,
    ItemsContratoComponent,
    ListItemsContratoComponent,
    DocumentosContratoComponent,
    ListDocumentosContratoComponent,
    HitosContratoComponent,
    ListHitosContratoComponent,
    DocContratoComponent,
    ListDocContratoComponent,
    HitosDelContratoComponent,
    ListHitosDelContratoComponent,
  ],
  imports: [
    CommonModule,
    ContratoRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ShareModule
  ]
})
export class ContratoModule { }
