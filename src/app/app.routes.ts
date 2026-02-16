import { Routes } from '@angular/router';
import { NotAuthenticatedGuard } from './auth/guards/not-authenticated.guard';
import { IsAdminGuard } from './auth/guards/is-admin.guard';

export const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
    canMatch: [
      // () => {
      //   console.log('Prohibido!');
      //   return false;
      // },
      NotAuthenticatedGuard,
    ]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin-dashboard/admin-dashboard.routes'),
    canMatch: [
      IsAdminGuard,
    ]
  },
  {
    path: '',
    loadChildren: () => import('./store-front/store-front.routes')
  }

];
