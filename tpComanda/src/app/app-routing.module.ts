import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./paginas/home/home.module').then( m => m.HomePageModule),
    canActivate:[LoginGuard]
  },
  {
    path: 'registro-adm',
    loadChildren: () => import('./paginas/registro-adm/registro-adm.module').then( m => m.RegistroAdmPageModule)
  },
  {
    path: 'registro-plato',
    loadChildren: () => import('./paginas/registro-plato/registro-plato.module').then( m => m.RegistroPlatoPageModule)
  },
  {
    path: 'registro-mesa',
    loadChildren: () => import('./paginas/registro-mesa/registro-mesa.module').then( m => m.RegistroMesaPageModule)
  },
  {
    path: 'envio-domicilio',
    loadChildren: () => import('./paginas/envio-domicilio/envio-domicilio.module').then( m => m.EnvioDomicilioPageModule)
  },
  {
    path: 'pedir-mesa',
    loadChildren: () => import('./paginas/pedir-mesa/pedir-mesa.module').then( m => m.PedirMesaPageModule)
  },
  {
    path: 'reservar-mesa',
    loadChildren: () => import('./paginas/reservar-mesa/reservar-mesa.module').then( m => m.ReservarMesaPageModule)
  },
  {
    path: 'registro-cliente',
    loadChildren: () => import('./paginas/registro-cliente/registro-cliente.module').then( m => m.RegistroClientePageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./paginas/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'verificacion',
    loadChildren: () => import('./paginas/verificacion/verificacion.module').then( m => m.VerificacionPageModule)
  },
  {
    path: 'cliente-espera',
    loadChildren: () => import('./paginas/cliente-espera/cliente-espera.module').then( m => m.ClienteEsperaPageModule)
  },
  {
    path: 'lista-autorizar',
    loadChildren: () => import('./paginas/lista-autorizar/lista-autorizar.module').then( m => m.ListaAutorizarPageModule)
  },
  {
    path: 'lista-pedidos',
    loadChildren: () => import('./paginas/lista-pedidos/lista-pedidos.module').then( m => m.ListaPedidosPageModule)
  },
  {
    path: 'lista-pedidos-cocina',
    loadChildren: () => import('./paginas/lista-pedidos-cocina/lista-pedidos-cocina.module').then( m => m.ListaPedidosCocinaPageModule)
  },
  {
    path: 'lista-pedidos-mozo',
    loadChildren: () => import('./paginas/lista-pedidos-mozo/lista-pedidos-mozo.module').then( m => m.ListaPedidosMozoPageModule)
  },
  {
    path: 'mi-pedido',
    loadChildren: () => import('./paginas/mi-pedido/mi-pedido.module').then( m => m.MiPedidoPageModule)
  },
  {
    path: 'lista-pendientes',
    loadChildren: () => import('./paginas/lista-pendientes/lista-pendientes.module').then( m => m.ListaPendientesPageModule)
  },
  {
    path: 'lista-cobros',
    loadChildren: () => import('./paginas/lista-cobros/lista-cobros.module').then( m => m.ListaCobrosPageModule)
  },
  {
    path: 'lista-pedidos-bar',
    loadChildren: () => import('./paginas/lista-pedidos-bar/lista-pedidos-bar.module').then( m => m.ListaPedidosBarPageModule)
  },
  {
    path: 'chats',
    loadChildren: () => import('./paginas/chats/chats.module').then( m => m.ChatsPageModule)
  },
  {
    path: 'rechazo-cliente',
    loadChildren: () => import('./paginas/rechazo-cliente/rechazo-cliente.module').then( m => m.RechazoClientePageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
