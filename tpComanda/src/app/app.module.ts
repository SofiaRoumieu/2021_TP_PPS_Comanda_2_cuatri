import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DescuentoComponentePipe } from './pipes/descuento-componente.pipe';


//Foto
import { Camera } from '@ionic-native/camera/ngx';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PedidoComponent } from '../app/componentes/pedido/pedido.component';
import { JuegoComponent } from './componentes/juego/juego.component';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';
import { DetalleCuentaComponent } from './componentes/detalle-cuenta/detalle-cuenta.component';
import { VerPedidoComponent } from './componentes/ver-pedido/ver-pedido.component';
import { FcmService } from './servicios/fcm.service';
import { environment, firebaseConfig } from 'src/environments/environment';
import { RespuestaMozoComponent } from './componentes/respuesta-mozo/respuesta-mozo.component';

@NgModule({
  declarations: [
    AppComponent,
    DescuentoComponentePipe,
    PedidoComponent,
    JuegoComponent,
    EncuestaComponent,
    DetalleCuentaComponent,
    VerPedidoComponent,
    RespuestaMozoComponent,
  ],
  entryComponents: [PedidoComponent],
  imports: [

    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BarcodeScanner,
    Camera,
    FcmService,
    // EstadoPipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
