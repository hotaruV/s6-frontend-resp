import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { EntesForm } from 'src/app/interfaces/entes.inteface';
import { EnteForm } from 'src/app/interfaces/entesN.interfaces';
import { Estados } from 'src/app/interfaces/estados.inteface';
import { Municipios } from 'src/app/interfaces/municipios.inteface';
import { Ente } from 'src/app/models/Entes/entes.model';
import { Usuario } from 'src/app/models/Usuarios/usuario.model';
import { UsuarioService } from 'src/app/services/auth/usuario.service';
import { EnteService } from 'src/app/services/shared/ente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-ente',
  templateUrl: './register-ente.component.html',
  styleUrls: ['./register-ente.component.scss']
})
export class RegisterEnteComponent implements OnInit {

  public formSumit = false;
  public status!: String;
  public token_param!: string;
  public token!: string;
  public identity!: string;
  public userSelect!: string;
  public enteSelect!: string;
  public formSubmitted = false;
  public botonUpdate = false;
  public botonRegister = true;
  public botonUpdateEnte = false;
  public botonEnte = true;

  public arrayProyecto: EntesForm[] = [];
  public arrayEstado: Estados[] = [];
  public arrayMunicipio: Municipios[] = [];
  public search: string = '';
  public searchE: string = '';
  public searchEstado: string = '';

  public totalUsuarios: number = 0;
  public totalEntes: number = 0;
  public usuario: Usuario[] = [];
  public entes: Ente[] = [];

  public pages: number = 0;
  public paginacion = false;
  public pagesNumber = 15;
  public loading: boolean = true;
  public loading2: boolean = true;
  public getRol = '';
  public getNombres = '';
  public user: Usuario;
  public getuser: any;
  public getentes: any;
  public pagesEnte: number = 0;
  public paginacionEnte = false;
  public pagesNumberEnte = 10;

  @Output() entesListUpdated = new EventEmitter<EntesForm[]>();



  constructor(private fb: UntypedFormBuilder, private usrServ: UsuarioService, private enteService: EnteService) {
    this.getRol = usrServ.usuario.getRol;
    this.getNombres = usrServ.usuario.getNombres;
  }

  public enteForm = this.fb.group({
    ente_id: [],
    ente: [, [Validators.required, Validators.minLength(5)]],
    siglas: [, [Validators.required, Validators.minLength(3)]],
    estado: [, Validators.required],
    municipio: [, Validators.required],
  });


  ngOnInit(): void {
    ////('Entre ngOnInit');
    this.getEntes();
  }

  getEntes() {
    this.loading2 = true;
    this.enteService.cargarEntes().subscribe(
      ({ total, entes }) => {
        this.totalEntes = total;
        if (entes.length > 0) {
          this.entes = entes;
          this.entesListUpdated.emit(this.entes);
          ////(this.entes); // Verifica la lista de entes
        }
        this.loading2 = false;
      },
      error => {
        console.error('Error al cargar entes', error);
        this.loading2 = false; // También finalizar carga en caso de error
      }
    );
  }




  crearEnte() {
    ////("CrearEnte component register");
    if (this.enteForm.invalid) {
      this.enteForm.markAllAsTouched();
      return;
    }
    let form: any = this.enteForm.value;
    // //("CrearEnte register"+form);
    this.usrServ.crearEnte2(form).subscribe(
      (resp: any) => {

        if (resp.ok) {
          // //('ENTRE SUCCESS');
          this.formReset(this.enteForm);
          this.enteForm.controls['ente'].setErrors(null);
          this.enteForm.controls['siglas'].setErrors(null);
          this.enteForm.controls['estado'].setErrors(null);
          this.enteForm.controls['municipio'].setErrors(null);
          this.getEntes();


          Swal.fire({
            icon: 'success',
            title: "<h5 style='color:#125DA9; font-size: 20px !important;'> ENTE PÚBLICO AGREGADO </h5>",
            text: "SE HA AGREGADO EL ENTE PÚBLICO CON ÉXITO ",
            confirmButtonText: "ACEPTAR",
            confirmButtonColor: '#125DA9',
            showConfirmButton: true,
            //timer: 1500
          })

        } else {

          Swal.fire({

            icon: 'error',
            title: "<h5 style='color:#125DA9; font-size: 20px !important;'> NO SE PUDO AGREGAR EL ENTE PÚBLICO </h5>",
            text: resp.msg,
            confirmButtonText: "ACEPTAR",
            confirmButtonColor: '#125DA9',
            showConfirmButton: true,
            //timer: 1500
          })

        }
      },
      (err) => console.log(err)
    );
  }


