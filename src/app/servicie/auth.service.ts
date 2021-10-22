import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore , AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Usuarios } from '../clases/usuarios';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public usuario: any={};
  resultados: Usuarios[]=[];
  private itemCollection: AngularFirestoreCollection<Usuarios> | undefined;
  constructor(private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private storange: AngularFireStorage,
    ) {
      this.auth.authState.subscribe( user =>{
        if(user){
          this.usuario.name=user.displayName;
          this.usuario.id=user.uid ;
       }
      });

     }
     public login(email: string, password: string) {
      console.log(email + ' ' + password);
      return this.auth.signInWithEmailAndPassword(email, password);
    }
    public logout() {
      return this.auth.signOut();
    }

     //traetoda la coleccion de los usuarios;
traerTodos(){
  this.itemCollection=this.firestore.collection<Usuarios>('baseDeDatos').doc('subColecciones').collection('usuarios',
  ref=>ref.orderBy('nombre','asc'));
  return this.itemCollection.valueChanges().pipe(map((resultados: Usuarios[]) =>{
    this.resultados=[];
    for(const res of resultados) {this.resultados.unshift(res);}
    return this.resultados;
  }));
}

//registro el usuario y agrego al nombre de la foto

registrarUsuario(data: Usuarios){
  return this.auth.createUserWithEmailAndPassword(data.email,data.password).then(userRef => {
    const nombreFoto='baseDeDatos/usuarios/'+Date.now()+'.'+data.dni+'.jpg';
    return this.subirImagen(nombreFoto,data.foto).then(url => {
      data.foto=url;
      return this.crearConId(data,userRef.user.uid);
    });
  });
}

subirImagen(ruta: string, data: any){
  return this.storange.ref(ruta).putString(data,'data_url').then(datas =>{
     datas.ref.getDownloadURL().then(x => x);
  });
}

public crearConId(data: any , id: string){
  let ida: any;
this.firestore.collection<Usuarios>('baseDeDatos').doc('subcolecciones').collection('usuarios').doc(id).set(data).then(
    ()=> {
    ida=id;
    }
  );
  return ida;
}
}
