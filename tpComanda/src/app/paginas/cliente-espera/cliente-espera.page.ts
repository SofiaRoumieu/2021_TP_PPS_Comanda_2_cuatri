import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
@Component({
  selector: 'app-cliente-espera',
  templateUrl: './cliente-espera.page.html',
  styleUrls: ['./cliente-espera.page.scss'],
})
export class ClienteEsperaPage implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  loguearse()
  {
    this.auth.logOut();
  }

}
