import { Component, OnInit } from '@angular/core';
import { ContratoService } from 'src/app/services/pages/contrato.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  public all: any = [{ 'title': '', 'description': '', 'institucion': '', 'method': '', 'numCont': '', 'price': '' }];
  public contrato;
  public loading: boolean = true;
  public bandera: boolean = true;
  constructor(private contractServ: ContratoService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.bandera = true;
    this.loading = true;
    this.all = this.contractServ.contratos
    this.getContract(this.all.ocid);
  }

  getContract(id: string) {
    this.contractServ.cargarUnContrato(id).subscribe(res => {
      this.contrato = res
      this.bandera = false;
      this.loading = false;
    })
  }
  downloadObjectAsJson(exportObj, exportName) {
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    let downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

}
