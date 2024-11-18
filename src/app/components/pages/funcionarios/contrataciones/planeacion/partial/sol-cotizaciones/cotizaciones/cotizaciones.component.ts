import { Component,OnInit , Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from '../../../../../../../../services/auth/usuario.service';
import { PlaningService } from '../../../../../../../../services/pages/planing.service';
import Swal from 'sweetalert2';

interface Cotizacion {
  _id: string;
  id: string;
  title: string;
  description: string;
}
export interface DialogDataCotizacion {
  //idEnte: string;
  //idUsuario: string;
  idOcid:string;
  cotizaciones: Cotizacion[];
  
}

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.scss']
})
export class CotizacionesComponent implements OnInit {

  public idOcid:string;
  public totalProveedores: number = 0;
  public cotizaciones: Cotizacion[] = [];
  public cotiz: Cotizacion[] = [];
  public getprovedores: any;
  public loading: boolean = true;
  public bandera: boolean = true;

  public botonGuardaCoti=true;
  public botonUpdateCoti = false;
  public botonVerCoti = true;

  constructor( public dialog: MatDialogRef<CotizacionesComponent>, private usrServ: UsuarioService,
    private planingService: PlaningService,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataCotizacion
  ) { }

  ngOnInit(): void {
    this.bandera = true;
    this.loading = true;
    this.idOcid=this.data.idOcid;
    //("ocid ngOnInit cotizacon  : "+ this.idOcid);
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
  updateCotizacion(id: string,_id: string) { 
    this.dialog.close({success: true, id: id,_id: _id,cotizaciones:this.cotizaciones});
  }
  deleteCotizacion(id: string,_id: string) {
   
    Swal.fire({
      icon: 'warning',
      title: "<h5 style='color:#125DA9; font-size: 20px !important;'> ELIMINACIÓN SOLICITUD DE COTIZACIONES  </h5>",
      text:"¿REALMENTE ESTÁ SEGURO DE ELIMINAR A ESTA SOLICITUD DE COTIZACION?",
      confirmButtonText: "ACEPTAR",
      confirmButtonColor: '#125DA9',
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor: "#d33",
      //timer: 1500
    }).then((result) => {
      if (result.isConfirmed) {
        let contCotizaciones=this.cotizaciones.length;
        
        //se borra de la lista pero tambien se debe borrar de
        //primero  busca que el _id sea 0 significa que es de la lista normal
        if(_id== null)
          {
            let eliminar = this.cotizaciones.findIndex( p => p.id == id);
            const removed =this.cotizaciones.splice(eliminar,1);
          }else {
            //("ocid cotizacon  : "+ this.idOcid);
            this.planingService.deleteSolQuotes(_id,this.idOcid)
            .subscribe((resp: any) => {
              if (resp.ok) {
                let eliminar = this.cotizaciones.findIndex( p => p.id == id);
                const removed =this.cotizaciones.splice(eliminar,1);
               // const _q=resp.Quotes;

              }
              
            })
          }
        this.loading = true;
        this.cotizaciones;
        this.loading = false;
        let contCotizaciones2=this.cotizaciones.length;

       if(contCotizaciones2 < contCotizaciones)
        {
         Swal.fire({
          icon: 'success',
          title: "<h5 style='color:#125DA9; font-size: 20px !important;'> SOLICITUD DE COTIZACIÓN ELIMINADO </h5>",
          text:"LA ELIMINACIÓN DE LA SOLICITUD DE COTIZACIÓN HA SIDO CONCLUIDA CON ÉXITO",
          confirmButtonText: "ACEPTAR",
          confirmButtonColor: '#125DA9',
          showConfirmButton: true,
          //timer: 1500
          })

        }
        else{
        Swal.fire({
                
                icon: 'error',
                title: "<h5 style='color:#125DA9; font-size: 20px !important;'> NO SE PUDO ELIMINAR LA SOLICITUD DE COTIZACIÓN </h5>",
                text:"LA ELIMINACIÓN DE LA SOLICITUD DE COTIZACIÓN NO SE PUDO REALIZAR",
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
