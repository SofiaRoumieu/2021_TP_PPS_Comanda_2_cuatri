import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { AuthService } from '../servicios/auth.service';
import { DataService } from '../servicios/data.service';
import { ToastService } from '../servicios/toast.service';
@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private data: DataService,
    private toast: ToastService,
    private route: Router)
  {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise((resolve,rejects )=>{
            this.auth.getCurrentUserMail().then(res => {
              if( res!==undefined)
              {
              // return true;
                let usuario;
                this.data.getUserByUid(res.uid).subscribe(us =>{
                    usuario = us;
                    console.log(usuario);
                    if(usuario.perfil === 'Cliente')
                    {
                        if(res.emailVerified)
                        {
                          if(usuario.estado === 0)
                          {
                            this.route.navigate(['/cliente-espera']);
                            rejects(false);

                          }
                          else
                          {
                            if(usuario.estado === -1)
                            {
                              this.route.navigate(['rechazo-cliente']);
                            }
                            else
                            {
                              resolve(true);

                            }

                          }
                        }
                        else
                        {
                          this.toast.warning('Necesitás validar tu correo');
                          // alert("Necesitás estar logueado para ingresar a esta ruta")
                          this.route.navigate(['/verificacion']);
                        //  return false;
                        //retorno = false;
                        resolve(false);
                        }
                    }
                    else
                    {
                      resolve(true);
                    }
                });
              }
              else
              {
                this.toast.error('Necesitás estar registrado para ingresar a esta ruta');
                this.route.navigate(['/login']);
                resolve(false);
              }
          }).catch(res =>{
            this.toast.error(res);
            this.route.navigate(['/Login']);
            rejects(false);
          });
      });
   }
}
