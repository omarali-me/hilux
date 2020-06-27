import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class AuthenticationService {

  constructor() {}

  public isLoggedIn() {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return user && user.logged_in || false;
  }

  public signin() {
    window.localStorage.setItem('user', JSON.stringify({id: 123, logged_in: true}));
  }

  public signout() {
    window.localStorage.removeItem('user');
  }

  checkAuthentication() {
    if (true) {
      // IF COOKIE IS AVALILABLE acess all pages
      return of(true);
    } else {
      return of(false);
    }
  }
}

