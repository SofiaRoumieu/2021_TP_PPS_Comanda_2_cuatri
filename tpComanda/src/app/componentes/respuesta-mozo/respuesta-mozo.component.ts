import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { DataService } from 'src/app/servicios/data.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-respuesta-mozo',
  templateUrl: './respuesta-mozo.component.html',
  styleUrls: ['./respuesta-mozo.component.scss'],
})
export class RespuestaMozoComponent implements OnInit {

  usuario: any = Usuario;
  mozo: any;
  consultaRecibida: any;
  consulta: any;
  mensaje: any;
  constructor(
    private modal: ModalController,
    private data: DataService,
    private cons: UsuarioService,
    private auth: AuthService) { }

  ngOnInit() {

    this.data.getConsultas().subscribe(res=>{
      this.consulta = res.filter(a => a.usuario.uid === this.usuario.uid);
    });
  }

  closeModal() {
    this.modal.dismiss();
  }
  enviar()
  {
    console.log('llega');
      this.cons.responderConsulta(this.consultaRecibida.id,this.mensaje,this.mozo).then(res=>{
        console.log('Se respondió bien');
        this.auth.registrar('fd813fef-32ec-434a-b5aa-df71d154e72e',
        'Respuesta Mozo',
        this.mensaje,
        'https://e00-expansion.uecdn.es/assets/multimedia/imagenes/2019/06/25/15614775255199.jpg').toPromise().then(ress =>{
                console.log(ress);
                this.mensaje = '';
              });
      });

  }

}
