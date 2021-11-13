import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController: ToastController) { }


   async success(mensaje: string ){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color:'success',
      position: 'top',
      buttons:[
        {
          text:'cancelar',
          role:'cancel',
          handler:()=>{
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

  async warning(mensaje: string ){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color:'warning',
      position: 'top',
      buttons:[
        {
          text:'cancelar',
          role:'cancel',
          handler:()=>{
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

  async error(mensaje: string ){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color:'danger',
      position: 'top',
      buttons:[
        {
          text:'cancelar',
          role:'cancel',
          handler:()=>{
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
}
