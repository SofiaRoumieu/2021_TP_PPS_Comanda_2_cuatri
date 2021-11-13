import { Component, OnInit } from '@angular/core';

import { DataService } from 'src/app/servicios/data.service';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { ToastService } from 'src/app/servicios/toast.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-lista-cobros',
  templateUrl: './lista-cobros.page.html',
  styleUrls: ['./lista-cobros.page.scss'],
})
export class ListaCobrosPage implements OnInit {

  lista = [];
  constructor(private dataService: DataService,
              private pedidoService: PedidoService,
              private usuarioService: UsuarioService,
              private toas: ToastService) { }

  ngOnInit() {
    this.dataService.getPedidos().subscribe(res=>{
      this.lista = res.filter(ress => ress.estado === 5);
    });
  }

  cobrarPedido(item) {
    this.pedidoService.updateEstado(item.uid, 6).then(res =>{
      this.toas.success('Se ha cobrado el pedido con éxito');
      const index = this.lista.indexOf(item, 0);
      if (index > -1) {
        this.lista.splice(index, 1);
      }
      this.usuarioService.liberarCliente(item.usuario.uid);
    });
  }

}
