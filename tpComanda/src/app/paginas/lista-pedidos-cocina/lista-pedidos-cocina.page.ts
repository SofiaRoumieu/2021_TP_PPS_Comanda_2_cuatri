import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Usuario } from 'src/app/clases/usuario';
import { VerPedidoComponent } from 'src/app/componentes/ver-pedido/ver-pedido.component';
import { AuthService } from 'src/app/servicios/auth.service';
import { DataService } from 'src/app/servicios/data.service';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { ToastService } from 'src/app/servicios/toast.service';

@Component({
  selector: 'app-lista-pedidos-cocina',
  templateUrl: './lista-pedidos-cocina.page.html',
  styleUrls: ['./lista-pedidos-cocina.page.scss'],
})
export class ListaPedidosCocinaPage implements OnInit {

  lista = [];
  user: any = new Usuario();
  constructor(private dataService: DataService,
              private pedidoService: PedidoService,
              private toas: ToastService,
              private auth: AuthService,
              private modal: ModalController,) { }

  ngOnInit() {
    this.dataService.getPedidos().subscribe(res=>{
      this.lista = res.filter(ress => ress.estado === 1);
    });
  }

  ionViewWillEnter() {
    this.auth.getCurrentUserMail().then(res =>{
      this.dataService.getUserByUid(res.uid).subscribe(us =>{
        this.user = us;
      });
    });
  }

  tomarPedidoCocina(item) {
    this.pedidoService.updateEstadoCocina(item.uid, 1).then(res =>{
      this.toas.success('Se ha entregado la comida');
      // eslint-disable-next-line max-len
      this.auth.registrar('ciOp3MGpT6-wcBBIyYa29v:APA91bE32-AmKVkpqTWDj3Mf3-55CnxSSYdVc0_dmgi7eRbXE7uYcmP2rQNg0Z9msTU31YES5MMxhqc-c53HcFOviRzQk5bODdX3BnfRk3YVFf7oYCCJ8tGfGmx1GqWjyb1IgAtmSibJ',
      'Cocina Notifica',
      'Pedido de mesa N° '+ item.usuario.mesa.numero +
      'listo" ,"https://images.clarin.com/2019/11/27/las-minutas-son-la-opcion___9YsE7sRJ_340x340__1.jpg').toPromise().then(ress =>{
        console.log(ress);
      });
      if(item.estadoBar === 1) {
        this.pedidoService.updateEstado(item.uid, 2).then(ress =>{
          this.toas.success('El pedido esta listo');
          const index = this.lista.indexOf(item, 0);
          if (index > -1) {
            this.lista.splice(index, 1);
          }
        });
      }
    });
  }

  tomarPedidoBar(item) {
    this.pedidoService.updateEstadoBar(item.uid, 1).then(res =>{
      this.toas.success('Se ha entregado la bebida');
      // eslint-disable-next-line max-len
      this.auth.registrar('ciOp3MGpT6-wcBBIyYa29v:APA91bE32-AmKVkpqTWDj3Mf3-55CnxSSYdVc0_dmgi7eRbXE7uYcmP2rQNg0Z9msTU31YES5MMxhqc-c53HcFOviRzQk5bODdX3BnfRk3YVFf7oYCCJ8tGfGmx1GqWjyb1IgAtmSibJ',
      'Bar Notifica',
      'Pedido de mesa N° '+ item.usuario.mesa.numero +
      'listo',
      'https://mercedesya.com/mya2018/images/biblioteca/800/00005362.jpg').toPromise().then(ress =>{
        console.log(ress);
      });
      if(item.estadoCocina === 1) {
        this.pedidoService.updateEstado(item.uid, 2).then(ress =>{
          this.toas.success('El pedido esta listo');
          const index = this.lista.indexOf(item, 0);
          if (index > -1) {
            this.lista.splice(index, 1);
          }
        });
      }
    });
  }

  openModal(option: any) {
    let platos;

    if(this.user.perfil === 'cocinero') {
      platos = option.platos.filter(x => x.tipo === 'Comida' || x.tipo === 'comida');
    } else {
      platos = option.platos.filter(x => x.tipo === 'Bebida' || x.tipo === 'bebida');
    }

    this.modal.create({
      component: VerPedidoComponent,
      componentProps: {
        pedido: platos
      }
    }).then((modal) => {
        modal.present();
    });
  }

}
