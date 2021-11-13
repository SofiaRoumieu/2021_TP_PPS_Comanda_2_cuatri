import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/servicios/data.service';
import { ModalController } from '@ionic/angular';
import { RespuestaMozoComponent } from 'src/app/componentes/respuesta-mozo/respuesta-mozo.component';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {

  lista = [];
  user: any;
  constructor( private data: DataService, private modal: ModalController,private auth: AuthService) { }

  ngOnInit() {

    this.data.getConsultas().subscribe(res =>{

      this.lista = res.filter(a => a.estado === 0);
    });
    this.auth.getCurrentUserMail().then(res =>{
      this.data.getUserByUid(res.uid).subscribe(us =>{
        this.user = us;
      });
    });
  }

  openModal(item: any) {
    this.modal.create({
      component: RespuestaMozoComponent,
      componentProps: {
        usuario: item.usuario,
        mozo:this.user,
        consultaRecibida:item,
      }
    }).then((modal) => {
      //abre el modal si hay por lo menos un item seleccionado
        modal.present();
    });
  }

}
