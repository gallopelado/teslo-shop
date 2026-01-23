import { ProductsService } from '@/products/services/products.service';
import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ProductCardComponent } from "@/products/components/product-card/product-card.component";

@Component({
  selector: 'app-gender-page',
  imports: [ProductCardComponent],
  templateUrl: './gender-page.component.html',
})
export class GenderPageComponent {

  productsService = inject(ProductsService);
  route = inject(ActivatedRoute);

  // requerimos una señal u observable porque el parámetro recibido es cambiante
  gender = toSignal(this.route.params.pipe(map(({ gender }) => gender)));

  genderResource = rxResource({
    request: () => ({ gender: this.gender() }),
    loader: ({ request }) => {
      return this.productsService.getProductsByGender(request.gender);
    }
  });

}
