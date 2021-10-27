import { Injectable } from '@angular/core';
import { Photo } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
import { Platform } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Url } from 'url';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public photos: UserPhoto[] = [];
  private PHOTO_STORAGE: string = 'photos';
  tmpImage: string;
  imageId: number = Math.floor(Math.random() * 9999999);
  img:string[] = []

  constructor(private platform: Platform , private _storage : AngularFireStorage,private camera: Camera) {}

  public async loadSaved() {
    // Retrieve cached photo array data
    const photoList = await Storage.get({ key: this.PHOTO_STORAGE });
    this.photos = JSON.parse(photoList.value) || [];

    // If running on the web...
    if (!this.platform.is('hybrid')) {
      // Display the photo by reading into base64 format
      for (let photo of this.photos) {
        // Read each saved photo's data from the Filesystem
        const readFile = await Filesystem.readFile({
          path: photo.filepath,
          directory: Directory.Data,
        });

        // Web platform only: Load the photo as base64 data
        photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
      }
    }
  }

  /* Use the device camera to take a photo:
  // https://capacitor.ionicframework.com/docs/apis/camera

  // Store the photo data into permanent file storage:
  // https://capacitor.ionicframework.com/docs/apis/filesystem

  // Store a reference to all photo filepaths using Storage API:
  // https://capacitor.ionicframework.com/docs/apis/storage
  */
  public async addNewToGallery(sourceType:any) {
    // Take a photo
    if(this.img.length < 3)
    {
      
      try {
        const options: CameraOptions = {
          quality: 50,
          targetHeight: 600,
          targetWidth: 600,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
          correctOrientation: true,
          sourceType
        };
  
  
        this.camera.getPicture(options)
          .then(async (imageData) => {
            console.log('Data de la imagen --------->', imageData);
            this.tmpImage = 'data:image/jpeg;base64,' + imageData;
            const putPictures = this._storage.storage.ref('productos/' + this.imageId + '.jpeg');
            putPictures.putString(this.tmpImage, 'data_url').then((snapshot) => {
              console.log('snapshot', snapshot.ref);
              const getPicture = this._storage.storage.ref('productos/' + this. imageId + '.jpeg').getDownloadURL();
              getPicture.then((url) => {
                this.img.push(url);
                console.log(url);
                });
            });
            
          })
          .catch((e) => {
            alert(e);
            this.tmpImage = undefined;
          });
      } catch (e) {
        alert(e);
        this.tmpImage = undefined;
      }
      this.imageId = Math.floor(Math.random() * 9999999);
    
     
    }
    else
    {
      alert("el maximo de fotos que puede haber son 3")
    }
  }

  // Save picture to file on device
  private async savePicture(cameraPhoto: any) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(cameraPhoto);
    
    // Write the file to the data directory
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
      
    });
    
    if (this.platform.is('hybrid')) {
      // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    } else {
      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        filepath: fileName,
        webviewPath: cameraPhoto.webPath,
      };
    }
  }

  // Read camera photo into base64 format based on the platform the app is running on
  private async readAsBase64(cameraPhoto: Photo) {
    // "hybrid" will detect Cordova or Capacitor
    if (this.platform.is('hybrid')) {
      // Read the file into base64 format
      const file = await Filesystem.readFile({
        path: cameraPhoto.path,
      });

      return file.data;
    } else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(cameraPhoto.webPath!);
      const blob = await response.blob();

      return (await this.convertBlobToBase64(blob)) as string;
    }
  }

  // Delete picture by removing it from reference data and the filesystem
  public async deletePicture(url: string, position: number) {
    // Remove this photo from the Photos reference data array
    this.img.splice(position, 1);
    console.log(this.img)
    // Update photos array cache by overwriting the existing photo array
    /*Storage.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos),
    });*/

    // delete photo file from filesystem
    /*const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);
    await Filesystem.deleteFile({
      path: filename,
      directory: Directory.Data,
    });*/
  }

  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
}

export interface UserPhoto {
  filepath: string;
  webviewPath: string;
}