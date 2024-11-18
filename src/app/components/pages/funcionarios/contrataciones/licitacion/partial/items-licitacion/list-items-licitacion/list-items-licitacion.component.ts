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
  unit: unit,
  }
  
  interface items {
    //item
    id: string;
    item: string,
    description: string,
    classification:classification,
    quantity: string,
  }
export interface DialogDataCotizacion {
  //idEnte: string;
  //idUsuario: string;
  items: items[];
}

@Component({
  selector: 'app-list-items-licitacion',
  templateUrl: './list-items-licitacion.component.html',
  styleUrls: ['./list-items-licitacion.component.scss']
})
export class ListItemsLicitacionComponent implements OnInit {
 
  public totalProveedores: number = 0;
  public items: items[] = [];
  public item: items[] = [];
  public loading: boolean = true;
  public bandera: boolean = true;

  public botonGuardaItem=true;
  public botonUpdateItem = false;
  public botonVerItem = true;

  constructor( public dialog: MatDialogRef<ListItemsLicitacionComponent>, private usrServ: UsuarioService,
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
      title: "<h5 style='color:#125DA9; font-size: 20px !important;'> ELIMINACIÓN DEL ITEM </h5>",
      text:"¿REALMENTE ESTÁ SEGURO DE ELIMINAR ESTE ITEM?",
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
          title: "<h5 style='color:#125DA9; font-size: 20px !important;'> ITEM ELIMINADO </h5>",
          text:"LA ELIMINACIÓN DEL ITEM HA SIDO CONCLUIDA CON ÉXITO",
          confirmButtonText: "ACEPTAR",
          confirmButtonColor: '#125DA9',
          showConfirmButton: true,
          //timer: 1500
          })

        }
        else{
        Swal.fire({
                
                icon: 'error',
                title: "<h5 style='color:#125DA9; font-size: 20px !important;'> NO SE PUDO ELIMINAR EL ITEM </h5>",
                text:"LA ELIMINACIÓN DEL ITEM NO SE PUDO REALIZAR",
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
