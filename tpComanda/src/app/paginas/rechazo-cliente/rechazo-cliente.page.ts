import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
@Component({
  selector: 'app-rechazo-cliente',
  templateUrl: './rechazo-cliente.page.html',
  styleUrls: ['./rechazo-cliente.page.scss'],
})
export class RechazoClientePage implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }
  loguearse()
  {
    this.auth.logOut();
  }
}
