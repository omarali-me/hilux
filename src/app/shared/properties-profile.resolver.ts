import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ProfileId {
  [prop: string]: any;
}

@Injectable()
export class PropertiesProfileResolver implements Resolve<any> {

  constructor( private http: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const profileId = route.params.profileId;
    return profileId ? this.getProperty(profileId) : { }
  }

  getProperty(profileId) {
    return this.http.get(`${environment.apiHost}/AjmanLandProperty/index.php/owners/landOrUnit/${profileId}`)
  }

}
