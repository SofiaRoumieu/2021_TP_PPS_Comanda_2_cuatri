import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Usuario } from 'src/app/clases/usuario';
import { ConsultarMozoComponent } from 'src/app/componentes/consultar-mozo/consultar-mozo.component';
import { PedidoComponent } from 'src/app/componentes/pedido/pedido.component';
import { AuthService } from 'src/app/servicios/auth.service';
import { DataService } from 'src/app/servicios/data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  listaComida;
  listaBebida;
  user: any = new Usuario();
  tiempoEstimado=0;
  total = 0;
  items = [];
  plato: any;
  mostrar = false;

  constructor(private dataService: DataService,
              private modal: ModalController,
              private auth: AuthService) { }

  ngOnInit() {
    this.dataService.getPlatos().subscribe(res => {
      this.listaComida = res.filter(ress => ress.tipo === 'Comida');
      console.log(this.listaComida);
    });
    this.dataService.getPlatos().subscribe(res => {
      this.listaBebida = res.filter(ress => ress.tipo === 'Bebida');
    });

    this.auth.getCurrentUserMail().then(res =>{
      this.dataService.getUserByUid(res.uid).subscribe(us =>{
        this.user = us;
      });
    });
  }

  agregar(plato) {
    this.items.push(plato);
    this.total += plato.precio;
    let tiempo=10;
    if(plato.tipo=== 'Comida'){
      if(plato.precio==75)
        tiempo=10;
      else
      tiempo=plato.precio/2;
    }
    if(tiempo>this.tiempoEstimado)
      this.tiempoEstimado=tiempo;

  }

  prueba(pla: any)
  {
    this.plato = pla;
    this.mostrar = true;
  }

  cerrar(item: boolean)
  {
     this.mostrar = item;
  }

  openModal(option: string) {

    switch(option)
    {
      case 'pedido':
        this.modal.create({
          component: PedidoComponent,
          componentProps: {
            pedido: this.items,
            usuario: this.user
          }
        }).then((modal) => {
          //abre el modal si hay por lo menos un item seleccionado
          if(this.items.length > 0) {
            modal.present();
          }
        });
        break;
      case 'consulta':
        this.modal.create({
          component: ConsultarMozoComponent,
          componentProps: {
            usuario: this.user
          }
        }).then((modal) => {
            modal.present();
        });

        break;
    }

  }

}
