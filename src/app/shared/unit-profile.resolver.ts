import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

export interface ProfileId {
  [prop: string]: any;
}

@Injectable()
export class UnitProfileResolver implements Resolve<any> {

  constructor( private http: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const profileId = route.params.profileId;
    return profileId ? this.getProfile(profileId) : { }
  }

  getProfile(profileId) {
    return this.http.get(`https://wfe.ajm.re/AjmanLandProperty/index.php/units/get/${profileId}`)
  }
}


