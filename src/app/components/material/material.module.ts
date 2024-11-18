import { NgModule } from "@angular/core";
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core"
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';


@NgModule({
  exports: [
    MatInputModule,
    MatIconModule,
    MatTabsModule,
    MatToolbarModule,
    MatMenuModule,
    MatDialogModule,
    MatButtonModule,
    MatTreeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatOptionModule,
    MatSelectModule,
    MatTooltipModule,
    MatListModule,
    MatAutocompleteModule,
    MatTableModule,
    MatRadioModule

  ]
})
export class MaterialModule { }
