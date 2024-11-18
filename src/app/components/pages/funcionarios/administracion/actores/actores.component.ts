import { EntesForm } from './../../../../../interfaces/entes.inteface';
import { Municipios } from './../../../../../interfaces/municipios.inteface';
import { Paises } from './../../../../../interfaces/paises.inteface';
import { Estados } from './../../../../../interfaces/estados.inteface';
import { CodigoPostal } from './../../../../../interfaces/codigopostal.inteface';
import { Usuario } from 'src/app/models/Usuarios/usuario.model';
import { Ente } from 'src/app/models/Entes/entes.model';
import { ServidoresEnte } from 'src/app/models/Entes/servidores.model';
import { UsuarioService } from '../../../../../services/auth/usuario.service';
import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { debounceTime, filter, map, Observable, Subject, switchMap } from 'rxjs';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { ServidoresComponent } from './servidores/servidores.component';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Proveedores } from './../../../../../models/Entes/proveedores.model';
import { CodigosPostales } from 'src/app/models/Entes/codigos.model';
import { DebounceService } from 'src/app/services/shared/Debounce.service';
import { PlaningService } from 'src/app/services/pages/planing.service';

interface Idiomas {
  value: string;
  viewValue: string;
}
interface Areas {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-actores',
  templateUrl: './actores.component.html',
  styleUrls: ['./actores.component.scss']
})
export class ActoresComponent implements OnInit {


  idiomas: Idiomas[] = [
    { value: 'EN', viewValue: 'ESPAÑOL' },
    { value: 'US', viewValue: 'INGLÉS', },
    { value: 'UK', viewValue: 'INGLES BRITÁNICO' },
  ];
  areas: Areas[] = [
    { value: 'ÁREA REQUIRIENTE', viewValue: 'ÁREA REQUIRIENTE' },
    { value: 'ÁREA CONTRATANTE', viewValue: 'ÁREA CONTRATANTE', },
    { value: 'ÁREA RESPONSABLE DE LA EJECUCIÓN', viewValue: 'ÁREA RESPONSABLE DE LA EJECUCIÓN' },
  ];

  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  public StringPattern: string = '^[a-zA-Záéíóú ]+$';
  public rfcPattern: string =
    '/^([A-ZÑ&]{3,4}) ?(?:- ?)?(d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]d|3[01])) ?(?:- ?)?([A-Zd]{2})([Ad])$/';

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
  public arrayCodigoPostal: CodigoPostal[] = [];
  tipopersona: boolean;
  public botonGuardarServidor = true;
  public botonVerServidor = true;
  public botonUpdateServidor = false;

  private debouncer = new Subject<string>()

  public botonGuardaProv = true;
  public botonUpdateProv = false;
  public botonVerProv = true;

  public arrayPais: Paises[] = [];
  public arrayPaisProveedor: Paises[] = [];
  public arrayProyecto: EntesForm[] = [];
  public arrayEstado: Estados[] = [];
  public arrayMunicipio: Municipios[] = [];
  public arrayEstadoProveedor: Estados[] = [];
  public arrayMunicipioProveedor: Municipios[] = [];
  public search: string = '';
  public searchE: string = '';
  public searchEstado: string = '';

  public totalUsuarios: number = 0;
  public totalEntes: number = 0;
  public usuario: Usuario[] = [];
  public entes: Ente[] = [];

  public _codigos: CodigosPostales[] = [];
  public _codigosEnte: CodigosPostales[] = [];
  public totalServEntres: number = 0;
  public Serventes: ServidoresEnte[] = [];

  public pages: number = 0;
  public paginacion = false;
  public pagesNumber = 15;
  public loading: boolean = true;
  public loading2: boolean = true;
  public getRol = '';
  public getNombres = '';
  public getIdUsuario = '';
  public getidentepublico = '';
  public user: Usuario;
  public getuser: any;
  public getservente: any;
  public getentes: any;
  public pagesEnte: number = 0;
  public paginacionEnte = false;
  public pagesNumberEnte = 3;
  public modalSwitch: boolean = false;
  public prov: Proveedores[] = [];


  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;

