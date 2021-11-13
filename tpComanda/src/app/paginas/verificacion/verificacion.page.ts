import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/servicios/auth.service';
import { ToastService } from 'src/app/servicios/toast.service';

@Component({
  selector: 'app-verificacion',
  templateUrl: './verificacion.page.html',
  styleUrls: ['./verificacion.page.scss'],
})
export class VerificacionPage implements OnInit {

  email: any = '***@gmail.com';
  constructor(private auth: AuthService,private toast: ToastService) { }

  ngOnInit() {
    //  this.auth.getCurrentUserMail().then(res =>{
    //    this.email = res.email;
    //  })
  }
  ionViewWillEnter()
  {
    this.auth.getCurrentUserMail().then(res =>{
      this.email = res.email;
    });
  }

  loguearse()
  {
    //this.route.navigate(['/Login']);
    this.auth.logOut();
  }
  rEmail(){
    this.auth.sendVerificationEmail().then(res =>{
      //alert("Email reenviado con Éxito");
      this.toast.success('Email reenviado con Éxito');

    }).catch(error =>{
      //alert(error);
      this.toast.error(error);
    });
  }
}
