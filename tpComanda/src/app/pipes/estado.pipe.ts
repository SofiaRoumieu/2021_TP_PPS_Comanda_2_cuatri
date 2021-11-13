import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estado'
})
export class EstadoPipe implements PipeTransform {

  transform(estado: number): string {
    switch (estado) {
      case 0:
        return 'Pedido pendiente';
      case 1:
        return 'Pedido relevado';
      case 2:
        return 'Pedido en cocina';
      case 3:
        return 'Pedido a entregar';
      case 4:
        return 'Pedido en mesa';
      case 5:
        return 'Pidio la cuenta';
      case 6:
        return 'Pago confirmado';
    }
  }

}
