import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction,
  DocumentReference, QueryFn } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UsuarioService } from './usuario.service';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  dbUsersRef: AngularFirestoreCollection<any>;
  dbPedidosRef: AngularFirestoreCollection<any>;
  dbPlatosRef: AngularFirestoreCollection<any>;
  dbConsultas: AngularFirestoreCollection<any>;

  constructor(
    public http: HttpClient,
    public db: AngularFirestore,
    public afs: AngularFireStorage,
    public toastController: ToastController,
    public angularFireAuth: AngularFireAuth,
    private userService: UsuarioService
  ) {
    this.dbUsersRef = this.db.collection('usuarios');
    this.dbPedidosRef = this.db.collection('pedidos');
    this.dbPlatosRef = this.db.collection('platos');
    this.dbConsultas = this.db.collection('consultas');
  }

  traerColeccion(path: string, query: QueryFn = null): Observable<DocumentChangeAction<unknown>[]> {
    if(query == null){
      return this.db.collection(path).snapshotChanges();
    }
    else{
      return this.db.collection(path, query).snapshotChanges();
    }
  }

  traerUno(path: string, campo: string, valor: string) {
    return this.db
      .collection(path)
      .ref.where(campo, '==', valor)
      .get()
      .then(documento => {
        if (documento.docs.length > 0) {
          const usuario = documento.docs[0].data();
          return usuario;
        } else {
          return null;
        }
      });
  }

  getAll(path: string) {
    return this.db.collection(path).valueChanges();
  }

  getConsultas()
  {
    return this.dbConsultas.valueChanges();
  }

  public crear(path: string, objeto: any): Promise<DocumentReference> {
    console.log('Entro al crear');
    console.log('path', path);
    console.log('objeto', objeto);
    return this.db.collection(path).add(objeto);
  }

  public actualizar(path: string, doc: string, valor: any) {
    return this.db
      .collection(path)
      .doc(doc)
      .update(valor);
  }

  public setear(path: string, doc: string, valor: any) {
    return this.db
      .collection(path)
      .doc(doc)
      .set(valor);
  }

  public traerUnoPath(path: string, doc: string){
    return this.db
      .collection(path)
      .doc(doc)
      .get();
  }

  borrar(path: string, doc: string): void {
    console.log('pah', path, 'doc', doc);
    this.db
      .collection(path)
      .doc(doc)
      .delete()
      .catch(error => this.handleError(error));
  }

  handleError(error) {
    this.mostrarToast(error);
  }

  getUserByUid(uid: string) {
    return this.dbUsersRef.doc(uid).valueChanges();
  }

  getUserUid()
  {
      return new Promise((resolve, reject) => {
        this.angularFireAuth.onAuthStateChanged(user=>{
            if(user)
            {
              resolve(user.uid);
            }
            else
            {
              resolve('0');
            }
        });
      });


  }

  public crearConUID(path: string, objeto: any, userUid: string) {
    console.log('Entro al crear');
    console.log('path', path);
    console.log('objeto', objeto);
    return this.db.collection(path).add(objeto).then(res => {
      const doc = res;
      this.updateUID(path, doc.id);
      this.userService.agregarPedido(userUid, doc.id);
    });
  }

  updateUID(path: string, uids: string) {
    return  this.db.collection(path).doc(uids).update({
      uid: uids,
    });
  }

  // subirImagenYTraerURl(path: string, imagenBase64: string): Promise<any> {
  //   let picData = ManejarDatosFoto(imagenBase64);
  //   let type = picData.type.split("/")[1];
  //   return this.afs.storage
  //     .ref(`${path}.${type}`)
  //     .putString(picData.pic, picData.base, {
  //       contentType: picData.type
  //     })
  //     .then(data => data.ref.getDownloadURL());
  // }

  async mostrarToast(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      position: 'top',
      color: 'danger'
    });
    toast.present();
  }

  getUsuarios(){
    return this.dbUsersRef.valueChanges();
  }

  getPedidos(){
    return this.dbPedidosRef.valueChanges();
  }

  getPlatos(){
    return this.dbPlatosRef.valueChanges();
  }

  getaux() {
    return this.dbUsersRef.valueChanges();
  }
}
