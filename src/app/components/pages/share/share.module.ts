import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './../../material/material.module';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FooterPrincipalComponent } from './footerPrincipal/footerPrincipal.component';
import { HeaderPrincipalComponent } from './headerPrincipal/headerPrincipal.component';
import { MenubarComponent } from './menubar/menubar.component';
import { MenuPublicaComponent } from './menu-publica/menu-publica.component';
import { HeaderFuncionanriosComponent } from './header-funcionanrios/header-funcionanrios.component';
import { ArrowMenuComponent } from './arrow-menu/arrow-menu.component';
import { ReleaseComponent } from './reportes/release/release.component';
import { PlaningReportsComponent } from './reportes/planing-reports/planing-reports.component';
import { TenderReportsComponent } from './reportes/tender-reports/tender-reports.component';
import { AwardReportsComponent } from './reportes/award-reports/award-reports.component';
import { ContratReportsComponent } from './reportes/contrat-reports/contrat-reports.component';
import { CompleteReportsComponent } from './reportes/complete-reports/complete-reports.component';
// fonts provided for pdfmake
import { ModalComponent } from './Material/modal/modal.component';
import { NotificationDialogModalComponent } from './Material/notifacions-dialog-modal/notifacions-dialog-modal.component';
import { ColoniasComponent } from './formularios/colonias/colonias.component';
import { DocsComponent } from './formularios/docs/docs.component';
import { MilestonComponent } from './formularios/mileston/mileston.component';
import { ItemComponent } from './formularios/item/item.component';
import { AmendmentIndexComponent } from './formularios/amendment-index/amendment-index.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    FooterPrincipalComponent,
    HeaderPrincipalComponent,
    MenubarComponent,
    MenuPublicaComponent,
    HeaderFuncionanriosComponent,
    ArrowMenuComponent,
    DocsComponent,
    MilestonComponent,
    ItemComponent,
    AmendmentIndexComponent,
    ReleaseComponent,
    PlaningReportsComponent,
    TenderReportsComponent,
    AwardReportsComponent,
    ContratReportsComponent,
    CompleteReportsComponent,
    ModalComponent,
    NotificationDialogModalComponent,
    ColoniasComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    FooterPrincipalComponent,
    HeaderPrincipalComponent,
    MenubarComponent,
    HeaderFuncionanriosComponent,
    ArrowMenuComponent,
    DocsComponent,
    MilestonComponent,
    ItemComponent,
    AmendmentIndexComponent,
    ReleaseComponent,
    PlaningReportsComponent,
    TenderReportsComponent,
    AwardReportsComponent,
    CompleteReportsComponent,
    ModalComponent,
    NotificationDialogModalComponent,
    ColoniasComponent

  ],
  imports: [
    MaterialModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule
  ]

})
export class ShareModule { }
