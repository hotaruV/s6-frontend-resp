import { Component, OnInit , Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from '../../../../../../../../services/auth/usuario.service';
import Swal from 'sweetalert2';

interface ProveedorInvitado {
  id: string;
  invitedSuppliersname: string;
  name:string;
}

export interface DialogDataCotizacion {
  proveedores: ProveedorInvitado[];
}


@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent implements OnInit {
 
  public totalProveedores: number = 0;
  public proveedores: ProveedorInvitado[] = [];
  public prov: ProveedorInvitado[] = [];
  public getprovedores: any;
  public loading: boolean = true;
  public bandera: boolean = true;

  public botonGuardaCoti=true;
  public botonUpdateCoti = false;
  public botonVerCoti = true;

  constructor( public dialog: MatDialogRef<ProveedoresComponent>, private usrServ: UsuarioService,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataCotizacion
  ) { }

  ngOnInit(): void {
    this.bandera = true;
    this.loading = true;
    this.getAllProveedores();
  }
  getAllProveedores() {
   

    this.loading = true;
      this.proveedores= this.data.proveedores;
      this.loading = false;

  }
  cerrar() {
   
    this.dialog.close({success: true, proveedores:this.proveedores});
   
  }
  updateProveedor(id: string) {
    //('updateProveedor'+id);
    //('proveedores'+this.proveedores);
    this.dialog.close({success: true, id: id,proveedores:this.proveedores});
   
  }
  deleteProveedor(id: string) {
    //("seleccionado a eliminar:"+id);
    Swal.fire({
      icon: 'warning',
      title: "<h5 style='color:#125DA9; font-size: 20px !important;'> ELIMINACIÓN PROVEEDORES  </h5>",
      text:"¿REALMENTE ESTÁ SEGURO DE ELIMINAR A ESTE PROVEEDOR?",
      confirmButtonText: "ACEPTAR",
      confirmButtonColor: '#125DA9',
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor: "#d33",
      //timer: 1500
    }).then((result) => {
      if (result.isConfirmed) {
        let cont=this.proveedores.length;
        //("num cont:"+cont);

        //("seleccionado a eliminar isConfirmed:"+id);
        let eliminar = this.proveedores.findIndex( p => p.id == id);
        const removed =this.proveedores.splice(eliminar,1);
        ////(" removed:"+removed);
        this.loading = true;
        
      this.proveedores;
      this.loading = false;
      let cont2=this.proveedores.length;
      //("num contCotizaciones2 :"+cont2);
      if(cont2 < cont)
        {
         Swal.fire({
          icon: 'success',
          title: "<h5 style='color:#125DA9; font-size: 20px !important;'> SOLICITUD DE PROVEEDORES </h5>",
          text:"LA ELIMINACIÓN DE LOS PROVEEDORES HA SIDO CONCLUIDA CON ÉXITO",
          confirmButtonText: "ACEPTAR",
          confirmButtonColor: '#125DA9',
          showConfirmButton: true,
          //timer: 1500
          })

        }
        else{
        Swal.fire({
                
                icon: 'error',
                title: "<h5 style='color:#125DA9; font-size: 20px !important;'> NO SE PUDO ELIMINAR AL PROVEEDOR</h5>",
                text:"LA ELIMINACIÓN DEL PROVEEDOR NO SE PUDO REALIZAR",
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
