/* // import { Rfc } from 'rfc-facil';
import { EntesForm } from './../../../../interfaces/entes.inteface';

import { Municipios } from './../../../../interfaces/municipios.inteface';
import { Paises } from './../../../../interfaces/paises.inteface';
import { Estados } from './../../../../interfaces/estados.inteface';
import { CodigoPostal } from './../../../../interfaces/codigopostal.inteface';
import { Usuario } from 'src/app/models/Usuarios/usuario.model';
import { Ente } from 'src/app/models/Entes/entes.model';
import { ServidoresEnte } from 'src/app/models/Entes/servidores.model';
import { UsuarioService } from '../../../../services/auth/usuario.service';
import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
//import { RegisterEnteComponent } from '../../../../../components/pages/funcionarios/entes/registerente.component';

//import { Ente } from 'src/app/interfaces/entes.inteface';
import { Observable } from 'rxjs';


 

interface Idiomas {
  value: string;
  viewValue: string;
}
interface Areas {
  value: string;
  viewValue: string;
}
 @Component({
   selector: 'app-contratos-index',
   templateUrl: './contratos-index.component.html',
   styleUrls: ['./contratos-index.component.scss']
 })
 export class ContratosIndexComponent implements OnInit {


  idiomas: Idiomas[] = [
    { value: 'EN', viewValue: 'ESPAÑOL' },
    { value: 'US',viewValue: 'INGLÉS',},
    { value: 'UK', viewValue: 'INGLES BRITÁNICO' },
  ];
  areas: Areas[] = [
    { value: 'ÁREA REQUIRIENTE', viewValue: 'ÁREA REQUIRIENTE' },
    { value: 'ÁREA CONTRATANTE',viewValue: 'ÁREA CONTRATANTE',},
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
  public botonGuardarServidor = true;
  public botonVerServidor = true;
  public botonUpdateEnte = false;
  public botonEnte = true;
  public arrayCodigoPostal: CodigoPostal[] = [];

  public arrayPais: Paises[] = [];
  public arrayPaisProveedor: Paises[] = [];
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

public enteForm = this.fb.group({
    
    uid: [],
    nombre_comercial:  [, [Validators.required, Validators.minLength(5)]],
    rfc: [, [Validators.required]],
    lugar: [, ],
    nombre_legal:  [, Validators.required],
    pais: [, [Validators.required]],
    codigoPostal: [, [Validators.required]],
    colonia: [, [Validators.required]],
    localidad: [, [Validators.required]],
    region: [, [Validators.required]],
    calle: [, [Validators.required]],
    numero: [, [Validators.required]],

    nombres_contacto:[, [Validators.required, Validators.minLength(4)]],
    primer_apellido_contacto: [, [Validators.required, Validators.minLength(4)]],
    segundo_apellido_contacto: [, Validators.pattern(this.StringPattern)],
    email_contacto: [, [Validators.required, Validators.pattern(this.emailPattern)]],
    telefono_contacto:[, [Validators.required]],
    telefonofax_contacto:[, []],
    url_ente_contacto: [, [Validators.required]],
    idioma: [null, [Validators.required]],
    
  },
  {
      validators:[this.rfcValido]
    }
    );
public servidoresEnteForm = this.fb.group({
    
      //servidores
       uid: [],
       id_usuario: [],
       nombres_servidor:[, [Validators.required, Validators.minLength(4)]],
       primer_apellido_servidor: [, [Validators.required, Validators.minLength(4)]],
       segundo_apellido_servidor: [, Validators.pattern(this.StringPattern)],
       rfc_servidor: [, [Validators.required]],
       cargo_servidor: [, [Validators.required]],
       email_servidor: [, [Validators.required, Validators.pattern(this.emailPattern)]],
       telefono_servidor:[],
       telefonofax_servidor:[],
       area: [, [Validators.required]],
  },{validators:[this.rfcValidoServidor] }  );

public proveedoresForm = this.fb.group({
    
         uid: [],
         id_usuario: [],
         tipo: [, ],
         razonsocialProv:  [, [Validators.required, Validators.minLength(5)]],
         rfcproveedor: [, [Validators.required]],
         uri_proveedor:  [, Validators.required],
         nombres_rep_legal: [, [Validators.required, Validators.minLength(4)]],
         primer_apellido_rep_legal: [, [Validators.required, Validators.minLength(4)]],
         segundo_apellido_rep_legal: [, Validators.pattern(this.StringPattern)],
         curp_rep_legal: [, [Validators.required]],
         lugar_proveedor: [, ],
         pais_proveedor:  [, Validators.required],
        codigoPostal_proveedor:  [, Validators.required],
         colonia_proveedor:  [, Validators.required],
         localidad_proveedor: [, [Validators.required]],
         region_proveedor: [, [Validators.required]],
         calle_proveedor: [, [Validators.required]],
        numero_proveedor: [, [Validators.required]],

        nombres_contacto_prov:[, [Validators.required, Validators.minLength(4)]],
        primer_apellido_contacto_prov: [, [Validators.required, Validators.minLength(4)]],
        segundo_apellido_contacto_prov: [, Validators.pattern(this.StringPattern)],
        email_contacto_prov: [, [Validators.required, Validators.pattern(this.emailPattern)]],
        telefono_contacto_prov:[, [Validators.required]],
        telefonofax_contacto_prov:[, []],
        url_ente_contacto_prov: [, [Validators.required]],
        idioma_prov: [null, [Validators.required]],
      },
      {
         // validators:[this.curpValida]
        }
        );
      
  constructor(private fb: UntypedFormBuilder, private usrServ: UsuarioService) {
    this.getRol = usrServ.usuario.getRol;
    this.getNombres = usrServ.usuario.getNombres;
    this.getIdUsuario= usrServ.usuario.getUid;
    this.getidentepublico= usrServ.usuario.getid_ente_publico.ente_id;
  }
  curpValida(form: FormGroup) {
    if(form.controls['curp_rep_legal'].value!=null)
     {
     let re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0\d|1[0-2])(?:[0-2]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
      validado = form.controls['curp_rep_legal'].value.match(re);
  
      if (!validado)  //Coincide con el formato general?
      {
        form.controls['curp_rep_legal'].setErrors({'incorrect': true});
        return false;
  
      }
        
   
      if (validado[2] != this.digitoVerificador(validado[1])) 
      {
        form.controls['curp_rep_legal'].setErrors({'incorrect': true});
        return false;
      }
  }
      
        
  return true; //Validado
  }
  digitoVerificador(curp17: string) {
     
    var diccionario  = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ",
        lngSuma      = 0.0,
        lngDigito    = 0.0;
    for(var i=0; i<17; i++)
        lngSuma= lngSuma + diccionario.indexOf(curp17.charAt(i)) * (18 - i);
    lngDigito = 10 - lngSuma % 10;
    if(lngDigito == 10)
        return 0;
    return lngDigito;
  }
  getServEntes() {
    this.loading = true;
    // this.getservente = this.usrServ.cargarServEntes().subscribe(({ total_ser, servidores }) => {
    //   this.totalServEntres = total_ser;
    //   if (servidores.length !== 0) {
    //     this.Serventes = servidores;
    //   }
    //   this.loading = false;
    // });
  }
  rfcValido(form: FormGroup) {
    let rfc = form.controls['rfc'].value;
    
    if(rfc!=null)
    {
      rfc=rfc.toUpperCase();
    var re = /^([ A-ZÑ&]?[A-ZÑ&]{3}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/,
        validado = rfc.match(re);
  
    if (!validado)  //Coincide con el formato general?
    { 
     
      form.controls['rfc'].setErrors({'incorrect': true});
      return false;
    }
     
    
    //Separar el dígito verificador del resto del RFC
    var digitoVerificador = validado.pop(),
        rfcSinDigito = validado.slice(1).join('')
        
    //Obtener el digito esperado
    var diccionario  = "0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ Ñ",
        lngSuma      = 0.0,
        digitoEsperado;
  
    if (rfcSinDigito.length == 11) rfc = " " + rfc; //Ajustar a 12
    for(var i=0; i<13; i++)
        lngSuma = lngSuma + diccionario.indexOf(rfcSinDigito.charAt(i)) * (13 - i);
    digitoEsperado = 11 - lngSuma % 11;
    if (digitoEsperado == 11) digitoEsperado = 0;
    if (digitoEsperado == 10) digitoEsperado = "A";
    digitoVerificador == digitoEsperado;
    if (digitoVerificador) { // ⬅️ Acá se comprueba
    
     
      return true;
    } else {
    
      form.controls['rfc'].setErrors({'incorrect': true});
      return false;
    }
  
    }
    return true;
  }
  rfcValidoServidor(form: FormGroup) {
    let rfc = form.controls['rfc_servidor'].value;
    
    if(rfc!=null)
    {
      rfc=rfc.toUpperCase();
    var re = /^([ A-ZÑ&]?[A-ZÑ&]{3}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/,
        validado = rfc.match(re);
  
    if (!validado)  //Coincide con el formato general?
    { 
     
      form.controls['rfc_servidor'].setErrors({'incorrect': true});
      return false;
    }
     
    
    //Separar el dígito verificador del resto del RFC
    var digitoVerificador = validado.pop(),
        rfcSinDigito = validado.slice(1).join('')
        
    //Obtener el digito esperado
    var diccionario  = "0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ Ñ",
        lngSuma      = 0.0,
        digitoEsperado;
  
    if (rfcSinDigito.length == 11) rfc = " " + rfc; //Ajustar a 12
    for(var i=0; i<13; i++)
        lngSuma = lngSuma + diccionario.indexOf(rfcSinDigito.charAt(i)) * (13 - i);
    digitoEsperado = 11 - lngSuma % 11;
    if (digitoEsperado == 11) digitoEsperado = 0;
    if (digitoEsperado == 10) digitoEsperado = "A";
    digitoVerificador == digitoEsperado;
    if (digitoVerificador) { // ⬅️ Acá se comprueba
    
     
      return true;
    } else {
    
      form.controls['rfc_servidor'].setErrors({'incorrect': true});
      return false;
    }
  
    }
    return true;
  }
  ngOnInit(): void {
    //BUSCAR EL ENTE PUBLICO DEL USUARIO 
    this.getEnte();
    this.getServEntes();
   
  }
  ngOnDestroy(): void {
  
   
  }
  crearServidorEnte() {
    //("crearServidorEnte component contrats");
    if (this.servidoresEnteForm.invalid) {
      this.servidoresEnteForm.markAllAsTouched();
      return;
    }
    let form: any = this.servidoresEnteForm.value;

    this.usrServ.crearRegistroServidorEnte(form).subscribe(
      (resp:any) => {
        
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
          //this.getEnte();
        
        
          Swal.fire({
            icon: 'success',
            title: "<h5 style='color:#125DA9; font-size: 20px !important;'> SERVIDOR DEL ENTE PÚBLICO AGREGADO </h5>",
            text:"SE HA AGREGADO EL SERVIDOR DEL ENTE PÚBLICO CON ÉXITO ",
            confirmButtonText: "ACEPTAR",
            confirmButtonColor: '#125DA9',
            showConfirmButton: true,
            //timer: 1500
          })
        
        }else
        {

          Swal.fire({
           
            icon: 'error',
            title: "<h5 style='color:#125DA9; font-size: 20px !important;'> NO SE PUDO AGREGAR EL SERVIDOR DEL ENTE PÚBLICO </h5>",
            text:resp.msg,
            confirmButtonText: "ACEPTAR",
            confirmButtonColor: '#125DA9',
            showConfirmButton: true,
            //timer: 1500
          })
        
        }
      },
      (err) => //(err)
    );
  }
  
  creaProveedores() {
    //("creaProveedores ");
    if (this.proveedoresForm.invalid) {
      this.proveedoresForm.markAllAsTouched();
      return;
    }
    let form: any = this.proveedoresForm.value;

    this.usrServ.crearRegistroProveedor(form).subscribe(
      (resp:any) => {
        
        if (resp.ok) {
            //('ENTRE SUCCESS');
          this.formReset(this.proveedoresForm);
          this.proveedoresForm.controls['tipo'].setErrors(null);
          this.proveedoresForm.controls['razonsocialProv'].setErrors(null);
          this.proveedoresForm.controls['rfcproveedor'].setErrors(null);
          this.proveedoresForm.controls['uri_proveedor'].setErrors(null);
          this.proveedoresForm.controls['nombres_rep_legal'].setErrors(null);
          this.proveedoresForm.controls['primer_apellido_rep_legal'].setErrors(null);
          this.proveedoresForm.controls['curp_rep_legal'].setErrors(null);
          
          this.proveedoresForm.controls['tipo'].setErrors(null);
          this.proveedoresForm.controls['pais_proveedor'].setErrors(null);
          this.proveedoresForm.controls['codigoPostal_proveedor'].setErrors(null);
          this.proveedoresForm.controls['colonia_proveedor'].setErrors(null);
          this.proveedoresForm.controls['localidad_proveedor'].setErrors(null);
          this.proveedoresForm.controls['calle_proveedor'].setErrors(null);
          this.proveedoresForm.controls['numero_proveedor'].setErrors(null);
          
          this.proveedoresForm.controls['nombres_contacto_prov'].setErrors(null);
          this.proveedoresForm.controls['primer_apellido_contacto_prov'].setErrors(null);
          this.proveedoresForm.controls['segundo_apellido_contacto_prov'].setErrors(null);
          this.proveedoresForm.controls['email_contacto_prov'].setErrors(null);
          this.proveedoresForm.controls['telefono_contacto_prov'].setErrors(null);
          this.proveedoresForm.controls['url_ente_contacto_prov'].setErrors(null);
          this.proveedoresForm.controls['idioma_prov'].setErrors(null);
           //this.getEnte();
        
        
          Swal.fire({
            icon: 'success',
            title: "<h5 style='color:#125DA9; font-size: 20px !important;'> PROVEEDOR DEL ENTE PÚBLICO AGREGADO </h5>",
            text:"SE HA AGREGADO EL PROVEEDOR DEL ENTE PÚBLICO CON ÉXITO ",
            confirmButtonText: "ACEPTAR",
            confirmButtonColor: '#125DA9',
            showConfirmButton: true,
            //timer: 1500
          })
        
        }else
        {

          Swal.fire({
           
            icon: 'error',
            title: "<h5 style='color:#125DA9; font-size: 20px !important;'> NO SE PUDO AGREGAR EL PROVEEDOR DEL ENTE PÚBLICO </h5>",
            text:resp.msg,
            confirmButtonText: "ACEPTAR",
            confirmButtonColor: '#125DA9',
            showConfirmButton: true,
            //timer: 1500
          })
        
        }
      },
      (err) => //(err)
    );
  }
  getEnte() {
    //('Entre getEnte: ');
    this.loading = false;
    this.enteForm.patchValue({
      uid : this.getidentepublico,
    });
    //inicializa servidores
    this.servidoresEnteForm.patchValue({
      uid : this.getidentepublico,
      id_usuario : this.getIdUsuario,
    });
    this.proveedoresForm.patchValue({
      uid : this.getidentepublico,
      id_usuario : this.getIdUsuario,
    });
    //obtener ente guardado
    this.usrServ.getEnte(this.getidentepublico).subscribe((resp: any) => {
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
      .listaEstados(this.enteForm.value.estado)
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
  getPaisProveedor() {
    this.usrServ
      .listaPaises(this.proveedoresForm.value.pais_proveedor)
      .subscribe((resp: any) => {
        this.arrayPaisProveedor = resp.data;
      });
  }
  getCodigoPostal() {
    this.usrServ
      .listaCodigoPostal(this.enteForm.value.codigoPostal)
      .subscribe((resp: any) => {
        this.arrayCodigoPostal = resp.data;
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
         ////(this.arrayMunicipio);
       });
   } 
  actInformacionEnte() {
   
    //("Actualizar Ente component register" +this.getidentepublico);
    if (this.enteForm.invalid) {
      this.enteForm.markAllAsTouched();
      return;
    }
    let form: any = this.enteForm.value;
    
    this.usrServ.actEnte(form).subscribe(
      (resp:any) => {
        
        if (resp.ok) {
           // //('ENTRE SUCCESS');
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
            text:"SE HA ACTUALIZADO EL ENTE PÚBLICO CON ÉXITO ",
            confirmButtonText: "ACEPTAR",
            confirmButtonColor: '#125DA9',
            showConfirmButton: true,
            //timer: 1500
          })
        
        }else
        {

          Swal.fire({
           
            icon: 'error',
            title: "<h5 style='color:#125DA9; font-size: 20px !important;'> NO SE PUDO ACTUALIZAR EL ENTE PÚBLICO </h5>",
            text:resp.msg,
            confirmButtonText: "ACEPTAR",
            confirmButtonColor: '#125DA9',
            showConfirmButton: true,
            //timer: 1500
          })
        
        }
      },
      (err) => //(err)
    );
  }
 
  deleteServEnte(uid: string) {
    //("seleccionado a eliminar:"+uid);
    Swal.fire({
      icon: 'warning',
      title: "<h5 style='color:#125DA9; font-size: 20px !important;'> ELIMINACIÓN ENTE PÚBLICO  </h5>",
      text:"¿REALMENTE ESTÁ SEGURO DE ELIMINAR A ESTE ENTE PÚBLICO?",
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
        //this.getEntes();
        //this.cancelarEnte();
        Swal.fire({
          icon: 'success',
          title: "<h5 style='color:#125DA9; font-size: 20px !important;'> ENTE PÚBLICO ELIMINADO </h5>",
          text:"LA ELIMINACIÓN DEL ENTE PÚBLICO HA SIDO CONCLUIDA CON ÉXITO",
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
  updateServEnteBtabla(id: string) {
    // //("Boton update grid");
     this.botonUpdateEnte = true;
     this.botonEnte = false;
 
     this.usrServ.getEnte(id).subscribe((resp: any) => {
       const {
         uid,
         ente,
         siglas,
         estado,
         municipio,
       } = resp.entes;
   
       this.enteSelect = resp.entes;
     
       this.enteForm.patchValue({
         uid,
         ente,
         siglas,
         estado,
         municipio,
       });
       //("getEnte: patchValue");
     });
   }


} */




