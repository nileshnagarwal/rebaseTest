import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NbAuthService } from '@nebular/auth';
import { map } from 'rxjs/operators';
import { User } from '../../../interfaces/user';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { refreshTokenApiUrl } from '../apiUrls';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private nbAuthService: NbAuthService,
    private jwtHelper: JwtHelperService,
    private router: Router,
  ) { }

  getUser(): Observable<User> {
    return of(JSON.parse(localStorage.getItem('currentUser')));
  }

  refreshAccessToken(): Observable<User> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const refreshToken = currentUser.refreshToken;
    const nbAuthToken = JSON.parse(localStorage.getItem('auth_app_token'));

    return this.http.post(refreshTokenApiUrl, { 'refresh': refreshToken })
      .pipe(
        map(token => {
          if (token && token['access']) {
            const user: User = JSON.parse(localStorage.getItem('currentUser'));
            user.accessToken = token['access'];
            user.tokenExpiration = this.jwtHelper.getTokenExpirationDate(token['access']);
            localStorage.removeItem('currentUser');
            localStorage.setItem('currentUser', JSON.stringify(user));
            if (nbAuthToken) {
              nbAuthToken['createdAt'] = Date.now();
              nbAuthToken['value'] = token['access'];
              localStorage.removeItem('auth_app_token');
              localStorage.setItem('auth_app_token', JSON.stringify(nbAuthToken));
            }
          }
          return <User>JSON.parse(localStorage.getItem('currentUser'));
      }));
  }

  static getExpiryDate(token) {
    const jwtHelper = new JwtHelperService();
    return jwtHelper.getTokenExpirationDate(token);
  }

  isAuthenticated() {
    return this.getUser()
      .pipe(map((user: User) => {
        if (user === null) {
          return false;
        } else {
          const refreshExpiry = this.jwtHelper.getTokenExpirationDate(user.refreshToken);
          if (refreshExpiry.valueOf() >= Date.now()) {
            return true;
          } else return false;
        }
      }));
  }

  logout(strategyName) {
    // localStorage.removeItem('currentUser');
    this.nbAuthService.logout(strategyName);
    this.router.navigate(['/login']);
  }

}
