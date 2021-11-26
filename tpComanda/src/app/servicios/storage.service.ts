import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
// import { Imagen } from '../clases/imagen';
import { AuthService } from '../servicios/auth.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  newName: string;
  dbRef: AngularFirestoreCollection<any>;

  constructor(
    private db: AngularFirestore,
    private authService: AuthService,
    private db2: AngularFireDatabase,
    private fStorage: AngularFireStorage) {
    this.dbRef = this.db.collection('files');
  }

  uploadToStorage(info): AngularFireUploadTask {
    this.newName = `${new Date().getTime()}.jpeg`;
    const image = `data:image/jpeg;base64,${info}`;
    return this.fStorage.ref(`files/${this.newName}`).putString(image, 'data_url');
  }

  storeInfoDatabase(metainfo, urls, usuario) {
    return this.dbRef.doc(this.newName).set({
      url: urls,
      created: metainfo.timeCreated,
      fullPath: metainfo.fullPath,
      contentType: metainfo.contentType,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      mail: usuario.mail
    });
  }

  storeInfoDatabaseComida(metainfo, urls, comida) {
    return this.dbRef.doc(this.newName).set({
      url: urls,
      created: metainfo.timeCreated,
      fullPath: metainfo.fullPath,
      contentType: metainfo.contentType,
      nombre: comida.nombre,
      tipo: comida.tipo
    });
  }

  storeInfoDatabaseEncuesta(metainfo, urls, encuesta) {
    return this.dbRef.doc(this.newName).set({
      url: urls,
      created: metainfo.timeCreated,
      fullPath: metainfo.fullPath,
      contentType: metainfo.contentType,
      nombre: encuesta.usuario.mail,
      tipo: 'encuesta'
    });
  }
}
