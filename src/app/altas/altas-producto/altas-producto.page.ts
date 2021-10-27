import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { UserPhoto, PhotoService } from '../../servicie/photo.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Camera } from '@ionic-native/camera/ngx';
@Component({
  selector: 'app-altas-producto',
  templateUrl: './altas-producto.page.html',
  styleUrls: ['./altas-producto.page.scss'],
})
export class AltasProductoPage implements OnInit {

  ver:boolean = false
  nombre:string;
  descripcion:string;
  tiempo:any;
  precio:number
  colecciones: AngularFirestoreCollection;

  constructor(public photoService: PhotoService, private camera:Camera,public actionSheetController: ActionSheetController, private refereciasFirebase:AngularFirestore) 
  {
    this.colecciones = refereciasFirebase.collection("productos");
  }

  async ngOnInit() {
    await this.photoService.loadSaved();
  }
  async presentActionSheetCamera() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: 'Cámara',
          handler: () => {
            this.photoService.addNewToGallery(this.camera.PictureSourceType.CAMERA);
          }
        }, {
          text: 'Ver imágenes guardadas',
          handler: () => {
            this.photoService.addNewToGallery(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        }, {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }
  public async showActionSheet(url:string, position: number) {
   
      const actionSheet = await this.actionSheetController.create({
        header: 'Photos',
        buttons: [{
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.photoService.deletePicture(url, position);
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            // Nothing to do, action sheet is automatically closed
           }
        }]
      });
      await actionSheet.present();
    
  }
  registrar()
  {
    this.photoService.photos
    let producto = {nombre: this.nombre,descripcion:this.descripcion,tiempo:this.tiempo,precio:this.precio,imagenes:this.photoService.img}
    console.log(producto)
    //this.colecciones.add(producto);
  }

}
