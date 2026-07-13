import { Product } from '@/products/interfaces/product.interface';
import { Component, input } from '@angular/core';
import { ProductCarouselComponent } from "@/products/components/product-card/product-carousel/product-carousel.component";

@Component({
  selector: 'product-details',
  imports: [ProductCarouselComponent],
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent {
  product = input.required<Product>();
  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
}
