import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    public http: HttpClient,
    public db: AngularFirestore,
    public afs: AngularFireStorage,
    public toastController: ToastController
  ) {}

  public crearUsuario(objeto: any, uids: string): Promise<DocumentReference> {
    console.log('Entro al crearUsuario');
    console.log('objeto', objeto);
    return new Promise((resolve,reject) => {
      this.db.collection('usuarios').doc(uids).set({
        uid:uids,
        nombre: objeto.nombre,
        apellido: objeto.apellido,
        mail: objeto.mail,
        pass: objeto.pass,
        dni: objeto.dni,
        perfil:objeto.perfil,
        cuil: objeto.cuil,
        estado:0,
        img: objeto.img,
        token:objeto.token,
        }).then(res => {
        console.log('Llega bien perri');
      }).catch(err => console.log(err));
    });
  }

  agregarPedido(usuario: string, uid: string) {
    return  this.db.collection('usuarios').doc(usuario).update({
      pedido: uid,
    });
  }

  liberarCliente(usuario: string) {
    console.log('llega');
    return  this.db.collection('usuarios').doc(usuario).update({
      estado: 9,
      mesa: '',
      pedido: ''
    });
  }

  addConsulta(consultas: any, user: any){
    console.log('llega consulta');
    return this.db.collection('consultas').ref.orderBy('id','desc').limit(1).get().then(res=>{
       res.forEach( a =>{
         console.log('info id');
         const ids = Number(a.id) + 1;
         console.log(ids);
          this.db.collection('consultas').doc(ids.toString()).set({
           id:ids,
           mesa: user.mesa.numero,
           estado:0,
           usuario: user,
           consulta: consultas,
          });
       });
     });
   }

   responderConsulta(idConsulta,respuestas,mozos)
   {
      return  this.db.collection('consultas').doc(idConsulta.toString()).update({
        respuesta: respuestas,
        mozo:mozos,
        estado:1,
      });
   }
}
