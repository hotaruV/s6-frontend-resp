import { Component } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, filter, map, Subject, switchMap } from 'rxjs';
import { EntesForm } from 'src/app/interfaces/entes.inteface';
import { Estados } from 'src/app/interfaces/estados.inteface';
import { Municipios } from 'src/app/interfaces/municipios.inteface';
import { Paises } from 'src/app/interfaces/paises.inteface';
import { CodigosPostales } from 'src/app/models/Entes/codigos.model';
import { UsuarioService } from 'src/app/services/auth/usuario.service';
import { PlaningService } from 'src/app/services/pages/planing.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-colonias',
  templateUrl: './colonias.component.html',
  styleUrls: ['./colonias.component.scss']
})
export class ColoniasComponent {
  public getidentepublico = '';
  private debouncer = new Subject<string>()
  public _codigosEnte: CodigosPostales[] = [];
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
  constructor(
    private fb: UntypedFormBuilder,
    private usrServ: UsuarioService,
    private readonly _modelService: MatDialog,
    private planingService: PlaningService,

  ) {
    this.getidentepublico = usrServ.usuario.getid_ente_publico.ente_id;
  }

  public coloniasForm = this.fb.group({

    uid: [],
    lugar: ['MÉXICO'],
    pais: [{ value: 'MÉXICO', disabled: true }, [Validators.required]],
    codigoPostal: ['', [Validators.required]],
    colonia: ['', [Validators.required]],
    localidad: ['', [Validators.required]],
    region: ['', [Validators.required]],
    calle: ['', [Validators.required]],
    numero: ['', [Validators.required]],

  });

  ngOnInit(): void {
    this.getPaisAll();
    this.setupDebouncer();
    this.setPaisLugarEnte();
  }

  getPaisAll() {
    this.usrServ
      .listaPaisesProvedores()
      .subscribe((resp: any) => {
        this.arrayPaisProveedor = resp.data;
        this.arrayPais = resp.data;
      });
  }
  getEstados() {
    this.usrServ
      .listaEstados(this.coloniasForm.value.localidad)
      .subscribe((resp: any) => {
        this.arrayEstado = resp.data;
      });
  }
  onChangeEstado() {

    this.usrServ
      .listaMunicipiosdeEstado(this.coloniasForm.value.localidad)
      .subscribe((resp: any) => {
        this.arrayMunicipio = resp.data;
        ////(this.arrayMunicipio);
      });
  }


  private setPaisLugarEnte() {
    this.coloniasForm.get('lugar')?.valueChanges.subscribe(value => {
      const paisControl = this.coloniasForm.get('pais');
      if (value === 'EXTRANJERO') {
        paisControl?.enable();
      } else {
        paisControl?.setValue('MÉXICO');
        paisControl?.disable();
      }
    });
  }


  private setupDebouncer() {
    this.debouncer
      .pipe(
        debounceTime(300),
        filter(searchTerm => searchTerm.length === 5),
        switchMap(searchTerm => this.usrServ.listaCodigoPostal(searchTerm))
      )
      .subscribe((resp: any) => {
        this._codigosEnte = resp.data;
        ////(this._codigosEnte);
        if (this._codigosEnte.length === 1) {
          const data = this._codigosEnte[0];
          this.coloniasForm.patchValue({
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

  campoNoValido(campo: string) {

    return (
      this.coloniasForm.controls[campo].errors &&
      this.coloniasForm.controls[campo].touched
    );
  }
  actInformacionEnte() {

    ////("Actualizar Ente component register" + this.getidentepublico);
    if (this.coloniasForm.invalid) {
      this.coloniasForm.markAllAsTouched();
      return;
    }
    let form: any = this.coloniasForm.value;
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
          this.formReset(this.coloniasForm);
          this.coloniasForm.controls['nombre_comercial'].setErrors(null);
          this.coloniasForm.controls['rfc'].setErrors(null);
          this.coloniasForm.controls['lugar'].setErrors(null);
          this.coloniasForm.controls['nombre_legal'].setErrors(null);
          this.coloniasForm.controls['pais'].setErrors(null);
          this.coloniasForm.controls['codigoPostal'].setErrors(null);
          this.coloniasForm.controls['lugar'].setErrors(null);
          this.coloniasForm.controls['colonia'].setErrors(null);
          this.coloniasForm.controls['localidad'].setErrors(null);
          this.coloniasForm.controls['region'].setErrors(null);
          this.coloniasForm.controls['lugar'].setErrors(null);
          this.coloniasForm.controls['calle'].setErrors(null);

          this.coloniasForm.controls['numero'].setErrors(null);
          this.coloniasForm.controls['nombres_contacto'].setErrors(null);
          this.coloniasForm.controls['primer_apellido_contacto'].setErrors(null);
          this.coloniasForm.controls['segundo_apellido_contacto'].setErrors(null);
          this.coloniasForm.controls['email_contacto'].setErrors(null);
          this.coloniasForm.controls['telefono_contacto'].setErrors(null);
          this.coloniasForm.controls['telefonofax_contacto'].setErrors(null);
          this.coloniasForm.controls['url_ente_contacto'].setErrors(null);
          this.coloniasForm.controls['idioma'].setErrors(null);



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




  private formReset(form: FormGroup) {
    Object.keys(form.controls).forEach((key) => {
      form.get(key).setErrors(null);
    });
    form.reset();
  }


}
