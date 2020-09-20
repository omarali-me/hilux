import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';

export interface ProfileId {
  [prop: string]: any;
}

@Injectable()
export class CustomerProfileResolver implements Resolve<any> {

  constructor( private http: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const profileId = route.params.profileId;
    return profileId ? this.getProfile(profileId) : { hasTaxNumber: '0' }
  }

  getProfile(profileId) {
    return this.http.get(`${environment.apiHost}/AjmanLandProperty/index.php/customers/get/${profileId}`)
    // return this.http.get(`http://localhost:3000/customer?profileId=${profileId}`)
  }
}
