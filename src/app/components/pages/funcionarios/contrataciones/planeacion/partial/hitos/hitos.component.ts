import { Documents } from './../../../../../../../models/Contratos/contrato.model';
import { UsuarioService } from '../../../../../../../services/auth/usuario.service';
import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { MatDialog , MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ListHitosComponent } from './list-hitos/list-hitos.component';
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
  selector: 'app-hitos',
  templateUrl: './hitos.component.html',
  styleUrls: ['./hitos.component.scss']
})
export class HitosComponent implements OnInit {

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
    { value: "SCHEDULED", viewValue: 'PROGRAMADO' },
    { value: "MET", viewValue: 'CUMPLIDO' },
    { value: "NOTMET", viewValue: 'NO CUMPLIDO' },
    { value: "PARTIALLYMET", viewValue: 'PARCIALMENTE CUMPLIDO' },
  ];

  public hitosForm = this.fb.group({

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
    if (this.hitosForm.valid) {
    }
    return (
      this.hitosForm.controls[campo].errors &&
      this.hitosForm.controls[campo].touched
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

    
    if (this.hitosForm.invalid) {
      this.hitosForm.markAllAsTouched();
      return;
    }
    let form: any = this.hitosForm.value;

     let cont=this.hitos.length;
     cont+=1;

     let cotizacion: Hito = {
      id: cont.toString(),
      milestonestitle: form.milestonestitle.toUpperCase(),
      milestonesType: form.milestonesType.toUpperCase(),
      milestonesdescription: form.milestonesdescription.toUpperCase(),
      milestonescode: form.milestonescode,
      milestonesdueDate: form.milestonesdueDate,
      milestonesdateMet: form.milestonesdateMet,
      milestonesdateModified: form.milestonesdateModified,
      milestonesstatus: form.milestonesstatus.toUpperCase(),
      
    };
    this.hitos.push(cotizacion);
    
    //("hitos "+ this.hitos);
    this.formReset(this.hitosForm);
 
    this.hitosForm.controls['milestonestitle'].setErrors(null);
    this.hitosForm.controls['milestonesType'].setErrors(null);
    this.hitosForm.controls['milestonesdescription'].setErrors(null);
    this.hitosForm.controls['milestonescode'].setErrors(null);
    this.hitosForm.controls['milestonesdueDate'].setErrors(null);
    this.hitosForm.controls['milestonesdateMet'].setErrors(null);
    this.hitosForm.controls['milestonesdateModified'].setErrors(null);
    this.hitosForm.controls['milestonesstatus'].setErrors(null);
    Swal.fire({
      icon: 'success',
      title: "<h5 style='color:#125DA9; font-size: 20px !important;'> HITO AGREGADO </h5>",
      text: "SE HA AGREGADO EL HITO CON ÉXITO ",
      confirmButtonText: "ACEPTAR",
      confirmButtonColor: '#125DA9',
      showConfirmButton: true,
      //timer: 1500
    })
   // this.cotForm.reset;
  }
     
  
 /*dialogo de cotizaciones */
VerHito(): void {

  const dialogRef = this._modelService.open(ListHitosComponent, {
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

      this.hitosForm.patchValue({
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
  this.formReset(this.hitosForm);
  this.hitosForm.controls['milestonestitle'].setErrors(null);
    this.hitosForm.controls['milestonesType'].setErrors(null);
    this.hitosForm.controls['milestonesdescription'].setErrors(null);
    this.hitosForm.controls['milestonescode'].setErrors(null);
    this.hitosForm.controls['milestonesdueDate'].setErrors(null);
    this.hitosForm.controls['milestonesdateMet'].setErrors(null);
    this.hitosForm.controls['milestonesdateModified'].setErrors(null);
    this.hitosForm.controls['milestonesstatus'].setErrors(null);
  
 
}

UptHito() {
  if (this.hitosForm.invalid) {
    this.hitosForm.markAllAsTouched();
    return;
  }
  let form: any = this.hitosForm.value;

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
  this.formReset(this.hitosForm);
  this.hitosForm.controls['milestonestitle'].setErrors(null);
    this.hitosForm.controls['milestonesType'].setErrors(null);
    this.hitosForm.controls['milestonesdescription'].setErrors(null);
    this.hitosForm.controls['milestonescode'].setErrors(null);
    this.hitosForm.controls['milestonesdueDate'].setErrors(null);
    this.hitosForm.controls['milestonesdateMet'].setErrors(null);
    this.hitosForm.controls['milestonesdateModified'].setErrors(null);
    this.hitosForm.controls['milestonesstatus'].setErrors(null);
  
 
}

}

