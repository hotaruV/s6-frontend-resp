import { Value } from './../../../../../../../interfaces/release';
import { Documents } from './../../../../../../../models/Contratos/contrato.model';
import { UsuarioService } from '../../../../../../../services/auth/usuario.service';
import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { Proveedores } from './../../../../../../../models/Entes/proveedores.model';
interface Format {
  value: string;
  viewValue: string;
}
interface ProveedorInvitado {
  id: string;
  invitedSuppliersname: string;
  name: string;
}

@Component({
  selector: 'app-proveedores-invitados',
  templateUrl: './proveedores-invitados.component.html',
  styleUrls: ['./proveedores-invitados.component.scss']
})
export class ProveedoresInvitadosComponent implements OnInit {

  proveedoresinvitados: ProveedorInvitado[] = [];

  public botonGuardaProvInv = true;
  public botonUpdateProvInv = false;
  public botonVerProvInv = true;
  public proveedoresInvitado: Proveedores[] = [];
  public getprovedores: any;
  public getidentepublico = '';

  public FormProvInv = this.fb.group({

    id: [],
    invitedSuppliersname: [null, [Validators.required]],
  },
    {
      // validators:[this.curpValida]
    });
  /**
* INICIALIZA
*
*/
  constructor(private fb: UntypedFormBuilder, private usrServ: UsuarioService,
    private readonly _modelService: MatDialog
  ) {
    this.getidentepublico = usrServ.usuario.getid_ente_publico.ente_id;
  }

  ngOnInit(): void {

    this.getAllProveedoresInvitado();
  }
  ngOnDestroy(): void {


  }
  /**
  * VALIDACIONES
  *
  */
  campoNoValido(campo: string) {
    if (this.FormProvInv.valid) {
    }
    return (
      this.FormProvInv.controls[campo].errors &&
      this.FormProvInv.controls[campo].touched
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


    if (this.FormProvInv.invalid) {
      this.FormProvInv.markAllAsTouched();
      return;
    }
    let form: any = this.FormProvInv.value;

    //("entre guardar : ");
    let cont = this.proveedoresinvitados.length;
    if (form.invitedSuppliersname != '' && form.invitedSuppliersname != null) {


      cont += 1;

      let proveedor: ProveedorInvitado = {
        id: cont.toString(),
        invitedSuppliersname: form.invitedSuppliersname,
        name: this.proveedoresInvitado.find(item => item.uid == form.invitedSuppliersname).razonsocialProv,
      };
      this.proveedoresinvitados.push(proveedor);

      ////("proveedor "+ this.proveedoresinvitados);
      this.formReset(this.FormProvInv);

      this.FormProvInv.controls['invitedSuppliersname'].setErrors(null);

      Swal.fire({
        icon: 'success',
        title: "<h5 style='color:#125DA9; font-size: 20px !important;'> PROVEEDOR AGREGADO </h5>",
        text: "SE HA AGREGADO EL PROVEEDOR CON ÉXITO ",
        confirmButtonText: "ACEPTAR",
        confirmButtonColor: '#125DA9',
        showConfirmButton: true,
        //timer: 1500

      })
    }


  }
  selectOpt(valor: string) {

    alert(valor);
    //("valor " + valor);
  }

  /*dialogo de cotizaciones */
  VerProv(): void {
    const dialogRef = this._modelService.open(ProveedoresComponent, {
      disableClose: true,
      autoFocus: true,
      width: '100%',
      height: '80%',
      data: {
        proveedores: this.proveedoresinvitados,
        //idUsuario:  this.getIdUsuario
      }

    });
    dialogRef.afterClosed().subscribe(result => {

      const id = result.id;
      if (result.proveedores) {
        //al cerrar el dialogo
      }
      if (id) {
        this.proveedoresinvitados = result.proveedores;
        this.botonUpdateProvInv = true;
        this.botonGuardaProvInv = false;
        this.botonVerProvInv = false;


        const invitedSuppliersname = this.proveedoresinvitados.find(item => item.id == id).invitedSuppliersname;

        this.FormProvInv.patchValue({
          id,
          invitedSuppliersname: invitedSuppliersname,


        });

      }


    });
  }
  cancelarProv() {
    this.botonUpdateProvInv = false;
    this.botonGuardaProvInv = true;
    this.botonVerProvInv = true;
    this.formReset(this.FormProvInv);
    this.FormProvInv.controls['invitedSuppliersname'].setErrors(null);


  }

  UptProv() {
    if (this.FormProvInv.invalid) {
      this.FormProvInv.markAllAsTouched();
      return;
    }
    let form: any = this.FormProvInv.value;
    //("updateProvInvi 1: " + form.id);
    //("updateProvInvi 2: " + form.invitedSuppliersname);
    this.proveedoresinvitados.find(item => item.id == form.id).invitedSuppliersname = form.invitedSuppliersname;


    this.botonUpdateProvInv = false;
    this.botonGuardaProvInv = true;
    this.botonVerProvInv = true;

    Swal.fire({
      icon: 'success',
      title: "<h5 style='color:#125DA9; font-size: 20px !important;'>PROVEEDOR INVITADO ACTUALIZADO </h5>",
      text: "LA ACTUALIZACIÓN DEL PROVEEDOR INVITADO HA SIDO CONCLUIDA CON ÉXITO",
      confirmButtonText: "ACEPTAR",
      confirmButtonColor: '#125DA9',
      showConfirmButton: true,
      //timer: 1500
    })

    //("ProvInvi " + this.proveedoresinvitados);
    this.formReset(this.FormProvInv);
    this.FormProvInv.controls['invitedSuppliersname'].setErrors(null);


  }
  getAllProveedoresInvitado() {


    this.getprovedores = this.usrServ.cargarProveedores(this.getidentepublico).subscribe(({ total, proveedores }) => {

      if (proveedores.length !== 0) {
        this.proveedoresInvitado = proveedores;
      }

    });
  }

}

