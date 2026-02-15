import { Pipe, PipeTransform } from '@angular/core';
import { Products } from '../../core/models/products/products.interface';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {

  transform(productsList: Products[], searchKey: string): Products[] {
    return productsList.filter((item)=> item.title.toLowerCase().includes(searchKey.toLowerCase()));
  }

}
