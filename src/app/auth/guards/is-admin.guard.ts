import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { filter, firstValueFrom, take } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

export const IsAdminGuard: CanMatchFn = async(
  route: Route,
  segments: UrlSegment[]
) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  await firstValueFrom(
    toObservable(authService.authStatus).pipe(
      filter(status => status !== 'checking'),
      take(1) // firstValueFrom ya toma el primero y cierra
    )
  );

  const roles = authService.userRoles();

  // TODO: Esto podría usarse en is-admin.guard
  // isAdmin de auth.service
  if(roles && roles.includes('admin')) {
    return true;
  }

  router.navigateByUrl('/');
  return false;
}
