import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { UsuarioService } from './usuario.service';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { ToastService } from './toast.service';
import { OneSignal } from '@ionic-native/onesignal/ngx';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 [x: string]: any;
  usuarioaux = null;
  userId: any ='';
  rutaNotification = 'https://onesignal.com/api/v1/notifications';
  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private toast: ToastService,
    public angularFireAuth: AngularFireAuth,
    private db: AngularFirestore,
    private http: HttpClient,
    private dataService: DataService,
    private oneSignal: OneSignal) {}

  async sendVerificationEmail(): Promise<void> {
    return (await this.angularFireAuth.currentUser).sendEmailVerification();
  }

  register(email: string, password: string, usuario: any) {
    return new Promise ((resolve, rejects) => {
      this.angularFireAuth.createUserWithEmailAndPassword(email, password).then((result) => {
        this.router.navigate(['/verificacion']);

        this.sendVerificationEmail().then(res =>{
        this.toast.success('Se ha enviado un correo de verificación a la casilla especificada');
       }).catch(error =>{
         this.toast.error('Ocurrió un error a la hora de enviar el correo');
       });

        this.usuarioService.crearUsuario(usuario, result.user.uid);

        resolve(result);
      }).catch((err) => rejects(err));
    });
  }

  login(email: string, password: string){
    console.log('email:: '+email + 'pass: '+ password);
    return new Promise ((resolve, rejects) => {
      this.angularFireAuth.signInWithEmailAndPassword(email, password).then(user => {
        const doc = user.user;
        console.log(user);
        //consigue el usuario logeado
        // this.getUser(doc.uid);
        resolve(user);
      }).catch(err => rejects(err));
    });
  }

  public logOut(){
    return new Promise ((resolve, rejects) => {
      this.angularFireAuth.signOut().then(user => {
        resolve(user);
        this.router.navigate(['/login']);
      }).catch(err => rejects(err));
    });
  }

  getCurrentUserId(): string {
    let uid=null;
    if(this.angularFireAuth.currentUser){
      this.angularFireAuth.authState.subscribe((usuario)=>{
        uid=usuario.uid;
      });
    }
    return uid;
  }

   getCurrentUserMail(){
    return this.angularFireAuth.currentUser;
  }

  getLogueado(){
    const user = this.angularFireAuth.currentUser;
    if(user !== undefined && user != null)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  updateEstadoUsuario(usuario: any,estados: number)
  {
    return  this.db.collection('usuarios').doc(usuario).update({
      estado: estados,
    });

  }
  updateMesaEstadoUsuario(usuario: any,estados: number,mesas: any)
  {
    return  this.db.collection('usuarios').doc(usuario).update({
      estado: estados,
      mesa:mesas,
    });
  }

  updateEstadoMesa(mesa: any,estados: number)
  {
    console.log("entra a updateEstadoMesa");
    return  this.db.collection('mesas1').doc(mesa).update({
      estado: estados,
    });
  }

  prueba()
  {
    console.log('dale que tiene que llegar');
  }


  configuracionInicial(){
    this.oneSignal.startInit('75b1209c-4995-41ac-82bd-204d7a43aabe', '405160906151');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

     this.oneSignal.handleNotificationReceived().subscribe((noti) => {
 // do something when notification is received
      console.log('notificaicon Recibida',noti);

  });

  this.oneSignal.handleNotificationOpened().subscribe((noti) => {
  // do something when a notification is opened
    console.log('notificacion abierta',noti);
  });
  this.oneSignal.getIds().then(info=>{
    this.userId=info.userId;
    console.log(this.userId);
  });
  this.oneSignal.endInit();
  }


  registrar(token: any,titles: string,cuerpo: string,images?: string) {

    console.log('hola');
   /* let body = notificacion:{
      title: "Prueba post desde angular",
      body: "Funciona piola perri"
      }*/
    const body ={
        // eslint-disable-next-line @typescript-eslint/naming-convention
        app_id:'75b1209c-4995-41ac-82bd-204d7a43aabe',
        contents:{
            en: cuerpo,
            es: cuerpo,
        },
        headings:{
          en:titles,
          es:titles
        },
        // eslint-disable-next-line @typescript-eslint/naming-convention
        include_player_ids:[token],
        // eslint-disable-next-line @typescript-eslint/naming-convention
        big_picture:images
    };
    //token de la api
    const toke='ZGQzNzVkMGMtZjYyNS00OWRlLWEwMWQtNGQxYjg2YmFlNGVj';
    const headers = {
      headers:{
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: 'Basic ' + toke
      }
    };
    return this.http.post(this.rutaNotification,body,headers);
  }

  getUser(uid: string) {
    this.dataService.getaux().subscribe(res => {
      this.usuarioaux = res.filter(x => x.uid === uid);
    });
  }
}
