import { Injectable } from '@angular/core';

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
}

