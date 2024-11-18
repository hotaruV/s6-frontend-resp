import { Component, OnInit , Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from '../../../../../../../../services/auth/usuario.service';
import Swal from 'sweetalert2';

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
export interface DialogDataCotizacion {
  //idEnte: string;
  //idUsuario: string;
  documentos: Documento[];
}


@Component({
  selector: 'app-list-documentos-licitacion',
  templateUrl: './list-documentos-licitacion.component.html',
  styleUrls: ['./list-documentos-licitacion.component.scss']
})
export class ListDocumentosLicitacionComponent implements OnInit {
 
  public totalDocumentos: number = 0;
  public documentos: Documento[] = [];
  public doc: Documento[] = [];

  public loading: boolean = true;
  public bandera: boolean = true;

 

  constructor( public dialog: MatDialogRef<ListDocumentosLicitacionComponent>, private usrServ: UsuarioService,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataCotizacion
  ) { }

  ngOnInit(): void {
    this.bandera = true;
    this.loading = true;
    this.getAllDocumento();
  }
  getAllDocumento() {
   

    this.loading = true;
    
      this.documentos= this.data.documentos;
      this.loading = false;

  }
  cerrar() {
   
    this.dialog.close({success: true, documentos:this.documentos});
   
  }
  updateDocumento(id: string) {
    //('updateProveedor'+id);
    //('documentos'+this.documentos);
    this.dialog.close({success: true, id: id,documentos:this.documentos});
   
  }
  deleteDocumento(id: string) {
    //("seleccionado a eliminar:"+id);
    Swal.fire({
      icon: 'warning',
      title: "<h5 style='color:#125DA9; font-size: 20px !important;'> ELIMINACIÓN DOCUMENTOS  </h5>",
      text:"¿REALMENTE ESTÁ SEGURO DE ELIMINAR ESTE DOCUMENTO?",
      confirmButtonText: "ACEPTAR",
      confirmButtonColor: '#125DA9',
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor: "#d33",
      //timer: 1500
    }).then((result) => {
      if (result.isConfirmed) {
        let cont=this.documentos.length;
        //("num contCotizaciones:"+cont);

        //("seleccionado a eliminar isConfirmed:"+id);
        let eliminar = this.documentos.findIndex( p => p.id == id);
        const removed =this.documentos.splice(eliminar,1);
        ////(" removed:"+removed);
        this.loading = true;
        
      this.documentos;
      this.loading = false;
      let cont2=this.documentos.length;
      //("num contCotizaciones2 :"+cont2);
      if(cont2 < cont)
        {
         Swal.fire({
          icon: 'success',
          title: "<h5 style='color:#125DA9; font-size: 20px !important;'> DOCUMENTO ELIMINADO </h5>",
          text:"LA ELIMINACIÓN DEL DOCUMENTO HA SIDO CONCLUIDA CON ÉXITO",
          confirmButtonText: "ACEPTAR",
          confirmButtonColor: '#125DA9',
          showConfirmButton: true,
          //timer: 1500
          })

        }
        else{
        Swal.fire({
                
                icon: 'error',
                title: "<h5 style='color:#125DA9; font-size: 20px !important;'> NO SE PUDO ELIMINAR EL DOCUMENTO </h5>",
                text:"LA ELIMINACIÓN DEL DOCUMENTO NO SE PUDO REALIZAR",
                confirmButtonText: "ACEPTAR",
                confirmButtonColor: '#125DA9',
                showConfirmButton: true,
                //timer: 1500
              })

        }

     }
    })
   
  }
  
}
