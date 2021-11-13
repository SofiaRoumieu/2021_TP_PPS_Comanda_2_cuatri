import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { DataService } from 'src/app/servicios/data.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss'],
})
export class PedidoComponent implements OnInit {

  pedido = [];
  usuario: any = Usuario;

  constructor(private modal: ModalController,
              private dataService: DataService,
              private userService: UsuarioService,
              private auth: AuthService,
              private router: Router,
              private toas: ToastController) { }

  ngOnInit() {}

  sacar(plato) {
    // this.pedido.forEach(comida => {
      // if(comida == plato) {
     const index = this.pedido.indexOf(plato);
      this.pedido.splice(index, 1);
      if(this.pedido.length === 0) {
        this.closeModal();
      }
      // }
    // });
  }

  pedir() {
    let importe = 0;

    this.pedido.forEach(element => {
      importe += element.precio;
    });

    const pedido = {
      platos: this.pedido,
      mesa: this.usuario.mesa.numero,
      total: importe,
      descuento: 0,
      estado: 0,
      usuario: this.usuario,
      estadoBar: 0,
      estadoCocina: 0,
      estadoEncuesta: 0
    };

    const sinCocina = pedido.platos.filter(x => x.tipo === 'Comida' || x.tipo === 'comida');
    const sinBar = pedido.platos.filter(x => x.tipo === 'Bebida' || x.tipo === 'bebida');

    if(sinCocina.length === 0) {
      pedido.estadoCocina = 1;
    } else if (sinBar.length === 0) {
      pedido.estadoBar = 1;
    }

    this.dataService.crearConUID('pedidos', pedido, this.usuario.uid).then(res => {
      this.closeModal();
    });
    this.auth.updateEstadoUsuario(this.usuario.uid,4).then(res =>{
      this.router.navigate(['/home']);

      this.presentToast('Pedido confirmado con éxito');

    }).catch(error =>{console.log(error);});
  }

  closeModal() {
    this.modal.dismiss();
  }

  async presentToast( text: string) {
    const toast = await this.toas.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }
}
