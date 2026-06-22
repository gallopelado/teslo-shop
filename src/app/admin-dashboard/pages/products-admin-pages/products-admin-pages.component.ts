import { ProductTableComponent } from '@/products/components/product-card/product-table/product-table.component';
import { ProductsService } from '@/products/services/products.service';
import { PaginationService } from '@/shared/components/pagination/pagination.service';
import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaginationComponent } from "@/shared/components/pagination/pagination.component";

@Component({
  selector: 'app-products-admin-pages',
  imports: [ProductTableComponent, PaginationComponent],
  templateUrl: './products-admin-pages.component.html',
})
export class ProductsAdminPagesComponent {
  productsService = inject(ProductsService);
  paginationService = inject(PaginationService);
  productsPerPage = signal(10);

  productsResource = rxResource({
    request: () => ({ page: this.paginationService.currentPage() - 1, limit: this.productsPerPage() }),
    loader: ({ request }) => {
      return this.productsService.getProducts({
        offset: request.page * 9,
        limit: request.limit
      });
    }
  });
}
