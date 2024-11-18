import { Documents } from './../../../../../../../models/Contratos/contrato.model';
import { UsuarioService } from '../../../../../../../services/auth/usuario.service';
import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { catchError, debounceTime, distinctUntilChanged, Observable, of, Subject, switchMap } from 'rxjs';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ListItemsLicitacionComponent } from './list-items-licitacion/list-items-licitacion.component';
import { Esquemas } from './../../../../../../../interfaces/esquemas.inteface';
import { Cucop } from './../../../../../../../interfaces/cucop.inteface';
import { PlaningService } from '../../../../../../../services/pages/planing.service';

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
  valor: string,
  value: value,
  uri: string,

}
interface classification {

  //CLASIFICACION
  id: string;
  scheme: string,
  description: string,
  uri: string,

}

interface items {
  //item
  id: string;
  item: string,
  description: string,
  classification: classification,
  quantity: string,
  unit: unit,
}



interface Format {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-items-licitacion',
  templateUrl: './items-licitacion.component.html',
  styleUrls: ['./items-licitacion.component.scss']
})
export class ItemsLicitacionComponent implements OnInit {

  itemsDesc: Format[] = [
    { value: '1', viewValue: 'BIENES' },
    { value: '2', viewValue: 'SERVICIOS', },
    { value: '3', viewValue: 'OBRA PÚBLICA' },
  ];
  schemes: Format[] = [
    { value: '1', viewValue: 'HORA' },
    { value: '2', viewValue: 'PIEZA', },
    { value: '3', viewValue: 'KILOGRAMOS' },
  ];
  monedas: Format[] = [
    { value: 'MXN', viewValue: 'PESO MEXICANO (MXN)' },
    { value: 'USD', viewValue: 'DOLAR ESTADUNIDENSE (USD)' },
    { value: 'EUR', viewValue: 'EURO (EUR)' },
  ];

  _items: items[] = [];
  _items2: items;
  public ArrayCucop: Cucop[] = [];
  public ArrayCucop2: Cucop[] = [];
  public Cucop: Cucop;

  public ArrayEsquema: Esquemas[] = [];
  public ArrayEsquema2: Esquemas[] = [];
  public Esquema: Esquemas;

  public botonGuardaItem = true;
  public botonUpdateItem = false;
  public botonVerItem = true;

  private debouncer = new Subject<string>()

  public itemsForm = this.fb.group({

   //ITEMS
   id: [,],
   title: [null, [Validators.required]],
   description: ['', [Validators.required]],
   clasifscheme: ['', [Validators.required]],
   clasifdescription: [null, [Validators.required]],
   clasifuri: [null, [Validators.required]],
   clasifquantity: [null, [Validators.required]],
   
   //UINT 
   uintscant: [, ],
   uintscheme:[null, [Validators.required]],
   unitname: [null, [Validators.required]],
   uintvalor: [null, [Validators.required]],
   uintamount: [null, [Validators.required]],
   uintcurrency: [null, [Validators.required]],
   uinturi: [null, [Validators.required]],
  });
  /**
* INICIALIZA
*
*/
  constructor(private fb: UntypedFormBuilder, private usrServ: UsuarioService, private planing: PlaningService,
    private readonly _modelService: MatDialog
  ) {

  }

