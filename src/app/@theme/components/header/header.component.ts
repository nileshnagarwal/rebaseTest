import { MessagingService } from './../../../common/services/messaging.service';
import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { LayoutService } from '../../../@core/utils/layout.service';

import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { AuthService } from '../../../common/services/auth/auth-service/auth.service';
import { of } from 'rxjs';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any = {};

  userMenu = [
    // { title: 'Profile' },
    { title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private analyticsService: AnalyticsService,
              private layoutService: LayoutService,
              private nbAuthService: NbAuthService,
              private authService: AuthService,
              private messagingService: MessagingService) {

    this.nbAuthService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          // here we receive a payload from the token and assigne it to our `user` variable
          this.user = token.getPayload();
        }
      });
  }

  ngOnInit() {
    // This is a dummy service to get dummy users.
    // this.userService.getUsers()
    // .subscribe((users: any) => this.user = users.nick);

    // To display the user's name at the top.
    // Here we get the payload from existing token and
    // extract user information from the token.
    this.nbAuthService.getToken()
      .subscribe((token: NbAuthJWTToken) => {
        this.user = token.getPayload();
      });
  }

  // Below we implement Notification Subscription
  message; // for storing current message received

  subscribeNotifications() {
    let userId: number;
    this.authService.getUser()
    .subscribe(user => {
      userId = user.user_id;
      this.messagingService.requestPermission(userId);
    });
    // Perhaps the below statements should be inside subscribe
    // of getUser() below requestPermission.
    // Need to implement and try.
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
  }

  // For checking if already subscribed and controlling visibility of
  // push notification icon in header
  isSubscribed() {
    if (Notification.permission !== 'granted') {
      return of(false);
    } else {
      return of(true);
    }
  }


  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
