import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Usuario } from 'src/app/clases/usuario';
import { DetalleCuentaComponent } from 'src/app/componentes/detalle-cuenta/detalle-cuenta.component';
import { EncuestaComponent } from 'src/app/componentes/encuesta/encuesta.component';
import { JuegoComponent } from 'src/app/componentes/juego/juego.component';
import { AuthService } from 'src/app/servicios/auth.service';
import { DataService } from 'src/app/servicios/data.service';
import { EncuestaService } from 'src/app/servicios/encuesta.service';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { ToastService } from 'src/app/servicios/toast.service';
@Component({
  selector: 'app-mi-pedido',
  templateUrl: './mi-pedido.page.html',
  styleUrls: ['./mi-pedido.page.scss'],
})
export class MiPedidoPage implements OnInit {
  pedido: any;
  user: any = new Usuario();
  pedidos;
  mostrarEncuenstas:boolean=false;
  listaEncuestas: any=[];

  constructor(private modal: ModalController,
              private auth: AuthService,
              private data: DataService,
              private pedidoService: PedidoService,
              private toas: ToastService,
              private encuestas: EncuestaService,
              public router: Router) { }

  ngOnInit() {
    this.auth.getCurrentUserMail().then(res =>{
      this.data.getUserByUid(res.uid).subscribe(us =>{
        this.user = us;

        this.pedidoService.getPedido(this.user.pedido).subscribe(resa => {
          console.log(resa);
          const doc = resa;
          this.pedido = doc;
          console.log(this.pedido);
        });
        // this.pedidoService.getPedidoUser().subscribe(resPedidos => {
        //   let respuesta:any []= resPedidos;
        //   this.pedidos = respuesta.filter(x => x.usuario.uid == res.uid && x.estado != 9);
        // })

        // this.pedidoService.getPedido(res.uid).then(res => {
        //   this.pedido = res;
        // });
      });
    });
  }
  mostremosEncuestas(){
    this.encuestas.getPedidoUser().subscribe((encuesta: any)=>{
      this.listaEncuestas=encuesta;
    });
    console.log(this.listaEncuestas);
    this.mostrarEncuenstas=true;
  }

  volver(){
    this.mostrarEncuenstas=false;
  }

  openModal(modal: string) {
    switch (modal) {

      case 'encuesta':
        this.modal.create({
          component: EncuestaComponent,
          componentProps: {
            pedido: this.pedido,
            usuario: this.user
          }
        }).then((modald) => {
          //abre el modal si hay por lo menos un item seleccionado
          if(true) {
            modald.present();
          }
        });
        break;

      case 'juego':
        this.modal.create({
          component: JuegoComponent,
          componentProps: {
            pedido: this.pedido
          }
        }).then((modals) => {
          //abre el modal si hay por lo menos un item seleccionado
          if(true) {
            modals.present();
          }
        });
        break;

      case 'cuenta':
        this.modal.create({
          component: DetalleCuentaComponent,
          componentProps: {
            pedido: this.pedido
          }
        }).then((modals) => {
          //abre el modal si hay por lo menos un item seleccionado
          if(true) {
            modals.present();
          }
        });
        break;

    }
  }

  llegoPedido(item) {
    this.pedidoService.updateEstado(item.uid, 4).then(res =>{
      this.toas.success('Ha llegado el pedido');
      // const index = this.lista.indexOf(item, 0);
      // if (index > -1) {
      //   this.lista.splice(index, 1);
      // }
    });
  }

  salir() {
    this.auth.logOut();
    this.router.navigate(['./login.page']);
  }

}