  deleteEnte(uid: string) {
    ////("seleccionado a eliminar:" + uid);
    Swal.fire({
      icon: 'warning',
      title: "<h5 style='color:#125DA9; font-size: 20px !important;'> ELIMINACIÓN ENTE PÚBLICO  </h5>",
      text: "¿REALMENTE ESTÁ SEGURO DE ELIMINAR A ESTE ENTE PÚBLICO?",
      confirmButtonText: "ACEPTAR",
      confirmButtonColor: '#125DA9',
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor: "#d33",
      //timer: 1500
    }).then((result) => {
      if (result.isConfirmed) {
        this.usrServ.deleteEnte(uid).subscribe(
          (r) => {
            this.getEntes();
            this.cancelarEnte();
            Swal.fire({
              icon: 'success',
              title: "<h5 style='color:#125DA9; font-size: 20px !important;'> ENTE PÚBLICO ELIMINADO </h5>",
              text: "LA ELIMINACIÓN DEL ENTE PÚBLICO HA SIDO CONCLUIDA CON ÉXITO",
              confirmButtonText: "ACEPTAR",
              confirmButtonColor: '#125DA9',
              showConfirmButton: true,
              //timer: 1500
            })
          },
          (err) => {

            Swal.fire({

              icon: 'error',
              title: "<h5 style='color:#125DA9; font-size: 20px !important;'> NO SE PUDO ELIMINAR EL ENTE PÚBLICO </h5>",
              text: err.error.msg,
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
  cambiarStatus(uid: string) {

    this.usrServ.updateEnteStatus(uid).subscribe(
      (r) => {
        this.cancelarEnte();

        Swal.fire({
          icon: 'success',
          title: "<h5 style='color:#125DA9; font-size: 20px !important;'> ENTE PÚBLICO ACTUALIZADO </h5>",
          text: "LA ACTUALIZACIÓN DEL ENTE PÚBLICO HA SIDO CONCLUIDA CON ÉXITO",
          confirmButtonText: "ACEPTAR",
          confirmButtonColor: '#125DA9',
          showConfirmButton: true,
          //timer: 1500
        })
        this.getentes();
      },
      (err) => {

        Swal.fire({

          icon: 'error',
          title: "<h5 style='color:#125DA9; font-size: 20px !important;'> NO SE PUDO ACTUALIZAR EL ENTE PÚBLICO </h5>",
          text: err.error.msg,
          confirmButtonText: "ACEPTAR",
          confirmButtonColor: '#125DA9',
          showConfirmButton: true,
          //timer: 1500
        })
      }
    );
  }

  UptEnteGuardar() {
    let form: EnteForm = this.enteForm.value;
    this.usrServ.updateEnte(form).subscribe(
      (r) => {

        this.getEntes();
        this.cancelarEnte();

        Swal.fire({
          icon: 'success',
          title: "<h5 style='color:#125DA9; font-size: 20px !important;'> ENTE PÚBLICO ACTUALIZADO </h5>",
          text: "LA ACTUALIZACIÓN DEL ENTE PÚBLICO HA SIDO CONCLUIDA CON ÉXITO",
          confirmButtonText: "ACEPTAR",
          confirmButtonColor: '#125DA9',
          showConfirmButton: true,
          //timer: 1500
        })
      },
      (err) => {

        Swal.fire({

          icon: 'error',
          title: "<h5 style='color:#125DA9; font-size: 20px !important;'> NO SE PUDO ACTUALIZAR EL ENTE PÚBLICO </h5>",
          text: err.error.msg,
          confirmButtonText: "ACEPTAR",
          confirmButtonColor: '#125DA9',
          showConfirmButton: true,
          //timer: 1500
        })
      }
    );
  }

  updateEnteBtabla(id: string) {
    this.botonUpdateEnte = true;
    this.botonEnte = false;

    this.usrServ.getEnte(id).subscribe((resp: any) => {
      const {
        ente_id,
        ente,
        siglas,
        estado,
        municipio,
      } = resp.entes;
      this.enteSelect = resp.entes;

      this.enteForm.patchValue({
        ente_id,
        ente,
        siglas,
        estado,
        municipio,
      });
      ////("getEnte: patchValue");
    });
  }

  cancelarEnte() {
    this.botonUpdateEnte = false;
    this.botonEnte = true;
    this.enteForm.reset();
  }

  private formReset(form: FormGroup) {
    Object.keys(form.controls).forEach((key) => {
      form.get(key).setErrors(null);
    });
    form.reset();
  }
  // información de entes
  getEstados() {
    this.usrServ
      .listaEstados(this.enteForm.value.estado)
      .subscribe((resp: any) => {
        this.arrayEstado = resp.data;
      });
  }

  NextPageEnte() {

    this.goToPageEnte(this.pagesEnte + this.pagesNumberEnte);

  }

  PrevPageEnte() {

    if (this.pagesEnte > 0) {
      this.goToPageEnte(this.pagesEnte - this.pagesNumberEnte);
    }
  }

  goToPageEnte(page_Ente: number) {

    this.pagesEnte = page_Ente;
  }

  onChangeEstado() {
    ////("entre:" + this.enteForm.value.estado);
    this.usrServ
      .listaMunicipiosdeEstado(this.enteForm.value.estado)
      .subscribe((resp: any) => {
        this.arrayMunicipio = resp.data;
        ////(this.arrayMunicipio);
      });
  }

  campoNoValidoEnte(campo: string) {
    return (
      this.enteForm.controls[campo].errors &&
      this.enteForm.controls[campo].touched
    );
  }
  SearchEnte(searchEnte: string) {
    this.pagesEnte = 0;
    this.searchE = searchEnte.toLowerCase();
  }

}
