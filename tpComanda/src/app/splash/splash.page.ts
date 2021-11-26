import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(private platform: Platform,
              private statusBar: StatusBar,
              private auth: AuthService,
              private roure: Router) {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      SplashScreen.hide();


     // timer(5000).subscribe(() => this.showSplash = false);

      setTimeout(()=>{
        this.roure.navigateByUrl('login',{replaceUrl:true});

      },3500);

    });
  }

  ngOnInit() {

  }

}
