import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descuento'
})
export class DescuentoPipe implements PipeTransform {

  transform(descuento: number): string {
    switch (descuento) {
      case 0:
        return 'Sin participar';
      case 1:
        return 'Ganó su descuesto';
      case 2:
        return 'Perdió su descuento';
    }
  }

}
