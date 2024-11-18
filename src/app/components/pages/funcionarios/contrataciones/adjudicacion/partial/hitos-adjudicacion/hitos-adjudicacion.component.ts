import { Documents } from './../../../../../../../models/Contratos/contrato.model';
import { UsuarioService } from '../../../../../../../services/auth/usuario.service';
import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { MatDialog , MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ListHitosAdjudicacionComponent } from './list-hitos-adjudicacion/list-hitos-adjudicacion.component';
interface Format {
  value: string;
  viewValue: string;
}

interface Hito {
  id: string;
  milestonestitle: string;
  milestonesType: string;
  milestonesdescription: string;
  milestonescode: string;
  milestonesdueDate: string;
  milestonesdateMet: string;
  milestonesdateModified: string;
  milestonesstatus: string;
}

@Component({
  selector: 'app-hitos-adjudicacion',
  templateUrl: './hitos-adjudicacion.component.html',
  styleUrls: ['./hitos-adjudicacion.component.scss']
})
export class HitosAdjudicacionComponent implements OnInit {

  hitos: Hito[] = [];

  public botonGuardaHito=true;
  public botonUpdateHito= false;
  public botonVerHito = true;
  tipoHito: Format[] = [
    { value: '1', viewValue: 'AVISO A LA POBLACIÓN' },
    { value: '2', viewValue: 'APROBACIÓN' },
    { value: '3', viewValue: 'ENTREGA' },
    { value: '4', viewValue: 'EVALUACIÓN' },
    { value: '1', viewValue: 'FINANCIAMIENTO' },
    { value: '2', viewValue: 'INVOLUCRAMIENTO' },
    { value: '3', viewValue: 'REPORTE' },
    { value: '4', viewValue: 'CONTRATACIÓN' },
  ];
  status: Format[] = [
    { value: "scheduled", viewValue: 'PROGRAMADO' },
    { value: "met", viewValue: 'CUMPLIDO' },
    { value: "notMet", viewValue: 'NO CUMPLIDO' },
    { value: "partiallyMet", viewValue: 'PARCIALMENTE CUMPLIDO' },
  ];

