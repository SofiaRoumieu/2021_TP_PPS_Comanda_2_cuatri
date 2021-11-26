import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';

import { AuthService } from 'src/app/servicios/auth.service';
import { DataService } from 'src/app/servicios/data.service';
import { FotoService } from 'src/app/servicios/foto.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ScanerService } from '../../servicios/scaner.service';
import {

  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { ToastService } from 'src/app/servicios/toast.service';


@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.page.html',
  styleUrls: ['./registro-cliente.page.scss'],
})
export class RegistroClientePage implements OnInit {

  form: FormGroup;
  logeando=true;
  ocultarVerificar: boolean;
  resultado: any;

  esProfesional = false;
  esAdmin = false;
  aux;

  usuarios = [
    {value: 'admin', viewValue: 'Administrador'},
    {value: 'profesional', viewValue: 'Profesional'},
    {value: 'usuario', viewValue: 'Usuario'}
  ];

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private dataService: DataService,
              private usuarioService: UsuarioService,
              private scanner: ScanerService,
              public router: Router,
              public alertController: AlertController,
              public toas: ToastService,
              private fotoService: FotoService ) { }

  ngOnInit() {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      mail: ['', Validators.required],
      clave: ['', [Validators.required, Validators.minLength(6)]],
      dni: ['', [Validators.required, Validators.min(1000000), Validators.maxLength(99999999)]],
      cuil: ['', [Validators.required, Validators.min(10000000000), Validators.max(99999999999)]],
      perfil: [''],
      img: ['']
    });
  }



  crear(){
    let tokenA: any;
    /*PushNotifications.requestPermissions().then( result => {
      if (result.receive==='granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });*/
    // On success, we should be able to receive notifications
   /* PushNotifications.addListener('registration',
    (token: Token) => {*/
     //  alert('Push registration success, token: ' + token.value);
        console.log('Push registration success, token: ');
        //console.log(token.value);
        tokenA ='4aeca4d9-64e7-43f1-986f-f84b301c36c9'; //token.value;
        console.log('envio de notificacion');
        console.log('llega');
        this.form.controls.perfil.setValue('Cliente');
        const { nombre, apellido, mail, clave, dni, cuil, perfil, img } = this.form.value;
        const usuario = {
          nombre,
          apellido,
          mail,
          pass: clave,
          dni,
          perfil,
          cuil,
          img,
          estado:0,
          token: tokenA,
        };
        if (this.form.valid) {
          this.authService.register(usuario.mail, usuario.pass, usuario).then(res => {
              //console.log("llega bien perri");
              this.toas.success('Cliente registrado con éxito');
              this.authService
              .registrar('4aeca4d9-64e7-43f1-986f-f84b301c36c9',
              'Nuevo usuario',
              'Confirmar Usuario',
              usuario.img).toPromise().then(ress =>{
                console.log(ress);
              });
          }).catch(err => {console.log(err);
              this.toas.error('Ocurrió un error a la hora del Registro');
          });;
        }else
        {
          this.toas.error('Datos inválidos');
        }
      //}
    //);
  }

  seleccionUsuario() {
    const { perfil } = this.form.value;

    if (perfil === 'admin') {
      this.esAdmin = true;
      this.esProfesional = false;
    } else {
      this.esAdmin = false;
      this.esProfesional = true;
    }
  }

  scan() {
    this.scanner.scan().then(res=>{
     this.resultado = res.text;
    });
   }
   leerDni() {
    const opciones: BarcodeScannerOptions = {
      preferFrontCamera: false, // iOS and Android
      showFlipCameraButton: true, // iOS and Android
      showTorchButton: true, // iOS and Android
      torchOn: true, // Android, launch with the torch switched on (if available)
      //saveHistory: true, // Android, save scan history (default false)
      prompt: 'Scanee el DNI', // Android
      resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
      formats: 'PDF_417', // default: all but PDF_417 and RSS_EXPANDED
      orientation: 'landscape', // Android only (portrait|landscape), default unset so it rotates with the device
      disableAnimations: true, // iOS
      disableSuccessBeep: false // iOS and Android
    };

    // this.scanner.scan().then(res=>{
    //   this.resultado = res.text;
    //  })
    this.scanner.scan2(opciones).then(barcodeData => {
      //console.log('Barcode data', barcodeData);
      const split = barcodeData.text.split('@');
      console.log(split);
      if(split.length > 9)
      {
        this.form.controls.nombre.setValue(split[5]);
        this.form.controls.apellido.setValue(split[4]);
        this.form.controls.dni.setValue(parseInt(split[1], 10));
        this.form.controls.perfil.setValue('Cliente');

      }
      else{
        this.form.controls.nombre.setValue(split[2]);
        this.form.controls.apellido.setValue(split[1]);
        this.form.controls.dni.setValue(parseInt(split[4], 10));
        this.form.controls.perfil.setValue('Cliente');
      }
    }).catch(err => {
      console.log('Error', err);
    });
  }


  tomarFoto() {
    const { nombre, apellido, mail } = this.form.value;

    const usuario = {
      nombre,
      apellido,
      mail
    };

    this.fotoService.takePhoto()
      .then(imageData => {
        if (imageData !== 'No Image Selected') {
          this.subirFoto(imageData, usuario);
        } else {
          // this.toastService.errorToast('No tomó la foto.');
        }
      })
      .catch(error => {
        // this.toastService.errorToast('Error: No se ha podido cargar la foto. ' + error.message);
      });
  }

  subirFoto(imageData, usuario) {
    this.fotoService.uploadPhoto(imageData, usuario)
      .then(res => {
        this.form.controls.img.setValue(res);
        this.aux = res;
        // this.toastService.confirmationToast("Foto guardada")
      })
      .catch(err => {
        // this.toastService.errorToast('Error: No se ha podido guardar la foto. ' + err.message);
      });
  }
}
