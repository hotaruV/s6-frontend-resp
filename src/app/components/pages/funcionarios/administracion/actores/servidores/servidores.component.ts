import { UrlSegment } from '@angular/router';
import { ServidoresEnte } from './../../../../../../models/Entes/servidores.model';
import { Component, OnInit , Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from '../../../../../../services/auth/usuario.service';
import Swal from 'sweetalert2';
export interface DialogData {
  idEnte: string;
  idUsuario: string;
}
@Component({
  selector: 'app-servidores',
  templateUrl: './servidores.component.html',
  styleUrls: ['./servidores.component.scss']
})
export class ServidoresComponent implements OnInit {
 
  public totalServidores: number = 0;
  public servidores: ServidoresEnte[] = [];
  public serv: ServidoresEnte[] = [];
  public getservidores: any;
  public loading: boolean = true;
  public bandera: boolean = true;
  constructor( public dialog: MatDialogRef<ServidoresComponent>, private usrServ: UsuarioService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    this.bandera = true;
    this.loading = true;
    this.getAllServidores();
  }
  getAllServidores() {
   
   // //('data idusuario:'+this.data.idUsuario);
    const id=this.data.idEnte;
    this.loading = true;
    ////('data idEnte:'+id);
    this.getservidores = this.usrServ.cargarServidores(id).subscribe(({ total, servidores }) => {
      this.totalServidores = total;
      if (servidores.length !== 0) {
        this.servidores = servidores;
      }
    /*   this.servidores.forEach(element => {
       
        //('data nombres_servidor:'+ element.nombres_servidor);
        //('data primer_apellido_servidor:'+ element.primer_apellido_servidor);
       
        //('data cargo_servidor:'+ element.cargo_servidor);
        //('data email_servidor:'+ element.email_servidor);
        //('data area:'+ element.area);
        //('data id_ente_publico:'+ element.id_ente_publico);
        //('data id_usuario:'+ element.id_usuario);
        //('data segundo_apellido_servidor:'+ element.segundo_apellido_servidor);
        //('data estatus:'+ element.estatus);
        //('data rfc_servidor:'+ element.rfc_servidor);
        //('data telefono_servidor:'+ element.telefono_servidor);
        //('data telefonofax_servidor:'+ element.telefonofax_servidor);
        //('data uid:'+ element.uid);
        
      });
        */
      ////('data serv:'+ this.servidores);
      this.loading = false;
    });
  }
  updateServidor(uid: string) {

    const id=uid;
    //('updateServidor'+id);
    this.dialog.close({success: true, id: uid});
 
  }
  deleteServidor(uid: string) {
    //("seleccionado a eliminar:"+uid);
    Swal.fire({
      icon: 'warning',
      title: "<h5 style='color:#125DA9; font-size: 20px !important;'> ELIMINACIÓN SERVIDOR PÚBLICO  </h5>",
      text:"¿REALMENTE ESTÁ SEGURO DE ELIMINAR A ESTE  SERVIDOR PÚBLICO?",
      confirmButtonText: "ACEPTAR",
      confirmButtonColor: '#125DA9',
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor: "#d33",
      //timer: 1500
    }).then((result) => {
      if (result.isConfirmed) {
        //("seleccionado a eliminar isConfirmed:"+uid);
         this.usrServ.deleteServidor(uid).subscribe(
      (r) => {
        this.getAllServidores();
        Swal.fire({
          icon: 'success',
          title: "<h5 style='color:#125DA9; font-size: 20px !important;'>  SERVIDOR PÚBLICO ELIMINADO </h5>",
          text:"LA ELIMINACIÓN DEL  SERVIDOR PÚBLICO HA SIDO CONCLUIDA CON ÉXITO",
          confirmButtonText: "ACEPTAR",
          confirmButtonColor: '#125DA9',
          showConfirmButton: true,
          //timer: 1500
        })
      },
      (err) => {
        
        Swal.fire({
           
          icon: 'error',
          title: "<h5 style='color:#125DA9; font-size: 20px !important;'> NO SE PUDO ELIMINAR EL  SERVIDOR PÚBLICO </h5>",
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

