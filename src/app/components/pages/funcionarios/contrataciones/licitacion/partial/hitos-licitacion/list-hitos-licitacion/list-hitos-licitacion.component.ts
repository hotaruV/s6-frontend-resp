import { Component, OnInit , Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from '../../../../../../../../services/auth/usuario.service';
import Swal from 'sweetalert2';

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
export interface DialogDataCotizacion {
  //idEnte: string;
  //idUsuario: string;
  hitos: Hito[];
}


@Component({
  selector: 'app-list-hitos-licitacion',
  templateUrl: './list-hitos-licitacion.component.html',
  styleUrls: ['./list-hitos-licitacion.component.scss']
})
export class ListHitosLicitacionComponent implements OnInit {
 
  public totalDocumentos: number = 0;
  public hitos: Hito[] = [];
  public h: Hito[] = [];

  public loading: boolean = true;
  public bandera: boolean = true;

 

  constructor( public dialog: MatDialogRef<ListHitosLicitacionComponent>, private usrServ: UsuarioService,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataCotizacion
  ) { }

  ngOnInit(): void {
    this.bandera = true;
    this.loading = true;
    this.getAllDocumento();
  }
  getAllDocumento() {
   

    this.loading = true;
    
      this.hitos= this.data.hitos;
      this.loading = false;

  }
  cerrar() {
   
    this.dialog.close({success: true, hitos:this.hitos});
   
  }
  updateDocumento(id: string) {
    //('updateProveedor'+id);
    //('documentos'+this.hitos);
    this.dialog.close({success: true, id: id,hitos:this.hitos});
   
  }
  deleteDocumento(id: string) {
    //("seleccionado a eliminar:"+id);
    Swal.fire({
      icon: 'warning',
      title: "<h5 style='color:#125DA9; font-size: 20px !important;'> ELIMINACIÓN DEL HITO  </h5>",
      text:"¿REALMENTE ESTÁ SEGURO DE ELIMINAR ESTE HITO?",
      confirmButtonText: "ACEPTAR",
      confirmButtonColor: '#125DA9',
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor: "#d33",
      //timer: 1500
    }).then((result) => {
      if (result.isConfirmed) {
        let cont=this.hitos.length;
        //("num contCotizaciones:"+cont);

        //("seleccionado a eliminar isConfirmed:"+id);
        let eliminar = this.hitos.findIndex( p => p.id == id);
        const removed =this.hitos.splice(eliminar,1);
        ////(" removed:"+removed);
        this.loading = true;
        
      this.hitos;
      this.loading = false;
      let cont2=this.hitos.length;
      //("num contCotizaciones2 :"+cont2);
      if(cont2 < cont)
        {
         Swal.fire({
          icon: 'success',
          title: "<h5 style='color:#125DA9; font-size: 20px !important;'> HITO ELIMINADO </h5>",
          text:"LA ELIMINACIÓN DEL HITO HA SIDO CONCLUIDA CON ÉXITO",
          confirmButtonText: "ACEPTAR",
          confirmButtonColor: '#125DA9',
          showConfirmButton: true,
          //timer: 1500
          })

        }
        else{
        Swal.fire({
                
                icon: 'error',
                title: "<h5 style='color:#125DA9; font-size: 20px !important;'> NO SE PUDO ELIMINAR EL HITO </h5>",
                text:"LA ELIMINACIÓN DEL HITO NO SE PUDO REALIZAR",
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
