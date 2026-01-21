import { ProductsService } from '@/products/services/products.service';
import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-page',
  imports: [],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent {

  productsService = inject(ProductsService);
  productIdSlug = inject(ActivatedRoute).snapshot.params['idSlug'];

  // rxResource
  productResource = rxResource({
    request: () => ({ code: this.productIdSlug }),
    loader: ({ request }) => {
      return this.productsService.getProductByIdSlug(request.code);
    }
  });

}
