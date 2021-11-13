import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/servicios/data.service';
import { EncuestaService } from 'src/app/servicios/encuesta.service';
import { PedidoService } from 'src/app/servicios/pedido.service';


@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss'],
})
export class EncuestaComponent implements OnInit {

  form: FormGroup;
  pedido: any;
  usuario: any;

  constructor(private modal: ModalController,
              private fb: FormBuilder,
              public pedidoService: PedidoService,
              private dataService: DataService,
              private encuestaService: EncuestaService) { }

  ngOnInit() {
    this.form = this.fb.group({
      atencion: ['', Validators.required],
      comida: ['', Validators.required],
      bebida: ['', Validators.required],
      consejo: ['', Validators.required]
    });

    console.log(this.pedido);
  }

  closeModal() {
    this.modal.dismiss();
  }

  cargar() {
    const { atencion, comida, bebida, consejo } = this.form.value;

    const encuesta = {
      atencion,
      comida,
      bebida,
      consejo,
      pedido: this.pedido,
      usuario: this.usuario
    };

    if(this.form.valid){
      this.encuestaService.crearConUid(encuesta, this.pedido.uid).then( res => {
        this.closeModal();
      });
    }
  }
}
