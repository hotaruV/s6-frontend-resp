import { BuyerComponent } from './buyer/buyer.component';
import { ShareModule } from './../../../share/share.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaneacionRoutingModule } from './planeacion-routing.module';

import { DocumentsComponent } from './documents/documents.component';
import { BudgetComponent } from './budget/budget.component';
import { MilestoneComponent } from './milestone/milestone.component';
import { PlanningHeaderMenuComponent } from './planning-header-menu/planning-header-menu.component';
import { inicioPlaneacionComponent } from './inicio/inicio.component';
import { SolCotizacionesComponent } from './partial/sol-cotizaciones/sol-cotizaciones.component';
import { CotizacionesComponent } from './partial/sol-cotizaciones/cotizaciones/cotizaciones.component';
import { ItemsComponent } from './partial/items/items.component';
import { ListItemsComponent } from './partial/items/list-items/list-items.component';
import { ProveedoresInvitadosComponent } from './partial/proveedores-invitados/proveedores-invitados.component';
import { ItemsCotizadosComponent } from './partial/items-cotizados/items-cotizados.component';
import { ItemsSerCotizadosComponent } from './partial/items-ser-cotizados/items-ser-cotizados.component';
import { DocumentosComponent } from './partial/documentos/documentos.component';
import { HitosComponent } from './partial/hitos/hitos.component';
import { ProveedoresComponent } from './partial/proveedores-invitados/proveedores/proveedores.component';
import { ListHitosComponent } from './partial/hitos/list-hitos/list-hitos.component';
import { ListDocumentosComponent } from './partial/documentos/list-documentos/list-documentos.component';
import { ListItemsCotizadosComponent } from './partial/items-cotizados/list-items-cotizados/list-items-cotizados.component';
import { CotizacionesRecComponent } from './partial/cotizaciones-rec/cotizaciones-rec.component';
import { ListCotizacionesRecComponent } from './partial/cotizaciones-rec/list-cotizaciones-rec/list-cotizaciones-rec.component';

import { PlantillaComponent } from './planning/plantilla/plantilla.component';
import { AccionesComponent } from './planning/acciones/acciones.component';
import { PlannigDocsComponent } from './planning/plannig-docs/plannig-docs.component';
import { PresupuestoComponent } from './presupuesto/presupuesto.component';
import { InicioComponentPlanning } from './planning/inicio/inicio.component';
import { CotizacionesPlanningComponent } from './planning/cotizaciones/cotizaciones.component';


@NgModule({
  declarations: [
    BuyerComponent,
    DocumentsComponent,
    BudgetComponent,
    MilestoneComponent,
    PlanningHeaderMenuComponent,
    inicioPlaneacionComponent,
    SolCotizacionesComponent,
    CotizacionesComponent,
    ItemsComponent,
    ListItemsComponent,
    ProveedoresInvitadosComponent,
    ItemsCotizadosComponent,
    ItemsSerCotizadosComponent,
    DocumentosComponent,
    HitosComponent,
    ProveedoresComponent,
    ListHitosComponent,
    ListDocumentosComponent,
    ListItemsCotizadosComponent,
    CotizacionesRecComponent,
    ListCotizacionesRecComponent,
    PresupuestoComponent,
    InicioComponentPlanning,
    PlantillaComponent,
    AccionesComponent,
    PlannigDocsComponent,
    CotizacionesPlanningComponent

  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    PlaneacionRoutingModule,
    ShareModule
  ]
})
export class PlaneacionModule { }
