import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
//TODO: READ https://stackoverflow.com/questions/76204932/how-to-use-canactivatefn-in-angular-16-via-constructor-dependency-injection
//for better dependency injection
export const authGuard: CanActivateFn = (route, state) => {
  const authsrv = inject(AuthService);
  const routerSrv = inject(Router);
  return authsrv.isAuthenticated().pipe(
    tap(isAuth => {
      if (!isAuth) {
        routerSrv.navigate(['/login'])
      }
    })
  );
};
