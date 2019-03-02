import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthGuardService implements CanActivate {

  constructor(
    private authService: NbAuthService,
    private router: Router) {
  }

  canActivate(): Observable<boolean> {
    // canActive can return Observable<boolean>,
    // which is exactly what isAuhenticated returns
    return this.authService.isAuthenticated()
    .pipe(
      tap(authenticated => {
        if (!authenticated) {
          this.router.navigate(['auth/login']);
        }
      }),
    );
  }
}
