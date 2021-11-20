import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/servicios/auth.service';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { ToastService } from 'src/app/servicios/toast.service';
import { DataService } from '../../servicios/data.service';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.page.html',
  styleUrls: ['./lista-pedidos.page.scss'],
})
export class ListaPedidosPage implements OnInit {

  lista = [];
  constructor(private dataService: DataService,
              private pedidoService: PedidoService,
              private toas: ToastService,
              private auth: AuthService) { }

  ngOnInit() {
    this.dataService.getPedidos().subscribe(res=>{
      this.lista = res.filter(ress => ress.estado === 0);
    });
  }

  tomarPedido(item) {
    this.pedidoService.updateEstado(item.uid, 1).then(res =>{
      this.toas.success('Se ha tomado el pedido con éxito');
      const index = this.lista.indexOf(item, 0);
      if (index > -1) {
        this.lista.splice(index, 1);
      }
        // eslint-disable-next-line max-len
        this.auth.registrar('finyYeQMS1ipMnmBKmZCJ_:APA91bF2_lXio3SQunfnZm9EXyohHQDyT8mKMCOGm8DdvPdZF7UzHB0Kqf4GxuWuEj9YvZ00yxcxDO8WtUDWZSW80QKGxcpxVQKDpwFVMH7nGx0cjOLmjCjqdWg3wwDO0AW62y0FlMkQ',
        'Nueva Comida', 'Solicita la  mesa N° '+ item.mesa,
        'https://images.clarin.com/2019/11/27/las-minutas-son-la-opcion___9YsE7sRJ_340x340__1.jpg').toPromise().then(ress =>{
          console.log(ress);
        });
        // eslint-disable-next-line max-len
        this.auth.registrar('finyYeQMS1ipMnmBKmZCJ_:APA91bF2_lXio3SQunfnZm9EXyohHQDyT8mKMCOGm8DdvPdZF7UzHB0Kqf4GxuWuEj9YvZ00yxcxDO8WtUDWZSW80QKGxcpxVQKDpwFVMH7nGx0cjOLmjCjqdWg3wwDO0AW62y0FlMkQ',
        'Nuevo Bebida',
        'Solicita la  mesa N° '+ item.mesa,
        'https://mercedesya.com/mya2018/images/biblioteca/800/00005362.jpg').toPromise().then(ress =>{
          console.log(ress);
        });
    });
  }

}
