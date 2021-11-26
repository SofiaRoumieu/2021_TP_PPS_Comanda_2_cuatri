import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  dbPedidosRef: AngularFirestoreCollection<any>;
  constructor(private db: AngularFirestore) {
    this.dbPedidosRef = this.db.collection('pedidos');
   }

  updateEstado(pedido: any, estados: number) {
    return  this.db.collection('pedidos').doc(pedido).update({
      estado: estados,
    });
  }

  updateEstadoCocina(pedido: any, estado: number) {
    return  this.db.collection('pedidos').doc(pedido).update({
      estadoCocina: estado,
    });
  }
  updateEstadoBar(pedido: any, estado: number) {
    return  this.db.collection('pedidos').doc(pedido).update({
      estadoBar: estado,
    });
  }

  updateDescuento(pedido: any, descuentos: number) {
    return  this.db.collection('pedidos').doc(pedido).update({
      descuento: descuentos,
    });
  }

  updateEncuesta(pedido: any, estados: number) {
    return  this.db.collection('pedidos').doc(pedido).update({
      estado: estados,
    });
  }

  //cambiamos el tipo de datos de propina. sofia 24/11
  pedirCuenta(pedido: any, propinas: any, subtotals: number) {
    return  this.db.collection('pedidos').doc(pedido).update({
      estado: 5,
      propina: propinas,
      subtotal: subtotals
    });
  }
  // getPedido(uid: string) {
  //   return new Promise ((resolve, rejects) => {
  //     this.getPedidoUser(uid).subscribe(res => {
  //       let respuesta:any []= res;
  //       let doc = respuesta.filter(x => x.usuario.uid == uid && x.estado != 9);
  //       resolve(doc);
  //     })
  //   })
  // }

  getPedidoUser() {
    return this.db.collection('pedidos').valueChanges();
  }

  getPedido(uid: string) {
    return this.dbPedidosRef.doc(uid).valueChanges();
  }

  agregarEncuesta(pedido: string, encuestas: any) {
    return  this.db.collection('pedidos').doc(pedido).update({
      encuesta: encuestas,
      estadoEncuesta: 1
    });
  }
}
