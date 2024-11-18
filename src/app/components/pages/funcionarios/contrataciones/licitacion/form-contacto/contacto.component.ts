import { Router, ActivatedRoute } from '@angular/router';
import { LicitationService } from '../../../../../../services/pages/licitation.service';
import { UntypedFormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Contacto, respuesta } from '../../../../../../interfaces/tender.interface';
import { map } from 'rxjs/operators';



import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit, OnDestroy {

  public botonUpdate: boolean = true;
  public btnGuardar: boolean = true
  public btnActualizar: boolean = false


  public btnNuevo: boolean = false
  public btnCancelar: boolean = false
  public btnSiguiente: boolean = true
  public btnAtras: boolean = true


  public identifier_id: string;
  public contactPoint_id: string;
  public address_id: string;
  public cadena: string;

  public emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  public urlPatern = /^[A-Za-z][A-Za-z\d.+-]*:\/*(?:\w+(?::\w+)?@)?[^\s/]+(?::\d+)?(?:\/[\w#!:.?+=&%@\-/]*)?$/
  public telefonoPattern: string = "^[0-9]{10}"
  public guardar: any
  public ocid: string;
  public partie_id: string;
  public buyer_db: string;
  public datosContract: boolean = true;
  public getRol: string = "";
  public dataKey: string;


  public rfc: string = '';


  constructor(private fb: UntypedFormBuilder,
    private tenderSvc: LicitationService,
    private router: Router,
    private routeActive: ActivatedRoute
  ) {
    this.routeActive.params.subscribe(({ ocid, id }) => {
      this.ocid = ocid;
      if (id !== undefined) {
        this.partie_id = id;
        this.getData()
      }
    })

  }


  ngOnInit(): void {
    //this.getData()
    ////(this.partie_id);

    ////(this.rfc);



  }

  generarRFC(e: string) {
    this.rfc = e;
    //(e);
    this.cadena = this.generateRandomString(3)
    const rfcCadena = `${this.rfc}-${this.cadena}`
    this.licitacionForm.patchValue({
      id: rfcCadena
    })
  }

  generarName(e: string){
    this.licitacionForm.patchValue({
      legalName: e
    })

  }


  getData() {

    this.tenderSvc.getpartie(this.partie_id)
      .pipe(
        map((resp: any) => {
          ////(resp.paties);

          this.address_id = resp.paties.address._id
          this.identifier_id = resp.paties.identifier._id
          this.contactPoint_id = resp.paties.contactPoint._id

          this.btnGuardar = false
          this.btnActualizar = true
          this.btnCancelar = true
          this.licitacionForm.patchValue({
            id: resp.paties.identifier.id,
            legalName: resp.paties.identifier.legalName,
            uri: resp.paties.identifier.uri,

            streetAddress: resp.paties.address.streetAddress,
            locality: resp.paties.address.locality,
            region: resp.paties.address.region,
            postalCode: resp.paties.address.postalCode,
            countryName: resp.paties.address.countryName,

            name: resp.paties.contactPoint.name,
            email: resp.paties.contactPoint.email,
            telephone: resp.paties.contactPoint.telephone,
            faxNumber: resp.paties.contactPoint.faxNumber,
            url: resp.paties.contactPoint.url,

          })
        })
      ).subscribe()
  }

  ngOnDestroy(): void {
    this.formReset(this.licitacionForm);
  }

  public licitacionForm = this.fb.group({
    //Indentifier
    id: ["", [Validators.required]],
    legalName: ["", [Validators.required]],
    uri: ['', [Validators.required ,Validators.pattern(this.urlPatern)]],
    //Punto de contacto
    streetAddress: ["", [Validators.minLength(4)]],
    locality: ["", [Validators.minLength(4)]],
    region: ["", [Validators.minLength(4)]],
    postalCode: ["", [Validators.minLength(5)]],
    countryName: ["", [Validators.minLength(4)]],
    //Domicilio
    name: ['', [Validators.minLength(4)]],
    email: ['', [Validators.pattern(this.emailPattern)],],
    telephone: ['', [Validators.pattern(this.telefonoPattern)]],
    faxNumber: ['', [Validators.pattern(this.telefonoPattern)]],
    url: ['', [Validators.required ,Validators.pattern(this.urlPatern)]],

  })


  campoNoValido(campo: string) {
    return (
      this.licitacionForm.controls[campo].errors &&
      this.licitacionForm.controls[campo].touched
    );
  }


  crearIdentifier() {
    let parti: Contacto = {
      identifier: this.licitacionForm.value.id,
      legalName: this.licitacionForm.value.legalName,
      uri: this.licitacionForm.value.uri,
      address: {
        streetAddress: this.licitacionForm.value.streetAddress,
        locality: this.licitacionForm.value.locality,
        region: this.licitacionForm.value.region,
        postalCode: this.licitacionForm.value.postalCode,
        countryName: this.licitacionForm.value.countryName,
      },
      contactPoint: {
        name: this.licitacionForm.value.name,
        email: this.licitacionForm.value.email,
        telephone: this.licitacionForm.value.telephone,
        faxNumber: this.licitacionForm.value.faxNumber,
        url: this.licitacionForm.value.url,
      }
    }

    let dataidentifier = {
      identifier: parti.identifier,
      legalName: parti.legalName,
      uri: parti.uri
    }
    let dataAddress = {
      key: parti.identifier,
      streetAddress: parti.address.streetAddress,
      locality: parti.address.locality,
      region: parti.address.region,
      postalCode: parti.address.postalCode,
      countryName: parti.address.countryName,
    }
    let dataContactPoint = {
      key: parti.identifier,
      name: parti.contactPoint.name,
      email: parti.contactPoint.email,
      telephone: parti.contactPoint.telephone,
      faxNumber: parti.contactPoint.faxNumber,
      url: parti.contactPoint.url,
    }
    if (this.licitacionForm.invalid) {
      this.licitacionForm.markAllAsTouched();
      return;
    }
    ////(dataidentifier);

    this.tenderSvc.identifierCreate(this.ocid, dataidentifier).subscribe(data => {
      this.tenderSvc.ContractPointsCreate(this.ocid, dataContactPoint).subscribe(data => {
        this.tenderSvc.addressCreate(this.ocid, dataAddress).
          pipe(
            map((data: respuesta) => {
              if (data.ok) {
                this.dataKey = data.key;
                this.router.navigate(['/sea/funcionarios/contrataciones/licitacion/partie', this.ocid, this.dataKey])
              }
            })
          )
          .subscribe();
      })
    })


  }

  mostrarIdentifier() {
    this.guardar = this.tenderSvc.ContractPointsShow(this.ocid)
      .subscribe((contact): any => {
        if (!contact) {
          this.btnGuardar = true;
          return
        } else {
          const { name, email, telephone, faxNumber, url } = contact
          this.licitacionForm.patchValue({ name, email, telephone, faxNumber, url })
          this.btnActualizar = true;
          this.btnGuardar = false;
        }
      })
  }

  actualizarIdentifier() {
    if (this.licitacionForm.invalid) {
      this.licitacionForm.markAllAsTouched();
      return;
    }
    let form: any = this.licitacionForm.value;
    //(form);
    this.tenderSvc.ContractPointsUpdate(this.ocid, form).subscribe(resp => {
      if (resp) {
        this.router.navigate(['/sea/funcionarios/contrataciones/licitacion/address', this.ocid])
      }
    })
  }

  formReset(form: FormGroup) {
    form.reset();
    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null);
    });
  }
  next() {
    ////(this.dataKey);
    this.router.navigate(['/sea/funcionarios/contrataciones/licitacion/partie', this.ocid])
  }
  forward() {
    this.router.navigate(['/sea/funcionarios/inicio-contrato'])
  }

  cancel() {
    this.router.navigate(['/sea/funcionarios/contrataciones/licitacion/partie', this.ocid])
  }


  updateIdentifier() {
    if (this.licitacionForm.invalid) {
      this.licitacionForm.markAllAsTouched();
      return;
    }

    let parti: Contacto = {
      legalName: this.licitacionForm.value.legalName,
      uri: this.licitacionForm.value.uri,
      id: this.licitacionForm.value.id,
      address: {
        streetAddress: this.licitacionForm.value.streetAddress,
        locality: this.licitacionForm.value.locality,
        region: this.licitacionForm.value.region,
        postalCode: this.licitacionForm.value.postalCode,
        countryName: this.licitacionForm.value.countryName,
      },
      contactPoint: {
        name: this.licitacionForm.value.name,
        email: this.licitacionForm.value.email,
        telephone: this.licitacionForm.value.telephone,
        faxNumber: this.licitacionForm.value.faxNumber,
        url: this.licitacionForm.value.url,
      }
    }
    let dataidentifier = {
      identifier: parti.identifier,
      legalName: parti.legalName,
      uri: parti.uri,
      id: parti.id
    }
    let dataAddress = {
      key: parti.id,
      streetAddress: parti.address.streetAddress,
      locality: parti.address.locality,
      region: parti.address.region,
      postalCode: parti.address.postalCode,
      countryName: parti.address.countryName,
    }
    let dataContactPoint = {
      key: parti.id,
      name: parti.contactPoint.name,
      email: parti.contactPoint.email,
      telephone: parti.contactPoint.telephone,
      faxNumber: parti.contactPoint.faxNumber,
      url: parti.contactPoint.url,
    }


    this.tenderSvc.identifierUpdate(this.identifier_id, dataidentifier).subscribe(data => {
      this.tenderSvc.ContractPointsUpdate(this.contactPoint_id, dataContactPoint).subscribe(data => {
        this.tenderSvc.addressUpdate(this.address_id, dataAddress).subscribe((data: any) => {
          this.formReset(this.licitacionForm)
          ////(data);
          if (data.ok) {
            Swal.fire({ //position: 'top-end',
              icon: 'success',
              title: 'La información se ha actualizado con exito',
              showConfirmButton: false,
              timer: 2300
            })
            this.router.navigate(['/sea/funcionarios/contrataciones/licitacion/partie', this.ocid, this.partie_id, data.address.key])
          }
        })
      })
    })
  }


  private generateRandomString(num: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result1 = '';
    const charactersLength = characters.length;
    for (let i = 0; i < num; i++) {
      result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result1;
  }











}
