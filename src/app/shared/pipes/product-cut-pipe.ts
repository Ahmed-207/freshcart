import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productCut',
})
export class ProductCutPipe implements PipeTransform {

  transform(value: string, limit : number): string {
    return value.split(' ', limit).join(' ');
  }

}
