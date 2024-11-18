import { Parties, respuesta } from './../../../../../../interfaces/tender.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormGroup, UntypedFormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { RespDataAll } from 'src/app/interfaces/tender.interface';
import { LicitationService } from 'src/app/services/pages/licitation.service';
import Swal from 'sweetalert2';



interface Roles {
  value: string,
  name: string
}
@Component({
  selector: 'app-partie',
  templateUrl: './partie.component.html',
  styleUrls: ['./partie.component.scss']
})
export class PartieComponent implements OnInit, OnDestroy {


  public btnNuevo: boolean = false;
  public btnGuardar: boolean = true;
  public btnNext: boolean = true;
  public btnPrev: boolean = true;
  public btnEdicion: boolean = false;
  public btnActualizar: boolean = false
  public btnCancelar: boolean = false
  public btnSiguiente: boolean;
  public btnAtras: boolean = true
  public titulo: string;
  public botones: boolean = false;

  public datosPartie: boolean = true;
  public addres_id: string;
  public contact_id: string;
  public identifier_id: string;
  public key: string;
  public ocid: string;
  public parti_id: string;
  public partie_id: [];
  public datos: any;
  public parties: any[] = [];
  public parti: any;

  public mostrarTabla = false

  public roles: Roles[] = [
    { value: 'buyer', name: "Comprador" },
    { value: "procuringEntity", name: "Entidad Contratante" },
    { value: "supplier", name: "Proveedor" },
    { value: "tenderer", name: "Licitador" },
    { value: "funder", name: "Financiador" },
    { value: "enquirer", name: "Investigador" },
    { value: "payer", name: "Pagador" },
    { value: "payee", name: "Beneficiario" },
    { value: "reviewBody", name: "Cuerpo de Revisión" },
    { value: "interestedParty", name: "Parte interesada" },
  ];

  constructor(private fb: UntypedFormBuilder,
    private licitationService: LicitationService,
    private router: Router,
    private routeActive: ActivatedRoute
  ) {

    this.parti = this.datos = this.routeActive.params.subscribe(({ key, ocid, id }) => {
      this.key = key;
      this.ocid = ocid;
      if (key === undefined) {
        this.btnGuardar = false
        this.btnPrev = true
        this.mostrarTabla = true;

      }
      if (id !== undefined) {
        this.getdataPartie(id)
        this.parti_id = id


      }else{
      }
      if (key === undefined && id === undefined) {
        this.titulo = "Creacion de Partes"
        this.botones = true
        ////(this.botones);
        //this.router.navigate(['/sea/funcionarios/contrataciones/licitacion/contacto', this.ocid])
      } else {
        this.titulo = "Edición de Partes"
        this.btnEdicion = true
      }

    })

  }

  ngOnInit(): void {
    this.getData()
    this.getAllParties()
  }
  ngOnDestroy(): void {
    this.datos.unsubscribe();
    this.parti.unsubscribe();
    this.formReset(this.partieForm)
  }

  getdataPartie(id: string) {
    this.licitationService.getpartie(id)
      .pipe(
        map((resp: any) => {
          ////(resp)
          let rolesV = resp.paties.roles;
          let nameV = resp.paties.name;
          this.btnGuardar = false
          this.btnActualizar = true
          this.btnCancelar = false
          this.partieForm.patchValue({
            name: nameV,
            roles: rolesV
          })


        })
      )
      .subscribe()
  }

  getData() {
    this.routeActive.params.pipe(
      switchMap(({ ocid, key }) => this.licitationService.getAlldata(ocid, key))
    ).subscribe((resp: RespDataAll) => {
      ////(resp);
      this.addres_id = resp.addres_id
      this.contact_id = resp.contact_id
      this.identifier_id = resp.identifier_id
    })

  }

  public partieForm = this.fb.group({
    name: ["", [Validators.required]],
    roles: [, [Validators.required]],
  })


  campoNoValido(campo: string) {
    return (
      this.partieForm.controls[campo].errors &&
      this.partieForm.controls[campo].touched
    );
  }