  ngOnInit(): void {

    //this.getAllCucop();
    this.getAllEsquemas();
    this.setupDebouncerItem();

  }
  ngOnDestroy(): void {


  }
  /**
  * VALIDACIONES
  *
  */
  campoNoValido(campo: string) {
    if (this.itemsForm.valid) {
    }
    return (
      this.itemsForm.controls[campo].errors &&
      this.itemsForm.controls[campo].touched
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


    if (this.itemsForm.invalid) {
      this.itemsForm.markAllAsTouched();
      return;
    }
    let form: any = this.itemsForm.value;
    let contItems = this._items.length;
    contItems += 1;
    

    let nuevovalor: value = {
      amount: form.uintamount,
      currency: form.uintcurrency,
    }


    let nuevouint: unit = {
      //UINT 

      id: contItems.toString(),
      numreq: form.uintscant,
      scheme: form.uintscheme,
      name: form.unitname,
      valor: form.uintvalor,
      value: nuevovalor,
      uri: form.uintvalor,

    }

    let nuevoclasificacion: classification = {
      id: contItems.toString(),
      scheme: form.clasifscheme,
      description: form.clasifdescription,
      uri: form.clasifuri,


    }

    let nuevo: items = {
      id: contItems.toString(),
      item: form.title,
      description: form.description,
      classification: nuevoclasificacion,
      quantity: form.clasifquantity,
      unit: nuevouint,
    }
    this._items.push(nuevo);
    this.formReset(this.itemsForm);
    this.ArrayEsquema = null;
    this.ArrayCucop = null;
    this.getAllEsquemas();
    this.itemsForm.patchValue({
      uintscheme: '',
      clasifscheme: '',
    });
    this.itemsForm.controls['title'].setErrors(null);
    this.itemsForm.controls['description'].setErrors(null);
    this.itemsForm.controls['clasifscheme'].setErrors(null);
    this.itemsForm.controls['clasifdescription'].setErrors(null);
    this.itemsForm.controls['clasifuri'].setErrors(null);
    this.itemsForm.controls['clasifquantity'].setErrors(null);
    this.itemsForm.controls['uintscant'].setErrors(null);
    this.itemsForm.controls['uintscheme'].setErrors(null);
    this.itemsForm.controls['unitname'].setErrors(null);
    this.itemsForm.controls['uintvalor'].setErrors(null);
    this.itemsForm.controls['uintamount'].setErrors(null);
    this.itemsForm.controls['uintcurrency'].setErrors(null);
    this.itemsForm.controls['uinturi'].setErrors(null);
    Swal.fire({
      icon: 'success',
      title: "<h5 style='color:#125DA9; font-size: 20px !important;'> ITEM AGREGADO </h5>",
      text: "SE HA AGREGADO EL ITEM CON ÉXITO ",
      confirmButtonText: "ACEPTAR",
      confirmButtonColor: '#125DA9',
      showConfirmButton: true,
      //timer: 1500
    })

  }


  /*dialogo de cotizaciones */
  Vercot(): void {
    ////("idEnteActor:"+ this.getidentepublico);
    ////("idUsuarioActor:"+ this.getIdUsuario);
    const dialogRef = this._modelService.open(ListItemsLicitacionComponent, {
      disableClose: true,
      autoFocus: true,
      width: '100%',
      height: '80%',
      data: {
        items: this._items,
        //idUsuario:  this.getIdUsuario
      }

    });
    dialogRef.afterClosed().subscribe(result => {

      const id = result.id;
      if (result.items) {
        //al cerrar el dialogo
      }
      if (id) {
        this._items = result.items;
        this.botonUpdateItem = true;
        this.botonGuardaItem = false;
        ////("botonGuardaProv:"+ this.botonGuardaProv);
        this.botonVerItem = false;
        this._items2 = this._items.find(item => item.id == id);



        const description = this._items2.description;
        const title = this._items2.item;
        //const  id=this._items2.id;
        const clasifquantity = this._items2.quantity

        const clasifscheme = this._items2.classification.scheme;
        const clasifdescription = this._items2.classification.description;
        const clasifuri = this._items2.classification.uri;
        const uintscant = this._items2.unit.numreq;
        const uintscheme = this._items2.unit.scheme;
        const unitname = this._items2.unit.name;
        const uintvalor = this._items2.unit.valor;
        const uintamount = this._items2.unit.value.amount;
        const uintcurrency = this._items2.unit.value.currency;
        const uinturi = this._items2.unit.uri;

        this.itemsForm.patchValue({
          id,
          description: description,
          title: this._items2.item,
          clasifquantity: clasifquantity,

          clasifscheme: clasifscheme,
          clasifdescription: clasifdescription,
          clasifuri: clasifuri,
          uintscant: uintscant,
          uintscheme: uintscheme,
          unitname: unitname,
          uintvalor: uintvalor,
          uintamount: uintamount,
          uintcurrency: uintcurrency,
          uinturi: uinturi,

        });

      }


    });
  }
  cancelarItem() {
    this.botonUpdateItem = false;
    this.botonGuardaItem = true;
    this.botonVerItem = true;
    this.formReset(this.itemsForm);
    // this.ArrayEsquema=null;
    // this.ArrayCucop=null;
    // this.getAllCucop();
    // this.getAllEsquemas();
    this.itemsForm.patchValue({
      uintscheme: '',
      clasifscheme: '',
    });
    this.itemsForm.controls['title'].setErrors(null);
    this.itemsForm.controls['description'].setErrors(null);
    this.itemsForm.controls['clasifscheme'].setErrors(null);
    this.itemsForm.controls['clasifdescription'].setErrors(null);
    this.itemsForm.controls['clasifuri'].setErrors(null);
    this.itemsForm.controls['clasifquantity'].setErrors(null);
    this.itemsForm.controls['uintscant'].setErrors(null);
    this.itemsForm.controls['uintscheme'].setErrors(null);
    this.itemsForm.controls['unitname'].setErrors(null);
    this.itemsForm.controls['uintvalor'].setErrors(null);
    this.itemsForm.controls['uintamount'].setErrors(null);
    this.itemsForm.controls['uintcurrency'].setErrors(null);
    this.itemsForm.controls['uinturi'].setErrors(null);


  }

  UptItem() {
    if (this.itemsForm.invalid) {
      this.itemsForm.markAllAsTouched();
      return;
    }
    let form: any = this.itemsForm.value;
    //("updatecOTIZACION 1: " + form.id);
    //("updatecOTIZACION 2: " + form.title);

    this._items.find(item => item.id == form.id).item = form.title;
    this._items.find(item => item.id == form.id).description = form.description;
    this._items.find(item => item.id == form.id).classification.scheme = form.clasifscheme;
    this._items.find(item => item.id == form.id).classification.description = form.clasifdescription;
    this._items.find(item => item.id == form.id).classification.uri = form.clasifuri;
    this._items.find(item => item.id == form.id).quantity = form.clasifquantity;
    this._items.find(item => item.id == form.id).unit.numreq = form.uintscant;
    this._items.find(item => item.id == form.id).unit.scheme = form.uintscheme;
    this._items.find(item => item.id == form.id).unit.name = form.unitname;
    this._items.find(item => item.id == form.id).unit.valor = form.uintvalor;
    this._items.find(item => item.id == form.id).unit.value.amount = form.uintamount;
    this._items.find(item => item.id == form.id).unit.value.currency = form.uintcurrency;
    this._items.find(item => item.id == form.id).unit.uri = form.uinturi;
    this.botonUpdateItem = false;
    this.botonGuardaItem = true;
    this.botonVerItem = true;

    Swal.fire({
      icon: 'success',
      title: "<h5 style='color:#125DA9; font-size: 20px !important;'> ITEM ACTUALIZADO </h5>",
      text: "LA ACTUALIZACIÓN DEL ITEM HA SIDO CONCLUIDA CON ÉXITO",
      confirmButtonText: "ACEPTAR",
      confirmButtonColor: '#125DA9',
      showConfirmButton: true,
      //timer: 1500
    })

    //("ITEMS " + this._items);
    this.formReset(this.itemsForm);
    this.itemsForm.patchValue({
      uintscheme: '',
      clasifscheme: '',
    });
    this.itemsForm.controls['title'].setErrors(null);

    this.itemsForm.controls['description'].setErrors(null);
    this.itemsForm.controls['clasifscheme'].setErrors(null);
    this.itemsForm.controls['clasifdescription'].setErrors(null);
    this.itemsForm.controls['clasifuri'].setErrors(null);
    this.itemsForm.controls['clasifquantity'].setErrors(null);
    this.itemsForm.controls['uintscant'].setErrors(null);
    this.itemsForm.controls['uintscheme'].setErrors(null);
    this.itemsForm.controls['unitname'].setErrors(null);
    this.itemsForm.controls['uintvalor'].setErrors(null);
    this.itemsForm.controls['uintamount'].setErrors(null);
    this.itemsForm.controls['uintcurrency'].setErrors(null);
    this.itemsForm.controls['uinturi'].setErrors(null);


  }

  getAllCucop() {

    this.usrServ
      .listaAllCucop()
      .subscribe((resp: any) => {
        this.ArrayCucop2 = resp.data;
      });

  }

  getCucop() {
    ////("entre getCucop :" + this.itemsForm.value.clasifscheme);
    const valor = this.itemsForm.value.clasifscheme;
    if (valor.length > 5) {
      this.usrServ
        .listaCucop(this.itemsForm.value.clasifscheme)
        .subscribe((resp: any) => {
          this.ArrayCucop = resp.data;
        });

    }

  }

  onChangeCucop(searchTerm: string): Subject<string> {
    // Verificar que el término de búsqueda tenga exactamente 4 caracteres y que solo contenga caracteres permitidos
     if (searchTerm.length === 4) {
      this.debouncer.next(searchTerm);
    }
    return this.debouncer;
  }

  private setupDebouncerItem() {
    this.debouncer
      .pipe(
        debounceTime(500), // Aumenta el tiempo de debounce para reducir la carga
        distinctUntilChanged(), // Evita consultas duplicadas
        switchMap((searchTerm: string) => {
          this.itemsForm.patchValue({ clasifdescription: '' });
          return this.usrServ.getDescripcionCucop(searchTerm).pipe(
            catchError((error) => {
              console.error('Error al obtener datos de Cucop:', error);
              return of({ data: [] }); // Retorna un array vacío en caso de error
            })
          );
        })
      )
      .subscribe((resp: any) => {
        this.ArrayCucop = resp.data; // Actualiza ArrayCucop con los datos recibidos
        //('Resultados de la búsqueda Cucop:', resp.data);
      });
  }

  onSelectCucop(item: any) {
    // Actualizar la descripción cuando se selecciona un nuevo item del autocompletado
    this.itemsForm.patchValue({
      clasifscheme: item.CLAVECUCoP,
      clasifdescription: item.DESCRIPCION,
      clasifquantity: item.PARTIDAESPECIFICA,
      unitname: item.UNIDADDEMEDIDA_sugerida,
    });
  }

  // Método para obtener todos los esquemas
  getAllEsquemas() {
    this.usrServ.listaAllEsquema().subscribe((resp: any) => {
      //('Respuesta del servidor:', resp);
      if (Array.isArray(resp.data)) {
        this.ArrayEsquema2 = resp.data; // Asigna el array desde resp.data
      } else {
        console.error('La respuesta no contiene un array válido:', resp);
        this.ArrayEsquema2 = []; // Inicializa como array vacío si no es válido
      }
    });
  }

  onChangeEsquemaBuscar() {
    const valor = this.itemsForm.value.uintscheme;
    //('Valor ingresado para esquema:', valor);

    if (valor && valor.length > 3) {
      if (Array.isArray(this.ArrayEsquema2)) {
        this.ArrayEsquema = this.ArrayEsquema2.filter(({ esquema }) => {
          return esquema.toUpperCase().includes(valor.toUpperCase());
        });
        //('Resultados de la búsqueda de esquema:', this.ArrayEsquema); // Verifica los resultados de la búsqueda
      }
    } else {
      this.ArrayEsquema = []; // Limpia la lista si el valor es muy corto
    }
  }

  calcularMonto() {
    // Obtén el valor actual del formulario
    const formValues = this.itemsForm.value;

    const unidadesRequeridas = formValues.uintscant || 0; // Usa 0 si está vacío
    const valor = formValues.uintvalor || 0; // Usa 0 si está vacío

    // Calcula el monto
    const monto = unidadesRequeridas * valor;

    // Actualiza el campo 'uintamount' con el resultado del cálculo
    this.itemsForm.patchValue({
      uintamount: monto
    });
  }
}  
