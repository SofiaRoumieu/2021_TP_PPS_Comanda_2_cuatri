import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
//import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class FotoService {

  options: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.CAMERA,
    correctOrientation: true
  };

  // imagePickerOptions: ImagePickerOptions = {
  //   quality: 50,
  //   outputType: 1
  // };

  constructor(
    private dataServ: StorageService,
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    // private file: File,
    ) {
  }

  takePhoto() {
    return this.camera.getPicture(this.options)
      .then( res => res)
      .catch(error => {
        console.error(error);
        return error;
      });
  }

  // choosePhoto() {
  //   return this.imagePicker.getPictures(this.imagePickerOptions)
  //     .then(res => {
  //       console.log(res);
  //       return res;
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       return error;
  //     });
  // }

  uploadPhoto(info, usuario) {
    return new Promise ((resolve, rejects) => {
      this.dataServ.uploadToStorage(info)
      .then(res => {
        res.ref.getDownloadURL()
          .then(url => {
            this.dataServ.storeInfoDatabase(res.metadata, url, usuario);
            resolve(url);
          })
          .catch((err) => rejects(err));
      });
    });
  }

  uploadPhotoComida(info, comida) {
    return new Promise ((resolve, rejects) => {
      this.dataServ.uploadToStorage(info)
      .then(res => {
        res.ref.getDownloadURL()
          .then(url => {
            this.dataServ.storeInfoDatabaseComida(res.metadata, url, comida);
            resolve(url);
          })
          .catch((err) => rejects(err));
      });
    });
  }
}
