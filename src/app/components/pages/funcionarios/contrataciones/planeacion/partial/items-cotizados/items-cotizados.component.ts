import { UsuarioService } from '../../../../../../../services/auth/usuario.service';
import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { catchError, debounceTime, distinctUntilChanged, Observable, of, Subject, switchMap } from 'rxjs';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListItemsCotizadosComponent } from './list-items-cotizados/list-items-cotizados.component';
import { Esquemas } from './../../../../../../../interfaces/esquemas.inteface';
import { Cucop } from './../../../../../../../interfaces/cucop.inteface';
import { PlaningService } from '../../../../../../../services/pages/planing.service';
import { Proveedores } from './../../../../../../../models/Entes/proveedores.model';

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
interface perido {


  startDate: string,
  endDate: string,
  maxExtentDate: string,
  undurationInDaysit: unit,
}
interface ProveedorEmisor {
  id: string;
  Suppliersname: string;
  name: string;
}

interface itemsCotizados {
  //item
  id: string;
  item: string,
  description: string,
  classification: classification,
  quantity: string,
  unit: unit,
  periodo: perido;
  proveedorEmisor: ProveedorEmisor,
}



interface Format {
  value: string;
  viewValue: string;
}

interface Esquema {
  id: number;
  esquema: string;
}
@Component({
  selector: 'app-items-cotizados',
  templateUrl: './items-cotizados.component.html',
  styleUrls: ['./items-cotizados.component.scss']
})
export class ItemsCotizadosComponent implements OnInit {

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
    { value: 'MXN', viewValue: 'PESO MEXÍCANO (MXM)' },
    { value: 'USD', viewValue: 'DOLAR ESTADUNIDENSE (USD)' },
    { value: 'EUR', viewValue: 'EURO (EUR)' },
  ];

  _itemsCotizados: itemsCotizados[] = [];
  _items2Cotizados: itemsCotizados;
  public ArrayCucop: Cucop[] = [];
  public ArrayCucop2: Cucop[] = [];
  public Cucop: Cucop;
  public proveedoresEmisor: Proveedores[] = [];
  public ArrayEsquema: Esquemas[] = [];
  public ArrayEsquema2: Esquemas[] = [];
  public Esquema: Esquemas;
  public getidentepublico = '';
  public botonGuardaItem = true;
  public botonUpdateItem = false;
  public botonVerItem = true;
  public getprovedores: any;



  private debouncer = new Subject<string>()

  public itemsForm = this.fb.group({

    //ITEMS
    id: [,],
    title: [null, [Validators.required]],
    description: ['', [Validators.required]],

    //CLASIFICACION
    //null, [Validators.required]
    clasifscheme: ['', [Validators.required]],
    clasifdescription: [null, [Validators.required]],
    //clasifid: [null, [Validators.required]], / falta el id
    clasifuri: [null, [Validators.required]],
    clasifquantity: [null, [Validators.required]],

    //UINT 
    uintscant: [, [Validators.pattern(/^[0-9]+$/)]],
    uintscheme: [null, [Validators.required]],
    unitname: [null, [Validators.required]],
    uintvalor: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    uintamount: [null, [Validators.required, Validators.pattern(/^-?\d*[.,]?\d{0,2}$/)]],
    uintcurrency: [null, [Validators.required]],
    uinturi: [null, [Validators.required]],

    startDate: [null, [Validators.required]],
    endDate: [null, [Validators.required]],
    maxExtentDate: [null, [Validators.required]],
    durationInDays: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    Suppliersname: [null, [Validators.required]],
  },
    {
      // validators:[this.curpValida]
    });
  /**
* INICIALIZA
*
*/
  constructor(private fb: UntypedFormBuilder, private usrServ: UsuarioService, private planing: PlaningService,
    private readonly _modelService: MatDialog
  ) {

    this.getidentepublico = usrServ.usuario.getid_ente_publico.ente_id;
  }

  ngOnInit(): void {

    this.getAllCucop();
    this.getAllEsquemas();
    this.getAllProveedoresEmisor();
    this.setupDebouncer
    this.setupDebouncerItem();


  }
  private setupDebouncerItem() {
    this.debouncer
      .pipe(
        debounceTime(1000), // Espera 300ms después de que el usuario deja de escribir
        switchMap((searchTerm: string) => {
          this.itemsForm.patchValue({ clasifdescription: '' }); // Limpiar la descripción al buscar un nuevo código
          return this.usrServ.getDescripcionCucop(searchTerm);
        })
      )
      .subscribe((resp: any) => {
        this.ArrayCucop = resp.data;
        ////(this.ArrayCucop);
        if (this.ArrayCucop.length === 1) {
          const data = this.ArrayCucop[0];
          this.itemsForm.patchValue({
            clasifscheme: data.CLAVECUCoP,
            clasifdescription: data.DESCRIPCION,
            clasifquantity: data.PARTIDAGENERICA,
          });
        }
      });
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
  precibirchangeItemCot(event) {
    // //("precibirchange" );
    let form: any = this.itemsForm.value;

    //event.target.value
    let duracuion = 0;
    let fechaInicio = form.startDate;
    let fechaFin = form.endDate;
    if (fechaInicio != null && fechaFin != null && fechaInicio != "" && fechaFin != "") {
      let diff = fechaFin - fechaInicio;
      // //("fechaFin :" +fechaFin);
      duracuion = diff / (1000 * 60 * 60 * 24);
      this.itemsForm.patchValue({
        durationInDays: duracuion,
      });

    }

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
    ////("creaitem 1: "+ form.title);
    let contItems = this._itemsCotizados.length;
    contItems += 1;
    // //("contCotizaciones 1: "+ contItems);


    let nuevovalor: value = {
      amount: form.uintamount,
      currency: form.uintcurrency,
    }


    let nuevouint: unit = {
      //UINT 

      id: contItems.toString(),
      numreq: form.uintscant,
      scheme: form.uintscheme.toUpperCase(),
      name: form.unitname.toUpperCase(),
      valor: form.uintvalor,
      value: nuevovalor,
      uri: form.uintvalor,

    }

    let nuevoclasificacion: classification = {
      id: contItems.toString(),
      scheme: form.clasifscheme.toUpperCase(),
      description: form.clasifdescription.toUpperCase(),
      uri: form.clasifuri,


    }

    let nuevoPerido: perido = {

      startDate: form.startDate,
      endDate: form.endDate,
      maxExtentDate: form.maxExtentDate,
      undurationInDaysit: form.durationInDays,
    }
    let nuevoProv: ProveedorEmisor = {
      id: form.Suppliersname, //contItems.toString(),
      Suppliersname: form.Suppliersname,
      name: this.proveedoresEmisor.find(item => item.uid == form.Suppliersname).razonsocialProv,

    }

    let nuevo: itemsCotizados = {
      id: contItems.toString(),
      item: form.title.toUpperCase(),
      description: form.description.toUpperCase(),
      classification: nuevoclasificacion,
      quantity: form.clasifquantity,
      periodo: nuevoPerido,
      proveedorEmisor: nuevoProv,
      unit: nuevouint,

    }
    this._itemsCotizados.push(nuevo);

    //("items " + this._itemsCotizados);
    this.formReset(this.itemsForm);

    this.ArrayCucop = null;
    this.getAllCucop();
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
    this.itemsForm.controls['startDate'].setErrors(null);
    this.itemsForm.controls['endDate'].setErrors(null);
    this.itemsForm.controls['maxExtentDate'].setErrors(null);
    this.itemsForm.controls['durationInDays'].setErrors(null);
    this.itemsForm.controls['Suppliersname'].setErrors(null);

    Swal.fire({
      icon: 'success',
      title: "<h5 style='color:#125DA9; font-size: 20px !important;'> COTIZACIÓN  AGREGADA </h5>",
      text: "SE HA AGREGADO LA COTIZACIÓN CON ÉXITO ",
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
    const dialogRef = this._modelService.open(ListItemsCotizadosComponent, {
      disableClose: true,
      autoFocus: true,
      width: '100%',
      height: '80%',
      data: {
        items: this._itemsCotizados,
        //idUsuario:  this.getIdUsuario
      }

    });
    dialogRef.afterClosed().subscribe(result => {

      const id = result.id;
      if (result.items) {
        //al cerrar el dialogo
      }
      if (id) {
        this._itemsCotizados = result.items;
        this.botonUpdateItem = true;
        this.botonGuardaItem = false;
        ////("botonGuardaProv:"+ this.botonGuardaProv);
        this.botonVerItem = false;
        this._items2Cotizados = this._itemsCotizados.find(item => item.id == id);



        const description = this._items2Cotizados.description;
        const title = this._items2Cotizados.item;
        //const  id=this._items2.id;
        const clasifquantity = this._items2Cotizados.quantity

        const clasifscheme = this._items2Cotizados.classification.scheme;
        const clasifdescription = this._items2Cotizados.classification.description;
        const clasifuri = this._items2Cotizados.classification.uri;
        const uintscant = this._items2Cotizados.unit.numreq;
        const uintscheme = this._items2Cotizados.unit.scheme;
        const unitname = this._items2Cotizados.unit.name;
        const uintvalor = this._items2Cotizados.unit.valor;
        const uintamount = this._items2Cotizados.unit.value.amount;
        const uintcurrency = this._items2Cotizados.unit.value.currency;
        const uinturi = this._items2Cotizados.unit.uri;

        const startDate = this._items2Cotizados.periodo.startDate;
        const endDate = this._items2Cotizados.periodo.endDate;
        const maxExtentDate = this._items2Cotizados.periodo.maxExtentDate;
        const durationInDays = this._items2Cotizados.periodo.undurationInDaysit;
        //("Suppliersname:" + this._items2Cotizados.proveedorEmisor.Suppliersname);
        const Suppliersname = this._items2Cotizados.proveedorEmisor.Suppliersname;

        this.itemsForm.patchValue({
          id,
          description: description,
          title: this._items2Cotizados.item,
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
          startDate: startDate,
          endDate: endDate,
          maxExtentDate: maxExtentDate,
          durationInDays: durationInDays,
          Suppliersname: Suppliersname,
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
    this.itemsForm.controls['startDate'].setErrors(null);
    this.itemsForm.controls['endDate'].setErrors(null);
    this.itemsForm.controls['maxExtentDate'].setErrors(null);
    this.itemsForm.controls['durationInDays'].setErrors(null);
    this.itemsForm.controls['Suppliersname'].setErrors(null);


  }

  UptItem() {
    if (this.itemsForm.invalid) {
      this.itemsForm.markAllAsTouched();
      return;
    }
    let form: any = this.itemsForm.value;
    //("updatecOTIZACION 1: " + form.id);
    //("updatecOTIZACION 2: " + form.title);

    this._itemsCotizados.find(item => item.id == form.id).item = form.title;
    this._itemsCotizados.find(item => item.id == form.id).description = form.description;
    this._itemsCotizados.find(item => item.id == form.id).classification.scheme = form.clasifscheme;
    this._itemsCotizados.find(item => item.id == form.id).classification.description = form.clasifdescription;
    this._itemsCotizados.find(item => item.id == form.id).classification.uri = form.clasifuri;
    this._itemsCotizados.find(item => item.id == form.id).quantity = form.clasifquantity;
    this._itemsCotizados.find(item => item.id == form.id).unit.numreq = form.uintscant;
    this._itemsCotizados.find(item => item.id == form.id).unit.scheme = form.uintscheme;
    this._itemsCotizados.find(item => item.id == form.id).unit.name = form.unitname;
    this._itemsCotizados.find(item => item.id == form.id).unit.valor = form.uintvalor;
    this._itemsCotizados.find(item => item.id == form.id).unit.value.amount = form.uintamount;

    this._itemsCotizados.find(item => item.id == form.id).unit.value.currency = form.uintcurrency;
    this._itemsCotizados.find(item => item.id == form.id).unit.uri = form.uinturi;

    this._itemsCotizados.find(item => item.id == form.id).periodo.startDate = form.startDate;
    this._itemsCotizados.find(item => item.id == form.id).periodo.endDate = form.endDate;
    this._itemsCotizados.find(item => item.id == form.id).periodo.maxExtentDate = form.maxExtentDate;
    this._itemsCotizados.find(item => item.id == form.id).periodo.undurationInDaysit = form.durationInDays;

    let nuevoProv: ProveedorEmisor = {
      id: form.Suppliersname, //contItems.toString(),
      Suppliersname: form.Suppliersname,
      name: this.proveedoresEmisor.find(item => item.uid == form.Suppliersname).razonsocialProv,

    }
    this._itemsCotizados.find(item => item.id == form.id).proveedorEmisor = nuevoProv;
    this.botonUpdateItem = false;
    this.botonGuardaItem = true;
    this.botonVerItem = true;

    Swal.fire({
      icon: 'success',
      title: "<h5 style='color:#125DA9; font-size: 20px !important;'> COTIZACIÓN  ACTUALIZADA </h5>",
      text: "LA ACTUALIZACIÓN DE LA COTIZACIÓN HA SIDO CONCLUIDA CON ÉXITO",
      confirmButtonText: "ACEPTAR",
      confirmButtonColor: '#125DA9',
      showConfirmButton: true,
      //timer: 1500
    })

    //("ITEMS " + this._itemsCotizados);
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
    this.itemsForm.controls['startDate'].setErrors(null);
    this.itemsForm.controls['endDate'].setErrors(null);
    this.itemsForm.controls['maxExtentDate'].setErrors(null);
    this.itemsForm.controls['durationInDays'].setErrors(null);
    this.itemsForm.controls['Suppliersname'].setErrors(null);


  }
  getAllCucop() {

    this.usrServ
      .listaAllCucop()
      .subscribe((resp: any) => {
        this.ArrayCucop2 = resp.data;
      });

  }

  getCucop() {
    //("entre getCucop :" + this.itemsForm.value.clasifscheme);
    const valor = this.itemsForm.value.clasifscheme;
    if (valor.length > 5) {
      this.usrServ
        .listaCucop(this.itemsForm.value.clasifscheme)
        .subscribe((resp: any) => {
          this.ArrayCucop = resp.data;
        });

    }

  }

  onChangeCucopBuscar() {
    ////("entre buscar onChangeCucopBuscar: " + this.itemsForm.value.clasifscheme);
    const valor = this.itemsForm.value.clasifscheme;
    if (valor.length > 5) {

      this.ArrayCucop = this.ArrayCucop2.filter(({ DESCRIPCION }) => DESCRIPCION.includes(valor.toUpperCase()));

    }


  }


  getAllEsquemas() {

    this.usrServ
      .listaAllEsquema()
      .subscribe((resp: any) => {
        this.ArrayEsquema2 = resp.data;
      });

  }
  onChangeEsquemaBuscar() {
    //("entre buscar onChangeCucopBuscar: " + this.itemsForm.value.uintscheme);
    const valor = this.itemsForm.value.uintscheme;
    if (valor.length > 3) {
      this.ArrayEsquema = this.ArrayEsquema2.filter(({ esquema }) => esquema.includes(valor.toUpperCase()));

    }


  }


  getAllProveedoresEmisor() {


    this.getprovedores = this.usrServ.cargarProveedores(this.getidentepublico).subscribe(({ total, proveedores }) => {

      if (proveedores.length !== 0) {
        this.proveedoresEmisor = proveedores;
      }

    });
  }


  


  onChangeCucop(searchTerm: string): Subject<string> {
    // Verificar que el término de búsqueda tenga exactamente 4 caracteres y que solo contenga caracteres permitidos
    if (searchTerm.length === 4) {
      this.debouncer.next(searchTerm);
    }
    return this.debouncer;
  }

  setupDebouncer(): void {
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
