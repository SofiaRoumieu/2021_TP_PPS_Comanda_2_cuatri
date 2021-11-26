import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { PedidoService } from './pedido.service';
@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  dbEncuestasRef: AngularFirestoreCollection<any>;
  constructor(private db: AngularFirestore,
              private pedidoService: PedidoService) {
    this.dbEncuestasRef = this.db.collection('encuestasBis');
  }

  public crearConUid(objeto: any, pedidoUid: string) {
    console.log('Entro al crear encuesta');
    console.log('objeto', objeto);
    return this.db.collection('encuestasBis').add(objeto).then(res => {
      const doc = res;
      this.updateUID('encuestasBis', doc.id);
      objeto.uid = doc.id;
      this.pedidoService.agregarEncuesta(pedidoUid, objeto);
    });
  }

  updateUID(path: string, uids: string) {
    return  this.db.collection(path).doc(uids).update({
      uid: uids,
    });
  }

  getPedidoUser() {
    console.log("viene a buscar encuestas");
    return this.db.collection('encuestasBis').valueChanges();
  }

  getPedido(uid: string) {
    return this.dbEncuestasRef.doc(uid).valueChanges();
  }
}
