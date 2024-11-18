import { Router, ActivatedRoute } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import Rfc from 'rfc-facil';


@Component({
  selector: 'app-rfc',
  templateUrl: './rfc.component.html',
  styleUrls: ['./rfc.component.scss']
})
export class RfcComponent implements OnInit {


  public personaType: string = 'Persona moral';
  public TypePersonFisic: any;


  @Input() rfcSubjet: string = '';
  @Input() legalName: string = '';
  @Output() rfcOut = new EventEmitter<string>();
  @Output() NameOut = new EventEmitter<string>();


  ngOnInit(): void {
    const rfcFisico: string = Rfc.forNaturalPerson({
      name: 'Carlos',
      firstLastName: 'Valladares',
      secondLastName: 'Del Valle',
      day: 5,
      month: 11,
      year: 1980
    });
    ////(rfcFisico);

    const rfcMoral: string = Rfc.forJuristicPerson({
      name: 'Drop Intelligence',
      day: 8,
      month: 12,
      year: 2022
    });
    ////(rfcMoral); // SIA-821129LS8

    // DIN2212086k2

  }


  constructor(private fb: UntypedFormBuilder) {
    this.pmoral()
  }





  campoNoValido(campo: string) {
    return (
      this.TypePersonFisic.controls[campo].errors &&
      this.TypePersonFisic.controls[campo].touched
    );
  }


  pfisica() {
    ////('Chango fisica');
    this.TypePersonFisic = this.fb.group({
      nombre_f: ['', [Validators.required]],
      apellido_pa_f: ['', [Validators.required]],
      apellido_a_f: ['', [Validators.required]],
      nac_day_f: ['', [Validators.required]],
      nac_mon_f: ['', [Validators.required]],
      nac_year_f: ['', [Validators.required]],
    })
    //this.rfcfisico()
  }

  pmoral() {
    ////('Chango moral');
    this.TypePersonFisic = this.fb.group({
      nombre_f: ['', [Validators.required]],
      nac_day_f: ['', [Validators.required]],
      nac_mon_f: ['', [Validators.required]],
      nac_year_f: ['', [Validators.required]],
    })

    //this.rfcmoral()
  }



  public rfcmoral() {
    let name = this.TypePersonFisic.value.nombre_f
    let day = this.TypePersonFisic.value.nac_day_f
    let month = this.TypePersonFisic.value.nac_mon_f
    let year = this.TypePersonFisic.value.nac_year_f
    if (this.TypePersonFisic.invalid) {
      this.TypePersonFisic.markAllAsTouched();
      return;
    }
    const rfcMoral: string = Rfc.forJuristicPerson({
      name: name,
      day: day,
      month: month,
      year: year
    });
    ////(rfcMoral);

    this.legalName = `${name}`
    this.rfcSubjet = rfcMoral;
    this.rfcOut.emit(this.rfcSubjet)
    this.NameOut.emit(this.legalName)
  }

  public rfcfisico() {
    let name = this.TypePersonFisic.value.nombre_f
    let apellido_pa_f = this.TypePersonFisic.value.apellido_pa_f
    let apellido_a_f = this.TypePersonFisic.value.apellido_a_f
    let day = this.TypePersonFisic.value.nac_day_f
    let month = this.TypePersonFisic.value.nac_mon_f
    let year = this.TypePersonFisic.value.nac_year_f
    if (this.TypePersonFisic.invalid) {
      this.TypePersonFisic.markAllAsTouched();
      return;
    }
    const rfcFisico: string = Rfc.forNaturalPerson({
      name: name,
      firstLastName: apellido_pa_f,
      secondLastName: apellido_a_f,
      day: day,
      month: month,
      year: year
    });
    this.rfcSubjet = rfcFisico;
    this.legalName = `${name} ${apellido_pa_f} ${apellido_a_f}`
    this.rfcOut.emit(this.rfcSubjet);
    this.NameOut.emit(this.legalName)
  }
}
