import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Router } from '@angular/router';
@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(private router: Router ,private splashScreen: SplashScreen
    ) {
    splashScreen.hide();
    setTimeout(()=>{
      this.router.navigateByUrl('login',{replaceUrl:true});

    },4000);
 }

  ngOnInit() {
  }

}
