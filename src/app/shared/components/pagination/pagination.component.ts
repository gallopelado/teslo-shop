import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {

  pages = input(0);
  // página por defecto
  currentPage = input<number>(1);

  // genera números
  getPagesList = computed(() => {
    return Array.from({ length: this.pages() }, (_, i) => i + 1);
  });

}
