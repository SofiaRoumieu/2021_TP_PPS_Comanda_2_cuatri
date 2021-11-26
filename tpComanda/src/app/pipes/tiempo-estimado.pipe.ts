import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tiempoEstimado'
})
export class TiempoEstimadoPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): number {
    let tiempo=0;
    if(value==75){
      return 10;
    }
      return value/2;
  }

}
