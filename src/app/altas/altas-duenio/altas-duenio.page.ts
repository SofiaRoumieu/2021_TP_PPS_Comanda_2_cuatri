import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/servicie/auth.service';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-altas-duenio',
  templateUrl: './altas-duenio.page.html',
  styleUrls: ['./altas-duenio.page.scss'],
})
export class AltasDuenioPage implements OnInit {

  perfil="DUEÑO";
  perfile=true;
  public form: FormGroup = this.formBuilder.group({
    nombre: [null, [Validators.required, Validators.pattern('^[a-zA-ZñÑ]{3,25}$')]],
		apellido: [null, [Validators.required, Validators.pattern('^[a-zA-ZñÑ]{3,25}$')]],
		dni: [null, [Validators.required, Validators.pattern('^[0-9]{8}$')]],
		contrasenia: [null, [Validators.required, Validators.pattern('^[a-zA-ZñÑ0-9_-]{6,18}$')]],
		contraseniaR: [null, [Validators.required]],
		correo: [null, [Validators.required, Validators.email]],
		foto: [null, [Validators.required]]
  });

  public barcodeOptions: BarcodeScannerOptions = {
    prompt: 'Place a barcode inside the scan area',
		formats: 'QR_CODE,PDF_417',
		orientation: 'landscape'
	};


	public validationMessages ={
		"nombre": [
			{ type: 'required', message: 'El nombre es requerido.' },
			{ type: 'pattern', message: 'Introduzca un nombre de mínimo 3 a 20 caracteres y no números.' }
		],
		"apellido": [
			{ type: 'required', message: 'El apellido es requerido.' },
			{ type: 'pattern', message: 'Introduzca un apellido de mínimo 3 a 20 caracteres y no números.' }
		],
		"dni": [
			{ type: 'required', message: 'El DNI es requerido.' },
			{ type: 'pattern', message: 'Introduzca un DNI válido(8 caracteres).' }
		],
		"correo": [
			{ type: 'required', message: 'El correo electronico es requerido.' },
			{ type: 'email', message: 'Introduzca un correo electrónico válido.' }
		],
		"contrasenia": [
			{ type: 'required', message: 'La contraseña es requerida.' },
			{ type: 'pattern', message: 'La contraseña debe tener entre 6 y 18 caracteres.' }
		],
		"foto": [
			{ type: 'required', message: 'La foto es requerida.' },
		]
	};

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private qr: BarcodeScanner,
    private camera: Camera,
    private toastController: ToastController) {
     }

  ngOnInit() {
  }


  cambioPerfil(){
    console.log(this.perfile);
    if(this.perfile){
      //nose si va bien capas es mejor el de arriba
      this.presentToastConMensajeYColorDos('El perfil del usuario se cambio','warning');
      this.perfil="SUPERVISOR";
    }else{
      this.presentToastConMensajeYColorDos('El perfil del usuario se cambio','warning');
      this.perfil="DUEÑO";
    }
  }
	tomarFotografia() {
		const options: CameraOptions = {
			quality: 100,
			targetHeight: 600,
			targetWidth: 600,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			correctOrientation: true
		};
		this.camera.getPicture(options).then((imageData) => {
			const base64Str = 'data:image/jpeg;base64,' + imageData;
			this.form.controls.foto.setValue(base64Str);
		});
	}

  escanearDni() {
		const scanSub = this.qr.scan(this.barcodeOptions).then(dataString => {
			let x: any = [];
			x = dataString.text.split('@');
			if (x.length === 8 || x.length === 9) {
				this.form.controls.apellido.setValue(x[1]);
				this.form.controls.nombre.setValue(x[2]);
				this.form.controls.dni.setValue(x[4]);
			} else {
				this.form.controls.dni.setValue(x[1]);
				this.form.controls.apellido.setValue(x[4]);
				this.form.controls.nombre.setValue(x[5]);
			}
		}).catch(
      error=>{

      }
    );
	}
  registrar() {
    let perfils='';
    if(this.perfile){
      perfils='supervisor';
    }else{
      perfils='duenio';
    }
		const data: any = {
			nombre: this.form.value.nombre,
      apellido:this.form.value.apellido,
			dni: this.form.value.dni,
			correo: this.form.value.correo,
			contrasenia: this.form.value.contrasenia,
			foto: this.form.value.foto,
      perfil:perfils
		};
		this.auth.registrarUsuario(data).then(() => {
			// this.comp.presentLoading();
			this.limpiarCampos();
			this.presentToastConMensajeYColor('El Usuario ha sido registrado.','success');
		}).catch(err => {
			this.presentToastConMensajeYColor('Error: no se pudo cargar el usuario','danger');
		});
	}

	limpiarCampos() {
		this.form.reset();
	}

  async presentToastConMensajeYColor(mensaje: string, ccolor: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      position: 'top',
      duration: 3000,
      color: ccolor,
    buttons: [
      {
        text: 'Aceptar',
        role: 'cancel',
      }
    ]
  });
  toast.present();
  }

  async presentToastConMensajeYColorDos(mensaje: string, ccolor: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      position: 'bottom',
      duration: 3000,
      color: ccolor,
    buttons: [
      {
        text: 'Aceptar',
        role: 'cancel',
      }
    ]
  });
  toast.present();
  }



}
