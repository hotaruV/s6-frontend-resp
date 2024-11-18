import { Component, OnInit, OnDestroy, Input, SimpleChanges } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators, FormControl } from '@angular/forms';
import { UsuarioService } from 'src/app/services/auth/usuario.service';
import { Ente } from 'src/app/models/Entes/entes.model';
import { Usuario } from 'src/app/models/Usuarios/usuario.model';
import Swal from 'sweetalert2';
import { EntesForm } from 'src/app/interfaces/entes.inteface';
import { Estados } from 'src/app/interfaces/estados.inteface';
import { Municipios } from 'src/app/interfaces/municipios.inteface';
import { RegisterFOrm } from 'src/app/interfaces/login.interface';
import { map, Observable, startWith } from 'rxjs';
import { EnteService } from 'src/app/services/shared/ente.service';
interface Roles {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-register-usuarios',
  templateUrl: './register-usuarios.component.html',
  styleUrls: ['./register-usuarios.component.scss']
})
export class RegisterUsuariosComponent implements OnInit, OnDestroy {
  roles: Roles[] = [
    // { value: 'seseaadmin', viewValue: 'ADMINISTRADOR SEASLP(seseaadmin)' },
    {
      value: 'adminstrador_ente',
      viewValue: 'ADMINISTRADOR DE ENTE(adminstrador_ente)',
    },
    { value: 'oic', viewValue: 'OIC (ÓRGANO INTERNO DE CONTROL)' },
  ];

  public emailPattern: string = '^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
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
  public pagesNumberEnte = 3;
  //public modalSwitch: boolean = false;



  @Input() entesList: EntesForm[] = [];

  filteredEntes: Observable<EntesForm[]>;

  public registerForm = this.fb.group({
    ente_id: [],
    uid: [],
    userName: [],
    nombres: [, [Validators.required, Validators.minLength(4)]],
    primer_apellido: [, [Validators.required, Validators.minLength(4)]],
    segundo_apellido: [, Validators.pattern(this.StringPattern)],
    cargo_publico: [, Validators.pattern(this.StringPattern)],
    email: [, [Validators.required, Validators.pattern(this.emailPattern)]],
    rfc: [, [Validators.required]],
    rfc_homoclave: [, [Validators.minLength(3)]],
    curp: [],
    ente_publico: [, [Validators.required]],
    role: [null, [Validators.required]],
  }, {
    validators: [this.rfcValido, this.curpValido]
  }
  );
  constructor(
    private fb: UntypedFormBuilder,
    private usrServ: UsuarioService,
    private enteService: EnteService
  ) {
    this.getRol = usrServ.usuario.getRol;
    this.getNombres = usrServ.usuario.getNombres;
  }