import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/auth/usuario.service';
import { PlaningService } from 'src/app/services/pages/planing.service';
import Swal from 'sweetalert2'
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contratos-index',
  templateUrl: './contratos-index.component.html',
  styleUrls: ['./contratos-index.component.scss']
})
export class ContratosIndexComponent implements OnInit {
  public user_id: string;
  public ocid: string;
  public search: string;
  public pages: number = 0;
  public contratos: any[] = [];
  public loading: boolean = true;
  public mensaje: string;
  public btnActive: boolean = false;
  public boton: boolean = false;
  public getRol: any
  public getNombres: any

  public Rplanning: string = "/sea/funcionarios/contrataciones/planeacion/inicio"
  public Rtender: string = "/sea/funcionarios/contrataciones/licitacion/inicio"
  public RAward: string = "/sea/funcionarios/contrataciones/adjudicacion/inicio"
  public RContract: string = "/sea/funcionarios/contrataciones/contrato/inicio"
  public Rejec: string = "/sea/funcionarios/contrataciones/sellado/"

  constructor(private plainSrv: PlaningService,
    private userSrv: UsuarioService,
    private router: Router) {
    this.user_id = userSrv.authID;
    this.getRol = userSrv.usuario.getRol;
    this.getNombres = userSrv.usuario.getNombres
    localStorage.removeItem('buyer_id');
    localStorage.removeItem('planning_id');
  }

