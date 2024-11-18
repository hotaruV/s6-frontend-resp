import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { ContratoService } from 'src/app/services/pages/contrato.service';
import { BaseChartDirective } from 'ng2-charts';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.scss']
})
export class GraficaComponent implements OnInit{
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  constructor(
    private fb: FormBuilder,
    private contractServ: ContratoService,
  ) {}

  public guestForm = this.fb.group({
    grafica: [null],
  });

  ngOnInit(): void {
    setTimeout(() => {
      this.contractServ.escogerGrafica("");
      this.graficaTipo()
    }, 1500);
  }

  public dat = [0,0,0];
  public doughnutChartLabels: string[] = [ 'Licitación pública', 'Invitación a tres', 'Adjudicación directa' ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: this.dat },
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    ////(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    ////(event, active);
  }

  public cambioGrafica(s:string){
    this.contractServ.escogerGrafica(s);
    this.graficaTipo()
  }

  public graficaTipo() {
    this.dat = this.contractServ.darDataGraficas();
    this.doughnutChartData.datasets[0].data = this.dat;
    this.chart?.update();
  }

}