  public cotForm = this.fb.group({

    id: [],
    milestonestitle: [null, [Validators.required]],
    milestonesType: [null, [Validators.required]],
    milestonesdescription: [null, [Validators.required]],
    milestonescode: [null, [Validators.required]],
    milestonesdueDate: [null, [Validators.required]],
    milestonesdateMet: [null, [Validators.required]],
    milestonesdateModified: [null, [Validators.required]],
    milestonesstatus: [null, [Validators.required]],
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

     let cont=this.hitos.length;
     cont+=1;

     let cotizacion: Hito = {
      id: cont.toString(),
      milestonestitle: form.milestonestitle,
      milestonesType: form.milestonesType,
      milestonesdescription: form.milestonesdescription,
      milestonescode: form.milestonescode,
      milestonesdueDate: form.milestonesdueDate,
      milestonesdateMet: form.milestonesdateMet,
      milestonesdateModified: form.milestonesdateModified,
      milestonesstatus: form.milestonesstatus,
      
    };
    this.hitos.push(cotizacion);
    
    //("hitos "+ this.hitos);
    this.formReset(this.cotForm);
 
    this.cotForm.controls['milestonestitle'].setErrors(null);
    this.cotForm.controls['milestonesType'].setErrors(null);
    this.cotForm.controls['milestonesdescription'].setErrors(null);
    this.cotForm.controls['milestonescode'].setErrors(null);
    this.cotForm.controls['milestonesdueDate'].setErrors(null);
    this.cotForm.controls['milestonesdateMet'].setErrors(null);
    this.cotForm.controls['milestonesdateModified'].setErrors(null);
    this.cotForm.controls['milestonesstatus'].setErrors(null);
   // this.cotForm.reset;
  }
     
  
 /*dialogo de cotizaciones */
VerHito(): void {

  const dialogRef = this._modelService.open(ListHitosAdjudicacionComponent, {
    disableClose:true,
    autoFocus:true,
     width: '100%',
     height:'80%',
     data: {
      hitos: this.hitos,
       //idUsuario:  this.getIdUsuario
     }
    
  });
  dialogRef.afterClosed().subscribe(result => {
    
    const id=result.id;
    if(result.hitos)
    {
      //al cerrar el dialogo
    }
    if(id){
      this.hitos=result.hitos;
      this.botonUpdateHito = true;
      this.botonGuardaHito = false;
      ////("botonGuardaProv:"+ this.botonGuardaProv);
      this.botonVerHito = false;

 
      const milestonestitle=this.hitos.find(item => item.id ==id).milestonestitle ;
      const milestonesType=this.hitos.find(item => item.id ==id).milestonesType ;
      const milestonesdescription=this.hitos.find(item => item.id ==id).milestonesdescription ;
      const milestonescode=this.hitos.find(item => item.id ==id).milestonescode ;
      const milestonesdueDate=this.hitos.find(item => item.id ==id).milestonesdueDate ;
      const milestonesdateMet=this.hitos.find(item => item.id ==id).milestonesdateMet ;
      const milestonesdateModified=this.hitos.find(item => item.id ==id).milestonesdateModified ;
      const milestonesstatus=this.hitos.find(item => item.id ==id).milestonesstatus ;

      this.cotForm.patchValue({
         id,
         milestonestitle:milestonestitle,
         milestonesType:milestonesType,
         milestonesdescription:milestonesdescription,
         milestonescode:milestonescode,
         milestonesdueDate:milestonesdueDate,
         milestonesdateMet:milestonesdateMet,
         milestonesdateModified:milestonesdateModified,
         milestonesstatus:milestonesstatus,
           });
    
    }

    
  });
}
cancelarHito() {
  this.botonUpdateHito = false;
  this.botonGuardaHito = true;
  this.botonVerHito= true;
  this.formReset(this.cotForm);
  this.cotForm.controls['milestonestitle'].setErrors(null);
    this.cotForm.controls['milestonesType'].setErrors(null);
    this.cotForm.controls['milestonesdescription'].setErrors(null);
    this.cotForm.controls['milestonescode'].setErrors(null);
    this.cotForm.controls['milestonesdueDate'].setErrors(null);
    this.cotForm.controls['milestonesdateMet'].setErrors(null);
    this.cotForm.controls['milestonesdateModified'].setErrors(null);
    this.cotForm.controls['milestonesstatus'].setErrors(null);
  
 
}

UptHito() {
  if (this.cotForm.invalid) {
    this.cotForm.markAllAsTouched();
    return;
  }
  let form: any = this.cotForm.value;

  this.hitos.find(item => item.id ==form.id).milestonestitle = form.milestonestitle;
  this.hitos.find(item => item.id ==form.id).milestonesType = form.milestonesType;
  this.hitos.find(item => item.id ==form.id).milestonesdescription = form.milestonesdescription;
  this.hitos.find(item => item.id ==form.id).milestonescode = form.milestonescode;
  this.hitos.find(item => item.id ==form.id).milestonesdueDate = form.milestonesdueDate;
  this.hitos.find(item => item.id ==form.id).milestonesdateMet = form.milestonesdateMet;
  this.hitos.find(item => item.id ==form.id).milestonesdateModified = form.milestonesdateModified;
  this.hitos.find(item => item.id ==form.id).milestonesstatus = form.milestonesstatus;
 
  this.botonUpdateHito = false;
  this.botonGuardaHito = true;
  this.botonVerHito= true;

  Swal.fire({
    icon: 'success',
    title: "<h5 style='color:#125DA9; font-size: 20px !important;'> HITOS ACTUALIZADO </h5>",
    text:"LA ACTUALIZACIÓN DEL HITO HA SIDO CONCLUIDA CON ÉXITO",
    confirmButtonText: "ACEPTAR",
    confirmButtonColor: '#125DA9',
    showConfirmButton: true,
    //timer: 1500
  })
  
  //("hitos "+ this.hitos);
  this.formReset(this.cotForm);
  this.cotForm.controls['milestonestitle'].setErrors(null);
    this.cotForm.controls['milestonesType'].setErrors(null);
    this.cotForm.controls['milestonesdescription'].setErrors(null);
    this.cotForm.controls['milestonescode'].setErrors(null);
    this.cotForm.controls['milestonesdueDate'].setErrors(null);
    this.cotForm.controls['milestonesdateMet'].setErrors(null);
    this.cotForm.controls['milestonesdateModified'].setErrors(null);
    this.cotForm.controls['milestonesstatus'].setErrors(null);
  
 
}

}


