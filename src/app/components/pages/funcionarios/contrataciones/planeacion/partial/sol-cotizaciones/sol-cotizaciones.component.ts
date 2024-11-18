import { Documents } from './../../../../../../../models/Contratos/contrato.model';
import { UsuarioService } from '../../../../../../../services/auth/usuario.service';
import { Component,Input, OnInit, OnDestroy, NgModule } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { MatDialog , MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CotizacionesComponent } from './cotizaciones/cotizaciones.component';
import { PlaningService } from '../../../../../../../services/pages/planing.service';
import {
  
  SolQuotes,
} from './../../../../../../../interfaces/planning.interface';


interface Cotizacion {
  _id: string;
  id: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-sol-cotizaciones',
  templateUrl: './sol-cotizaciones.component.html',
  styleUrls: ['./sol-cotizaciones.component.scss']
})
export class SolCotizacionesComponent implements OnInit {

  @Input() _id;//es el ocds 
  cotizaciones: Cotizacion[] = [];

  public botonGuardaCoti=true;
  public botonUpdateCoti = false;
  public botonVerCoti = true;

  public cotForm = this.fb.group({
    _id: [],
    id: [],
    title: [, [Validators.required, Validators.minLength(5)]],
    description: [, [Validators.required]],
  },
  {
    // validators:[this.curpValida]
  });
    /**
  * INICIALIZA
  *
  */
  constructor(private fb: UntypedFormBuilder, private usrServ: UsuarioService,
    private planingService: PlaningService,
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
    
    //obtiene los datos del formulario
    let form: any = this.cotForm.value;
    
    //verifica que los datos no esten vacios o en null
    if(form.title != '' && form.title !=null  &&form.description != '' && form.description !=null )
      {
        let contCotizaciones=this.cotizaciones.length;
        contCotizaciones+=1;
       
        let cotizacion: Cotizacion = {
          _id:'0',
          id: contCotizaciones.toString(),
          title: form.title.toUpperCase(),
          description: form.description.toUpperCase(),
        };
   
        //verifica si existe ya la lista de cotizaciones en bd
        if(this.cotizaciones.length > 0 && this._id != undefined){
          this.cotizaciones = [];
          this.planingService.savePlanning_Cotizacion(cotizacion,this._id).subscribe(
            (resp: any) => {
              const _q=resp.Quotes;

               _q.forEach(c => 
                      {
                          this.planingService.getPlanningCotizacion(c).subscribe((resp: any) => 
                           {    
                               const quotes_=resp.quotes_;
                               let cotizacion2: Cotizacion = {
                                                               _id: quotes_._id,//aqui va el _id si no es 0
                                                                id: quotes_.id,//contCotizaciones.toString(),
                                                                title: quotes_.title,
                                                                description: quotes_.description,
                                                              };
                                this.cotizaciones.push(cotizacion2);
                           });
                      });
                      this.formReset(this.cotForm); 
           
              
              Swal.fire({
                icon: 'success',
                title: "<h5 style='color:#125DA9; font-size: 20px !important;'> SOLICIUD DE COTIZACIÓN AGREGADA </h5>",
                text:"SE HA AGREGADO LA SOCILICITUD DE COTIZACIÓN CON ÉXITO ",
                confirmButtonText: "ACEPTAR",
                confirmButtonColor: '#125DA9',
                showConfirmButton: true,
            
              })
            },
            (err) => {
              Swal.fire({
                 
                icon: 'error',
                title: "<h5 style='color:#125DA9; font-size: 20px !important;'> NO SE PUDO AGREGAR LA SOLICITUD DE COTIZACIÓN </h5>",
                text:err.error.msg,
                confirmButtonText: "ACEPTAR",
                confirmButtonColor: '#125DA9',
                showConfirmButton: true,
                //timer: 1500
              })
          
            }
          );
          
         
        }else{
          //guarda la cotizacion
        this.cotizaciones.push(cotizacion);

        Swal.fire({
          icon: 'success',
          title: "<h5 style='color:#125DA9; font-size: 20px !important;'> SOLICIUD DE COTIZACIÓN AGREGADA </h5>",
          text: "SE HA AGREGADO LA SOCILICITUD DE COTIZACIÓN CON ÉXITO ",
          confirmButtonText: "ACEPTAR",
          confirmButtonColor: '#125DA9',
          showConfirmButton: true,
          //timer: 1500
        })

          this.formReset(this.cotForm); 

        }   
      }
    
  }
     
  
 /*dialogo de cotizaciones */
Vercot(): void {
  //("ocid ver cotizacon  : "+ this._id);
  const dialogRef = this._modelService.open(CotizacionesComponent, {

    disableClose:true,
    autoFocus:true,
     width: '100%',
     height:'80%',
     data: {
      cotizaciones: this.cotizaciones,
       idOcid:  this._id
     }
    
  });
 
  dialogRef.afterClosed().subscribe(result => {    
    const id=result.id;
    const _id=result._id;
    if(result.cotizaciones) {
      //al cerrar el dialogo
    }
    if(id){
      this.cotizaciones=result.cotizaciones;
      this.botonUpdateCoti = true;
      this.botonGuardaCoti = false;
      this.botonVerCoti = false;

      const title=this.cotizaciones.find(item => item.id ==id).title ;
      const description=this.cotizaciones.find(item => item.id ==id).description ;

      this.cotForm.patchValue({
        _id,
         id,
        title:title,
        description:description,
      });
    
    }

    
  });
}

cancelarCotizacion() {
  this.botonUpdateCoti = false;
  this.botonGuardaCoti = true;
  this.botonVerCoti= true;
  this.formReset(this.cotForm);
  this.cotForm.controls['title'].setErrors(null);
  this.cotForm.controls['description'].setErrors(null);
  
 
}

UptCotizacion() 
{
  if (this.cotForm.invalid) {
    this.cotForm.markAllAsTouched();
    return;
  }
  //obtiene los datos del formulario
  let form: any = this.cotForm.value;
  
  //("form._id  : "+ form._id);

  if(form._id == null)
  {
    //verifica que el id del formulario no este vacio, significa que no se ha guardado la planeación
    //ni una vez
    //("entre form._id  : "+ form._id);
     //verifica que los datos no esten vacios o en null
    if(form.title != '' && form.title !=null  &&form.description != '' && form.description !=null )
      {
        this.cotizaciones.find(item => item.id ==form.id).title = form.title.toUpperCase();
        this.cotizaciones.find(item => item.id ==form.id).description = form.description.toUpperCase();
        Swal.fire({
          icon: 'success',
          title: "<h5 style='color:#125DA9; font-size: 20px !important;'> SOLICITUD DE COTIZACIONES ACTUALIZADO </h5>",
          text:"LA ACTUALIZACIÓN DE LA SOLICITUD DE COTIZACIÓN HA SIDO CONCLUIDA CON ÉXITO",
          confirmButtonText: "ACEPTAR",
          confirmButtonColor: '#125DA9',
          showConfirmButton: true,
          //timer: 1500
        })
      }   
  } else{
    //obtiene los datos del formulario
    let form_: SolQuotes = form;
    this.planingService.updateSolQuotes(form_).subscribe(
      (r) => {
        this.cotizaciones.find(item => item.id ==form.id).title = form.title.toUpperCase();
        this.cotizaciones.find(item => item.id ==form.id).description = form.description.toUpperCase();
        Swal.fire({
          icon: 'success',
          title: "<h5 style='color:#125DA9; font-size: 20px !important;'> SOLICITUD DE COTIZACIONES ACTUALIZADO </h5>",
          text:"LA ACTUALIZACIÓN DE LA SOLICITUD DE COTIZACIÓN HA SIDO CONCLUIDA CON ÉXITO",
          confirmButtonText: "ACEPTAR",
          confirmButtonColor: '#125DA9',
          showConfirmButton: true,
      
        })
      },
      (err) => {
        Swal.fire({
           
          icon: 'error',
          title: "<h5 style='color:#125DA9; font-size: 20px !important;'> NO SE PUDO ACTUALIZAR LA SOLICITUD DE COTIZACIÓN </h5>",
          text:err.error.msg,
          confirmButtonText: "ACEPTAR",
          confirmButtonColor: '#125DA9',
          showConfirmButton: true,
          //timer: 1500
        })
       Swal.fire('Error', err.error.msg, 'error');
      }
    );
    
  }
  this.botonUpdateCoti = false;
  this.botonGuardaCoti = true;
  this.botonVerCoti= true;

  this.formReset(this.cotForm);    
  this.cotForm.controls['title'].setErrors(null);
  this.cotForm.controls['description'].setErrors(null);
 
}

}

