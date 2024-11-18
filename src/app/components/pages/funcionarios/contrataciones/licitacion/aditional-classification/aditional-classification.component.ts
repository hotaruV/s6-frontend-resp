import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Component, OnInit, Pipe } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/auth/usuario.service';
import { LicitationService } from 'src/app/services/pages/licitation.service';

@Component({
  selector: 'app-aditional-classification',
  templateUrl: './aditional-classification.component.html',
  styleUrls: ['./aditional-classification.component.scss']
})
export class AditionalClassificationComponent implements OnInit {

  public botonUpdate: boolean = true;
  public botonSiguiente: boolean;

  public datosClass: boolean = true;

  public texto: string[] = [];
  public key: string[] = [];
  public var = "";
  constructor(private fb: UntypedFormBuilder,
    private licitationService: LicitationService,
    private UsrService: UsuarioService,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {

  }

  public classForm = this.fb.group({
    //Buyer
    none: [],
    scheme: ["", [Validators.required]],
    description: ["", [Validators.required]],
  })

  campoNoValido(campo: string) {
    return (
      this.classForm.controls[campo].errors &&
      this.classForm.controls[campo].touched
    );
  }

  formReset(form: FormGroup) {
    form.reset();
    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null);
    });
  }

  crearClass(){

  }

  cargarCodigos(busqueda: string){
    let arr = [];
    let key = [];
    this.texto = [];
    this.licitationService.cargarCodigos(busqueda).subscribe(resp => {
      if(resp.hasOwnProperty){
        arr.push(resp)
      }
      for (let x = 0; x < arr[0].prod.length; x++) {
        this.texto.push(arr[0].prod[x].description);
        key.push(arr[0].prod[x].key);
      }
      if(busqueda==""){
        key = [];
        this.texto = [];
      }
      this.key = key;
    });
  }

  pasarCodigo(opt: string){
    this.cargarCodigos(opt);
    this.var = this.key[0];
    this.classForm.value.scheme = this.var;
  }




}
