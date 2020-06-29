import { Injectable } from '@angular/core';
import { of, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FieldsService } from './fields.service';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {

  isLoggedIn$ = new Subject<boolean>();

  constructor(private fieldsService: FieldsService) {}

  public isLoggedIn() {
    return this.isLoggedIn$;
  }

  public signin() {
    window.localStorage.setItem('user', JSON.stringify({id: 123, logged_in: true}));
  }

  public signout() {
    return this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/applications/logOut`)
  }

  checkAuthentication() {
    return this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/applications/isLoggedIn`)
    .pipe(tap(p => {
      this.isLoggedIn$.next(p.status == 'success')
    }))
  }

}

