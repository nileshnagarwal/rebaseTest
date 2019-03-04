import { AuthService } from './../../../services/auth/auth-service/auth.service';
import { Component } from '@angular/core';
import { NbLoginComponent } from '@nebular/auth';
import { User } from '../../../interfaces/user';

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

    // Below call is from existing login()
    this.service.authenticate(this.strategy, this.user).subscribe(function (result) {
        _this.submitted = false;

        // New Lines of Code
        const user: User = {
          'accessToken': '',
          'name': '',
          'refreshToken': '',
          'tokenExpiration': null,
          'user_id': null,
        };
        user.accessToken = result.getToken().toString();
        user.name = result.getToken().getPayload()['name'];
        user.user_id = result.getToken().getPayload()['user_id'];
        // We get refreshToken from response of autheticate()
        user.refreshToken = result.getResponse().body.token.refresh_token;
        user.tokenExpiration = AuthService.getExpiryDate(user.refreshToken);
        localStorage.setItem('currentUser', JSON.stringify(user));

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
