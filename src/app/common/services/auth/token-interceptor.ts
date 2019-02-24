import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { NbAuthService } from '@nebular/auth';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: NbAuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    // Get the auth token from the service.

    let authToken: string;

    this.auth.getToken().subscribe(token => {
      authToken = token.toString();
    });
    const header = 'Bearer ' + authToken;

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    // const authReq = req.clone({
    //   headers: req.headers.set('Authorization', authToken)
    // });

    // Clone the request and set the new header in one step.
    const authReq = req.clone({ setHeaders: { Authorization: header } });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
