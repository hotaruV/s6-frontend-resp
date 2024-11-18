import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ContratoService } from 'src/app/services/pages/contrato.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { FormBuilder } from '@angular/forms';
import { interval } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.scss'],
})
export class ContratosComponent implements OnInit, OnDestroy {
  public modalSwitch: boolean;
  public all: any;
  public pagesNumber = 20;
  public pages: number = 0;
  public search: string = '';

  //Subscription: Subscription;
  public nombre: string = 'Sistema de información pública de contrataciones';
  public loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private contractServ: ContratoService,
    public dialog: MatDialog,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    //this.getPublico().unsubscribe();
  }

  public guestForm = this.fb.group({
    fdbusqueda: [''],
    tipo_contratación: [null],
  });

  ngOnInit(): void {
    this.getPublico();
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  getPublico() {
    this.contractServ.cargarInfo().subscribe((res) => {
      ////(res);
      if (res.length !== 0) {
        this.all = res;
      }
    });
  }

  NextPage() {
    this.pages += this.pagesNumber;
  }

  PrevPage() {
    if (this.pages > 0) {
      this.pages -= this.pagesNumber;
    }
  }

  SearchUsuario(search: string) {
    this.pages = 0;
    if (search == '0: null') {
      this.search = '';
    } else {
      this.search = search.toLowerCase();
    }
  }

  abrirModal(ocid: string, id: number) {
    const dialogRef = this.dialog.open(ModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      ////(`Dialog result: ${result}`);
    });
    this.contractServ.contratos = this.all[id];
  }

  reporte(ocid: string) {
    this.router.navigate(['/sea/publica/reporte/', ocid]);
  }
}
