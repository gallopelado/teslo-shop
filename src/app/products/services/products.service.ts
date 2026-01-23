import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, ProductsResponse } from '../interfaces/product.interface';
import { Observable, of, pipe, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

interface Options {
  limit?: number;
  offset?: number;
  gender?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private http = inject(HttpClient);

  getProducts(options: Options): Observable<ProductsResponse> {

    const { limit = 9, offset = 0, gender = '' } = options;

    return this.http.get<ProductsResponse>(`${baseUrl}/products`, {
      params: {
        limit: limit,
        offset: offset,
        gender: gender
      }
    })
      .pipe(
        tap(resp => console.log(resp))
      );
  }

  getProductByIdSlug(idSlug: string): Observable<Product> {

    if ( !idSlug ) {
      return of();
    }

    return this.http.get<Product>(`${baseUrl}/products/${ idSlug }`);

  }

  getProductsByGender(gender: string): Observable<ProductsResponse> {

    if ( !gender ) {
      return of();
    }

    return this.http.get<ProductsResponse>(`${baseUrl}/products?gender=${ gender }`)
      .pipe(
          tap( resp => console.log(resp))
        )

  }

}
