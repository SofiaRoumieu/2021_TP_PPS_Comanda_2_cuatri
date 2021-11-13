import { Component ,OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { timer } from 'rxjs';


import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { AuthService } from './servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent  implements OnInit{
  showSplash = true;
  clase = 'candado ld ld-blur-in';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthService,
    private roure: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();


      timer(6000).subscribe(() => this.showSplash = false);
    });
  }

  ngOnInit() {
    if(this.platform.is('capacitor')){
      console.log('Initializing HomePage');
    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then( result => {
      if (result.receive==='granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
        this.addListeners();
      } else {
        // Show some error
      }
    });
    }else{
      console.log('pushNotifications.RequiestPeromission() -> no es movil');
    }
  }


  addListeners(){
    PushNotifications.addListener('registration',
    (token: Token) => {
      // alert('Push registration success, token: ' + token.value);
      console.log('Push registration success, token: ');
      console.log(token.value);
      console.log('envio de notificacion');
      }
    );
    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
       console.log('Error on registration: ' + error);
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {

       // alert('Push received: ' + JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
      //  alert('Push action performed: ' + JSON.stringify(notification));
        this.roure.navigate(['/home']);
        console.log(JSON.stringify(notification));
      }
    );
  }
}