  ngOnInit(): void {

    this.getUsers();
    ////(this.entesList)

  }
  ngOnDestroy(): void {
    //this.getentes.unsubscribe();
    this.getuser.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['entesList'] && changes['entesList'].currentValue) {
      // Filtra los entes que NO tienen estatus igual a "1"
      this.arrayProyecto = this.entesList.filter((ente: any) => {
        const isActive = ente.estatus === "1"; // Mantiene entes con estatus diferente a "1"
        ////('Estatus:', ente.estatus, 'Activo:', isActive); // Debug
        return isActive; // Solo incluye entes con estatus diferente a "1"
      });

      this.filteredEntes = this.registerForm.get('ente_publico')!.valueChanges.pipe(
        startWith(''),
        map(value => {

          const filterValue = typeof value === 'string' ? value : value.ente;
          return this._filter(filterValue);
        })
      );
    }
  }






  // Crud de usuario
  crearUsuario() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    let form: any = this.registerForm.value;
    ////(form);
    this.usrServ.crearUsuario(form).subscribe(
      (resp: any) => {
        if (resp.ok) {
          this.formReset(this.registerForm);
          this.registerForm.controls['nombres'].setErrors(null);
          this.registerForm.controls['primer_apellido'].setErrors(null);
          this.registerForm.controls['email'].setErrors(null);
          this.registerForm.controls['ente_publico'].setErrors(null);
          this.registerForm.controls['curp'].setErrors(null);
          this.registerForm.controls['rfc'].setErrors(null);
          this.getUsers();
          Swal.fire({
            icon: 'success',
            title: "<h5 style='color:#125DA9; font-size: 20px !important;'> USUARIO AGREGADO </h5>",
            text: "SE HA AGREGADO EL USUARIO CON ÉXITO ",
            confirmButtonText: "ACEPTAR",
            confirmButtonColor: '#125DA9',
            showConfirmButton: true,
            //timer: 1500
          })
        } else {

          Swal.fire({

            icon: 'error',
            title: "<h5 style='color:#125DA9; font-size: 20px !important;'> NO SE PUDO AGREGAR EL USUARIO </h5>",
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
  getUsers() {
    this.loading = true;
    this.getuser = this.usrServ.cargarUsuarios().subscribe(({ total, usuarios }) => {
      this.totalUsuarios = total;
      if (usuarios.length !== 0) {
        this.usuario = usuarios;
      }
      this.loading = false;
    });
  }

  editUser(id: string) {
    this.botonUpdate = true;
    this.botonRegister = false;
    this.usrServ.getUser(id).subscribe((resp: any) => {
      const {
        uid,
        id_ente_publico,
        nombres,
        primer_apellido,
        segundo_apellido,
        email,
        rfc,
        rfc_homoclave,
        curp,
        ente_publico,
        role,
        userName,
        cargo_publico,
      } = resp.user;

      this.userSelect = resp.user;

      // Verificar si `arrayProyecto` tiene datos y buscar el `ente_publico` correspondiente
      if (this.arrayProyecto.length > 0) {
        const selectedEntePublico = this.arrayProyecto.find((ente: any) => ente.ente_id === id_ente_publico._id);

        this.registerForm.patchValue({
          uid,
          nombres,
          primer_apellido,
          segundo_apellido,
          email,
          rfc,
          rfc_homoclave,
          ente_publico: selectedEntePublico, // Valor completo del objeto
          role,
          curp,
          userName,
          cargo_publico,
          ente_id: id_ente_publico._id,
        });
      } else {
        console.error('arrayProyecto está vacío o no definido');
      }
    });
  }
  updateUser() {
    let form: RegisterFOrm = this.registerForm.value;
    this.usrServ.updateUser(form).subscribe(
      (r) => {
        this.getUsers();
        this.cancelar();
        Swal.fire({
          icon: 'success',
          title: "<h5 style='color:#125DA9; font-size: 20px !important;'> USUARIO ACTUALIZADO </h5>",
          text: "LA ACTUALIZACIÓN DEL USUARIO HA SIDO CONCLUIDA CON ÉXITO",
          confirmButtonText: "ACEPTAR",
          confirmButtonColor: '#125DA9',
          showConfirmButton: true,
          //timer: 1500
        })
      },
      (err) => {
        Swal.fire({

          icon: 'error',
          title: "<h5 style='color:#125DA9; font-size: 20px !important;'> NO SE PUDO ACTUALIZAR EL USUARIO</h5>",
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
  deleteUsuario(uid: string) {
    Swal.fire({
      icon: 'warning',
      title: "<h5 style='color:#125DA9; font-size: 20px !important;'> ELIMINACIÓN USUARIO  </h5>",
      text: "¿REALMENTE ESTÁ SEGURO DE ELIMINAR A ESTE USUARIO?",
      confirmButtonText: "ACEPTAR",
      confirmButtonColor: '#125DA9',
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor: "#d33",
      //timer: 1500
    }).then((result) => {
      if (result.isConfirmed) {
        this.usrServ.deleteUsuario(uid).subscribe(
          (r) => {
            this.getUsers();
            this.cancelar();
            Swal.fire({
              icon: 'success',
              title: "<h5 style='color:#125DA9; font-size: 20px !important;'> USUARIO ELIMINADO </h5>",
              text: "LA ELIMINACIÓN DEL USUARIO HA SIDO CONCLUIDA CON ÉXITO",
              confirmButtonText: "ACEPTAR",
              confirmButtonColor: '#125DA9',
              showConfirmButton: true,
              //timer: 1500
            })
          },
          (err) => {

            Swal.fire({

              icon: 'error',
              title: "<h5 style='color:#125DA9; font-size: 20px !important;'> NO SE PUDO ELIMINAR EL USUARIO </h5>",
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
  // Metodos adicionales
  displayFn(ente: any): string {
    return ente && ente.ente ? ente.ente : '';
  }

  onOptionSelected(ente: any) {
    this.registerForm.patchValue({
      ente_id: ente.ente_id
    });
  }
  private _filter(value: string): EntesForm[] {
    const filterValue = value.toLowerCase();
    return this.arrayProyecto.filter(option => option.ente.toLowerCase().includes(filterValue));
  }

  campoNoValido(campo: string) {

    return (
      this.registerForm.controls[campo].errors &&
      this.registerForm.controls[campo].touched
    );
  }
  resetPass(id: string) {

    //("seleccionado a resetPass:" + id);
    Swal.fire({
      icon: 'warning',
      title: "<h5 style='color:#125DA9; font-size: 20px !important;'> ELIMINACIÓN USUARIO  </h5>",
      text: "¿DESEA RESETEAR EL PASSWORD DE ESTE USUARIO?",
      confirmButtonText: "ACEPTAR",
      confirmButtonColor: '#125DA9',
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor: "#d33",
      //timer: 1500
    }).then((result) => {
      if (result.isConfirmed) {
        this.usrServ.resetPassword(id).subscribe((res: any) => {
          if (res.ok) {
            this.getUsers();
            this.cancelar();
            Swal.fire({
              icon: 'success',
              title: "<h5 style='color:#125DA9; font-size: 20px !important;'> RESET DE CONTRASEÑA </h5>",
              text: 'LA CONTRASEÑA NUEVAMENTE ES "pass1234"',
              confirmButtonText: "ACEPTAR",
              confirmButtonColor: '#125DA9',
              showConfirmButton: true,
              //timer: 1500
            })
          }
        },
          (err) => {

            Swal.fire({

              icon: 'error',
              title: "<h5 style='color:#125DA9; font-size: 20px !important;'> NO SE PUDO RESETEAR EL PASSWORD </h5>",
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
  NextPage() {
    this.goToPage(this.pages + this.pagesNumber);
  }
  PrevPage() {
    if (this.pages > 0) {
      this.goToPage(this.pages - this.pagesNumber);
    }
  }
  goToPage(page: number) {
    this.pages = page;
  }
  SearchUsuario(search: string) {
    this.pages = 0;
    this.search = search.toLowerCase();
  }
  SearchEnte(searchEnte: string) {
    this.pagesEnte = 0;
    this.searchE = searchEnte.toLowerCase();
  }
  cancelar() {
    this.botonUpdate = false;
    this.botonRegister = true;
    this.registerForm.reset();
  }
  private formReset(form: FormGroup) {
    Object.keys(form.controls).forEach((key) => {
      form.get(key).setErrors(null);
    });
    form.reset();
  }
  rfcValido(form: FormGroup) {
    let rfc = form.controls['rfc'].value;

    if (rfc != null) {
      rfc = rfc.toUpperCase();
      var re = /^([A-ZÑ&]{4})(\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01]))$/,
        validado = rfc.match(re);

      if (!validado) { // Coincide con el formato general?
        form.controls['rfc'].setErrors({ 'incorrect': true });
        return false;
      }

      // Separar el RFC en partes
      var rfcSinDigito = validado.slice(1).join('');

      // Obtener el dígito esperado
      var diccionario = "0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ Ñ",
        lngSuma = 0.0,
        digitoEsperado;

      // Ajustar a 12 caracteres para el cálculo del dígito verificador
      if (rfcSinDigito.length == 11) rfcSinDigito = " " + rfcSinDigito;

      for (var i = 0; i < 12; i++) {
        lngSuma = lngSuma + diccionario.indexOf(rfcSinDigito.charAt(i)) * (13 - i);
      }

      digitoEsperado = 11 - lngSuma % 11;
      if (digitoEsperado == 11) digitoEsperado = 0;
      if (digitoEsperado == 10) digitoEsperado = "A";

      // Aquí, en lugar de comparar, sólo mostramos el dígito esperado (puedes adaptar esto según tus necesidades)
      //("Dígito verificador esperado: " + digitoEsperado);

      // No podemos validar completamente el RFC sin el dígito verificador, pero el formato básico es correcto
      return true;
    }
    return true;
  }
  curpValido(form: FormGroup) {
    let curp = form.controls['curp'].value;

    if (curp != null) {
      curp = curp.toUpperCase();
      var re = /^[A-Z]{4}\d{6}[HM](AS|BC|BS|CC|CS|CH|CL|CM|CO|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d]{2}$/;
      let validado = curp.match(re);

      if (!validado) { // Coincide con el formato general?
        form.controls['curp'].setErrors({ 'incorrect': true });
        return false;
      }

      // Validar fecha de nacimiento
      var fechaNacimiento = curp.substr(4, 6);
      var anio = parseInt(fechaNacimiento.substr(0, 2), 10);
      var mes = parseInt(fechaNacimiento.substr(2, 2), 10) - 1;
      var dia = parseInt(fechaNacimiento.substr(4, 2), 10);

      var fecha = new Date(anio < 30 ? 2000 + anio : 1900 + anio, mes, dia);

      if (fecha.getFullYear() !== (anio < 30 ? 2000 + anio : 1900 + anio) ||
        fecha.getMonth() !== mes ||
        fecha.getDate() !== dia) {
        form.controls['curp'].setErrors({ 'incorrect': true });
        return false;
      }

      // Validar sexo
      var sexo = curp.charAt(10);
      if (sexo !== 'H' && sexo !== 'M') {
        form.controls['curp'].setErrors({ 'incorrect': true });
        return false;
      }

      // Validar estado
      var estado = curp.substr(11, 2);
      var estadosValidos = ['AS', 'BC', 'BS', 'CC', 'CS', 'CH', 'CL', 'CM', 'CO', 'DF', 'DG', 'GT', 'GR', 'HG', 'JC', 'MC', 'MN', 'MS', 'NT', 'NL', 'OC', 'PL', 'QT', 'QR', 'SP', 'SL', 'SR', 'TC', 'TS', 'TL', 'VZ', 'YN', 'ZS', 'NE'];
      if (estadosValidos.indexOf(estado) === -1) {
        form.controls['curp'].setErrors({ 'incorrect': true });
        return false;
      }

      return true;
    }
    return true;
  }







}