  ngOnInit(): void {
    this.getContracts()

  }
  getContracts() {
    this.loading = true;
    if (this.getRol === 'seseaadmin') {
      this.plainSrv.GetContratoAll().subscribe((resp: any) => {
        if (resp.length !== 0) {
          this.contratos = resp
          this.loading = false;

        } else {
          this.loading = false
          this.mensaje = "No se han creado contratos"
        }
      })
    } else {
      this.plainSrv.GetContrato().subscribe(resp => {
        ////(resp);
        if (resp.length !== 0) {
          this.contratos = resp
          this.loading = false;

        } else {
          this.loading = false
          this.mensaje = "No se han creado contratos"
        }
      })
    }

  }


  crearContrato() {
    this.modal()
  }

  guardarOCID(ocid: string) {
    localStorage.setItem("ocid", ocid)
  }

  modal() {
    Swal.fire({
      title: 'Esta Acción creara un nuevo contrato',
      text: "Se creara un OCID y despues el sistema lo enviará a iniciar la captura del contrato",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.plainSrv.CrearContrato().subscribe(resp => {
          this.getContracts()
          this.btnActive = true
          let ocid = this.plainSrv.ocidCid
          localStorage.setItem("ocid", ocid)
          this.getContracts();
        })
        Swal.fire(
          '',
          'Su Nuevo Contrato ha sido creado',
          'success'
        )
      }
    })
  }


  nextPages() {
    this.pages += 5
  }
  PrevPages() {
    if (this.pages > 0) {
      this.pages -= 5
    }
  }

  onSearchContract(search: string) {
    this.pages = 0
    this.search = search.toLowerCase()

    ////(this.search);
  }

}
