import { Component, OnInit } from '@angular/core';
import { ContratoService } from 'src/app/services/pages/contrato.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { clippingParents } from '@popperjs/core';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.scss'],
})
export class GraficasComponent implements OnInit {
  public title: string = 'Visualiza Las Contrataciones';
  public loading: boolean = true;
  public graphs: any = [{
    'numBuyer': 0,
    'numCont': 0, 'price': 0
  }];

  public sumaTot: number = 0;
  public bandera: boolean = false;

  constructor(
    private fb: FormBuilder,
    private contractServ: ContratoService,
    public dialog: MatDialog
  ) { }

  public guestForm = this.fb.group({
    grafica: [null],
  });

  ngOnInit(): void {
    this.bandera = false;
    this.getBuyers();
  }

  infoGraphs() {
    this.contractServ.infoGraphs().subscribe((res) => {
      this.graphs = res
      res.map(ped => {
        this.sumaTot += ped.price;
      });
      this.loading = false;
      this.bandera = true;
    });
  }

  getBuyers() {
    this.contractServ.cargarBuyers().subscribe((res) => {
    });
    this.getConts();
  }

  getConts() {
    this.contractServ.cargarNumContratos().subscribe((res) => {
    });
    this.infoGraphs();
  }

}
