import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { NbToastrService } from '@nebular/theme';

@Injectable()
export class MessagingService {

  constructor(
    private angularFireMessaging: AngularFireMessaging,
    private http: HttpClient,
    private toastrService: NbToastrService) {
    this.angularFireMessaging.messaging.subscribe(
      (_messaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      },
    );
    this.header = new Headers({ 'Content-Type': 'application/json' });
  }

  private header;
  private url = environment.baseUrl + '/devices/';

  currentMessage = new BehaviorSubject(null);
  /**
   * update token in firebase database
   *
   * @param userId userId as a key
   * @param token token as a value
   */
  updateToken(userId, token: string) {
    // Constructing fcmDevice as required by fcm-django model
    // Refer: https://github.com/xtrinch/fcm-django
    const fcmDevice = {
      registration_id: token,
      name: '',
      active: true,
      user: userId,
      type: 'web',
    };

    return this.http
        .post(
          this.url,
          fcmDevice,
          { headers: this.header },
        );
  }

  /**
   * request permission for notification from firebase cloud messaging
   *
   * @param userId userId
   */
  requestPermission(userId) {
    // First check if already subscribed
    if (Notification.permission !== 'granted') {
      this.angularFireMessaging.requestToken.subscribe(
        (token) => {
          this.updateToken(userId, token)
            .subscribe(response => {
              this.toastrShow('success', false, 'nb-notifications', '10000', 'top-right');

            });
        },
        (err) => {
        },
      );
    } else {
      alert('You are already subscibed to push notifications');
    }
  }

  /**
   * hook method when new notification received in foreground
   */
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        this.currentMessage.next(payload);
      });
  }

  // Trigger toastr for showing subscription complete message
  toastrShow(status, preventDuplicates, icon, duration, position) {
    this.toastrService.show('You will be notified when a New Enquiry is added',
    'Subscription Successfull',
      {status, preventDuplicates, icon, duration, position},
    );
  }
}
