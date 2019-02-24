import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { LayoutService } from '../../../@core/utils/layout.service';

import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any = {};

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private analyticsService: AnalyticsService,
              private layoutService: LayoutService,
              private authService: NbAuthService) {

    this.authService.onTokenChange()
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
    this.authService.getToken()
      .subscribe((token: NbAuthJWTToken) => {
        this.user = token.getPayload();
      });
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
