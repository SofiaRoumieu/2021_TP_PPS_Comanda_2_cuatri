import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { ToastController } from '@ionic/angular';
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
              private fb: FormBuilder) { }

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

    this.pedidoService.pedirCuenta(this.pedido.uid, this.form.value.atencion, this.subMonto).then(res =>{
      this.presentToast('Ha pedido la cuenta');
      this.closeModal();
    });
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
