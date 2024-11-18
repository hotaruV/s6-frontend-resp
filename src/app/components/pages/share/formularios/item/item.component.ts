import { Item, respuestaTender } from 'src/app/interfaces/tender.interface';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { LicitationService } from 'src/app/services/pages/licitation.service';
import { UntypedFormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ItemElement, ItemID } from './../../../../../interfaces/tender.interface';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { AwardService } from 'src/app/services/pages/award.service';
import { ContractService } from 'src/app/services/pages/contract.service';

import Swal from 'sweetalert2';


interface Moneda {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})

export class ItemComponent implements OnInit {

  @Input() typeItem: string;
  @Input() BtnName: string;
  @Input() Radelante: string;
  @Input() Ratras: string;
  @Output() redireccionA: EventEmitter<any> = new EventEmitter();
  @Output() redireccionAT: EventEmitter<any> = new EventEmitter();

  public btnGuardar: boolean = true
  public btnNuevo: boolean = false

  public btnActualizar: boolean = false
  public btnSiguiente: boolean = true
  public btnAtras: boolean = true
  public btnCancelar: boolean = false
  public btnGenerar: boolean = false

  public datosItem: boolean = true;
  public datosClass: boolean = true;

  public ocid: string;
  public termino: string;

  public texto: string[] = [];
  public key: string[] = [];
  public catUnit: string[] = [];
  public var = "";
  public unit: string;
  public clasification: string;
  public itemID: ItemID[] = []
  public items: ItemElement[] = []
  public getitems: any;

  // valores de actualizacion
  public item_id: string;
  public classification_id: string;
  public unit_id: string;
  public values_id: string;


  public arrayProyecto: any[] = [];

  public total: number;
  public award_id: string
  public contract_id: string

