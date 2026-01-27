import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

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

}
