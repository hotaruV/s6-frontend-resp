import { Documents } from './../../../../../../../models/Contratos/contrato.model';
import { UsuarioService } from '../../../../../../../services/auth/usuario.service';
import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { MatDialog , MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ListCotizacionesRecComponent } from './list-cotizaciones-rec/list-cotizaciones-rec.component';

interface Cotizacion {
  id: string;
  cotizadescription: string;
  cotizadate: string;
}

@Component({
  selector: 'app-cotizaciones-rec',
  templateUrl: './cotizaciones-rec.component.html',
  styleUrls: ['./cotizaciones-rec.component.scss']
})
export class CotizacionesRecComponent implements OnInit {


  cotizaciones: Cotizacion[] = [];

  public botonGuardaCoti=true;
  public botonUpdateCoti = false;
  public botonVerCoti = true;

  public cotForm = this.fb.group({

    id: [],
    cotizadescription: [null, [Validators.required]],
    cotizadate: [null, [Validators.required]],
  },
  {
    // validators:[this.curpValida]
  });
    /**
  * INICIALIZA
  *
  */
  constructor(private fb: UntypedFormBuilder, private usrServ: UsuarioService,
    private readonly _modelService:MatDialog    
) {

  }
  
  ngOnInit(): void {
  

  }
  ngOnDestroy(): void {


  }
  /**
  * VALIDACIONES
  *
  */
  campoNoValido(campo: string) {
    if (this.cotForm.valid) {
    }
    return (
      this.cotForm.controls[campo].errors &&
      this.cotForm.controls[campo].touched
    );


  }
  private formReset(form: FormGroup) {
    Object.keys(form.controls).forEach((key) => {
      form.get(key).setErrors(null);
    });
    form.reset();
  }
    /**
  * GUARDAR
  *
  */
  guardar() {

    
    if (this.cotForm.invalid) {
      this.cotForm.markAllAsTouched();
      return;
    }
    let form: any = this.cotForm.value;
    //("creacOTIZACION 1: "+ form.title);
    if(form.cotizadescription != '' && form.cotizadescription !=null  &&form.cotizadate != '' && form.cotizadate !=null )
      {
        let contCotizaciones=this.cotizaciones.length;
        contCotizaciones+=1;
        //("contCotizaciones 1: "+ contCotizaciones);
        let cotizacion: Cotizacion = {
         id: contCotizaciones.toString(),
         cotizadescription: form.cotizadescription.toUpperCase(),
         cotizadate: form.cotizadate,
         
       };
       this.cotizaciones.push(cotizacion);
       Swal.fire({
         icon: 'success',
         title: "<h5 style='color:#125DA9; font-size: 20px !important;'> COTIZACIÓN AGREGADA </h5>",
         text: "SE HA AGREGADO LA COTIZACIÓN CON ÉXITO ",
         confirmButtonText: "ACEPTAR",
         confirmButtonColor: '#125DA9',
         showConfirmButton: true,
         //timer: 1500
       })
       //("cotizaciones "+ this.cotizaciones);
       this.formReset(this.cotForm);
       this.cotForm.controls['cotizadate'].setErrors(null);
       this.cotForm.controls['cotizadescription'].setErrors(null);
      }
    
   // this.cotForm.reset;
  }
     
  
 /*dialogo de cotizaciones */
Vercot(): void {
  ////("idEnteActor:"+ this.getidentepublico);
  ////("idUsuarioActor:"+ this.getIdUsuario);
  const dialogRef = this._modelService.open(ListCotizacionesRecComponent, {
    disableClose:true,
    autoFocus:true,
     width: '100%',
     height:'80%',
     data: {
      cotizaciones: this.cotizaciones,
       //idUsuario:  this.getIdUsuario
     }
    
  });
  dialogRef.afterClosed().subscribe(result => {
    
    const id=result.id;
    if(result.cotizaciones)
    {
      //al cerrar el dialogo
    }
    if(id){
      this.cotizaciones=result.cotizaciones;
      this.botonUpdateCoti = true;
      this.botonGuardaCoti = false;
      ////("botonGuardaProv:"+ this.botonGuardaProv);
      this.botonVerCoti = false;

      // var algun = this.cotizaciones.find(function (_cotizacion) {
      //   return (_cotizacion.id = id)
      // })
     // //(algun)
      
      //algun.id;
      const cotizadate=this.cotizaciones.find(item => item.id ==id).cotizadate ;
      const cotizadescription=this.cotizaciones.find(item => item.id ==id).cotizadescription ;

      this.cotForm.patchValue({
         id,
         cotizadate:cotizadate,
         cotizadescription:cotizadescription,
              
            
           });
    
    }

    
  });
}
cancelarCotizacion() {
  this.botonUpdateCoti = false;
  this.botonGuardaCoti = true;
  this.botonVerCoti= true;
  this.formReset(this.cotForm);
  this.cotForm.controls['cotizadate'].setErrors(null);
  this.cotForm.controls['cotizadescription'].setErrors(null);
  
 
}

UptCotizacion() {
  if (this.cotForm.invalid) {
    this.cotForm.markAllAsTouched();
    return;
  }
  let form: any = this.cotForm.value;
  //("updatecOTIZACION 1: "+ form.id);
  //("updatecOTIZACION 2: "+ form.title);
  this.cotizaciones.find(item => item.id ==form.id).cotizadate = form.cotizadate;
  this.cotizaciones.find(item => item.id ==form.id).cotizadescription = form.cotizadescription;
 
  this.botonUpdateCoti = false;
  this.botonGuardaCoti = true;
  this.botonVerCoti= true;

  Swal.fire({
    icon: 'success',
    title: "<h5 style='color:#125DA9; font-size: 20px !important;'> SOLICITUD DE COTIZACIONES ACTUALIZADO </h5>",
    text:"LA ACTUALIZACIÓN DE LA SOLICITUD DE COTIZACIÓN HA SIDO CONCLUIDA CON ÉXITO",
    confirmButtonText: "ACEPTAR",
    confirmButtonColor: '#125DA9',
    showConfirmButton: true,
    //timer: 1500
  })
  
  //("cotizaciones "+ this.cotizaciones);
  this.formReset(this.cotForm);
  this.cotForm.controls['cotizadate'].setErrors(null);
  this.cotForm.controls['cotizadescription'].setErrors(null);
  
 
}

}

