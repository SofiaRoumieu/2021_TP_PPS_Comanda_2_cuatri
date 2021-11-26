import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { DataService } from 'src/app/servicios/data.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-consultar-mozo',
  templateUrl: './consultar-mozo.component.html',
  styleUrls: ['./consultar-mozo.component.scss'],
})
export class ConsultarMozoComponent implements OnInit {

  usuario: any = Usuario;
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
      this.cons.addConsulta(this.mensaje,this.usuario).then(res =>{
        console.log('Se guardo bien');
        this.auth.registrar('4aeca4d9-64e7-43f1-986f-f84b301c36c9',
        'Mesa N° '+ this.usuario.mesa.numero,
        this.mensaje,'https://e00-expansion.uecdn.es/assets/multimedia/imagenes/2019/06/25/15614775255199.jpg').toPromise().then(ress =>{
          console.log(ress);
          this.mensaje = '';
        });
      }).catch(error =>{console.log(error);});

  }
}
