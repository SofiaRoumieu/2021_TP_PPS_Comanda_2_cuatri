import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { ToastController } from '@ionic/angular';
import { ScanerService } from 'src/app/servicios/scaner.service';
import { ToastService } from 'src/app/servicios/toast.service';
@Component({
  selector: 'app-detalle-cuenta',
  templateUrl: './detalle-cuenta.component.html',
  styleUrls: ['./detalle-cuenta.component.scss'],
})
export class DetalleCuentaComponent implements OnInit {
  pedido: any;
  form: FormGroup;
  subMonto = 0;
  subMontoAux = 0;

  atenciones = [
    {value: 0, viewValue: 'Mala - Sin propina'},
    {value: 10, viewValue: 'Regular - $10'},
    {value: 20, viewValue: 'Buena - $20'},
    {value: 30, viewValue: 'Muy buena - $30'}
  ];

  constructor(private pedidoService: PedidoService,
              private toas: ToastController,
              private modal: ModalController,
              private fb: FormBuilder,
              private barcodeScanner: ScanerService,
              private toast: ToastService) { }

  ngOnInit() {
    this.form = this.fb.group({
      atencion: [0, Validators.required]
    });

    if(this.pedido.descuento === 1) {
      this.subMonto = (this.pedido.total * 0.9);
    } else {
      this.subMonto = this.pedido.total;
    }
    this.subMontoAux = this.subMonto;
  }

  pedirCuenta() {
    //agregado por sofia 24/11
    let propina=0;
    if(this.form.value.atencion>0)
    {
        propina=(this.subMonto*this.form.value.atencion)/100;
    }

    this.pedidoService.pedirCuenta(this.pedido.uid, propina, this.subMonto).then(res =>{
      this.presentToast('Ha pedido la cuenta');
      this.closeModal();
    });
  }
  medirAtencion(){
    //agregado por sofia 24/11
    this.ingresarTest();
  }

  ingresarTest(){
    //aca empieza la verdad
    this.barcodeScanner.scan().then(
      barcodeData =>{
        const barcodeText=barcodeData.text;

        switch (barcodeText) {
          case 'Sin propina':
            this.form.value.atencion=0;
            break;
          case 'Regular':
            this.form.value.atencion=10;
            break;
          case 'Buena':
            this.form.value.atencion=20;
            break;
          case 'Muy buena':
            this.form.value.atencion=30;
            break;
          default:
            this.toast.error('Error  No es un QR de Propina');
            break;
        }

      },error=>{
        this.toast.error('Hubo un error al leer el QR');
      }
    );
  }



  subtotal() {
    this.subMonto = (this.subMontoAux + this.form.value.atencion);
  }

  closeModal() {
    this.modal.dismiss();
  }
  async presentToast(text: string) {
    const toast = await this.toas.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }

}
