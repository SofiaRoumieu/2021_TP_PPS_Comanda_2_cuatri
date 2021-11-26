import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/servicios/data.service';
import { EncuestaService } from 'src/app/servicios/encuesta.service';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { FotoService } from 'src/app/servicios/foto.service';


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
              public fotoSrv:FotoService,
              private dataService: DataService,
              private encuestaService: EncuestaService) { }

  ngOnInit() {
    this.form = this.fb.group({
      atencion: ['', Validators.required],
      comida: ['', Validators.required],
      volveria: ['', Validators.required],
      consejo: ['', Validators.required]
    });

    console.log(this.pedido);
    console.log(this.usuario);
  }

  closeModal() {
    this.modal.dismiss();
  }

  cargar() {
    const { atencion, comida, volveria, consejo } = this.form.value;//

    const encuesta = {
      atencion,
      comida,
      volveria,
      consejo,
      pedido: this.pedido,
      usuario: this.usuario
    };

    console.log(encuesta)
    //if(this.form.valid){
      this.encuestaService.crearConUid(encuesta, this.pedido.uid).then( res => {
        this.closeModal();
      });
    //}
  }

  getFoto(){
    const { atencion, comida, volveria , consejo} = this.form.value;//

    const encuesta = {
      atencion,
      comida,
      volveria,
      consejo,
      pedido: this.pedido,
      usuario: this.usuario
    };

    this.fotoSrv.takePhoto()
      .then(imageData => {
        if (imageData !== 'No Image Selected') {
          this.subirFoto(imageData, encuesta);
        } else {
          // this.toastService.errorToast('No tomó la foto.');
        }
      })
      .catch(error => {
        // this.toastService.errorToast('Error: No se ha podido cargar la foto. ' + error.message);
      });
  }

  subirFoto(imageData, usuario) {
    this.fotoSrv.uploadPhoto(imageData, usuario)
      .then(res => {
        //this.form.controls.img.setValue(res);
        //this.aux = res;
        // this.toastService.confirmationToast("Foto guardada")
      })
      .catch(err => {
        // this.toastService.errorToast('Error: No se ha podido guardar la foto. ' + err.message);
      });
  }
}