  public urlPatern = /^[A-Za-z][A-Za-z\d.+-]*:\/*(?:\w+(?::\w+)?@)?[^\s/]+(?::\d+)?(?:\/[\w#!:.?+=&%@\-/]*)?$/


  moneda: Moneda[] = [
    { value: 'MXN', viewValue: 'Peso Mexicano (MXN)' },
    // { value: 'USD', viewValue: 'Dolar Estadounidense (USD)' },
    // { value: 'EUR', viewValue: 'Euro (EUR)' },
  ];

  constructor(private fb: UntypedFormBuilder,
    private tenderSvc: LicitationService,
    private AdwardSvs: AwardService,
    private ContSvs: ContractService,
    private router: Router,
    private routeActive: ActivatedRoute
  ) {
    this.routeActive.params.subscribe(({ ocid, id, cid }) => {
      this.ocid = ocid;
      this.award_id = id
      this.contract_id = cid

    })



  }

  ngOnInit(): void {
    if (this.typeItem !== 'contract') {
      this.award_id = localStorage.getItem('award_id')
    }
    if (this.typeItem === 'contract') {
      this.btnGenerar = true;
      this.btnSiguiente = false;
    }
    this.cargarItems()

    ////(this.award_id);
  }

  ngOnDestroy(): void {
    //this.getitems.unsubscribe()
  }
  public itemsForm = this.fb.group({


    //Item
    description: ["", [Validators.required]],
    quantity: ["", [Validators.required]],
    //Clisification
    none: [""],
    scheme: [""],
    uri: ['', [Validators.required, Validators.pattern(this.urlPatern)]],
    description_classification: ["", [Validators.required]],
    // unit
    name: ["", [Validators.required]],
    // values
    amount: ["", [Validators.required]],
    currency: ["MXN", [Validators.required]],
  })

  campoNoValido(campo: string) {
    return (
      this.itemsForm.controls[campo].errors &&
      this.itemsForm.controls[campo].touched
    );
  }
  // investigacionuna.com/investigaciones?=salidaemergente
  //    /(\w+)\/(\w+)(\/?|\/?\?={1}.*)$
  crearItem() {
    if (this.itemsForm.invalid) {
      this.itemsForm.markAllAsTouched();
      return;
    }
    let values = {
      description: this.itemsForm.value.description,
      quantity: this.itemsForm.value.quantity,

      scheme: this.itemsForm.value.scheme,
      description_classification: this.itemsForm.value.description_classification,
      uri: this.itemsForm.value.uri,

      name: this.itemsForm.value.name,
      amount: this.itemsForm.value.amount,
      currency: this.itemsForm.value.currency
    }

    let dataClass = {
      scheme: values.scheme,
      description: values.description_classification,
      uri: values.uri,
      ocid: this.ocid
    }
    let dataValues = {
      amount: values.amount,
      currency: values.currency,
      ocid: this.ocid
    }


    this.tenderSvc.itemValueCreate(dataValues)
      .pipe(
        map((resp: respuestaTender) => {
          let dataUnit = {
            name: values.name,
            values: resp._id,
            ocid: this.ocid
          }
          this.tenderSvc.itemUnitCreate(dataUnit)
            .pipe(
              map((resp: respuestaTender) => {
                this.unit = resp._id;
                this.tenderSvc.itemClasificationCreate(dataClass)
                  .pipe(
                    map((resp: respuestaTender) => {
                      ////(resp._id);
                      this.clasification = resp._id
                      let dataItem = {
                        typeItem: this.typeItem,
                        description: values.description,
                        classification: this.clasification,
                        AdditionalClassifications: [],
                        quantity: values.quantity,
                        unit: this.unit,
                        ocid: this.ocid,
                        award_id: this.typeItem === 'award' ? localStorage.getItem('award_id') : '' || this.typeItem === 'contract' ? this.award_id : '',
                        contract_id: this.typeItem === 'contract' ? this.contract_id : ''
                      }
                      this.tenderSvc.itemCreate(dataItem)
                        .pipe(
                          map((resp: respuestaTender) => {
                            this.actualizarData(resp)
                          })
                        ).subscribe()
                    })
                  ).subscribe()
              })
            ).subscribe()
        })
      ).subscribe()
  }

  cargarItems() {
    ////(this.typeItem);
    switch (this.typeItem) {
      case 'award':
        this.tenderSvc.itemShowAdwards(this.typeItem, this.ocid, this.award_id)
          .subscribe((resp: any) => {
            this.total = resp['itemsCount'];
            this.items = resp['items']

          })
        ////(this.award_id);
        break;
      case 'tender':
        this.getitems = this.tenderSvc.itemShow(this.ocid, this.typeItem)
          .pipe(
            map((resp: Item) => {
              ////(resp);
              this.total = resp['itemsCount'];
              this.items = resp['items']
            })
          ).subscribe()
        break;
      case 'contract':
        this.getitems = this.tenderSvc.itemShowAdwards(this.typeItem, this.ocid, this.contract_id)
          .pipe(
            map((resp: Item) => {
              ////(resp);
              this.total = resp['itemsCount'];
              this.items = resp['items']
            })
          ).subscribe()


    }
  }


  cargarCodigos(busqueda: string) {
    let arr = [];
    let key = [];
    let unit = [];
    this.texto = [];
    this.tenderSvc.cargarCodigos(busqueda).subscribe(resp => {
      if (resp.hasOwnProperty) {
        arr.push(resp)
      }
      for (let x = 0; x < arr[0].prod.length; x++) {
        this.texto.push(arr[0].prod[x].description);
        key.push(arr[0].prod[x].key);
        unit.push(arr[0].prod[x].unit_name);
      }


      if (busqueda == "") {
        key = [];
        this.texto = [];
      }
      this.catUnit = unit
      this.key = key;
      (arr[0].prod);
    });

  }

  pasarCodigo(opt: string) {

    this.catUnit[0];
    this.cargarCodigos(opt);
    this.var = this.key[0];
    ////(this.key);
    this.itemsForm.patchValue({ scheme: this.var })////(this.var);
    this.itemsForm.patchValue({ description_classification: opt })////(this.var);

    if (this.catUnit !== undefined) {
      this.itemsForm.patchValue({ name: this.catUnit[0] })
    }
  }




  borrarItem(id: string) {
    ////(id);
    this.tenderSvc.itemDelete(id)
      .pipe(
        map((resp: ItemID) => {
          this.actualizarData(resp)

        })
      ).subscribe()
  }


  actualizarRelease() {
    ////(this.typeItem)
    switch (this.typeItem) {
      case 'tender':
        this.tenderSvc.getTenderOcid(this.ocid)
          .pipe(
            map((resp: any) => {
              const data = {
                tender: resp.tender._id
              }
              this.tenderSvc.actulizarRelease(data, this.ocid).subscribe(resp => {
                this.router.navigate(['/sea/funcionarios/inicio-contrato'])
              }, (err) => {
                Swal.fire("Error", err.error.msg, 'error');
                this.router.navigate(['sea/funcionarios/contrataciones/sellado/', this.ocid])
              })
            })
          ).subscribe()
        break;
      case 'award':
        this.router.navigate(['/sea/funcionarios/contrataciones/adjudicacion/awards/', this.ocid])
        break;

      case 'contract':
        this.router.navigate(['sea/funcionarios/contrataciones/contrato/index/', this.ocid])
        break;



    }


  }
  prev() {
    if (this.typeItem === 'tender') {
      this.router.navigate(['/sea/funcionarios/contrataciones/licitacion/amandments', this.ocid])
    }

    if (this.typeItem === 'award') {
      this.router.navigate(['/sea/funcionarios/contrataciones/adjudicacion/document/', this.ocid])
    }
  }

  next() {
    this.redireccionA.emit(this.Radelante)
    if (this.typeItem === 'tender') {
      this.actualizarRelease()

    }

    if (this.typeItem === 'award') {
      this.tenderSvc.itemShowsID(this.ocid, this.typeItem, this.award_id).subscribe((resp: any) => {
        this.actualizarData(resp)
      })
    }
    if (this.typeItem === 'contract') {
      this.router.navigate(['/sea/funcionarios/contrataciones/contrato/index/', this.ocid])
    }

  }

  forward() {
    this.redireccionAT.emit(this.Ratras)
  }

  actualizarData(resp: any) {
    let data = {};
    this.btnGuardar = false
    this.btnNuevo = true
    //this.btnTerminar = true
    this.tenderSvc.itemShowsID(this.ocid, this.typeItem, this.typeItem === 'contract' ? this.contract_id : this.award_id)
      //this.award_id
      .pipe(
        map((resp: ItemID) => {
          ////(resp);
          switch (this.typeItem) {
            case 'tender':
              data = {
                items: resp.item_id,
                ocid: this.ocid
              }
              this.tenderSvc.UpdateTender(data).subscribe()
              break;
            case 'award':
              data = {
                items: resp.item_id,
                ocid: this.ocid,
              }
              ////(data);

              this.AdwardSvs.UpdateAwardMain(data, this.award_id).subscribe((resp: any) => {
                if (resp.ok) {
                  //this.ContSvs.actualizarContract(data).subscribe().unsubscribe()
                  this.router.navigate(['/sea/funcionarios/contrataciones/adjudicacion/awards/', this.ocid])
                  localStorage.removeItem('award_id')
                }
              })
              break;
            case 'contract':
              data = {
                items: resp.item_id,
                ocid: this.ocid,
                awardID: this.award_id
              }
              ////(data)

              this.ContSvs.actualizarContract(data).subscribe()
              break;
          }
        })
      ).subscribe()

    this.itemsForm.reset()
    this.cargarItems()
  }

  editarItem(id: string) {
    this.tenderSvc.getItemID(id)
      .pipe(
        map((resp: any) => {
          this.item_id = resp.item._id;
          this.classification_id = resp.item.classification._id;
          this.unit_id = resp.item.unit._id;

          ////(resp.item.unit.values._id)
          this.values_id = resp.item.unit.values._id;


          if (resp.ok) {
            this.tenderSvc.BuscarPorCodigo(resp.item.classification.scheme).subscribe((prod: any) => {
              this.itemsForm.patchValue({ none: prod.producto.description })
            })
            this.btnGuardar = false
            this.btnSiguiente = false
            this.btnActualizar = true
            this.btnCancelar = true
            this.itemsForm.patchValue({
              description: resp.item.description,
              quantity: resp.item.quantity,
              scheme: resp.item.classification.scheme,
              uri: resp.item.classification.uri,
              description_classification: resp.item.classification.description,
              // unit
              name: resp.item.unit.name,
              // values
              amount: resp.item.unit.values.amount,
              currency: resp.item.unit.values.currency
            });
          }
        })
      ).subscribe()
  }

  actulizarItem() {
    let values = {
      description: this.itemsForm.value.description,
      quantity: this.itemsForm.value.quantity,

      scheme: this.itemsForm.value.scheme,
      description_classification: this.itemsForm.value.description_classification,
      uri: this.itemsForm.value.uri,

      name: this.itemsForm.value.name,
      amount: this.itemsForm.value.amount,
      currency: this.itemsForm.value.currency
    }

    let dataClass = {
      scheme: values.scheme,
      description: values.description_classification,
      uri: values.uri,
    }
    let dataValues = {
      amount: values.amount,
      currency: values.currency,
    }


    this.tenderSvc.itemValueUpdate(dataValues, this.values_id).subscribe((resp: any) => {
      if (resp.ok) {
        let dataUnit = {
          name: values.name
        }
        this.tenderSvc.itemUnitUpdate(dataUnit, this.unit_id).subscribe((resp: any) => {
          if (resp.ok) {
            this.tenderSvc.itemClasificationUpdate(dataClass, this.classification_id).subscribe((resp: any) => {
              if (resp.ok) {
                let dataItem = {
                  description: values.description,
                  quantity: values.quantity,
                }
                this.tenderSvc.itemUpdate(dataItem, this.item_id).subscribe((resp: any) => {
                  if (resp.ok) {
                    Swal.fire({ //position: 'top-end',
                      icon: 'success',
                      title: 'La información se ha actualizado con exito',
                      showConfirmButton: false,
                      timer: 1300
                    })
                    setTimeout(() => {
                      this.cancel()
                    }, 1300);
                  }
                })
              }
            })
          }
        })
      }
    })
  }

  cancel() {
    window.location.reload();
  }



  CreateContract() {
    this.tenderSvc.itemShowsID(this.ocid, this.typeItem, this.typeItem === 'contract' ? this.contract_id : this.award_id)
      .pipe(
        map((resp: ItemID) => {
          let data = {
            items: resp.item_id,
            ocid: this.ocid,
            awardID: this.award_id
          }
          this.ContSvs.actualizarContract(data).subscribe((resp: any) => {
            if (resp.ok) {
              Swal.fire({ //position: 'top-end',
                icon: 'success',
                title: 'Contrato Creado Con exito',
                showConfirmButton: false,
                timer: 1300
              })
              setTimeout(() => {
                this.next()
              }, 1500);
            }
          })
        })
      ).subscribe()
  }

}
