
import { FiltroPipe } from './../../../pipes/filtro.pipe';
import { FiltraPipe } from './../../../pipes/filtra.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../material/material.module';

import { FuncionariosComponent } from './funcionarios.component';
import { FuncionariosRoutingModule } from './funcionarios-routing.module';
import { ShareModule } from './../share/share.module';
import { FuncionariosIndexComponent } from './funcionarios-index/funcionarios-index.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './users/register/register.component';
import { ChangePassComponent } from './users/change-pass/change-pass.component';
import { ContratosIndexComponent } from './contratos-index/contratos-index.component';
import { ReleasePipe } from '../../../pipes/release.pipe';
import { FuncionarioComponent } from './administracion/funcionario/funcionario.component';
import { ActoresComponent } from './administracion/actores/actores.component';
import { EntePublicoComponent } from './administracion/ente-publico/ente-publico.component';
import { ActoresinvolucradosIndexComponent } from './actoresinvolucrados-index/actoresinvolucrados-index.component';
import { AdministracionenteIndexComponent } from './administracionente-index/administracionente-index.component';
import { ProveedoresComponent } from './administracion/actores/proveedores/proveedores.component';
import { ServidoresComponent } from './administracion/actores/servidores/servidores.component';
import { OicComponent } from '../funcionarios/oic/oic.component';
import { revitionsPipe } from 'src/app/pipes/revitions.pipe';
import { RegisterEnteComponent } from './users/register/register-ente/register-ente.component';
import { RegisterUsuariosComponent } from './users/register/register-usuarios/register-usuarios.component';

@NgModule({
  declarations: [
    FuncionariosComponent,
    FuncionariosIndexComponent,
    RegisterComponent,
    FiltroPipe,
    FiltraPipe,
    ChangePassComponent,
    ContratosIndexComponent,
    ReleasePipe,
    revitionsPipe,
    FuncionarioComponent,
    ActoresComponent,
    EntePublicoComponent,
    ActoresinvolucradosIndexComponent,
    AdministracionenteIndexComponent,

    ProveedoresComponent,
    ServidoresComponent,
    OicComponent,
    RegisterEnteComponent,
    RegisterUsuariosComponent


  ],
  imports: [
    CommonModule,
    ShareModule,
    FuncionariosRoutingModule,
    MaterialModule,
    ReactiveFormsModule,

  ]
})
export class FuncionariosModule { }
