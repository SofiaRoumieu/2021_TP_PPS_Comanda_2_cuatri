import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';
import { DataService } from 'src/app/servicios/data.service';
import { FotoService } from 'src/app/servicios/foto.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-registro-adm',
  templateUrl: './registro-adm.page.html',
  styleUrls: ['./registro-adm.page.scss'],
})
export class RegistroAdmPage implements OnInit {

  form: FormGroup;
  logeando=true;
  ocultarVerificar: boolean;

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
              public router: Router,
              public alertController: AlertController,
              private fotoService: FotoService) { }

  ngOnInit() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      mail: ['', Validators.required],
      clave: ['', Validators.required],
      dni: ['', Validators.required],
      cuil: ['', Validators.required],
      perfil: ['', Validators.required],
      img: ['']
    });
  }

  crear(){
    const { nombre, apellido, mail, clave, dni, cuil, perfil, img } = this.form.value;

    const usuario = {
      nombre,
      apellido,
      mail,
      pass: clave,
      dni,
      cuil,
      perfil,
      img
    };

    if (this.form.valid) {
      this.authService.register(usuario.mail, usuario.pass, usuario).then(res => {
          console.log('llega bien perri');
      }).catch(err => console.log(err));;
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
        this.form.controls.imag.setValue(res);
        this.aux = res;
        // this.toastService.confirmationToast("Foto guardada")
      })
      .catch(err => {
        // this.toastService.errorToast('Error: No se ha podido guardar la foto. ' + err.message);
      });
  }

}
