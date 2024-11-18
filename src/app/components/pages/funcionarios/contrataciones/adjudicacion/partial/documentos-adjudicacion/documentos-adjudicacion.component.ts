import { Documents } from './../../../../../../../models/Contratos/contrato.model';
import { UsuarioService } from '../../../../../../../services/auth/usuario.service';
import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { MatDialog , MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ListDocumentosAdjudicacionComponent } from './list-documentos-adjudicacion/list-documentos-adjudicacion.component';

interface Format {
  value: string;
  viewValue: string;
}



interface Documento {
  id: string;
  title: string;
  Type: string;
  description: string;
  url: string;
  format: string;
  language: string;
  datePublished: string;
  dateModified: string;
}


@Component({
  selector: 'app-documentos-adjudicacion',
  templateUrl: './documentos-adjudicacion.component.html',
  styleUrls: ['./documentos-adjudicacion.component.scss']
})
export class DocumentosAdjudicacionComponent implements OnInit {

  documentos: Documento[] = [];

  public botonGuardaDoc=true;
  public botonUpdateDoc = false;
  public botonVerDoc = true;

  format: Format[] = [
    { value: 'plaintext', viewValue: 'PLAIN TEXT' },
    { value: 'xml', viewValue: 'XML' },
    { value: 'html', viewValue: 'HTML' },
    { value: 'application/pdf', viewValue: 'PDF' },
  ];
  lenguajes: Format[] = [
    { value: "ES", viewValue: 'ESPAÑOL' },
    { value: "EN", viewValue: 'INGLES' },
    { value: "PT", viewValue: 'PORTUGUES' },
    { value: "FR", viewValue: 'FRANCES' },
    { value: "IT", viewValue: 'ITALIANO' },
    { value: "RU", viewValue: 'RUSO' },
    { value: "ZH", viewValue: 'CHINO' },
    { value: "JA", viewValue: 'JAPONES' },
    { value: "OTRO", viewValue: 'OTRO' },
  ];
  tipodoc: Format[] = [
    { value: '1', viewValue: 'PLAN DE ADQUISICIONES' },
    { value: '2', viewValue: 'ESTUDIO DE FACTIBILIDAD' },
    { value: '3', viewValue: 'ESTUDIOS DE IMPACTO URBANO Y AMBIENTAL' },
    { value: '4', viewValue: 'EVALUACIÓN DE LOS ACTIVOS Y RESPONSABILIDADES DEL GOBIERNO' },
    { value: '5', viewValue: 'JUSTIFICACIÓN DE LA CONTRATACIÓN' },
    { value: '6', viewValue: 'PLAN DE PROYECTO' },
    { value: '7', viewValue: 'PROYECTO DE CONVOCATORIA' },
    { value: '8', viewValue: 'REQUISICIÓN' },
    { value: '9', viewValue: 'CLÁUSULAS PARA EL MANEJO DE RIESGOS Y RESPONSABILIDADES' },
  ];
  public docForm = this.fb.group({

    id: [],
    title: [null, [Validators.required]],
    Type: [null, [Validators.required]],
    description: [null, [Validators.required]],
    url: [null, [Validators.required]],
    format: [null, [Validators.required]],
    language: [null, [Validators.required]],
    datePublished: [null, [Validators.required]],
    dateModified: [null, [Validators.required]],
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
    if (this.docForm.valid) {
    }
    return (
      this.docForm.controls[campo].errors &&
      this.docForm.controls[campo].touched
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

    
    if (this.docForm.invalid) {
      this.docForm.markAllAsTouched();
      return;
    }
    let form: any = this.docForm.value;
   
     let cont=this.documentos.length;
     cont+=1;
    
     let documento: Documento = {
      id: cont.toString(),
      title: form.title,
      Type: form.Type,
      description: form.description,
      url: form.url,
      format: form.format,
      language: form.language,
      datePublished: form.datePublished,
      dateModified: form.dateModified,
      
    };
    this.documentos.push(documento);
    
  
    this.formReset(this.docForm);
    this.docForm.controls['title'].setErrors(null);

    this.docForm.controls['Type'].setErrors(null);
    this.docForm.controls['description'].setErrors(null);
    this.docForm.controls['url'].setErrors(null);
    this.docForm.controls['format'].setErrors(null);
    this.docForm.controls['language'].setErrors(null);
    this.docForm.controls['datePublished'].setErrors(null);
    this.docForm.controls['dateModified'].setErrors(null);
    Swal.fire({
      icon: 'success',
      title: "<h5 style='color:#125DA9; font-size: 20px !important;'> DOCUMENTO  AGREGADO </h5>",
      text: "SE HA AGREGADO EL DOCUMENTO CON ÉXITO ",
      confirmButtonText: "ACEPTAR",
      confirmButtonColor: '#125DA9',
      showConfirmButton: true,
      //timer: 1500
    })
    // this.cotForm.reset;

  }
     
  
 /*dialogo de cotizaciones */
 VerDoc(): void {
  ////("idEnteActor:"+ this.getidentepublico);
  ////("idUsuarioActor:"+ this.getIdUsuario);
  const dialogRef = this._modelService.open(ListDocumentosAdjudicacionComponent, {
    disableClose:true,
    autoFocus:true,
     width: '100%',
     height:'80%',
     data: {
      documentos: this.documentos,
       //idUsuario:  this.getIdUsuario
     }
    
  });
  dialogRef.afterClosed().subscribe(result => {
    
    const id=result.id;
    if(result.documentos)
    {
      //al cerrar el dialogo
    }
    if(id){
      this.documentos=result.documentos;
      this.botonUpdateDoc = true;
      this.botonGuardaDoc = false;
      this.botonVerDoc = false;

    
      const title=this.documentos.find(item => item.id ==id).title ;
      const Type=this.documentos.find(item => item.id ==id).Type ;
      const description=this.documentos.find(item => item.id ==id).description ;
      const url=this.documentos.find(item => item.id ==id).url ;
      const format=this.documentos.find(item => item.id ==id).format ;
      const language=this.documentos.find(item => item.id ==id).language ;
      const datePublished=this.documentos.find(item => item.id ==id).datePublished ;
      const dateModified=this.documentos.find(item => item.id ==id).dateModified ;

      this.docForm.patchValue({
         id,
        title:title,
        Type:Type,
        description:description,
        url:url,
        format:format,
        language:language,
        datePublished:datePublished,
        dateModified:dateModified,
              
            
           });
    
    }

    
  });
}
cancelarDocumento() {
  this.botonUpdateDoc = false;
  this.botonGuardaDoc = true;
  this.botonVerDoc= true;
  this.formReset(this.docForm);
  this.docForm.controls['title'].setErrors(null);
  this.docForm.controls['description'].setErrors(null);
  this.docForm.controls['Type'].setErrors(null);
  this.docForm.controls['description'].setErrors(null);
  this.docForm.controls['url'].setErrors(null);
  this.docForm.controls['format'].setErrors(null);
  this.docForm.controls['language'].setErrors(null);
  this.docForm.controls['datePublished'].setErrors(null);
  this.docForm.controls['dateModified'].setErrors(null);
 
}

UptDocumento() {
  if (this.docForm.invalid) {
    this.docForm.markAllAsTouched();
    return;
  }
  let form: any = this.docForm.value;

  this.documentos.find(item => item.id ==form.id).title = form.title;
  this.documentos.find(item => item.id ==form.id).Type = form.Type;
  this.documentos.find(item => item.id ==form.id).description = form.description;
  this.documentos.find(item => item.id ==form.id).url = form.url;
  this.documentos.find(item => item.id ==form.id).format = form.format;
  this.documentos.find(item => item.id ==form.id).language = form.language;
  this.documentos.find(item => item.id ==form.id).datePublished = form.datePublished;
  this.documentos.find(item => item.id ==form.id).dateModified = form.dateModified;
 
  this.botonUpdateDoc = false;
  this.botonGuardaDoc = true;
  this.botonVerDoc= true;

  Swal.fire({
    icon: 'success',
    title: "<h5 style='color:#125DA9; font-size: 20px !important;'> DOCUMENTO ACTUALIZADO </h5>",
    text:"LA ACTUALIZACIÓN DEL DOCUMENTO HA SIDO CONCLUIDA CON ÉXITO",
    confirmButtonText: "ACEPTAR",
    confirmButtonColor: '#125DA9',
    showConfirmButton: true,
    //timer: 1500
  })
  
  //("cotizaciones "+ this.documentos);
  this.formReset(this.docForm);
  this.docForm.controls['title'].setErrors(null);
  this.docForm.controls['description'].setErrors(null);
  this.docForm.controls['Type'].setErrors(null);
  this.docForm.controls['description'].setErrors(null);
  this.docForm.controls['url'].setErrors(null);
  this.docForm.controls['format'].setErrors(null);
  this.docForm.controls['language'].setErrors(null);
  this.docForm.controls['datePublished'].setErrors(null);
  this.docForm.controls['dateModified'].setErrors(null);
 
}

}