  formReset(form: FormGroup) {
    form.reset();
    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null);
    });
  }

  crearPartie() {
    ////(this.identifier_id);
    //return
    if (this.partieForm.invalid) {
      this.partieForm.markAllAsTouched();
      return;
    }
    const partyform = {
      name: this.partieForm.value.name,
      identifier: this.identifier_id,
      address: this.addres_id,
      contactPoint: this.contact_id,
      roles: this.partieForm.value.roles,
      id: this.key
    }
    this.licitationService.createPartie(this.ocid, partyform).subscribe((resp: respuesta) => {
      this.licitationService.getpartiesID(this.ocid).subscribe((resp: any) => {
        this.partie_id = resp.parties;
        let form = {
          parties: this.partie_id
        }
        this.licitationService.actulizarRelease(form, this.ocid).subscribe((resp: any) => {
          this.btnNuevo = true
          this.btnGuardar = true
          this.btnNext = true
          let roles = this.partieForm.value.roles
          // this.partieForm.reset();
          // this.getAllParties()
          //(resp);
          if(resp.ok){
            this.router.navigate(['/sea/funcionarios/contrataciones/licitacion/partie', this.ocid])
          }
        })
      })
    })
  }

  onCheckboxChange(e: any) {
    const checkArray: FormArray = this.partieForm.get('roles') as FormArray;
    if (e.checked) {
      checkArray.push(new FormControl(e.source.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.source.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
    ////(this.partieForm.value.roles);
  }



  nuevo() {
    this.btnGuardar = false
    this.router.navigate(['/sea/funcionarios/contrataciones/licitacion/contacto', this.ocid])

  }

  next() {
    this.datos = this.routeActive.params.subscribe(({ key, ocid }) => {
      this.key = key;
      this.ocid = ocid;
    })
    this.routeActive.params.pipe(
      switchMap(({ ocid }) => this.licitationService.getpartiesID(ocid))
    ).subscribe((resp: RespDataAll) => {
      ////(resp);
      if (!resp.ok) {
        Swal.fire({
          title: 'No se han guardado Parties',
          text: "No se han guardado datos de partes en este contrato, debe guardar al menos una partie",
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/sea/funcionarios/contrataciones/licitacion/contacto', this.ocid])
          }
        })
      } else {
        this.router.navigate(['/sea/funcionarios/contrataciones/licitacion/partie', this.ocid])
      }
    })
  }

  revw() {
    this.router.navigate(['/sea/funcionarios/contrataciones/licitacion/items', this.ocid])
  }


  getAllParties() {
    this.routeActive.params.pipe(
      switchMap(({ ocid }) => this.licitationService.getpartiesAll(ocid)))
      .subscribe((resp: any) => {
        if (resp.parties.length === 0) {
          this.parties = resp.parties
          //this.botones = false
          this.btnEdicion = false
        } else {
          this.parties = resp.parties
          //this.botones = false
          this.btnEdicion = true

        }

      });

  }

  borrarPartie(id: string) {
    this.licitationService.borrarParti(id).subscribe(resp => {
      this.getAllParties()
      this.licitationService.getpartiesID(this.ocid).subscribe((resp: any) => {
        this.partie_id = resp.parties;
        let form = {
          parties: this.partie_id
        }
        if (form.parties === undefined) {
          form = {
            parties: []
          }
        }
        this.licitationService.actulizarRelease(form, this.ocid).subscribe()
      })
    })
  }

  editarPartie(id: string) {
    this.router.navigate(['/sea/funcionarios/contrataciones/licitacion/contacto', this.ocid, id])
  }


  updatePartie() {
    if (this.partieForm.invalid) {
      this.partieForm.markAllAsTouched();
      return;
    }
    const partyform = {
      name: this.partieForm.value.name,
      roles: this.partieForm.value.roles,
    }
    this.licitationService.UpdateParties(this.parti_id, partyform)
      .pipe(
        map((resp: any) => {
          if (resp.ok) {
            this.getAllParties();
            this.mostrarTabla = false;
            this.btnActualizar = false;
            this.btnSiguiente = true;
            this.btnCancelar = false;
            this.formReset(this.partieForm)
            Swal.fire({
              //position: 'top-end',
              icon: 'success',
              title: 'La información se ha actualizado con exito',
              showConfirmButton: false,
              timer: 1500
            })
            this.router.navigate(['/sea/funcionarios/contrataciones/licitacion/partie', this.ocid])
          }
        })
      )
      .subscribe()
  }

  cancel() {
    window.location.reload();
  }

  licitacion() {
    this.router.navigate(['/sea/funcionarios/contrataciones/licitacion/contacto', this.ocid])
  }
}

