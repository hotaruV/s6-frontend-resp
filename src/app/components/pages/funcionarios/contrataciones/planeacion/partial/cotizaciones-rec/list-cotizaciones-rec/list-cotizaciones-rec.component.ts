import { Component, OnInit , Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from '../../../../../../../../services/auth/usuario.service';
import Swal from 'sweetalert2';

interface Cotizacion {
  id: string;
  cotizadescription: string;
  cotizadate: string;
}
export interface DialogDataCotizacion {
  //idEnte: string;
  //idUsuario: string;
  cotizaciones: Cotizacion[];
}

@Component({
  selector: 'app-list-cotizaciones-rec',
  templateUrl: './list-cotizaciones-rec.component.html',
  styleUrls: ['./list-cotizaciones-rec.component.scss']
})
export class ListCotizacionesRecComponent implements OnInit {
 
  public totalProveedores: number = 0;
  public cotizaciones: Cotizacion[] = [];
  public cotiz: Cotizacion[] = [];
  public getprovedores: any;
  public loading: boolean = true;
  public bandera: boolean = true;

  public botonGuardaCoti=true;
  public botonUpdateCoti = false;
  public botonVerCoti = true;

  constructor( public dialog: MatDialogRef<ListCotizacionesRecComponent>, private usrServ: UsuarioService,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataCotizacion
  ) { }

  ngOnInit(): void {
    this.bandera = true;
    this.loading = true;
    this.getAllCotizaciones();
  }
  getAllCotizaciones() {
   

    this.loading = true;
    
      this.cotizaciones= this.data.cotizaciones;
      this.loading = false;

  }
  cerrar() {
   
    this.dialog.close({success: true, cotizaciones:this.cotizaciones});
   
  }
  updateCotizacion(id: string) {
    //('updateProveedor'+id);
    //('cotizaciones'+this.cotizaciones);
    this.dialog.close({success: true, id: id,cotizaciones:this.cotizaciones});
   
  }
  deleteCotizacion(id: string) {
    //("seleccionado a eliminar:"+id);
    Swal.fire({
      icon: 'warning',
      title: "<h5 style='color:#125DA9; font-size: 20px !important;'> ELIMINACIÓN  DE COTIZACIONES  </h5>",
      text:"¿REALMENTE ESTÁ SEGURO DE ELIMINAR A ESTA  COTIZACIÓN?",
      confirmButtonText: "ACEPTAR",
      confirmButtonColor: '#125DA9',
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor: "#d33",
      //timer: 1500
    }).then((result) => {
      if (result.isConfirmed) {
        let contCotizaciones=this.cotizaciones.length;
        //("num contCotizaciones:"+contCotizaciones);

        //("seleccionado a eliminar isConfirmed:"+id);
        let eliminar = this.cotizaciones.findIndex( p => p.id == id);
        const removed =this.cotizaciones.splice(eliminar,1);
        ////(" removed:"+removed);
        this.loading = true;
        
      this.cotizaciones;
      this.loading = false;
      let contCotizaciones2=this.cotizaciones.length;
      //("num contCotizaciones2 :"+contCotizaciones2);
      if(contCotizaciones2 < contCotizaciones)
        {
         Swal.fire({
          icon: 'success',
          title: "<h5 style='color:#125DA9; font-size: 20px !important;'> COTIZACIÓN ELIMINADA </h5>",
          text:"LA ELIMINACIÓN DE LA COTIZACIÓN HA SIDO CONCLUIDA CON ÉXITO",
          confirmButtonText: "ACEPTAR",
          confirmButtonColor: '#125DA9',
          showConfirmButton: true,
          //timer: 1500
          })

        }
        else{
        Swal.fire({
                
                icon: 'error',
                title: "<h5 style='color:#125DA9; font-size: 20px !important;'> NO SE PUDO ELIMINAR LA COTIZACIÓN </h5>",
                text:"LA ELIMINACIÓN DE LA COTIZACIÓN NO SE PUDO REALIZAR",
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
