import { EntesForm } from './../../../../interfaces/entes.inteface';
import { EnteForm } from './../../../../interfaces/entesN.interfaces';
import { Municipios } from './../../../../interfaces/municipios.inteface';
import { Estados } from './../../../../interfaces/estados.inteface';
import { Ente } from 'src/app/models/Entes/entes.model';
import { UsuarioService } from '../../../../services/auth/usuario.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

//import { Ente } from 'src/app/interfaces/entes.inteface';
import { Observable } from 'rxjs';

interface Roles {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-register',
  templateUrl: './registerente.component.html',
  styleUrls: ['./registerente.component.scss'],
})
export class RegisterEnteComponent implements OnInit, OnDestroy {
  roles: Roles[] = [
    { value: 'seseaadmin', viewValue: 'Administrador SEASLP(seseaadmin)' },
    {
      value: 'adminstrador_ente',
      viewValue: 'Administrador De Ente(adminstrador_ente)',
    },
    { value: 'oic', viewValue: 'OIC (Órgano interno de control)' },
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
  public formSubmitted = false;
  public botonUpdate = false;
  public botonRegister = true;
  public botonEnte = true;

  public arrayProyecto: EntesForm[] = [];
  public arrayEstado: Estados[] = [];
  public arrayMunicipio: Municipios[] = [];
  public search: string = '';
  public searchEstado: string = '';


  public totalEntes: number = 0;
  public ente: Ente[] = [];

  public pages: number = 0;
  public paginacion = false;
  public pagesNumber = 20;
  public loading: boolean = true;
  public loading2: boolean = true;
  public getRol = '';
  public getNombres = '';
  public getentes: any;



  

  public enteForm = this.fb.group({
   
    ente:  [, [Validators.required, Validators.minLength(5)]],
    siglas: [, [Validators.required, Validators.minLength(3)]],
    estado:  [, Validators.required],
    municipio: [, Validators.required],
  });

  constructor(private fb: UntypedFormBuilder, private usrServ: UsuarioService) {
    this.getRol = usrServ.usuario.getRol;
    this.getNombres = usrServ.usuario.getNombres;
  }

  ngOnInit(): void {
   //('Entre');
    this.getEntes();
    //this.getUsers();
  }
  ngOnDestroy(): void {
    this.getentes.unsubscribe();
    
  }

  

  getEntes() {
    //('Entre getEntes');
    this.loading2 = true;
    this.getentes = this.usrServ.cargarEntes().subscribe(({ total, entes }) => {
        this.totalEntes = total;
        if (entes.length !== 0) {
          this.ente = entes;
        }
        this.loading2 = false;
      });
  }
 

  crearEnte() {
    if (this.enteForm.invalid) {
      this.enteForm.markAllAsTouched();
      return;
    }
    let form: any = this.enteForm.value;
   // //("CrearEnte register"+form);
    this.usrServ.crearEnte2(form).subscribe(
      (resp:any) => {
        
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
            title: 'LA INFORMACIÓN SE HA ACTUALIZADO CON ÉXITO',
            showConfirmButton: false,
            timer: 1500
          })
        
        }else
        {

          //('ENTRE FAIL');
          Swal.fire({
            icon: 'error',
            title: resp.msg,
            showConfirmButton: false,
            timer: 1500
          })
        
        }
      },
      (err) => //(err)
    );
  }




  campoNoValido(campo: string) {
    return (
      this.enteForm.controls[campo].errors &&
      this.enteForm.controls[campo].touched
    );
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

 
 
  
  cancelar() {
    this.botonUpdate = false;
    this.botonRegister = true;
   // this.registerForm.reset();
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

onChangeEstado() {
  //("entre:"+this.enteForm.value.estado);
  this.usrServ
   .listaMunicipiosdeEstado(this.enteForm.value.estado)
   .subscribe((resp: any) => {
      this.arrayMunicipio = resp.data;
      ////(this.arrayMunicipio);
    });
}

 getMunicipios() {
   this.usrServ
     .listaMunicipios(this.enteForm.value.municipio)
     .subscribe((resp: any) => {
       this.arrayMunicipio= resp.data;
       //(this.arrayMunicipio);
     });
 } 
}


