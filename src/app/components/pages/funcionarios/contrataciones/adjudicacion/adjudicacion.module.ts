import { AdwardFormComponent } from './adward-form/adward-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdjudicacionRoutingModule } from './adjudicacion-routing.module';
import { AwardComponent } from './award/award.component';
import { MaterialModule } from 'src/app/components/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShareModule } from '../../../share/share.module';
import { DocumentsComponent } from './documents/documents.component';
import { ItemsComponent } from './items/items.component';
import { AdwardsHeaderMenuComponent } from './adwards-header-menu/adwards-header-menu.component';
import { InicioComponent } from './inicio/inicio.component';
import { DocumentosAdjudicacionComponent } from './partial/documentos-adjudicacion/documentos-adjudicacion.component';
import { ListDocumentosAdjudicacionComponent } from './partial/documentos-adjudicacion/list-documentos-adjudicacion/list-documentos-adjudicacion.component';
import { HitosAdjudicacionComponent } from './partial/hitos-adjudicacion/hitos-adjudicacion.component';
import { ListHitosAdjudicacionComponent } from './partial/hitos-adjudicacion/list-hitos-adjudicacion/list-hitos-adjudicacion.component';
import { ItemsAdjudicacionComponent } from './partial/items-adjudicacion/items-adjudicacion.component';
import { ListItemsAdjudicacionComponent } from './partial/items-adjudicacion/list-items-adjudicacion/list-items-adjudicacion.component';


@NgModule({
  declarations: [
    AwardComponent,
    AdwardFormComponent,
    DocumentsComponent,
    ItemsComponent,
    AdwardsHeaderMenuComponent,
    InicioComponent,
    DocumentosAdjudicacionComponent,
    ListDocumentosAdjudicacionComponent,
    HitosAdjudicacionComponent,
    ListHitosAdjudicacionComponent,
    ItemsAdjudicacionComponent,
    ListItemsAdjudicacionComponent,

  ],
  imports: [
    CommonModule,
    AdjudicacionRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ShareModule
  ]
})
export class AdjudicacionModule { }
