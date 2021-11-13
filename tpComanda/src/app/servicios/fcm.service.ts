import { Injectable } from '@angular/core';

import { Platform } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(private afs: AngularFirestore, private platform: Platform) {
  }
}
