import { Injectable } from '@angular/core';

import emailjs from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor() { }

  public sendEmailAceptado(mail: string, nombre: string) {
    const parametros = {
      userEmail: mail,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      to_name: nombre,
      message: 'Fuiste aceptado!'
    };

    emailjs.send('service_nv1cmge','template_rbgyqcc', parametros, 'user_uT2OLuYHooym4UHyS8wA8')
    .then((response) => {
       console.log('SUCCESS!', response.status, response.text);
    }, (err) => {
       console.log('FAILED...', err);
    });
  }

  public sendEmailRechazado(mail: string, nombre: string) {
    const parametros = {
      userEmail: mail,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      to_name: nombre,
      message: 'Lo sentimos pero no fuiste aceptado'
    };

    emailjs.send('service_nv1cmge','template_rbgyqcc', parametros, 'user_uT2OLuYHooym4UHyS8wA8')
    .then((response) => {
       console.log('SUCCESS!', response.status, response.text);
    }, (err) => {
       console.log('FAILED...', err);
    });
  }
}