  public enteForm = this.fb.group({

    uid: [],
    nombre_comercial: ['', [Validators.required, Validators.minLength(5)]],
    rfc: ['', [Validators.required]],
    lugar: ['MÉXICO'],
    nombre_legal: ['', Validators.required],
    pais: [{ value: 'MÉXICO', disabled: true }, [Validators.required]],
    codigoPostal: ['', [Validators.required]],
    colonia: ['', [Validators.required]],
    localidad: ['', [Validators.required]],
    region: ['', [Validators.required]],
    calle: ['', [Validators.required]],
    numero: ['', [Validators.required]],
    nombres_contacto: ['', [Validators.required, Validators.minLength(4)]],
    primer_apellido_contacto: ['', [Validators.required, Validators.minLength(4)]],
    segundo_apellido_contacto: ['', Validators.pattern(this.StringPattern)],
    email_contacto: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    telefono_contacto: ['', [Validators.required]],
    telefonofax_contacto: [''],
    url_ente_contacto: [''],
    idioma: [null, [Validators.required]],
  }, {
    validators: [this.rfcValido]
  });

  public servidoresEnteForm = this.fb.group({

    //servidores
    uid: [],
    _id: [],

    id_usuario: [],
    nombres_servidor: [, [Validators.required, Validators.minLength(3)]],
    primer_apellido_servidor: [, [Validators.required, Validators.minLength(3)]],
    segundo_apellido_servidor: [, Validators.pattern(this.StringPattern)],
    rfc_servidor: [, [Validators.required]],
    cargo_servidor: [, [Validators.required]],
    email_servidor: [, [Validators.required, Validators.pattern(this.emailPattern)]],
    telefono_servidor: [],
    telefonofax_servidor: [],
    area: [, [Validators.required]],
  }, { validators: [this.rfcValidoServidor] });

  public proveedoresForm = this.fb.group({

    uid: [],
    _id: [],
    id_usuario: [],
    tipo: [,],
    razonsocialProv: [, [Validators.required, Validators.minLength(5)]],
    rfcproveedor: [, [Validators.required]],
    uri_proveedor: [],
    nombres_rep_legal: [, [Validators.minLength(4)]],
    primer_apellido_rep_legal: [, [Validators.minLength(4)]],
    segundo_apellido_rep_legal: [, Validators.pattern(this.StringPattern)],
    rfc_rep_legal: [, []],
    // nombres_rep_legal: [, [Validators.required, Validators.minLength(4)]],
    // primer_apellido_rep_legal: [, [Validators.required, Validators.minLength(4)]],
    // segundo_apellido_rep_legal: [, Validators.pattern(this.StringPattern)],
    // rfc_rep_legal: [, [Validators.required]],
    lugar_proveedor: ['MÉXICO'],
    pais_proveedor: [{ value: 'MÉXICO', disabled: true }, [Validators.required]],
    codigoPostal_proveedor: [, Validators.required],
    colonia_proveedor: [, Validators.required],
    localidad_proveedor: [, [Validators.required]],
    region_proveedor: [, [Validators.required]],
    calle_proveedor: [, [Validators.required]],
    numero_proveedor: [, [Validators.required]],

    nombres_contacto_prov: [, [Validators.required, Validators.minLength(4)]],
    primer_apellido_contacto_prov: [, [Validators.required, Validators.minLength(4)]],
    segundo_apellido_contacto_prov: [, Validators.pattern(this.StringPattern)],
    email_contacto_prov: [, [Validators.required, Validators.pattern(this.emailPattern)]],
    telefono_contacto_prov: [, [Validators.required]],
    telefonofax_contacto_prov: [, []],
    url_ente_contacto_prov: [, [Validators.required]],
    idioma_prov: [null, [Validators.required]],
  },
    {
      validators: [this.rfcValidoRepProveedor]
    }
  );

  constructor(
    private fb: UntypedFormBuilder,
    private usrServ: UsuarioService,
    private readonly _modelService: MatDialog,
    private planingService: PlaningService,
  ) {
    ////("volvi a entrar:" + this.botonGuardaProv);
    this.getNombres = usrServ.usuario.getNombres;
    this.getIdUsuario = usrServ.usuario.getUid;
    this.getidentepublico = usrServ.usuario.getid_ente_publico.ente_id;
    this.getRol = usrServ.usuario.getRol;
    ////(usrServ.usuario.getid_ente_publico.ente_id);

  }


  ngOnInit(): void {
    this.tipopersona = false;//fisica
    //BUSCAR EL ENTE PUBLICO DEL USUARIO 
    this.getEnte();
    this.getPaisAll();
    this.setupDebouncer();
    this.setPaisLugarEnte();
    this.setPaisLugarProvedor();
  }

  private setPaisLugarEnte() {
    this.enteForm.get('lugar')?.valueChanges.subscribe(value => {
      const paisControl = this.enteForm.get('pais');
      if (value === 'EXTRANJERO') {
        paisControl?.enable();
      } else {
        paisControl?.setValue('MÉXICO');
        paisControl?.disable();
      }
    });
  }

