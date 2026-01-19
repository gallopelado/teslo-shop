import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

@Pipe({
  name: 'productImage'
})

export class ProductImagePipe implements PipeTransform {
  transform(value: string | string[]): any {

    // caso1: array > 1 = primer elemento
    if ( Array.isArray(value) && value.length > 1 ) {
      return `${baseUrl}/files/product/${value[0]}`;
    }
    // caso2: string
    if ( value instanceof String && value.trim().length > 0 ) {
      return `${baseUrl}/files/product/${value}`;;
    }
    // placeholder image: ./assets/images/no-image.jpg
    return `./assets/images/no-image.jpg`;

  }
}
