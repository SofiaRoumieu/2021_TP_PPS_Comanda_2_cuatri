import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { timer } from 'rxjs';
import { AuthService } from '../servicie/auth.service';
import Swal from 'sweetalert2';
import { Usuarios } from '../clases/usuarios';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public listaUsuarios: Array<any> = [];
  email: string;
  password: string;
  public mostrarError = false;

  constructor(
    private authSvc: AuthService,
    private router: Router,
    public loadingController: LoadingController) { }

  ngOnInit() {
  }

  limpiar(){
    this.email='';
    this.password='';
  }

  login(){
    this.authSvc.login(this.email,this.password).then(
      usuario=> {
        console.log(usuario);
        //guardar aca el perfil para usarlo;
        //nose como hacer para buscar con el email , el perfil del usuario
        //   ==========>>>>>>localStorage.setItem('usuario',perfil);
        this.buscarPerfil(this.email);
        this.presentLoading();
        timer(2000).subscribe(() =>{
         //no vuelve con un el boton para atras del cel
        this.router.navigateByUrl('home',{replaceUrl:true});
        });
    }).catch(
      error=> {
        if(error.code==='auth/wrong-password'){
          this.mensajeError('La contraseña es incorrecta con ese correo');
         this.limpiar();
        }else if(error.code==='auth/user-not-found'){
          this.mensajeError('El usuario no esta autorizado ');
          this.limpiar();
        }
      }
    );
  }

  //alert tunnig muy bueno
  mensajeError(texto: string){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text:texto,
    });
  }

  //spinner
  async presentLoading() {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      message: 'Cargando...',
      duration: 2000,
      translucent: true,

    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('usuario cargado');
  }

  buscarPerfil(email: string){
  for (const persona of this.authSvc.resultados){
    if(persona.email===email){
      localStorage.setItem('perfil',persona.perfil);
    }
  }
  }
  movernos(){
    this.router.navigateByUrl('/altas-duenio',{replaceUrl:true});
  }


}
