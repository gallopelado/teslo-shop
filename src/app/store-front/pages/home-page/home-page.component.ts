import { Component, inject } from '@angular/core';
import { ProductCardComponent } from '@/products/components/product-card/product-card.component';
import { ProductsService } from '@/products/services/products.service';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { PaginationComponent } from "@/shared/components/pagination/pagination.component";
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

  productsService = inject(ProductsService);

  activatedRoute = inject(ActivatedRoute);

  // el queryparams puede ser nulo
  currentPage = toSignal(
    this.activatedRoute.queryParamMap.pipe(
      map( params => (params.get('page') ? +params.get('page')! : 1) ),
      map( page => (isNaN(page) ? 1 : page) ),
    ),
    {
      // siempre va a retornar un valor numérico
      initialValue: 1,
    }
  );

  productsResource = rxResource({
    // empieza en 0 por eso restamos 1
    request: () => ({ page: this.currentPage() - 1 }),
    loader: ( { request } ) => {
      return this.productsService.getProducts({
        // traer de 9 en 9
        offset: request.page * 9
      });
    }
  });

}
