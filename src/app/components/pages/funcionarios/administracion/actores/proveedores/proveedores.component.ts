import { Proveedores } from './../../../../../../models/Entes/proveedores.model';
import { Component, OnInit , Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from '../../../../../../services/auth/usuario.service';
import Swal from 'sweetalert2';

export interface DialogData {
  idEnte: string;
  idUsuario: string;
}
@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent implements OnInit {
 
  public totalProveedores: number = 0;
  public proveedores: Proveedores[] = [];
  public prov: Proveedores[] = [];
  public getprovedores: any;
  public loading: boolean = true;
  public bandera: boolean = true;
  constructor( public dialog: MatDialogRef<ProveedoresComponent>, private usrServ: UsuarioService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    this.bandera = true;
    this.loading = true;
    this.getAllProveedores();
  }
  getAllProveedores() {
   
   // //('data idusuario:'+this.data.idUsuario);
    const id=this.data.idEnte;
    this.loading = true;
    ////('data idEnte:'+id);
    this.getprovedores = this.usrServ.cargarProveedores(id).subscribe(({ total, proveedores }) => {
      this.totalProveedores = total;
      if (proveedores.length !== 0) {
        this.proveedores = proveedores;
      }
      this.loading = false;
    });
  }
  updateProveedor(uid: string) {
    //this.botonUpdate = true;
    //this.botonRegister = false;
    const id=uid;
    //('updateProveedor'+id);
    this.dialog.close({success: true, id: uid});
    // this.usrServ.getProveedor(id).subscribe((resp: any) => {
    //  // //('Proveedor 1'+ resp.Proveedor.tipo);
    //   const {
    //     tipo,
    //     razonsocialProv,
    //      rfcproveedor,
    //      uri_proveedor,
    //      nombres_rep_legal,
    //      primer_apellido_rep_legal,
    //      segundo_apellido_rep_legal,
    //      curp_rep_legal,
    //      lugar_proveedor,
    //      pais_proveedor,
    //      codigoPostal_proveedor,
    //      colonia_proveedor,
    //      localidad_proveedor,
    //      region_proveedor,
    //      calle_proveedor,
    //      numero_proveedor,
    //      nombres_contacto_prov,
    //      primer_apellido_contacto_prov,
    //      segundo_apellido_contacto_prov,
    //      email_contacto_prov,
    //      telefono_contacto_prov,
    //      telefonofax_contacto_prov,
    //      url_ente_contacto_prov,
    //      idioma_prov,
    //      id_ente_publico,
    //      created_at,
    //      updated_at,
    //      id_usuario,
    //      uid,
    //      estatus,
    //   } = resp.Proveedor;
    //   this.prov=resp.Proveedor;
    //  // this.userSelect = resp.user;
    //   //("prov"+resp.Proveedor);
     
    
      // this.dialog.close({success: true, id: uid});
     
    // });
  }
  deleteProveedor(uid: string) {
    //("seleccionado a eliminar:"+uid);
    Swal.fire({
      icon: 'warning',
      title: "<h5 style='color:#125DA9; font-size: 20px !important;'> ELIMINACIÓN PROVEEDOR  </h5>",
      text:"¿REALMENTE ESTÁ SEGURO DE ELIMINAR A ESTE PROVEEDOR?",
      confirmButtonText: "ACEPTAR",
      confirmButtonColor: '#125DA9',
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor: "#d33",
      //timer: 1500
    }).then((result) => {
      if (result.isConfirmed) {
        //("seleccionado a eliminar isConfirmed:"+uid);
         this.usrServ.deleteProveedor(uid).subscribe(
      (r) => {
        this.getAllProveedores();
        Swal.fire({
          icon: 'success',
          title: "<h5 style='color:#125DA9; font-size: 20px !important;'> PROVEEDOR ELIMINADO </h5>",
          text:"LA ELIMINACIÓN DEL PROVEEDOR HA SIDO CONCLUIDA CON ÉXITO",
          confirmButtonText: "ACEPTAR",
          confirmButtonColor: '#125DA9',
          showConfirmButton: true,
          //timer: 1500
        })
      },
      (err) => {
        
        Swal.fire({
           
          icon: 'error',
          title: "<h5 style='color:#125DA9; font-size: 20px !important;'> NO SE PUDO ELIMINAR EL PROVEEDOR </h5>",
          text:err.error.msg,
          confirmButtonText: "ACEPTAR",
          confirmButtonColor: '#125DA9',
          showConfirmButton: true,
          //timer: 1500
        })
       
      }
        );
     }
    })
   
  }
  
}
