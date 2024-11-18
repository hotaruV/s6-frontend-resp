import { FiltroPipe } from 'src/app/pipes/filtro.pipe';
import { FiltraPipe } from 'src/app/pipes/filtra.pipe';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './components/main/app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './components/main/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './components/material/material.module';




@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
