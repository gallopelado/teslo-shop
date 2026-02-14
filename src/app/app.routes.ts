import { Routes } from '@angular/router';
import { NotAuthenticatedGuard } from './auth/guards/not-authenticated.guard';

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
    path: '',
    loadChildren: () => import('./store-front/store-front.routes')
  }

];
