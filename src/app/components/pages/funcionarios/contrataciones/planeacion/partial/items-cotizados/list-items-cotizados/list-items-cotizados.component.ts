import { Items } from './../../../../../../../../models/Items/items.model';
import { Component, OnInit , Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from '../../../../../../../../services/auth/usuario.service';
import Swal from 'sweetalert2';

interface value {
  //valor
     amount: string,
     currency: string,
     
   }
  interface unit {
    //UINT 
    
     id: string;
     numreq: string;
     scheme: string,
     name: string,
     valor:string,
     value:value,
     uri: string,
  
   }
  interface classification {
    
    //CLASIFICACION
  id: string;
  scheme:string,
  description: string,
  uri: string,
 
  }
  interface perido {
  

    startDate:string,
    endDate: string,
    maxExtentDate: string,
    undurationInDaysit: unit,
  }
  interface ProveedorEmisor {
    id: string;
    Suppliersname: string;
    name:string;
  }
  interface items {
    //item
    id: string;
    item: string,
    description: string,
    classification:classification,
    quantity: string,
    unit: unit,
    periodo:perido;
    proveedorEmisor:ProveedorEmisor,
  }
export interface DialogDataCotizacion {
  //idEnte: string;
  //idUsuario: string;
  items: items[];
}

@Component({
  selector: 'app-list-items-cotizados',
  templateUrl: './list-items-cotizados.component.html',
  styleUrls: ['./list-items-cotizados.component.scss']
})
export class ListItemsCotizadosComponent implements OnInit {
 
  public totalProveedores: number = 0;
  public items: items[] = [];
  public item: items[] = [];
  public loading: boolean = true;
  public bandera: boolean = true;

  public botonGuardaItem=true;
  public botonUpdateItem = false;
  public botonVerItem = true;

  constructor( public dialog: MatDialogRef<ListItemsCotizadosComponent>, private usrServ: UsuarioService,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataCotizacion
  ) { }

  ngOnInit(): void {
    this.bandera = true;
    this.loading = true;
    this.getAllItems();
  }
  getAllItems() {
   

    this.loading = true;
    
      this.items= this.data.items;
      this.loading = false;

  }
  cerrar() {
   
    this.dialog.close({success: true, items:this.items});
   
  }
  updateItem(id: string) {
    //('updateItem'+id);
    //('Item'+this.items);
    this.dialog.close({success: true, id: id,items:this.items});
   
  }
  deleteItem(id: string) {
    //("seleccionado a eliminar:"+id);
    Swal.fire({
      icon: 'warning',
      title: "<h5 style='color:#125DA9; font-size: 20px !important;'> ELIMINACIÓN DE LA COTIZACIÓN </h5>",
      text:"¿REALMENTE ESTÁ SEGURO DE ELIMINAR ESTA COTIZACIÓN?",
      confirmButtonText: "ACEPTAR",
      confirmButtonColor: '#125DA9',
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor: "#d33",
      //timer: 1500
    }).then((result) => {
      if (result.isConfirmed) {
        let contItems=this.items.length;
        //("num contItems:"+contItems);

        //("seleccionado a eliminar isConfirmed:"+id);
        let eliminar = this.items.findIndex( p => p.id == id);
        const removed =this.items.splice(eliminar,1);
        ////(" removed:"+removed);
        this.loading = true;
        
      this.items;
      this.loading = false;
      let contItems2=this.items.length;
      //("num contitems2 :"+contItems2);
      if(contItems2 < contItems)
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