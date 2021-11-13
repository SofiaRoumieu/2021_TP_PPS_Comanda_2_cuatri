import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { DataService } from 'src/app/servicios/data.service';
import { FotoService } from 'src/app/servicios/foto.service';
import { ToastService } from 'src/app/servicios/toast.service';

@Component({
  selector: 'app-registro-plato',
  templateUrl: './registro-plato.page.html',
  styleUrls: ['./registro-plato.page.scss'],
})
export class RegistroPlatoPage implements OnInit {

  form: FormGroup;
  logeando=true;
  ocultarVerificar: boolean;

  esProfesional = false;
  esAdmin = false;

  user: any = new Usuario();

  usuarios = [
    {value: 'admin', viewValue: 'Administrador'},
    {value: 'profesional', viewValue: 'Profesional'},
    {value: 'usuario', viewValue: 'Usuario'}
  ];

  tipoAlta = [
    {value: 'Comida', viewValue: 'Plato'},
    {value: 'Bebida', viewValue: 'Bebida'}
  ];

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private dataService: DataService,
              public router: Router,
              public alertController: AlertController,
              private fotoService: FotoService,
              private auth: AuthService,
              public toas: ToastService) { }

  ngOnInit() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [0, Validators.required],
      tipo: ['', Validators.required],
      img1: ['', Validators.required],
      img2: ['', Validators.required],
      img3: ['', Validators.required]
    });

  }

  ionViewWillEnter() {
    this.auth.getCurrentUserMail().then(res =>{
      this.dataService.getUserByUid(res.uid).subscribe(us =>{
        this.user = us;
        if(this.user.perfil === 'bar') {
          this.form.controls.tipo.setValue('Bebida');
        } else if (this.user.perfil === 'cocinero') {
          this.form.controls.tipo.setValue('Comida');
        }
      });
    });
  }

  crear(){
    const { nombre, descripcion, precio, tipo, img1, img2, img3 } = this.form.value;

    const plato = {
      nombre,
      descripcion,
      precio,
      tipo,
      img1,
      img2,
      img3
    };

    if (this.form.valid) {
      this.dataService.crear('platos', plato).then(res => {
        console.log('llega bien perri');
        this.toas.success('Plato registrado con éxito');
        this.limpiarForm();
      }).catch(err => {console.log(err);
        this.toas.error('Ocurrió un error a la hora del Registro');
      });;
    }
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

  tomarFoto(img) {
    const { nombre, tipo } = this.form.value;

    const comida = {
      nombre,
      tipo
    };

    this.fotoService.takePhoto()
      .then(imageData => {
        if (imageData !== 'No Image Selected') {
          this.subirFoto(imageData, comida, img);
        } else {
          // this.toastService.errorToast('No tomó la foto.');
        }
      })
      .catch(error => {
        // this.toastService.errorToast('Error: No se ha podido cargar la foto. ' + error.message);
      });
  }

  subirFoto(imageData, comida, img) {
    this.fotoService.uploadPhotoComida(imageData, comida)
      .then(res => {
        this.form.controls[img].setValue(res);
        // this.toastService.confirmationToast("Foto guardada")
      })
      .catch(err => {
        // this.toastService.errorToast('Error: No se ha podido guardar la foto. ' + err.message);
      });
  }

  limpiarForm() {
    this.form.controls.nombre.setValue('');
    this.form.controls.descripcion.setValue('');
    this.form.controls.precio.setValue(0);
    this.form.controls.img1.setValue('');
    this.form.controls.img2.setValue('');
    this.form.controls.img3.setValue('');

    this.form.reset();
  }

}
