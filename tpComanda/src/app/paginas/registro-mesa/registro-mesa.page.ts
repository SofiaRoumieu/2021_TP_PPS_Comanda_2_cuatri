import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';
import { DataService } from 'src/app/servicios/data.service';


@Component({
  selector: 'app-registro-mesa',
  templateUrl: './registro-mesa.page.html',
  styleUrls: ['./registro-mesa.page.scss'],
})
export class RegistroMesaPage implements OnInit {

  form: FormGroup;
  logeando=true;
  ocultarVerificar: boolean;

  esProfesional = false;
  esAdmin = false;

  usuarios = [
    {value: 'admin', viewValue: 'Administrador'},
    {value: 'profesional', viewValue: 'Profesional'},
    {value: 'usuario', viewValue: 'Usuario'}
  ];

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private dataService: DataService,
              public router: Router,
              public alertController: AlertController) { }

  ngOnInit() {
    this.form = this.fb.group({
      numero: ['', Validators.required],
      cantidad: ['', Validators.required],
      tipo: ['', Validators.required],
      img: ['', Validators.required]
    });
  }

  crear(){
    const { numero, cantidad, tipo, img } = this.form.value;

    const plato = {
      numero,
      cantidad,
      tipo,
      img
    };

    if (this.form.valid) {
      this.dataService.crear('mesas', plato).then(res => {
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

}
