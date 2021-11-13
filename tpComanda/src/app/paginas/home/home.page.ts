import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { FcmService } from 'src/app/servicios/fcm.service';

import { JuegoComponent } from 'src/app/componentes/juego/juego.component';

import { ScanerService } from 'src/app/servicios/scaner.service';
import { DataService } from 'src/app/servicios/data.service';
import { Usuario } from 'src/app/clases/usuario';

import { ToastService } from 'src/app/servicios/toast.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  user: any = new Usuario();

  // eslint-disable-next-line max-len
  // constructor(public router: Router,private auth:AuthService,public toasControl:ToastController, private barcodeScanner:ScanerService, private toast:ToastrService, private data:DataService) {}

  constructor(public router: Router,
              private auth: AuthService,
              private nav: NavController,
              private fcm: FcmService,
              public toasControl: ToastController,
              private modal: ModalController,
              private barcodeScanner: ScanerService,
              private toast: ToastService,
              private data: DataService) {}
  // ionViewDidLoad(){
  //  this.fcm.token()
  //  this.fcm.listenToNotification().pipe(
  //    tap(msg=>{
  //      const toast =  this.toasControl.create({
  //        message: msg.body,
  //        duration: 3000
  //      });
  //      toast.then(res=>{
  //        res.present();
  //      })
  //    })
  //  )
  // }
  ngOnInit(): void {

    // this.auth.getCurrentUserMail().then(res =>{
    //   this.data.getUserByUid(res.uid).subscribe(us =>{
    //     this.user = us;

    //   })
    // })

  }

  ionViewWillEnter()
  {
    this.auth.getCurrentUserMail().then(res =>{
      this.data.getUserByUid(res.uid).subscribe(us =>{
        this.user = us;

      });
    });
  }

  ruteador(opcion) {
    switch (opcion) {
      case 'registroAdm':
          this.router.navigate(['/registro-adm']);
        break;
      case 'registroPlato':
          this.router.navigate(['/registro-plato']);
        break;
      case 'registroMesa':
          this.router.navigate(['/registro-mesa']);
        break;
      case 'envioDomicilio':
          this.router.navigate(['/envio-domicilio']);
        break;
      case 'pedirMesa':
          this.router.navigate(['/pedir-mesa']);
        break;
      case 'reservarMesa':
        // console.log(this.auth.usuarioaux);
          this.router.navigate(['/reservar-mesa']);
        break;
      case 'menu':
          this.router.navigate(['/menu']);
        break;
      case 'pedido':
          this.router.navigate(['/mi-pedido']);
        break;
      case 'lista-autorizar':
          this.router.navigate(['/lista-autorizar']);
        break;
      case 'lista-pedidos':
          this.router.navigate(['/lista-pedidos']);
        break;
      case 'lista-pedidos-cocina':
          this.router.navigate(['/lista-pedidos-cocina']);
        break;
      case 'lista-pedidos-mozo':
          this.router.navigate(['/lista-pedidos-mozo']);
        break;
      case 'lista-pendientes':
         this.router.navigate(['/lista-pendientes']);
        break;
      case 'lista-cobros':
         this.router.navigate(['/lista-cobros']);
         break;
      case 'chats':
         this.router.navigate(['/chats']);
        break;

    }
  }

  openModal() {
    this.modal.create({
      component: JuegoComponent,
      componentProps: {
        // pedido: this.items
      }
    }).then((modal) => {
      //abre el modal si hay por lo menos un item seleccionado
      if(true) {
        modal.present();
      }
    });
  }
  prueba()
  {
    console.log(this.auth.getCurrentUserId());
    // eslint-disable-next-line max-len
    this.auth.registrar('ciOp3MGpT6-wcBBIyYa29v:APA91bE32-AmKVkpqTWDj3Mf3-55CnxSSYdVc0_dmgi7eRbXE7uYcmP2rQNg0Z9msTU31YES5MMxhqc-c53HcFOviRzQk5bODdX3BnfRk3YVFf7oYCCJ8tGfGmx1GqWjyb1IgAtmSibJ',
    'Nuevo Cliente', this.user.mail + 'Solicita una mesa',
    'https://e00-expansion.uecdn.es/assets/multimedia/imagenes/2019/06/25/15614775255199.jpg').toPromise().then(res =>{
    console.log(res);
    });
  }

  logut()
  {
     this.auth.logOut();
  }

  ingresar()
  {
    this.barcodeScanner.scan().then(
      barcodeData => {
        const barcodeText = barcodeData.text;

        if (barcodeText === 'laComanda') {
          this.auth.updateEstadoUsuario(this.user.uid,2).then(res =>{

            this.toast.success('Solicitud de Mesa registrada con éxito');
            // eslint-disable-next-line max-len
            this.auth.registrar('ciOp3MGpT6-wcBBIyYa29v:APA91bE32-AmKVkpqTWDj3Mf3-55CnxSSYdVc0_dmgi7eRbXE7uYcmP2rQNg0Z9msTU31YES5MMxhqc-c53HcFOviRzQk5bODdX3BnfRk3YVFf7oYCCJ8tGfGmx1GqWjyb1IgAtmSibJ'
            ,'Nuevo Cliente', this.user.mail + 'Solicita una mesa',
            'https://e00-expansion.uecdn.es/assets/multimedia/imagenes/2019/06/25/15614775255199.jpg').toPromise().then(ress =>{
              console.log(ress);
            });
          });
        } else {
          this.toast.error('Error al ingresar al local.');
        }
      },
      error => {
        // Hardcodeo
        // this.infoReserva();
        this.toast.error(error);

        console.log('Hubo un error', error);
      }
    );
  }

  sentarse()
  {
    console.log(this.user.mesa.codigo);
    this.barcodeScanner.scan().then(
      barcodeData => {
        const barcodeText = barcodeData.text;
        if (barcodeText === this.user.mesa.codigo) {

          this.router.navigate(['/menu']);
        } else {
          this.toast.error('Qr de mesa inválido.');
        }
      },
      error => {
        // Hardcodeo
        // this.infoReserva();
        this.toast.error(error);

        console.log('Hubo un error', error);
      }
    );
  }

  verEstadoPedido()
  {
    this.barcodeScanner.scan().then(
      barcodeData => {
        const barcodeText = barcodeData.text;
        if (barcodeText === this.user.mesa.codigo) {

          this.router.navigate(['/mi-pedido']);
        } else {
          this.toast.error('Qr de mesa inválido.');
        }
      },
      error => {
        // Hardcodeo
        // this.infoReserva();
        this.toast.error(error);

        console.log('Hubo un error', error);
      }
    );

  }

}