  private setPaisLugarProvedor() {
    this.proveedoresForm.get('lugar_proveedor')?.valueChanges.subscribe(value => {
      const paisControl = this.proveedoresForm.get('pais_proveedor');
      if (value === 'EXTRANJERO') {
        paisControl?.enable();
      } else {
        paisControl?.setValue('MÉXICO');
        paisControl?.disable();
      }
    });
  }



  ngOnDestroy(): void {


  }
  crearServidorEnte() {
    ////("crearServidorEnte component contrats");
    if (this.servidoresEnteForm.invalid) {
      this.servidoresEnteForm.markAllAsTouched();
      return;
    }
    let form: any = this.servidoresEnteForm.value;

    this.usrServ.crearRegistroServidorEnte(form).subscribe(
      (resp: any) => {

        if (resp.ok) {
          // //('ENTRE SUCCESS');
          this.formReset(this.servidoresEnteForm);
          this.servidoresEnteForm.controls['nombres_servidor'].setErrors(null);
          this.servidoresEnteForm.controls['primer_apellido_servidor'].setErrors(null);
          this.servidoresEnteForm.controls['segundo_apellido_servidor'].setErrors(null);
          this.servidoresEnteForm.controls['rfc_servidor'].setErrors(null);
          this.servidoresEnteForm.controls['cargo_servidor'].setErrors(null);
          this.servidoresEnteForm.controls['email_servidor'].setErrors(null);
          this.servidoresEnteForm.controls['area'].setErrors(null);
          this.getEnte();


          Swal.fire({
            icon: 'success',
            title: "<h5 style='color:#125DA9; font-size: 20px !important;'> SERVIDOR PÚBLICO DEL ENTE AGREGADO </h5>",
            text: "SE HA AGREGADO EL SERVIDOR PÚBLICO DEL ENTE CON ÉXITO ",
            confirmButtonText: "ACEPTAR",
            confirmButtonColor: '#125DA9',
            showConfirmButton: true,
            //timer: 1500
          })

        } else {

          Swal.fire({

            icon: 'error',
            title: "<h5 style='color:#125DA9; font-size: 20px !important;'> NO SE PUDO AGREGAR EL SERVIDOR PÚBLICO DEL ENTE  </h5>",
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

  personaFisica() {
    ////('Entre personaFisica: ');
    this.tipopersona = false;

  }
  personaMoral() {
    ////('Entre personaMoral: ');
    this.tipopersona = true;
  }
  /*************FUNCIONES DE ENTE******** */
  getEnte() {
    this.loading = false;
    this.enteForm.patchValue({
      uid: this.getidentepublico
    });

    this.servidoresEnteForm.patchValue({
      uid: this.getidentepublico,
      id_usuario: this.getIdUsuario,
    });

    this.proveedoresForm.patchValue({
      uid: this.getidentepublico,
      id_usuario: this.getIdUsuario,
    });

    this.usrServ.getEnte(this.getidentepublico).subscribe({
      next: (resp: any) => {
        //('Respuesta del ente:', resp.entes); // Verifica la respuesta

        const {
          nombre_comercial,
          nombre_legal,
          rfc,
          lugar,
          pais,
          codigoPostal,
          colonia,
          localidad,
          region,
          calle,
          numero,
          nombres_contacto,
          primer_apellido_contacto,
          segundo_apellido_contacto,
          email_contacto,
          telefono_contacto,
          telefonofax_contacto,
          url_ente_contacto,
          idioma,
        } = resp.entes;

        this.enteSelect = resp.entes;

        this.enteForm.patchValue({
          nombre_comercial,
          nombre_legal,
          rfc,
          lugar,
          pais,
          codigoPostal,
          colonia,
          localidad,
          region,
          calle,
          numero,
          nombres_contacto,
          primer_apellido_contacto,
          segundo_apellido_contacto,
          email_contacto,
          telefono_contacto,
          telefonofax_contacto,
          url_ente_contacto,
          idioma,
        });

        if (codigoPostal.length === 5) {
          this.cargaColonias(codigoPostal);
        }
      },
      error: (err) => {
        console.error('Error al obtener el ente:', err);
      }
    });
  }



  private formReset(form: FormGroup) {
    Object.keys(form.controls).forEach((key) => {
      form.get(key).setErrors(null);
    });
    form.reset();
  }
  campoNoValido(campo: string) {

    return (
      this.enteForm.controls[campo].errors &&
      this.enteForm.controls[campo].touched
    );
  }
  campoNoValidoEnte(campo: string) {
    return (
      this.enteForm.controls[campo].errors &&
      this.enteForm.controls[campo].touched
    );
  }
  campoNoValidoServidor(campo: string) {
    return (
      this.servidoresEnteForm.controls[campo].errors &&
      this.servidoresEnteForm.controls[campo].touched
    );
  }
  campoNoValidoProvedores(campo: string) {
    return (
      this.proveedoresForm.controls[campo].errors &&
      this.proveedoresForm.controls[campo].touched
    );
  }
  getEstados() {
    this.usrServ
      .listaEstados(this.enteForm.value.localidad)
      .subscribe((resp: any) => {
        this.arrayEstado = resp.data;
      });
  }
  getPais() {
    this.usrServ
      .listaPaises(this.enteForm.value.pais)
      .subscribe((resp: any) => {
        this.arrayPais = resp.data;
      });
  }
  getPaisAll() {
    this.usrServ
      .listaPaisesProvedores()
      .subscribe((resp: any) => {
        this.arrayPaisProveedor = resp.data;
        this.arrayPais = resp.data;
      });
  }
  getCodigoPostal() {
    this.usrServ
      .listaCodigoPostal(this.enteForm.value.codigoPostal)
      .subscribe((resp: any) => {
        this.arrayCodigoPostal = resp.data;
      });
  }



  private setupDebouncer() {
    this.debouncer
      .pipe(
        debounceTime(1000),
        filter(searchTerm => searchTerm.length === 5),
        switchMap(searchTerm => this.usrServ.listaCodigoPostal(searchTerm))
      )
      .subscribe((resp: any) => {
        this._codigosEnte = resp.data;
        ////(this._codigosEnte);
        if (this._codigosEnte.length === 1) {
          const data = this._codigosEnte[0];
          this.enteForm.patchValue({
            colonia: data.colonia,
            pais: 'MEXICO',
          });
        }
      });
  }

  cargaColonias(searchTerm: string): Subject<string> {
    this.debouncer.next(searchTerm);
    return this.debouncer;
  }
  cargaDatosProveedor(event) {
    ////('onKeyUp 1: '+event.target.value);
    ////('cp 1: '+this.enteForm.value.codigoPostal_proveedor);
    this.usrServ
      .listaCodigoPostal(event.target.value)
      .subscribe((resp: any) => {
        this._codigos = resp.data;
      });

    this.proveedoresForm.patchValue({
      pais_proveedor: "MEXICO"
    });
  }
  onChangeEstado() {

    this.usrServ
      .listaMunicipiosdeEstado(this.enteForm.value.localidad)
      .subscribe((resp: any) => {
        this.arrayMunicipio = resp.data;
        ////(this.arrayMunicipio);
      });
  }

  getMunicipios() {
    this.usrServ
      .listaMunicipios(this.enteForm.value.municipio)
      .subscribe((resp: any) => {
        this.arrayMunicipio = resp.data;
        ////(this.arrayMunicipio);
      });
  }
  actInformacionEnte() {

    ////("Actualizar Ente component register" + this.getidentepublico);
    if (this.enteForm.invalid) {
      this.enteForm.markAllAsTouched();
      return;
    }
    let form: any = this.enteForm.value;



    this.usrServ.actEnte(form).subscribe(
      (resp: any) => {
        ////(resp.ente.ente_id)

        if (resp.ok) {
          ////('ENTRE SUCCESS');
          let formBuyerData = {
            name: form.nombre_legal,
            id: form.rfc,
            ente_id: resp.ente.ente_id
          }

          this.planingService.CrearBuyer(formBuyerData)
            .pipe(map((resp: any) => {
              if (resp.ok) {
                return
              }

            })).subscribe()
          this.formReset(this.enteForm);

          this.enteForm.controls['nombre_comercial'].setErrors(null);

          this.enteForm.controls['rfc'].setErrors(null);
          this.enteForm.controls['lugar'].setErrors(null);
          this.enteForm.controls['nombre_legal'].setErrors(null);
          this.enteForm.controls['pais'].setErrors(null);
          this.enteForm.controls['codigoPostal'].setErrors(null);
          this.enteForm.controls['lugar'].setErrors(null);
          this.enteForm.controls['colonia'].setErrors(null);
          this.enteForm.controls['localidad'].setErrors(null);
          this.enteForm.controls['region'].setErrors(null);
          this.enteForm.controls['lugar'].setErrors(null);
          this.enteForm.controls['calle'].setErrors(null);

          this.enteForm.controls['numero'].setErrors(null);
          this.enteForm.controls['nombres_contacto'].setErrors(null);
          this.enteForm.controls['primer_apellido_contacto'].setErrors(null);
          this.enteForm.controls['segundo_apellido_contacto'].setErrors(null);
          this.enteForm.controls['email_contacto'].setErrors(null);
          this.enteForm.controls['telefono_contacto'].setErrors(null);
          this.enteForm.controls['telefonofax_contacto'].setErrors(null);
          this.enteForm.controls['url_ente_contacto'].setErrors(null);
          this.enteForm.controls['idioma'].setErrors(null);

          this.getEnte();

          Swal.fire({
            icon: 'success',
            title: "<h5 style='color:#125DA9; font-size: 20px !important;'> ENTE PÚBLICO ACTUALIZADO </h5>",
            text: "SE HA ACTUALIZADO EL ENTE PÚBLICO CON ÉXITO ",
            confirmButtonText: "ACEPTAR",
            confirmButtonColor: '#125DA9',
            showConfirmButton: true,
            //timer: 1500
          })

        } else {

          Swal.fire({

            icon: 'error',
            title: "<h5 style='color:#125DA9; font-size: 20px !important;'> NO SE PUDO ACTUALIZAR EL ENTE PÚBLICO </h5>",
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

  deleteServEnte(uid: string) {
    //("seleccionado a eliminar:" + uid);
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
            this.getEnte();
            //this.cancelarEnte();
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
  updateServEnteBtabla(id: string) {
    // //("Boton update grid");
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
      //("getEnte: patchValue");
    });
  }

  creaProveedores() {
    //("creaProveedores ");
    if (this.proveedoresForm.invalid) {
      this.proveedoresForm.markAllAsTouched();
      return;
    }
    let form: any = this.proveedoresForm.value;

    this.usrServ.crearRegistroProveedor(form).subscribe(
      (resp: any) => {

        if (resp.ok) {
          //('ENTRE SUCCESS');
          this.formReset(this.proveedoresForm);
          this.proveedoresForm.controls['tipo'].setErrors(null);
          this.proveedoresForm.controls['razonsocialProv'].setErrors(null);
          this.proveedoresForm.controls['rfcproveedor'].setErrors(null);
          this.proveedoresForm.controls['uri_proveedor'].setErrors(null);
          this.proveedoresForm.controls['nombres_rep_legal'].setErrors(null);
          this.proveedoresForm.controls['primer_apellido_rep_legal'].setErrors(null);
          this.proveedoresForm.controls['rfc_rep_legal'].setErrors(null);

          this.proveedoresForm.controls['tipo'].setErrors(null);
          this.proveedoresForm.controls['pais_proveedor'].setErrors(null);
          this.proveedoresForm.controls['codigoPostal_proveedor'].setErrors(null);
          this.proveedoresForm.controls['colonia_proveedor'].setErrors(null);
          this.proveedoresForm.controls['localidad_proveedor'].setErrors(null);
          this.proveedoresForm.controls['calle_proveedor'].setErrors(null);
          this.proveedoresForm.controls['numero_proveedor'].setErrors(null);
          this.proveedoresForm.controls['region_proveedor'].setErrors(null);
          this.proveedoresForm.controls['nombres_contacto_prov'].setErrors(null);
          this.proveedoresForm.controls['primer_apellido_contacto_prov'].setErrors(null);
          this.proveedoresForm.controls['segundo_apellido_contacto_prov'].setErrors(null);
          this.proveedoresForm.controls['email_contacto_prov'].setErrors(null);
          this.proveedoresForm.controls['telefono_contacto_prov'].setErrors(null);
          this.proveedoresForm.controls['url_ente_contacto_prov'].setErrors(null);
          this.proveedoresForm.controls['idioma_prov'].setErrors(null);
          this.getEnte();


          Swal.fire({
            icon: 'success',
            title: "<h5 style='color:#125DA9; font-size: 20px !important;'> PROVEEDOR DEL ENTE PÚBLICO AGREGADO </h5>",
            text: "SE HA AGREGADO EL PROVEEDOR DEL ENTE PÚBLICO CON ÉXITO ",
            confirmButtonText: "ACEPTAR",
            confirmButtonColor: '#125DA9',
            showConfirmButton: true,
            //timer: 1500
          })

        } else {

          Swal.fire({

            icon: 'error',
            title: "<h5 style='color:#125DA9; font-size: 20px !important;'> NO SE PUDO AGREGAR EL PROVEEDOR DEL ENTE PÚBLICO </h5>",
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
  /* region y localidad */
  getEstadosProveedor() {
    ////("entre getEstadosProveedor:"+this.proveedoresForm.value.localidad_proveedor);
    this.usrServ
      .listaEstados(this.proveedoresForm.value.localidad_proveedor)
      .subscribe((resp: any) => {
        this.arrayEstadoProveedor = resp.data;
      });

  }

  onChangeEstadoProveedor() {

    this.usrServ
      .listaMunicipiosdeEstado(this.proveedoresForm.value.localidad_proveedor)
      .subscribe((resp: any) => {
        this.arrayMunicipioProveedor = resp.data;
      });
  }
  cancelarProveedor() {
    this.botonUpdateProv = false;
    this.botonGuardaProv = true;
    this.botonVerProv = true;
    this.proveedoresForm.reset();
    this.proveedoresForm.patchValue({
      uid: this.getidentepublico,
      id_usuario: this.getIdUsuario,
    });

  }

  UptProveedor() {
    let form: Proveedores = this.proveedoresForm.value;

    this.usrServ.updateProveedor(form).subscribe(
      (r) => {
        //this.getUsers();
        //this.cancelar();
        Swal.fire({
          icon: 'success',
          title: "<h5 style='color:#125DA9; font-size: 20px !important;'> PROVEEDOR ACTUALIZADO </h5>",
          text: "LA ACTUALIZACIÓN DEL PROVEEDOR HA SIDO CONCLUIDA CON ÉXITO",
          confirmButtonText: "ACEPTAR",
          confirmButtonColor: '#125DA9',
          showConfirmButton: true,
          //timer: 1500
        })
        this.botonUpdateProv = false;
        this.botonGuardaProv = true;
        this.botonVerProv = true;
        this.proveedoresForm.reset();
        this.proveedoresForm.patchValue({
          uid: this.getidentepublico,
          id_usuario: this.getIdUsuario,
        });
      },
      (err) => {
        Swal.fire({

          icon: 'error',
          title: "<h5 style='color:#125DA9; font-size: 20px !important;'> NO SE PUDO ACTUALIZAR EL PROVEEDOR</h5>",
          text: err.error.msg,
          confirmButtonText: "ACEPTAR",
          confirmButtonColor: '#125DA9',
          showConfirmButton: true,
          //timer: 1500
        })
        //  Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }

  /*dialogo de proveedores */
  Verprov(): void {
    ////("idEnteActor:"+ this.getidentepublico);
    ////("idUsuarioActor:"+ this.getIdUsuario);
    const dialogRef = this._modelService.open(ProveedoresComponent, {
      disableClose: true,
      autoFocus: true,
      width: '100%',
      height: '80%',
      data: {
        idEnte: this.getidentepublico,
        idUsuario: this.getIdUsuario
      }

    });
    dialogRef.afterClosed().subscribe(result => {

      const id = result.id;

      if (id) {
        this.botonUpdateProv = true;
        this.botonGuardaProv = false;
        ////("botonGuardaProv:"+ this.botonGuardaProv);
        this.botonVerProv = false;
        ////("result:"+ id);
        this.usrServ.getProveedor(id).subscribe((resp: any) => {
          const {
            tipo,
            razonsocialProv,
            rfcproveedor,
            uri_proveedor,
            nombres_rep_legal,
            primer_apellido_rep_legal,
            segundo_apellido_rep_legal,
            rfc_rep_legal,
            lugar_proveedor,
            pais_proveedor,
            codigoPostal_proveedor,
            colonia_proveedor,
            localidad_proveedor,
            region_proveedor,
            calle_proveedor,
            numero_proveedor,
            nombres_contacto_prov,
            primer_apellido_contacto_prov,
            segundo_apellido_contacto_prov,
            email_contacto_prov,
            telefono_contacto_prov,
            telefonofax_contacto_prov,
            url_ente_contacto_prov,
            idioma_prov,
            id_ente_publico,
            created_at,
            updated_at,
            id_usuario,
            uid,
            _id,
            estatus,
          } = resp.Proveedor;
          //('Proveedor 1' + resp.Proveedor._id);
          //let tipopersona=true;
          if (tipo == "Moral") {
            this.tipopersona = true;
          } else {
            this.tipopersona = false;
          }
          // //('tipopersona 1'+ tipopersona);
          this.proveedoresForm.patchValue({
            tipo,
            // tipopersona,
            razonsocialProv,
            rfcproveedor,
            uri_proveedor,
            nombres_rep_legal,
            primer_apellido_rep_legal,
            segundo_apellido_rep_legal,
            rfc_rep_legal,
            lugar_proveedor,
            pais_proveedor,
            codigoPostal_proveedor,
            colonia_proveedor,
            localidad_proveedor,
            region_proveedor,
            calle_proveedor,
            numero_proveedor,
            nombres_contacto_prov,
            primer_apellido_contacto_prov,
            segundo_apellido_contacto_prov,
            email_contacto_prov,
            telefono_contacto_prov,
            telefonofax_contacto_prov,
            url_ente_contacto_prov,
            idioma_prov,
            id_ente_publico,
            created_at,
            updated_at,
            id_usuario,
            uid,
            _id,
            estatus,

          });
        });
        ////('proveedoresForm 1'+ this.proveedoresForm._id);
      }


    });
  }

  /*dialogo de servidores publicos */
  Verserv(): void {
    ////("idEnteActor:"+ this.getidentepublico);
    ////("idUsuarioActor:"+ this.getIdUsuario);
    const dialogRef = this._modelService.open(ServidoresComponent, {
      disableClose: true,
      autoFocus: true,
      width: '100%',
      height: '80%',
      data: {
        idEnte: this.getidentepublico,
        idUsuario: this.getIdUsuario
      }

    });
    dialogRef.afterClosed().subscribe(result => {

      const id = result.id;

      if (id) {
        this.botonUpdateServidor = true;
        this.botonGuardarServidor = false;
        ////("botonGuardaProv:"+ this.botonGuardaProv);
        this.botonVerServidor = false;
        ////("result:"+ id);
        this.usrServ.getServidor(id).subscribe((resp: any) => {
          const {
            nombres_servidor,
            primer_apellido_servidor,
            segundo_apellido_servidor,
            rfc_servidor,
            cargo_servidor,
            email_servidor,
            telefono_servidor,
            telefonofax_servidor,
            area,
            id_ente_publico,
            created_at,
            updated_at,
            id_usuario,
            uid,
            _id,
            estatus,

          } = resp.Servidor;
          //('Servidor 1' + resp.Servidor.uid);
          this.servidoresEnteForm.patchValue({

            nombres_servidor,
            primer_apellido_servidor,
            segundo_apellido_servidor,
            rfc_servidor,
            cargo_servidor,
            email_servidor,
            telefono_servidor,
            telefonofax_servidor,
            area,
            id_ente_publico,
            created_at,
            updated_at,
            id_usuario,
            uid,
            _id,
            estatus,

          });
        });
        ////('proveedoresForm 1'+ this.proveedoresForm._id);
      }


    });
  }

  cancelarServidor() {
    this.botonUpdateServidor = false;
    this.botonGuardarServidor = true;
    this.botonVerServidor = true;
    this.servidoresEnteForm.reset();
    this.servidoresEnteForm.patchValue({
      uid: this.getidentepublico,
      id_usuario: this.getIdUsuario,
    });
    this.getEnte();
  }

  UptServidor() {
    let form: ServidoresEnte = this.servidoresEnteForm.value;

    this.usrServ.updateServidor(form).subscribe(
      (r) => {
        //this.getUsers();
        //this.cancelar();
        Swal.fire({
          icon: 'success',
          title: "<h5 style='color:#125DA9; font-size: 20px !important;'> SERVIDOR PÚBLICO ACTUALIZADO </h5>",
          text: "LA ACTUALIZACIÓN DEL SERVIDOR PÚBLICO HA SIDO CONCLUIDA CON ÉXITO",
          confirmButtonText: "ACEPTAR",
          confirmButtonColor: '#125DA9',
          showConfirmButton: true,
          //timer: 1500
        })
        this.botonUpdateServidor = false;
        this.botonGuardarServidor = true;
        this.botonVerServidor = true;
        this.servidoresEnteForm.reset();
        this.servidoresEnteForm.patchValue({
          uid: this.getidentepublico,
          id_usuario: this.getIdUsuario,
        });
        this.getEnte();
      },
      (err) => {
        Swal.fire({

          icon: 'error',
          title: "<h5 style='color:#125DA9; font-size: 20px !important;'> NO SE PUDO ACTUALIZAR EL SERVIDOR PÚBLICO</h5>",
          text: err.error.msg,
          confirmButtonText: "ACEPTAR",
          confirmButtonColor: '#125DA9',
          showConfirmButton: true,
          //timer: 1500
        })
        //  Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }







  digitoVerificador(curp17: string) {

    var diccionario = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ",
      lngSuma = 0.0,
      lngDigito = 0.0;
    for (var i = 0; i < 17; i++)
      lngSuma = lngSuma + diccionario.indexOf(curp17.charAt(i)) * (18 - i);
    lngDigito = 10 - lngSuma % 10;
    if (lngDigito == 10)
      return 0;
    return lngDigito;
  }

  rfcValidoRepProveedor(form: FormGroup) {
    let rfc = form.controls['rfc_rep_legal'].value;

    if (rfc != null) {
      rfc = rfc.toUpperCase();
      var re = /^([ A-ZÑ&]?[A-ZÑ&]{3}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/,
        validado = rfc.match(re);

      if (!validado)  //Coincide con el formato general?
      {

        form.controls['rfc_rep_legal'].setErrors({ 'incorrect': true });
        return false;
      }


      //Separar el dígito verificador del resto del RFC
      var digitoVerificador = validado.pop(),
        rfcSinDigito = validado.slice(1).join('')

      //Obtener el digito esperado
      var diccionario = "0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ Ñ",
        lngSuma = 0.0,
        digitoEsperado;

      if (rfcSinDigito.length == 11) rfc = " " + rfc; //Ajustar a 12
      for (var i = 0; i < 13; i++)
        lngSuma = lngSuma + diccionario.indexOf(rfcSinDigito.charAt(i)) * (13 - i);
      digitoEsperado = 11 - lngSuma % 11;
      if (digitoEsperado == 11) digitoEsperado = 0;
      if (digitoEsperado == 10) digitoEsperado = "A";
      digitoVerificador == digitoEsperado;
      if (digitoVerificador) { // ⬅️ Acá se comprueba


        return true;
      } else {

        form.controls['rfc_rep_legal'].setErrors({ 'incorrect': true });
        return false;
      }

    }
    return true;
  }
  rfcValido(form: FormGroup) {
    let rfc = form.controls['rfc'].value;

    if (rfc != null) {
      rfc = rfc.toUpperCase();
      var re = /^([ A-ZÑ&]?[A-ZÑ&]{3}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/,
        validado = rfc.match(re);

      if (!validado)  //Coincide con el formato general?
      {

        form.controls['rfc'].setErrors({ 'incorrect': true });
        return false;
      }


      //Separar el dígito verificador del resto del RFC
      var digitoVerificador = validado.pop(),
        rfcSinDigito = validado.slice(1).join('')

      //Obtener el digito esperado
      var diccionario = "0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ Ñ",
        lngSuma = 0.0,
        digitoEsperado;

      if (rfcSinDigito.length == 11) rfc = " " + rfc; //Ajustar a 12
      for (var i = 0; i < 13; i++)
        lngSuma = lngSuma + diccionario.indexOf(rfcSinDigito.charAt(i)) * (13 - i);
      digitoEsperado = 11 - lngSuma % 11;
      if (digitoEsperado == 11) digitoEsperado = 0;
      if (digitoEsperado == 10) digitoEsperado = "A";
      digitoVerificador == digitoEsperado;
      if (digitoVerificador) { // ⬅️ Acá se comprueba


        return true;
      } else {

        form.controls['rfc'].setErrors({ 'incorrect': true });
        return false;
      }

    }
    return true;
  }
  rfcValidoServidor(form: FormGroup) {
    let rfc = form.controls['rfc_servidor'].value;

    if (rfc != null) {
      rfc = rfc.toUpperCase();
      var re = /^([ A-ZÑ&]?[A-ZÑ&]{3}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/,
        validado = rfc.match(re);

      if (!validado)  //Coincide con el formato general?
      {

        form.controls['rfc_servidor'].setErrors({ 'incorrect': true });
        return false;
      }


      //Separar el dígito verificador del resto del RFC
      var digitoVerificador = validado.pop(),
        rfcSinDigito = validado.slice(1).join('')

      //Obtener el digito esperado
      var diccionario = "0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ Ñ",
        lngSuma = 0.0,
        digitoEsperado;

      if (rfcSinDigito.length == 11) rfc = " " + rfc; //Ajustar a 12
      for (var i = 0; i < 13; i++)
        lngSuma = lngSuma + diccionario.indexOf(rfcSinDigito.charAt(i)) * (13 - i);
      digitoEsperado = 11 - lngSuma % 11;
      if (digitoEsperado == 11) digitoEsperado = 0;
      if (digitoEsperado == 10) digitoEsperado = "A";
      digitoVerificador == digitoEsperado;
      if (digitoVerificador) { // ⬅️ Acá se comprueba


        return true;
      } else {

        form.controls['rfc_servidor'].setErrors({ 'incorrect': true });
        return false;
      }

    }
    return true;
  }

}