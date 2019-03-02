import { Component } from '@angular/core';
import { NbLoginComponent } from '@nebular/auth';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
export class LoginComponent extends NbLoginComponent {

  // Overriding the login()
  login() {
    const _this = this;
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    // Start of newly added Lines of Code
    // First We get the existing token stored in localstorage
    const currentToken = this.service.getToken();
    let refreshToken: string;

    // Below call is from existing login()
    this.service.authenticate(this.strategy, this.user).subscribe(function (result) {
        _this.submitted = false;

        // New Lines of Code
        // We get refreshToken from response of autheticate()
        refreshToken = result.getResponse().body.token.refresh_token;
        // Finally we save the refreshToken in existing token under
        // the new 'refreshToken' key
        if (result && refreshToken) {
          localStorage.setItem('refreshToken', refreshToken);
          currentToken['value']['refreshToken'] = refreshToken;
        }

        // Existing login() lines of code resumes
        if (result.isSuccess()) {
            _this.messages = result.getMessages();
        } else {
            _this.errors = result.getErrors();
        }
        const redirect = result.getRedirect();
        if (redirect) {
            setTimeout(function () {
                return _this.router.navigateByUrl(redirect);
            }, _this.redirectDelay);
        }
        _this.cd.detectChanges();
    });

}

}
