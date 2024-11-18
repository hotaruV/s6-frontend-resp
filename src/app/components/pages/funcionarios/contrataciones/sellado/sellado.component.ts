import { Component, OnInit } from '@angular/core';
import { ContratoService } from 'src/app/services/pages/contrato.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LicitationService } from 'src/app/services/pages/licitation.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/auth/usuario.service';
import { OICservice } from 'src/app/services/pages/oic.service';

@Component({
  selector: 'app-sellado',
  templateUrl: './sellado.component.html',
  styleUrls: ['./sellado.component.scss']
})

export class SelladoComponent implements OnInit {


  public contrato;
  public loading: boolean = true;
  public bandera: boolean = true;
  public urlA: string;
  public ocid: string;


  public tituloBtn: string = ""

  public rationale: string;
  public description: string;
  public uri: string;

  public budgeAmount: string;
  public budgeCurrency: string;
  public tender_title: string;
  public tender_description: string;
  public totalAmount: any;
  public currency: any;
  public metododecontrato: any;
  public detalledecontrato: any;
  public contratatante: any;
  public razon: any;
  public criterio: any;



  metodo: () => void;




  public getRol: any

  public documents_planning: [] = [];

  title = 'angular-jspdf';

  constructor(
    private router: Router,
    private tenderSvc: LicitationService,
    private routeActive: ActivatedRoute,
    private _contratoService: ContratoService,
    private userSrv: UsuarioService,
    private OICsrv: OICservice
  ) {
    this.getRol = userSrv.usuario.getRol;
    this.routeActive.params.subscribe(({ ocid }) => {
      this.ocid = ocid;
    })

    this.downloadPDF();

    this.actualizarBotonSegunRol();


  }

  // ngOnInit(): void {

  // }

  ngOnInit() {
    //("Estoy en ngOnInit");
    this.getContrato()
  }

  getContrato() {
    this._contratoService.getInfoEjecucion(this.ocid).subscribe(
      (resp: any) => {
        console.log(resp.contrato.tender);

        // Extraer datos de la respuesta
        let { ocid, contrato, budgets_values } = resp;

        // Validar existencia de contrato y asignar valores o null
        this.rationale = contrato?.planning?.rationale || null;
        this.description = contrato?.planning?.budget?.description || null;
        this.uri = contrato?.planning?.budget?.uri || null;

        // Presupuesto
        this.budgeAmount = budgets_values?.amount || null;
        this.budgeCurrency = budgets_values?.currency || null;

        // Título y descripción de la licitación
        this.tender_title = contrato?.tender?.title || null;
        this.tender_description = contrato?.tender?.description || null;

        // Array de items
        const items = contrato?.tender?.items || [];

        // Verificar si existen items
        if (items.length > 0) {
          // Extraer la moneda del primer item, suponiendo que es la misma para todos
          const currency = items[0].unit?.values?.currency || 'N/A';

          // Sumar los amounts de `unit.values.amount` de todos los items
          const totalAmount = items.reduce((sum, item) => {
            const amount = item.unit?.values?.amount || 0; // Validar que exista amount
            return sum + amount;
          }, 0);

          // Asignar las variables al componente
          this.totalAmount = totalAmount;
          this.currency = currency;
        } else {
          // En caso de que no haya items
          this.totalAmount = 0;
          this.currency = 'N/A';
        }

        // Asignar otras propiedades con validación
        this.metododecontrato = contrato?.tender?.tenderprocurementMethod || null;
        this.detalledecontrato = contrato?.tender?.submissionMethodDetails || null;
        this.contratatante = contrato?.tender?.tenderers?.[0]?.name || null;
        this.razon = contrato?.tender?.procurementMethodRationale || null;
        this.criterio = contrato?.tender?.awardCriteriaDetails || null;
      },
      (err) => console.log(err)
    );
  }


  actualizarBotonSegunRol() {
    if (this.getRol === 'oic') {
      this.tituloBtn = "MARCAR COMO REVISADO";
      this.metodo = this.revisar.bind(this); // Ligando el contexto de 'this'
    } else {
      this.tituloBtn = "GUARDAR EJECUCIÓN";
      this.metodo = this.index.bind(this); // Ligando el contexto de 'this'
    }
  }




  async downloadPDF() {
    // Obtén el elemento del DOM
    const DATA = document.getElementById('reportContract');

    // Verificación de existencia del elemento
    if (!DATA) {
      //console.error("Element with ID 'reportContract' not found.");
      return;
    }

    try {
      // Configuración de jsPDF
      const doc = new jsPDF();
      const options = {
        background: 'white',
        scale: 3
      };

      // Espera a que html2canvas genere el canvas
      const canvas = await html2canvas(DATA, options);
      const img = canvas.toDataURL('image/PNG');

      // Dimensiones de la imagen y el PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // Añade la imagen al PDF
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');

      // Espera a que el documento se guarde
      await doc.save(`${new Date().toISOString()}_contrato.pdf`);

      console.log('PDF descargado exitosamente');
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
  }


  index() {
    if (this.getRol === 'oic') {
      this.OICsrv.updateNotificationStatus(this.ocid).subscribe(

        (resp: any) => {
          Swal.fire({
            icon: 'success',
            title: "<h5 style='color:#125DA9; font-size: 20px !important;'> ESTATUS ACTUALIZADO </h5>",
            text: resp.msg,
            confirmButtonText: "ACEPTAR",
            confirmButtonColor: '#125DA9',
            showConfirmButton: true,
            //timer: 1500
          })

          if (resp.ok) {
            this.router.navigateByUrl('/sea/funcionarios/inicio-contrato');
          }
        }, (err) => {
          Swal.fire("Error", err.error.msg, 'error');
        }



      )

    } else {
      const data = {
        active: true
      }
      this.tenderSvc.actulizarRelease(data, this.ocid).subscribe((resp: any) => {
        if (resp.ok) {
          this.router.navigate(['/sea/funcionarios/inicio-contrato'])
        }
      })
    }


  }

  revisar() {
    const data = {
      active: false
    }
    this.tenderSvc.actulizarReleaseStatus(data, this.ocid).subscribe((resp: any) => {
      if (resp.ok) {
        this.router.navigate(['/sea/funcionarios/inicio-contrato'])
      }
    })
  }

}
